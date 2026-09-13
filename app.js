/**
 * ACA $500 Refund Eligibility — paste state + coverage + APTC + view date
 * → Eligible / Not in scope / Unsure from public WH Sep 10 criteria
 *   (30 FFM states · no premium assistance · ~$500/person · checks begin October 2026)
 *   + days-to-Oct-1 countdown + “no portal yet” footer.
 * Brand: ACA $500 Refund Eligibility only. User-pasted chips; no Healthcare.gov scrape.
 * Fact-sheet literacy only. Not tax, legal, or medical advice.
 * Never invents eligibility beyond the pasted triad; never invents a mail date.
 */
(function () {
  "use strict";

  const WH_URL =
    "https://www.presidency.ucsb.edu/documents/white-house-fact-sheet-president-donald-j-trump-announces-the-working-families-obamacare";
  const CNBC_URL =
    "https://www.cnbc.com/2026/09/10/trump-obamacare-refunds-aca.html";
  const INN_URL =
    "https://insurancenewsnet.com/oarticle/white-house-says-it-will-send-out-500-obamacare-refunds";
  const HC_GOV = "https://www.healthcare.gov/";

  const REFUND_AMOUNT = 500;
  const CHECK_START_ISO = "2026-10-01";
  const CHECK_START_LABEL = "Oct 1 2026";
  const ANNOUNCE_ISO = "2026-09-10";
  const WINDOW_LABEL = "Sep 10 announce → October checks";

  /** 30 FFM states from CNBC Sep 10 2026 / WH fact-sheet reporting. */
  const FFM_STATES = [
    "AL", "AK", "AZ", "AR", "DE", "FL", "HI", "IN", "IA", "KS",
    "LA", "MI", "MS", "MO", "MT", "NE", "NH", "NC", "ND", "OH",
    "OK", "OR", "SC", "SD", "TN", "TX", "UT", "WV", "WI", "WY",
  ];
  const FFM_SET = new Set(FFM_STATES);

  const STATE_NAMES = {
    AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California",
    CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "District of Columbia",
    FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois",
    IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana",
    ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota",
    MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada",
    NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York",
    NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon",
    PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota",
    TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia",
    WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming",
  };

  const COVERAGE_LABELS = {
    healthcare_gov: "HealthCare.gov (FFM)",
    state_marketplace: "State marketplace / SBE",
    employer: "Employer / job-based",
    medicaid_medicare: "Medicaid / Medicare",
    unsure: "Unsure",
  };

  const APTC_LABELS = {
    no: "No APTC",
    yes: "Receiving APTC",
    unsure: "Unsure",
  };

  const CITE_ONE_LINER =
    "White House Sep 10 2026 Working Families Obamacare Refunds fact sheet (Presidency Project archive): ~$500 per person to nearly 1 million Americans in 30 federal-exchange states who do not receive premium assistance; checks begin October 2026; surplus exchange user-fee framing. CNBC Sep 10 lists the 30 FFM states and confirms October start. Secondary Reuters/InsuranceNewsNet: administration says it identified recipients — no public eligibility portal cited as of Sep 13. This card matches your pasted chips to that public framing only — not a determination, not a mail-date tracker, not tax or enrollment advice.";

  /** Teaching seeds — labeled chips. Not live Healthcare.gov scrapes. */
  const SEEDS = [
    {
      id: "tx-eligible",
      label: "TX · no APTC · eligible",
      sub: "Teaching · FFM + HealthCare.gov + no APTC",
      state: "TX",
      coverage: "healthcare_gov",
      aptc: "no",
      viewDate: "2026-09-13",
      noteLabel: "TX roommate chat · teaching",
    },
    {
      id: "fl-aptc-out",
      label: "FL · receiving APTC · out",
      sub: "Teaching · premium assistance = out of WH framing",
      state: "FL",
      coverage: "healthcare_gov",
      aptc: "yes",
      viewDate: "2026-09-13",
      noteLabel: "FL APTC teaching seed",
    },
    {
      id: "ca-sbe-out",
      label: "CA · state marketplace · out",
      sub: "Teaching · SBE not in 30 FFM list",
      state: "CA",
      coverage: "state_marketplace",
      aptc: "no",
      viewDate: "2026-09-13",
      noteLabel: "CA Covered California · teaching",
    },
    {
      id: "oh-unsure",
      label: "OH · unsure APTC",
      sub: "Teaching · honest unsure (need APTC clarity)",
      state: "OH",
      coverage: "healthcare_gov",
      aptc: "unsure",
      viewDate: "2026-09-13",
      noteLabel: "OH unsure-APTC teaching seed",
    },
    {
      id: "employer-out",
      label: "TX · employer · out",
      sub: "Teaching · job-based coverage outside Marketplace refund",
      state: "TX",
      coverage: "employer",
      aptc: "no",
      viewDate: "2026-09-13",
      noteLabel: "Employer coverage · teaching",
    },
    {
      id: "oct-start",
      label: "Checks begin · Oct 1",
      sub: "Teaching · October window opens · still criteria-only",
      state: "FL",
      coverage: "healthcare_gov",
      aptc: "no",
      viewDate: "2026-10-01",
      noteLabel: "Oct-start teaching seed",
    },
  ];

  const $ = (id) => document.getElementById(id);

  function parseISODate(s) {
    if (!s || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return null;
    const parts = s.split("-").map(Number);
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    if (
      d.getFullYear() !== parts[0] ||
      d.getMonth() !== parts[1] - 1 ||
      d.getDate() !== parts[2]
    ) {
      return null;
    }
    return d;
  }

  function fmtDate(d) {
    if (!(d instanceof Date) || isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function isoFromDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function todayISO() {
    return isoFromDate(new Date());
  }

  function daysUntilCheckStart(viewDate) {
    const start = parseISODate(CHECK_START_ISO);
    const ms = start.getTime() - viewDate.getTime();
    return Math.round(ms / 86400000);
  }

  function windowSpanDays() {
    const a = parseISODate(ANNOUNCE_ISO);
    const b = parseISODate(CHECK_START_ISO);
    return Math.round((b.getTime() - a.getTime()) / 86400000);
  }

  function clockMeta(daysLeft) {
    if (daysLeft > 0) {
      return {
        phase: "countdown",
        headline: "Checks begin October",
        daysLabel: daysLeft + " days left",
        ringLabel: String(daysLeft),
        pill: daysLeft + " days to Oct start",
        sub: "Public framing: checks begin October 2026",
        cls: daysLeft <= 7 ? "warn" : "ok",
      };
    }
    if (daysLeft === 0) {
      return {
        phase: "today",
        headline: "October check window opens",
        daysLabel: "TODAY · Oct 1",
        ringLabel: "TODAY",
        pill: "Checks begin window",
        sub: "Still fact-sheet literacy — no personal mail date",
        cls: "warn",
      };
    }
    return {
      phase: "after",
      headline: "Inside / past October start",
      daysLabel: "UNDERWAY",
      ringLabel: "OCT",
      pill: "October checks framing",
      sub: "Never invents your mail date · criteria literacy only",
      cls: "unsure",
    };
  }

  /**
   * Eligibility triad from public WH Sep 10 framing.
   * eligible | out | unsure — never invents beyond pasted chips.
   */
  function determineEligibility(state, coverage, aptc) {
    const inFfm = FFM_SET.has(state);
    const stateName = STATE_NAMES[state] || state;

    if (coverage === "employer") {
      return {
        status: "out",
        label: "Not in scope",
        cls: "danger",
        shortReason: "Employer coverage",
        flag: "NOT IN SCOPE · EMPLOYER / JOB-BASED COVERAGE",
        reason:
          stateName +
          " · employer / job-based coverage sits outside the public Marketplace refund framing (WH Sep 10 targets FFM enrollees without premium assistance).",
      };
    }
    if (coverage === "medicaid_medicare") {
      return {
        status: "out",
        label: "Not in scope",
        cls: "danger",
        shortReason: "Medicaid / Medicare",
        flag: "NOT IN SCOPE · MEDICAID / MEDICARE",
        reason:
          "Medicaid / Medicare coverage is outside the public Working Families Obamacare Refunds framing (Marketplace / FFM + no premium assistance).",
      };
    }
    if (coverage === "state_marketplace") {
      return {
        status: "out",
        label: "Not in scope",
        cls: "danger",
        shortReason: "State marketplace (SBE)",
        flag: "NOT IN SCOPE · STATE MARKETPLACE / SBE",
        reason:
          stateName +
          " · state-based exchange / SBE coverage is outside the public 30 federal Marketplace (FFM) state list reported with the Sep 10 announce.",
      };
    }
    if (aptc === "yes") {
      return {
        status: "out",
        label: "Not in scope",
        cls: "danger",
        shortReason: "Receiving APTC",
        flag: "NOT IN SCOPE · RECEIVING APTC / PREMIUM ASSISTANCE",
        reason:
          "Receiving premium assistance (APTC) — WH Sep 10 framing targets people who do not receive premium assistance.",
      };
    }
    if (!inFfm) {
      return {
        status: "out",
        label: "Not in scope",
        cls: "danger",
        shortReason: "Not in 30 FFM states",
        flag: "NOT IN SCOPE · NOT IN THE 30 FFM STATES",
        reason:
          stateName +
          " is not on the public 30 FFM-state list (CNBC Sep 10 / WH fact sheet reporting). Criteria match stops here — we will not invent an alternate path.",
      };
    }
    if (aptc === "unsure" || coverage === "unsure") {
      return {
        status: "unsure",
        label: "Unsure",
        cls: "unsure",
        shortReason:
          aptc === "unsure" && coverage === "unsure"
            ? "APTC + coverage unclear"
            : aptc === "unsure"
              ? "APTC unclear"
              : "Coverage unclear",
        flag: "UNSURE · WILL NOT INVENT A DETERMINATION",
        reason:
          stateName +
          " is on the 30 FFM list, but " +
          (aptc === "unsure" ? "your APTC chip is unsure" : "") +
          (aptc === "unsure" && coverage === "unsure" ? " and " : "") +
          (coverage === "unsure" ? "your coverage source is unsure" : "") +
          ". We will not invent an Eligible / Not-in-scope determination — check your Marketplace account or plan docs, then re-run.",
      };
    }
    if (coverage === "healthcare_gov" && aptc === "no" && inFfm) {
      return {
        status: "eligible",
        label: "Eligible (criteria match)",
        cls: "ok",
        shortReason: "FFM + HealthCare.gov + no APTC",
        flag: "CRITERIA MATCH · NOT A GUARANTEE · NO MAIL DATE",
        reason:
          stateName +
          " is on the public 30 FFM list, coverage chip is HealthCare.gov, and APTC chip is no — that matches WH Sep 10 “federal exchange · no premium assistance” framing for the ~$500/person figure. This is a criteria match only — not a guarantee you are on the administration’s recipient list, and not a mail date.",
      };
    }
    return {
      status: "unsure",
      label: "Unsure",
      cls: "unsure",
      shortReason: "Need clearer chips",
      flag: "UNSURE · WILL NOT INVENT A DETERMINATION",
      reason:
        "Pasted chips do not cleanly match Eligible or Not-in-scope rules. We will not invent a determination.",
    };
  }

  function readInputs() {
    return {
      state: ($("state").value || "").trim().toUpperCase(),
      coverage: $("coverage").value || "unsure",
      aptc: $("aptc").value || "unsure",
      viewDate: ($("viewDate").value || "").trim(),
      noteLabel: ($("noteLabel").value || "").trim(),
    };
  }

  function applyInputs(p) {
    if (p.state) $("state").value = String(p.state).toUpperCase();
    $("coverage").value = p.coverage || "unsure";
    $("aptc").value = p.aptc || "unsure";
    $("viewDate").value = p.viewDate || "";
    $("noteLabel").value = p.noteLabel || "";
  }

  function validate(input) {
    if (!input.state || !STATE_NAMES[input.state]) {
      return "Pick a state of residence — we will not invent one.";
    }
    if (!COVERAGE_LABELS[input.coverage]) {
      return "Pick a coverage source chip.";
    }
    if (!APTC_LABELS[input.aptc]) {
      return "Pick an APTC / premium-assistance chip.";
    }
    const d = parseISODate(input.viewDate);
    if (!d) {
      return "Pick a view date (the day you’re looking) — the October countdown needs it.";
    }
    return null;
  }

  function compute(input) {
    const viewDate = parseISODate(input.viewDate);
    const elig = determineEligibility(input.state, input.coverage, input.aptc);
    const daysLeft = daysUntilCheckStart(viewDate);
    const clock = clockMeta(daysLeft);
    const span = windowSpanDays();
    let pctRing = 0;
    if (clock.phase === "after") {
      pctRing = 0;
    } else if (clock.phase === "today") {
      pctRing = Math.max(2, Math.round((1 / span) * 100));
    } else {
      pctRing = Math.max(2, Math.min(100, Math.round((daysLeft / span) * 100)));
    }

    const inFfm = FFM_SET.has(input.state);
    const stateLabel =
      (STATE_NAMES[input.state] || input.state) + " (" + input.state + ")";
    const coverageLabel = COVERAGE_LABELS[input.coverage] || input.coverage;
    const aptcLabel = APTC_LABELS[input.aptc] || input.aptc;

    const decoder = elig.reason;

    const action =
      "Calm next step: treat this as fact-sheet literacy only. Official Marketplace help: HealthCare.gov. As of Sep 13 2026 no public application / check-tracking portal is cited for this refund. This card does not log into Healthcare.gov, does not file anything, and does not invent a mail date. Not tax, legal, or medical advice.";

    return {
      elig: elig,
      viewDate: viewDate,
      daysLeft: daysLeft,
      clock: clock,
      pctRing: pctRing,
      span: span,
      inFfm: inFfm,
      stateLabel: stateLabel,
      stateCode: input.state,
      coverageLabel: coverageLabel,
      aptcLabel: aptcLabel,
      amount: REFUND_AMOUNT,
      decoder: decoder,
      action: action,
      criteriaStrip:
        "$" +
        REFUND_AMOUNT +
        " · Oct start · FFM + no APTC · fact-sheet criteria only",
      portalStrip:
        "No public application portal as of Sep 13 — fact-sheet criteria only; not tax or enrollment advice. Never invents a mail date.",
    };
  }

  function encodeHash(input) {
    const parts = [
      input.state || "",
      input.coverage || "unsure",
      input.aptc || "unsure",
      input.viewDate || "",
      input.noteLabel || "",
    ];
    const raw = parts.join("|");
    try {
      return "#p=" + btoa(unescape(encodeURIComponent(raw)));
    } catch (e) {
      return "#p=" + encodeURIComponent(raw);
    }
  }

  function decodeHash() {
    const raw = (typeof location !== "undefined" && location.hash) || "";
    if (!raw.startsWith("#p=")) return null;
    try {
      let decoded;
      try {
        decoded = decodeURIComponent(escape(atob(raw.slice(3))));
      } catch (e) {
        decoded = decodeURIComponent(raw.slice(3));
      }
      const parts = decoded.split("|");
      if (parts.length < 1 || !parts[0]) return null;
      return {
        state: parts[0] || "",
        coverage: parts[1] || "unsure",
        aptc: parts[2] || "unsure",
        viewDate: parts[3] || "",
        noteLabel: parts[4] || "",
      };
    } catch (e) {
      return null;
    }
  }

  function populateStates() {
    const sel = $("state");
    sel.innerHTML = "";
    const codes = Object.keys(STATE_NAMES).sort();
    codes.forEach((code) => {
      const opt = document.createElement("option");
      opt.value = code;
      opt.textContent =
        STATE_NAMES[code] +
        " (" +
        code +
        ")" +
        (FFM_SET.has(code) ? " · FFM" : "");
      sel.appendChild(opt);
    });
    sel.value = "TX";
  }

  function renderChips() {
    const box = $("seedChips");
    box.innerHTML = "";
    SEEDS.forEach((s) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "seed-chip";
      btn.setAttribute("role", "listitem");
      btn.innerHTML =
        s.label + '<span class="chip-sub">' + s.sub + "</span>";
      btn.addEventListener("click", () => {
        applyInputs(s);
        $("status").textContent = "Loaded seed: " + s.label;
        renderCard();
      });
      box.appendChild(btn);
    });
  }

  function renderSources() {
    $("sourceLinks").innerHTML =
      'Cites: <a href="' +
      WH_URL +
      '" target="_blank" rel="noopener noreferrer">WH fact sheet (Presidency Project)</a>' +
      '<a href="' +
      CNBC_URL +
      '" target="_blank" rel="noopener noreferrer">CNBC Sep 10 2026</a>' +
      '<a href="' +
      INN_URL +
      '" target="_blank" rel="noopener noreferrer">InsuranceNewsNet / Reuters Sep 10</a>' +
      '<a href="' +
      HC_GOV +
      '" target="_blank" rel="noopener noreferrer">HealthCare.gov</a>';
  }

  function renderCard() {
    const input = readInputs();
    const err = validate(input);
    if (err) {
      $("cardSection").hidden = true;
      $("status").textContent = err;
      return;
    }

    const c = compute(input);
    $("cardSection").hidden = false;
    $("shareBox").hidden = false;
    $("status").textContent = "Card ready — copy, share, or export PNG.";

    const metaBits = [];
    metaBits.push(c.stateLabel);
    metaBits.push(c.coverageLabel);
    metaBits.push(c.aptcLabel);
    if (input.noteLabel) metaBits.push(input.noteLabel);
    $("cardMeta").textContent = metaBits.join(" · ");

    $("eligHeadline").textContent = c.elig.label;
    $("clockPill").textContent = c.clock.pill;
    $("clockPill").className = "verdict-k " + c.clock.cls;
    $("clockSub").textContent = c.clock.sub;

    const statusEl = $("statusDisp");
    statusEl.textContent = c.elig.label;
    statusEl.className = "elig-badge-giant " + c.elig.cls;

    $("amountChip").textContent =
      "$" + c.amount + " / person · public WH figure (not your mail $)";
    $("statusLine").textContent =
      c.elig.shortReason + " · fact-sheet criteria only";

    const flag = $("actionFlag");
    flag.textContent = c.elig.flag;
    flag.className = "look-enroll-flag " + c.elig.cls;

    $("daysRingDisp").textContent = c.clock.ringLabel;
    $("daysRing").style.setProperty("--pct", String(c.pctRing));
    if (clockRingClass(c) === "empty") {
      $("daysRing").className = "fee-ring empty";
    } else if (clockRingClass(c) === "danger") {
      $("daysRing").className = "fee-ring danger";
    } else if (c.elig.status === "eligible") {
      $("daysRing").className = "fee-ring ok";
    } else {
      $("daysRing").className = "fee-ring";
    }

    const ann = $("announceLine");
    if (c.clock.phase === "after") {
      ann.className = "hero-sub";
      ann.textContent =
        "Past " + CHECK_START_LABEL + " · October checks framing (no mail date invented)";
    } else if (c.clock.phase === "today") {
      ann.className = "hero-sub warn";
      ann.textContent = "October start day · still criteria literacy only";
    } else {
      ann.className = "hero-sub";
      ann.textContent =
        c.daysLeft +
        " of ~" +
        c.span +
        " days in the " +
        WINDOW_LABEL +
        " window";
    }

    $("criteriaStrip").textContent = c.criteriaStrip;
    $("portalStrip").textContent = c.portalStrip;

    $("rState").textContent = input.state;
    $("rFfm").textContent = c.inFfm ? "Yes · in 30" : "No · not FFM";
    $("rCoverage").textContent = c.coverageLabel;
    $("rAptc").textContent = c.aptcLabel;

    $("decoderLine").textContent = c.decoder;
    $("actionLine").textContent = c.action;
    $("citeLine").textContent = CITE_ONE_LINER;

    const hash = encodeHash(input);
    if (typeof location !== "undefined" && location.hash !== hash) {
      history.replaceState(null, "", hash);
    }
    $("shareUrl").value =
      (typeof location !== "undefined"
        ? location.href.split("#")[0]
        : "") + hash;
  }

  function clockRingClass(c) {
    if (c.clock.phase === "after") return "empty";
    if (c.clock.phase === "today" || (c.daysLeft > 0 && c.daysLeft <= 7))
      return "danger";
    return "normal";
  }

  function clearAll() {
    $("state").value = "TX";
    $("coverage").value = "healthcare_gov";
    $("aptc").value = "no";
    $("viewDate").value = todayISO();
    $("noteLabel").value = "";
    $("cardSection").hidden = true;
    $("shareBox").hidden = true;
    $("status").textContent = "Cleared.";
    if (typeof history !== "undefined") {
      history.replaceState(null, "", location.pathname + location.search);
    }
  }

  function copySummary() {
    const input = readInputs();
    const err = validate(input);
    if (err) {
      $("status").textContent = err;
      return;
    }
    const c = compute(input);
    const lines = [
      "ACA $500 Refund Eligibility — " + c.elig.label,
      c.stateLabel + " · " + c.coverageLabel + " · " + c.aptcLabel,
      "Public figure: ~$" + c.amount + "/person · checks begin October 2026",
      "October countdown: " + c.clock.daysLabel + " (from " + fmtDate(c.viewDate) + ")",
      "FFM (30): " + (c.inFfm ? "yes" : "no"),
      "",
      c.decoder,
      "",
      c.portalStrip,
      "",
      "Cites: WH Sep 10 fact sheet · CNBC Sep 10 · HealthCare.gov",
      "Not tax, legal, or medical advice. Fact-sheet criteria only — not a guarantee or mail date.",
    ];
    const text = lines.join("\n");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        () => {
          $("status").textContent = "Summary copied.";
        },
        () => {
          $("status").textContent = "Copy failed — select share URL instead.";
        }
      );
    } else {
      $("status").textContent = "Clipboard unavailable — use Share link.";
    }
  }

  function shareLink() {
    const input = readInputs();
    const err = validate(input);
    if (err) {
      $("status").textContent = err;
      return;
    }
    renderCard();
    $("shareBox").hidden = false;
    $("status").textContent = "Share URL ready.";
  }

  function copyShare() {
    const el = $("shareUrl");
    if (!el.value) {
      $("status").textContent = "Generate a card first.";
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(el.value).then(
        () => {
          $("status").textContent = "Share URL copied.";
        },
        () => {
          el.select();
          $("status").textContent = "Select + copy the URL manually.";
        }
      );
    } else {
      el.select();
      $("status").textContent = "Select + copy the URL manually.";
    }
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = String(text || "").split(/\s+/);
    let line = "";
    for (let i = 0; i < words.length; i++) {
      const test = line ? line + " " + words[i] : words[i];
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line, x, y);
        line = words[i];
        y += lineHeight;
      } else {
        line = test;
      }
    }
    if (line) {
      ctx.fillText(line, x, y);
      y += lineHeight;
    }
    return y;
  }

  function exportPng() {
    const input = readInputs();
    const err = validate(input);
    if (err) {
      $("status").textContent = err;
      return;
    }
    const c = compute(input);
    const canvas = $("pngCanvas");
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    ctx.fillStyle = "#0b0f14";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "#121820";
    roundRect(ctx, 40, 40, W - 80, H - 80, 18);
    ctx.fill();

    ctx.fillStyle = "#7eb8e8";
    ctx.font = "700 14px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText("ACA $500 REFUND ELIGIBILITY", 64, 88);

    ctx.fillStyle = "#8b9aab";
    ctx.font = "400 14px IBM Plex Mono, monospace";
    ctx.fillText(
      c.stateLabel + " · " + c.coverageLabel + " · " + c.aptcLabel,
      64,
      114
    );

    const statusColor =
      c.elig.cls === "ok"
        ? "#3ecf8e"
        : c.elig.cls === "danger"
          ? "#f07178"
          : "#f0b429";
    ctx.fillStyle = statusColor;
    ctx.font = "700 42px IBM Plex Mono, monospace";
    let y = 170;
    y = wrapText(ctx, c.elig.label, 64, y, W - 128, 48);

    y += 10;
    ctx.fillStyle = statusColor;
    ctx.font = "700 16px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, c.elig.flag, 64, y, W - 128, 22);

    ctx.fillStyle = "#e8eef4";
    ctx.font = "600 18px IBM Plex Sans, system-ui, sans-serif";
    y += 8;
    ctx.fillText(
      "$" + c.amount + " / person · public WH figure · " + c.clock.pill,
      64,
      y
    );

    y += 36;
    ctx.fillStyle = "#7eb8e8";
    ctx.font = "600 14px IBM Plex Mono, monospace";
    ctx.fillText(c.criteriaStrip, 64, y);

    y += 28;
    ctx.fillStyle = "#f0b429";
    ctx.font = "600 14px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, c.portalStrip, 64, y, W - 128, 20);

    y += 18;
    ctx.fillStyle = "#8b9aab";
    ctx.font = "700 12px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText("STATE", 64, y);
    ctx.fillText("FFM (30)", 280, y);
    ctx.fillText("COVERAGE", 460, y);
    ctx.fillText("APTC", 680, y);
    y += 22;
    ctx.fillStyle = "#e8eef4";
    ctx.font = "600 16px IBM Plex Mono, monospace";
    ctx.fillText(input.state, 64, y);
    ctx.fillText(c.inFfm ? "Yes" : "No", 280, y);
    ctx.fillText(
      c.coverageLabel.length > 18
        ? c.coverageLabel.slice(0, 16) + "…"
        : c.coverageLabel,
      460,
      y
    );
    ctx.fillText(c.aptcLabel, 680, y);

    y += 40;
    ctx.fillStyle = "#f0b429";
    ctx.font = "700 13px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText("WHY THIS RESULT", 64, y);
    y += 24;
    ctx.fillStyle = "#e8eef4";
    ctx.font = "500 15px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, c.decoder, 64, y, W - 128, 22);

    y += 14;
    ctx.fillStyle = "#7eb8e8";
    ctx.font = "700 13px IBM Plex Sans, system-ui, sans-serif";
    ctx.fillText("NEXT STEP (NOT ADVICE)", 64, y);
    y += 24;
    ctx.fillStyle = "#e8eef4";
    ctx.font = "500 15px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(ctx, c.action, 64, y, W - 128, 22);

    y += 16;
    ctx.fillStyle = "#8b9aab";
    ctx.font = "400 12px IBM Plex Sans, system-ui, sans-serif";
    y = wrapText(
      ctx,
      "WH Sep 10 2026 fact sheet + CNBC Sep 10: ~$500/person · 30 FFM states · no premium assistance · checks begin October 2026. User-pasted chips only. Fact-sheet criteria match — not a guarantee, not a mail date. Not tax/legal/medical advice.",
      64,
      y,
      W - 128,
      18
    );

    ctx.fillStyle = "#8b9aab";
    ctx.font = "400 12px IBM Plex Mono, monospace";
    ctx.fillText(
      "Not tax/legal/medical advice · HealthCare.gov · cite WH/CNBC publicly",
      64,
      H - 56
    );

    canvas.toBlob((blob) => {
      if (!blob) {
        $("status").textContent = "PNG export failed.";
        return;
      }
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download =
        "aca-refund-eligibility-" +
        (input.state || "card") +
        "-" +
        (input.viewDate || "card") +
        ".png";
      a.click();
      URL.revokeObjectURL(a.href);
      $("status").textContent = "PNG downloaded.";
    });
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function bind() {
    populateStates();
    if (!$("viewDate").value) $("viewDate").value = todayISO();
    renderChips();
    renderSources();

    $("cardBtn").addEventListener("click", renderCard);
    $("clearBtn").addEventListener("click", clearAll);
    $("copySummary").addEventListener("click", copySummary);
    $("shareBtn").addEventListener("click", shareLink);
    $("copyShare").addEventListener("click", copyShare);
    $("pngBtn").addEventListener("click", exportPng);

    window.addEventListener("hashchange", () => {
      const p = decodeHash();
      if (p) {
        applyInputs(p);
        renderCard();
      }
    });

    const fromHash = decodeHash();
    if (fromHash) {
      applyInputs(fromHash);
      renderCard();
    }
  }

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", bind);
    } else {
      bind();
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      REFUND_AMOUNT: REFUND_AMOUNT,
      CHECK_START_ISO: CHECK_START_ISO,
      FFM_STATES: FFM_STATES,
      FFM_SET: FFM_SET,
      SEEDS: SEEDS,
      parseISODate: parseISODate,
      daysUntilCheckStart: daysUntilCheckStart,
      clockMeta: clockMeta,
      determineEligibility: determineEligibility,
      validate: validate,
      compute: compute,
      STATE_NAMES: STATE_NAMES,
    };
  }
})();
