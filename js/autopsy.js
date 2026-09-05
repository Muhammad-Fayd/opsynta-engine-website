(function () {
  'use strict';

  var PRIMITIVES = [
    { id: 'SCV', name: 'Single Version of Context', desc: 'Live operational state, one source of truth.' },
    { id: 'ACE', name: 'Continuous Compliance', desc: 'Always-on interrogation of records against policy.' },
    { id: 'IFE', name: 'Infinite-Fidelity Execution', desc: 'End-to-end autonomous execution, no handoffs.' },
    { id: 'PDO', name: 'Predictive Drift Optimization', desc: 'Calling exceptions before they land.' },
    { id: 'ITIN', name: 'Iterative Technology Intervention', desc: 'Computed plans that re-route as conditions change.' },
    { id: 'MDA', name: 'Multi-Dimensional Analysis', desc: 'Answers across the data you never combine.' }
  ];

  var WEAK_DIAGNOSIS = {
    SCV: 'No live operational state. Nothing exposes what is actually happening — your status meeting is the dashboard.',
    ACE: 'Compliance runs on periodic checks and memory, not continuous interrogation. Real risk queues behind alert noise.',
    IFE: 'Work stops at every handoff. The workflow waits for a person at each seam, so your best people move data instead of decisions.',
    PDO: 'You run on history and hope. Nothing calls the exception before it lands, so every surprise arrives fully grown.',
    ITIN: 'Plans are negotiated, not computed. Paths drift the moment conditions change and nobody re-routes.',
    MDA: 'You answer the questions you already know to ask. The dimensions hiding the real answer stay dark.'
  };

  var WEAK_FIX = {
    SCV: 'Start with The First Map — surface live state exactly where the work happens, then make every update you do by hand an interface instead.',
    ACE: 'Ontology-first compliance. Map your schemas, define the interrogations, and let ACE escalate only the 5% that matters.',
    IFE: 'Pick one process and run it end-to-end. Real autonomy is execution, not alerts — the first full loop is the hardest and the last.',
    PDO: 'Predict what the pattern says matters, not everything the vendors suggest. Start with one drift signature you already fear.',
    ITIN: 'Let the planner route once. Your operators approve exceptions — not paths — and the plan re-computes as the world moves.',
    MDA: 'Ask what dashboards cannot. Combine the two dimensions you have never merged and watch the answer surface itself.'
  };

  var questions = [
    {
      tag: '01 · HANDOFFS ACROSS SYSTEMS',
      text: 'When one process ends and another begins, how does the state travel?',
      options: [
        { label: 'Everything updates itself. No copy, no re-key.', score: 0 },
        { label: 'Mostly automatic; a manual re-key happens occasionally.', score: 1 },
        { label: 'Weekly exports and imports; someone reconciles the seams.', score: 2 },
        { label: 'Daily re-keying. Version drift is a known, lived-with issue.', score: 3 },
        { label: 'Shadow spreadsheets are the real database around here.', score: 4 }
      ],
      weights: { SCV: 0.6, IFE: 0.4 }
    },
    {
      tag: '02 · STATUS MEETINGS',
      text: 'Where does your team learn the current state of the work?',
      options: [
        { label: 'Live dashboards, always current, no meeting needed.', score: 0 },
        { label: 'Dashboards, plus one weekly check-in.', score: 1 },
        { label: 'The weekly meeting reads numbers aloud from a deck.', score: 2 },
        { label: 'Daily standups exist to share state the systems do not expose.', score: 3 },
        { label: 'Everything important lives in someone\u2019s weekly update email.', score: 4 }
      ],
      weights: { SCV: 0.5, MDA: 0.5 }
    },
    {
      tag: '03 · OUT-OF-HOURS EXCEPTIONS',
      text: 'When an exception hits outside business hours, what happens?',
      options: [
        { label: 'Systems resolve it; alerts reach a human only when needed.', score: 0 },
        { label: 'An on-call person gets an alert with full context and answer.', score: 1 },
        { label: 'Someone gets called and works through it from memory.', score: 2 },
        { label: 'One specific phone is the runbook; everyone else waits.', score: 3 },
        { label: 'The person who \u201Cknows how it works\u201D is the incident system.', score: 4 }
      ],
      weights: { IFE: 0.6, PDO: 0.4 }
    },
    {
      tag: '04 · COMPLIANCE & FALSE ALARMS',
      text: 'How does your policy and exception monitoring actually run?',
      options: [
        { label: 'Continual, context-aware interrogation of live records.', score: 0 },
        { label: 'Scheduled checks with full context attached.', score: 1 },
        { label: 'Rule-based alerts, some false positives, a team tuning them.', score: 2 },
        { label: 'High false-positive volume; analysts triage by hand.', score: 3 },
        { label: 'Compliance equals periodic audits and memory of last time.', score: 4 }
      ],
      weights: { ACE: 0.7, SCV: 0.3 }
    },
    {
      tag: '05 · THE CROSS-CUTTING QUESTION',
      text: 'When you need an answer that spans several systems, what is the experience?',
      options: [
        { label: 'I ask the system; it federates live and answers me.', score: 0 },
        { label: 'A well-known analyst answers within a day.', score: 1 },
        { label: 'I query a warehouse a specialist maintains.', score: 2 },
        { label: 'The data exists, but nobody has connected the dots yet.', score: 3 },
        { label: 'We \u201Chave the data somewhere\u201D — across dozens of apps, dark.', score: 4 }
      ],
      weights: { MDA: 0.7, SCV: 0.3 }
    },
    {
      tag: '06 · ANTICIPATION',
      text: 'How do you find out that congestion or drift is coming?',
      options: [
        { label: 'Models predict it; we get a recommended action with confidence.', score: 0 },
        { label: 'Regular forecasts inform decisions ahead of time.', score: 1 },
        { label: 'Historical reports are reviewed after the fact.', score: 2 },
        { label: 'We react. Prediction is gut feel from the senior staff.', score: 3 },
        { label: 'Exceptions surprise us every time; buffer is how we cope.', score: 4 }
      ],
      weights: { PDO: 0.7, ITIN: 0.3 }
    },
    {
      tag: '07 · DECISIONS TO WORK',
      text: 'When a decision is made, who actually executes the work?',
      options: [
        { label: 'The system completes the workflow end-to-end and verifies.', score: 0 },
        { label: 'The tools do most of it; a human approves.', score: 1 },
        { label: 'A human executes, well supported by tooling.', score: 2 },
        { label: 'Multiple handoffs — every step needs a person in the loop.', score: 3 },
        { label: 'Someone walks between systems to get anything done.', score: 4 }
      ],
      weights: { IFE: 1.0 }
    }
  ];

  var state = {
    step: 0,
    answers: []
  };

  var els = {};

  function init() {
    els.start = document.getElementById('startAutopsy');
    els.quizShell = document.getElementById('quizShell');
    els.quizResult = document.getElementById('quizResult');
    els.step = document.getElementById('quizStep');
    els.tag = document.getElementById('quizTag');
    els.qText = document.getElementById('quizQuestion');
    els.options = document.getElementById('quizOptions');
    els.back = document.getElementById('quizBack');
    els.next = document.getElementById('quizNext');
    els.progressLabel = document.getElementById('quizProgressLabel');
    els.progressFill = document.getElementById('quizProgressFill');

    if (!els.start || !els.quizShell) return;

    els.start.addEventListener('click', function () {
      els.start.scrollIntoView({ behavior: 'smooth', block: 'center' });
      els.quizShell.hidden = false;
      state.step = 0;
      state.answers = [];
      render();
      var q = document.getElementById('quiz');
      if (q) q.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });

    els.options.addEventListener('click', function (e) {
      var btn = e.target.closest('button.quiz-option');
      if (!btn) return;
      var idx = parseInt(btn.getAttribute('data-idx'), 10);
      state.answers[state.step] = idx;
      updateOptions();
      els.next.disabled = false;
    });

    els.next.addEventListener('click', function () {
      if (els.next.disabled) return;
      if (state.step === questions.length - 1) {
        finish();
        return;
      }
      state.step += 1;
      render();
    });

    els.back.addEventListener('click', function () {
      if (state.step === 0) {
        els.quizShell.hidden = true;
        return;
      }
      state.step -= 1;
      render();
    });
  }

  function render() {
    var q = questions[state.step];
    els.tag.textContent = q.tag;
    els.qText.textContent = q.text;
    els.options.innerHTML = q.options.map(function (opt, idx) {
      return '<button type="button" class="quiz-option" data-idx="' + idx + '" role="radio" aria-checked="false"><span class="quiz-option-marker"></span><span class="quiz-option-label">' + opt.label + '</span></button>';
    }).join('');
    els.progressLabel.textContent = 'Question ' + (state.step + 1) + ' of ' + questions.length;
    els.progressFill.style.width = ((state.step + 1) / questions.length * 100) + '%';
    els.back.disabled = state.step === 0;
    els.back.textContent = state.step === 0 ? 'Cancel' : 'Back';
    els.next.textContent = state.step === questions.length - 1 ? 'See my score' : 'Next';
    els.next.disabled = (state.answers[state.step] === undefined);
    updateOptions();
  }

  function updateOptions() {
    var btns = els.options.querySelectorAll('.quiz-option');
    var chosen = state.answers[state.step];
    btns.forEach(function (btn, i) {
      var active = i === chosen;
      btn.classList.toggle('is-selected', active);
      btn.setAttribute('aria-checked', active ? 'true' : 'false');
    });
  }

  function compute() {
    var totals = {};
    var max = {};
    PRIMITIVES.forEach(function (p) { totals[p.id] = 0; max[p.id] = 0; });
    questions.forEach(function (q, qi) {
      var score = state.answers[qi] !== undefined ? questions[qi].options[state.answers[qi]].score : 0;
      Object.keys(q.weights).forEach(function (pid) {
        totals[pid] += q.weights[pid] * score;
        max[pid] += q.weights[pid] * 4;
      });
    });
    var scores = PRIMITIVES.map(function (p) {
      return { id: p.id, name: p.name, score: Math.round((totals[p.id] / max[p.id]) * 100) };
    });
    var overall = Math.round(scores.reduce(function (acc, s) { return acc + s.score; }, 0) / scores.length);
    return { scores: scores, overall: overall };
  }

  function bandFor(overall) {
    if (overall <= 20) return ['Low debt through the substrate. The seams are few and tactical.', 'green'];
    if (overall <= 40) return ['Friction is tactical — a seam here, a re-key there. The map is short.', 'green'];
    if (overall <= 60) return ['Friction is structural — designed into the workflow, not the people. This is where autonomy pays.', 'gold'];
    if (overall <= 80) return ['Operators are the API. You pay for integration in human hours every single day.', 'peach'];
    return ['Everything runs on memory, meetings, and spreadsheets. Your best engineers are doing interface work.', 'red'];
  }

  function finish() {
    var result = compute();
    var weakest = result.scores.reduce(function (a, b) { return b.score > a.score ? b : a; });

    var scoreEl = document.getElementById('resultScore');
    var bandEl = document.getElementById('resultBand');
    var weakEl = document.getElementById('resultWeak');
    var diagEl = document.getElementById('resultDiagnosis');
    var fixEl = document.getElementById('resultFix');
    var barsEl = document.getElementById('resultBars');

    bandEl.textContent = bandFor(result.overall)[0];
    bandEl.className = 'result-band ' + bandFor(result.overall)[1];
    weakEl.textContent = weakest.id + ' · ' + weakest.name;
    diagEl.textContent = WEAK_DIAGNOSIS[weakest.id];
    fixEl.textContent = WEAK_FIX[weakest.id];

    barsEl.innerHTML = result.scores.slice().sort(function (a, b) { return b.score - a.score; }).map(function (s) {
      var hl = s.id === weakest.id ? ' bar-weak' : '';
      return '<div class="result-bar' + hl + '">' +
        '<div class="result-bar-head"><span class="mono result-bar-id">' + s.id + '</span>' +
        '<span class="result-bar-label">' + s.name + '</span><span class="mono result-bar-val">' + s.score + '</span></div>' +
        '<div class="result-bar-track"><div class="result-bar-fill' + hl + '" style="width:' + s.score + '%"></div></div></div>';
    }).join('');

    animateScore(scoreEl, result.overall);

    buildContact(weakest.id, result);

    els.quizShell.hidden = true;
    els.quizResult.hidden = false;
    var res = document.getElementById('quizResult');
    if (res) res.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function animateScore(el, target) {
    var start = 0;
    var dur = 900;
    var t0 = null;
    function frame(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(start + (target - start) * eased);
      if (p < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function attribution() {
    try {
      var raw = localStorage.getItem('opsynta_attr');
      if (!raw) return null;
      var data = JSON.parse(raw);
      var touch = data && (data.last || data.first);
      if (!touch) return null;
      var camp = touch.utm_campaign || 'direct';
      var content = touch.utm_content || '';
      var src = touch.utm_source || 'direct';
      var labels = { linkedin: 'LinkedIn', facebook: 'Facebook', google: 'Google',
                     twitter: 'Twitter', x: 'X', instagram: 'Instagram', youtube: 'YouTube' };
      return {
        src: src,
        camp: camp,
        content: content,
        compact: camp + (content ? '/' + content : ''),
        srcLabel: labels[(src || 'direct').toLowerCase()] ||
          (touch.utm_source ? touch.utm_source.charAt(0).toUpperCase() + touch.utm_source.slice(1) : 'Direct'),
        isCampaign: camp !== 'direct'
      };
    } catch (e) {
      return null;
    }
  }

  function buildContact(weakId, result) {
    var t = attribution();
    var ctx = t ? t.compact : '';
    var via = (t && t.isCampaign)
      ? ' via the \u201C' + t.srcLabel + '\u201D post (' + t.compact + ')'
      : ' from the Opsynta site';
    var contactName = 'Muhammad';

    var subject = 'Process Autopsy \u00B7 ' + result.overall + '/100';
    if (t && t.isCampaign) subject += ' \u00B7 ' + t.compact;
    subject += ' \u00B7 Weakest: ' + weakId;

    var bodyLines = [
      'Hi ' + contactName + ',',
      '',
      'I just ran the Opsynta Process Autopsy. My Operational Debt Score is ' + result.overall + '/100, and the weakest primitive is ' + weakId + '.',
      '',
      'My six-primitive scores:',
      ''
    ];
    result.scores.slice().sort(function (a, b) { return b.score - a.score; }).forEach(function (s) {
      bodyLines.push('  ' + s.id + ' \u2014 ' + s.score + '/100');
    });
    bodyLines.push('');
    bodyLines.push('Would love the map for this.');
    if (t && t.isCampaign) {
      bodyLines.push('');
      bodyLines.push('[Attribution] source=' + t.src + ' \u00B7 campaign=' + t.camp + ' \u00B7 content=' + t.content);
    }

    var email = document.getElementById('emailLink');
    email.href = 'mailto:mohamed.fayd5589@gmail.com?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(bodyLines.join('\n'));
    email.addEventListener('click', function () { trackSend('email', ctx); });

    var wa = document.getElementById('waLink');
    var waText = 'Hi ' + contactName + ' \u2014 I ran the Opsynta Process Autopsy. Score ' + result.overall +
      '/100, weakest primitive ' + weakId + '. I came ' + via + '. Can we map it?';
    wa.href = 'https://wa.me/201152701025?text=' + encodeURIComponent(waText);
    wa.addEventListener('click', function () { trackSend('whatsapp', ctx); });
  }

  function trackSend(channel, ctx) {
    try {
      var payload = { ch: channel, ts: Date.now() };
      if (ctx) payload.ctx = ctx;
      localStorage.setItem('opsynta_send_' + channel + '_' + Date.now(), JSON.stringify(payload));
      if (window.console && console.info) {
        console.info('[Opsynta] ' + channel + ' lead initiated' + (ctx ? ' (' + ctx + ')' : ''));
      }
    } catch (e) {}
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();