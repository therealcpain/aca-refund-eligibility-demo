# ACA $500 Refund Eligibility

**Paste your state + coverage source + premium tax credit (APTC) chip + the date you’re looking → one shareable card:**  
giant **Eligible / Not in scope / Unsure** badge · **$500 · Oct start · FFM + no APTC** strip · **days-to-October** countdown · calm **“no application portal yet — fact-sheet literacy only”** footer + HealthCare.gov pointer.

Brand on the surface: **ACA $500 Refund Eligibility** only.

Not a Healthcare.gov Plan Compare clone. Not a payment tracker. Not a subsidy calculator. **Not tax, legal, or medical advice.** Eligibility here is a **criteria match** from public WH Sep 10 framing + your pasted chips — **never invents** a determination beyond that triad and **never invents a mail date**.

## Hypothesis

After the Sep 10 Working Families Obamacare Refunds announce, full-price Marketplace shoppers in FFM states ask “am I getting the $500?” while SBE residents and APTC enrollees share conflicting screenshots — and no CMS eligibility checker is published yet. Flip that fog into a **criteria-honest share card** (state + APTC → in-scope / out / unsure + October start clock) without inventing checks or scraping Healthcare.gov. Success = family/group-chat shares through first October checks.

## How to test (local)

```bash
cd kb/mde/aca-refund-eligibility
npm run build          # copies assets → dist/
npm run verify         # FFM + APTC triad + countdown + seed checks
# either open the file:
open index.html        # or dist/index.html
# or serve:
npm start              # http://localhost:4242
```

Manual checklist:

1. Open the page → click **TX · no APTC · eligible** → **Eligible (criteria match)** · FFM Yes · $500 strip · **18 days** to Oct start (from Sep 13) · portal strip · WH/CNBC footer.
2. Click **FL · receiving APTC · out** → **Not in scope** (premium assistance).
3. Click **CA · state marketplace · out** → **Not in scope** (SBE / not in 30 FFM).
4. Click **OH · unsure APTC** → **Unsure** (honest — will not invent).
5. Click **TX · employer · out** → **Not in scope**.
6. Click **Checks begin · Oct 1** → TODAY badge · still criteria-only (no mail date).
7. Missing state or view date → honest status (no invented chips / days).
8. **Copy summary** → clipboard has triad + countdown + cites + disclaimer.
9. **Share link** → `#p=` restores the card.
10. **Export PNG** → dark card with status text + October badge + **portal / fact-sheet** text on the face (not color-only).
11. Surface brand is **ACA $500 Refund Eligibility** only (no Conglomerate / personal names).

### GitHub Pages

This folder is static-ready. Point Pages at `/` of a dedicated repo (or `/docs` after copying `dist/`), with `index.html` at the site root. Relative paths (`styles.css`, `app.js`) work on project pages.

```bash
npm run build   # optional artifact in dist/
```

Do **not** create the public repo or post from this build step — Steward handles Pages + distro. Distro stays product-linked only (e.g. r/HealthInsurance, r/personalfinance, FFM-state Discords Sep 15–Oct 31). **No sock accounts.** No fake check-tracking DMs. No partisan campaign creatives.

## Seed cohort (MVP)

Labeled teaching chips — not live Healthcare.gov scrapes. Never invent a user’s refund beyond the public $500 figure.

| Chip | View date | Teaching point |
|------|-----------|----------------|
| TX · no APTC · eligible | 2026-09-13 | FFM + HealthCare.gov + no APTC criteria match |
| FL · receiving APTC · out | 2026-09-13 | Premium assistance = out of WH framing |
| CA · state marketplace · out | 2026-09-13 | SBE not in 30 FFM list |
| OH · unsure APTC | 2026-09-13 | Honest unsure — will not invent |
| TX · employer · out | 2026-09-13 | Job-based coverage outside Marketplace refund |
| Checks begin · Oct 1 | 2026-10-01 | October window · still criteria-only |

