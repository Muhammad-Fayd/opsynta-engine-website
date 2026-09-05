/* ============================================================
   Opsynta Engine — UTM Attribution Patch (Option B)
   ============================================================
   What it does:
   1. Captures utm_* params from the landing URL (first-touch
      AND last-touch) into localStorage, plus referrer, landing
      path and timestamp.
   2. Self-attributes every contact action on the page:
      - mailto: links get a campaign-tagged subject + body line
      - wa.me links get a pre-filled message with the tag
      Every email/WhatsApp you receive tells you exactly which
      LinkedIn post drove the lead.
   3. Idempotent and safe: no external dependencies, no network
      calls, works on GitHub Pages, survives anchor navigation
      (#pricing) and repeat visits.

   Drop-in file: /js/utm.js   (loaded by index.html)
   Verify after deploy: open the site with
   ?utm_source=linkedin&utm_medium=social&utm_campaign=88percent&utm_content=post1
   then check DevTools console + localStorage key "opsynta_attr".
   ============================================================ */
(function () {
  'use strict';

  var STORE_KEY = 'opsynta_attr';
  var UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

  /* ---------- 1. Capture ---------- */
  function capture() {
    var params = {};
    try {
      var q = window.location.search;
      if (q && q.charAt(0) === '?') {
        q.slice(1).split('&').forEach(function (pair) {
          if (!pair) return;
          var kv = pair.split('=');
          var k = decodeURIComponent(kv[0] || '');
          var v = decodeURIComponent((kv[1] || '').replace(/\+/g, ' '));
          if (k) params[k] = v;
        });
      }
    } catch (e) { /* malformed query — ignore */ }

    var hasUtm = UTM_KEYS.some(function (k) { return params[k]; });

    var existing = null;
    try { existing = JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); } catch (e) { /* corrupt — reset */ }

    var snapshot = function () {
      return {
        utm_source: params.utm_source || '',
        utm_medium: params.utm_medium || '',
        utm_campaign: params.utm_campaign || '',
        utm_content: params.utm_content || '',
        utm_term: params.utm_term || '',
        landing: window.location.pathname || '/',
        referrer: document.referrer || 'direct',
        ts: new Date().toISOString()
      };
    };

    var data = existing || { first: null, last: null, visits: 0 };
    data.visits = (data.visits || 0) + 1;

    if (hasUtm) {
      var snap = snapshot();
      if (!data.first) data.first = snap;   // first-touch: kept forever
      data.last = snap;                     // last-touch: updated on new campaign click
    } else if (!data.first) {
      // direct visitor, never tagged — record as direct so contact
      // actions still distinguish "organic" from "campaign"
      var direct = {
        utm_source: '', utm_medium: '', utm_campaign: 'direct',
        utm_content: '', utm_term: '',
        landing: window.location.pathname || '/',
        referrer: document.referrer || 'direct',
        ts: new Date().toISOString()
      };
      data.first = direct;
      data.last = direct;
    }

    try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) { /* storage unavailable */ }
    return data;
  }

  /* ---------- 2. Tag builders ---------- */
  function touch(t) {
    if (!t) return null;
    var camp = t.utm_campaign || 'direct';
    var content = t.utm_content || '';
    var labels = { linkedin: 'LinkedIn', facebook: 'Facebook', google: 'Google',
                   twitter: 'Twitter', x: 'X', instagram: 'Instagram', youtube: 'YouTube' };
    var srcKey = (t.utm_source || 'direct').toLowerCase();
    return {
      camp: camp,
      content: content,
      src: t.utm_source || 'direct',
      compact: camp + (content ? '/' + content : ''),
      srcLabel: labels[srcKey] || (t.utm_source ? t.utm_source.charAt(0).toUpperCase() + t.utm_source.slice(1) : 'Direct')
    };
  }

  function mailtoSubject(t) {
    return t && t.camp !== 'direct'
      ? 'Opsynta inquiry \u2014 ' + t.compact
      : 'Opsynta inquiry';
  }

  function attributionLine(t) {
    if (!t) return '';
    var parts = ['[Attribution] source=' + t.src];
    if (t.camp) parts.push('campaign=' + t.camp);
    if (t.content) parts.push('content=' + t.content);
    return parts.join(' \u00b7 ');
  }

  function whatsappText(t) {
    var base = 'Hi Muhammad \u2014 ';
    base += (t && t.camp !== 'direct')
      ? 'I came through your ' + t.srcLabel + ' post (' + t.compact + '). '
      : 'I found the Opsynta site. ';
    return base;
  }

  /* ---------- 3. Link rewriting (idempotent) ---------- */
  function parseUrl(href) {
    try { return new URL(href, window.location.href); } catch (e) { return null; }
  }

  function tagLinks() {
    var attr;
    try { attr = JSON.parse(localStorage.getItem(STORE_KEY) || 'null'); } catch (e) { return; }
    var t = touch(attr && (attr.last || attr.first));
    if (!t) return;

    /* --- mailto links --- */
    Array.prototype.forEach.call(document.querySelectorAll('a[href^="mailto:"]'), function (a) {
      if (!a.dataset.originalHref) a.dataset.originalHref = a.getAttribute('href');
      var u = parseUrl(a.dataset.originalHref);
      if (!u) return;
      u.searchParams.set('subject', mailtoSubject(t));
      var body = u.searchParams.get('body') || '';
      var line = attributionLine(t);
      if (body.indexOf('[Attribution]') === -1) {
        body = (body ? body + '\n\n' : '') + line + '\n\n';
      }
      u.searchParams.set('body', body);
      a.setAttribute('href', u.toString());
    });

    /* --- WhatsApp wa.me links --- */
    Array.prototype.forEach.call(document.querySelectorAll('a[href^="https://wa.me/"], a[href^="http://wa.me/"]'), function (a) {
      if (!a.dataset.originalHref) a.dataset.originalHref = a.getAttribute('href');
      var u = parseUrl(a.dataset.originalHref);
      if (!u) return;
      var existingText = u.searchParams.get('text') || '';
      var text = existingText.indexOf('Hi Muhammad') === -1
        ? (whatsappText(t) + existingText)
        : existingText;
      u.searchParams.set('text', text);
      a.setAttribute('href', u.toString());
    });
  }

  /* ---------- 4. Boot ---------- */
  var data = capture();
  tagLinks();

  // re-tag if the DOM is still streaming in (defensive; script loads at end of body)
  if (document.readyState !== 'complete') {
    document.addEventListener('DOMContentLoaded', tagLinks);
  }
  window.addEventListener('pageshow', tagLinks);

  // re-tag if a hash navigation happens after load (anchors don't reload the page)
  window.addEventListener('hashchange', function () { /* attribution unchanged; links already tagged */ });

  // debug line — lets you verify capture from the DevTools console
  try {
    console.info('[Opsynta] attribution captured:', JSON.parse(localStorage.getItem(STORE_KEY) || 'null'));
  } catch (e) { /* noop */ }
})();