## Eligibility logic (public WH / CNBC framing)

| Rule | Framing |
|------|---------|
| Amount | **~$500 per person** — WH Sep 10 fact sheet / CNBC. Public figure only; never invent personal $ or mail date. |
| States | **30 FFM** (AL AK AZ AR DE FL HI IN IA KS LA MI MS MO MT NE NH NC ND OH OK OR SC SD TN TX UT WV WI WY) — CNBC Sep 10 list. |
| APTC gate | **No premium assistance** — receiving APTC → Not in scope. |
| Coverage | HealthCare.gov (FFM) in-path; state marketplace / employer / Medicaid-Medicare → Not in scope; unsure → Unsure (if not already out). |
| Eligible | state ∈ 30 **and** coverage = HealthCare.gov **and** APTC = no. |
| October clock | Days from view date to **Oct 1 2026** (checks begin October). TODAY / UNDERWAY on/after — never a personal mail date. |
| Portal | **No public application portal** cited as of Sep 13 — strip on card + PNG. |
| Pointers | HealthCare.gov + WH fact sheet + CNBC — literacy only |

## Ads pathway (ad-only free utility — do not spend yet)

| Path | Notes |
|------|--------|
| **Revenue (primary)** | **AdSense / display under the card + “who is eligible for the $500 ACA refund?” explainer** (not inside the PNG). Inventory spikes Sep 12–Oct 31. Justified when sessions cover hosting. Free card forever — **no paywall**, no Gumroad. |
| **Brand-safe** | Informational eligibility literacy from public WH / CNBC cites. **Not** guaranteeing a check or mail date. Ads **not** inside PNG. **Hard avoid** Marketplace broker / lead-gen affiliates and partisan PACs. HealthCare.gov + official fact-sheet pointers only. |
| **Sponsorship (later)** | Optional nonprofit consumer-health literacy sponsorship only if brand-safe. |
| **Acquisition (gated)** | Google “$500 Obamacare refund eligibility” / “Healthcare.gov refund October 2026” + Reddit promo after Sep 10. Creative = “Paste your state + subsidy status — in scope for the $500?”. Max CPA abort ~$0.30–0.50 without a completed share. Debit/cash only. **Spend only after one organic HealthInsurance-thread test.** |
| **UTM** | Example: `?utm_source=reddit&utm_medium=organic&utm_campaign=aca_refund_eligibility_mvp` |
| **Tracking** | Card gens + share clicks (GoatCounter path when Pages is live). |
| **Abort sketch** | Pause paid if CPA exceeds band without share / criteria-literacy replies. |

**No spend from this ready_for_pages step.** Ads are the monetization path (**ad-only OK**).

## Product constraints

- Single static site (no backend).
- **Chips only from user paste** (or labeled seeds). Never invent eligibility beyond FFM + APTC + coverage triad. Never invent mail dates or personal refund $.
- Brand: **ACA $500 Refund Eligibility** only on surface.
- Eligible / Not in scope / Unsure **text** on card + share PNG (not color-only). Portal / fact-sheet disclaimer always visible.
- Share = URL hash + PNG + copy summary.
- No Healthcare.gov login / scrape. No broker / lead-gen funnel. No sock “IRS stimulus scam” farms. No partisan campaign creatives on share artifact.

## Files

| Path | Role |
|------|------|
| `index.html` | App shell (GitHub Pages entry) |
| `app.js` | FFM + APTC triad, October countdown, seeds, card, share hash, PNG |
| `styles.css` | ACA $500 Refund Eligibility UI |
| `scripts/build.js` | `npm run build` → `dist/` |
| `scripts/verify.js` | `npm run verify` — triad + countdown checks |
| `package.json` | build / start / preview / verify scripts |

## Opportunity

Internal card: `opp_health_aca_refund_eligibility` (health / Marketplace).  
Experiment stub: `institutions/mde/experiments/exp_aca_refund_eligibility.md`.
