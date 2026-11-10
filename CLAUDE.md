# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A Playwright demo/showcase project that runs API and UI tests against the public
[Restful-Booker](https://restful-booker.herokuapp.com) sandbox and publishes the results as an
Allure report to GitHub Pages. Requires Node 16+ and Java 8+ (Allure's CLI is a Java app).

**This is a portfolio piece, and two tests are red on purpose.** The published report is meant to
show both green and red examples, so the suite's intended steady state is **9 passed / 2 failed /
0 broken**:

| Deliberately failing | Why |
|---|---|
| `[bk-7] PUT/booking{id} - failed` | re-PUTs the booking `[bk-6]` deleted; expects 200, API returns 405 |
| `Buy Me a Tea And a Cake - failed` (`scenario2`) | clicks the real support banner, then asserts a 404 marker that isn't there |

Both are *correct code with a deliberately wrong expectation*. **Do not "fix" either assertion.**
By convention a deliberately failing test carries a **` - failed`** suffix in its title; use it
for any new one, so a red entry in the report is self-identifying.
Everything else must be green — a crash, a stale selector or a timeout is a real bug, and `broken`
must stay at 0. That distinction is the whole contract here: red is fine, *broken* is not.

## Commands

```sh
npm install && npx playwright install   # setup

npm run api_test     # API suite only (project Booking_API)
npm run ui_test      # UI suite only  (project Booking_UI)

npm run allure_results   # allure generate allure-results -o allure-report --clean
npm run allure_report    # allure open allure-report
```

Run a single test by title (Playwright `-g`), always from the repo root:

```sh
npx playwright test api_test/api_tests.spec.js --project=Booking_API -g "bk-2"
npx playwright test ui_tests/ui_tests.spec.js --project=Booking_UI -g "Web site" --headed
```

Two npm scripts chain with `||`, not `&&`, so the second half only runs when the first *fails*:
`npm test` runs the UI suite only if the API suite fails, and `npm run allure` opens the report
only if generation fails. Prefer the individual scripts above.

The `--project` flag is required: both projects are Desktop Chrome and differ only in name, and the
`projects` array has no `testMatch`, so omitting it runs every spec twice.

## Architecture

- `playwright.config.js` — one shared `use` block for both projects: `baseURL` is the Restful-Booker
  host (API *and* UI tests target it), `screenshot: "on"` and `video: "on"` are always captured so the
  Allure report can embed UI recordings, and `extraHTTPHeaders` carries a hardcoded `Cookie` token.
  `workers: 1` everywhere, despite `fullyParallel: true`.
- `tests/api_test/api_tests.spec.js` — one flat spec with **module-level shared state**: `id` (booking
  id from `[bk-3]`) and `headers` (auth token from `[bk-2]`). Tests `bk-3`…`bk-7` therefore depend on
  earlier tests in file order and only pass because `workers: 1` keeps them sequential. Do not add
  `test.describe.configure({ mode: 'parallel' })` or raise the worker count without reworking this
  into fixtures. `[bk-7] PUT/booking{id} - failed` is **intentionally failing** — it re-PUTs the booking
  deleted by `[bk-6]` to produce the red-report screenshots in the README; don't "fix" it.
- `tests/ui_tests/` — `ui_tests.spec.js` holds only `test.step` orchestration; each test instantiates
  one page-object class from `pageObject/scenarioN.js`. `scenario2`/`3`/`4` use **attribute
  selectors** (`a[alt="API Code"]`, `a[href$="/books/"]`, …); `scenario1` still uses absolute XPath
  but passes, so it has been left alone. Every UI test drives third-party pages — Restful-Booker,
  `mwtestconsultancy.co.uk` (a Ghost blog) and GitHub's repo DOM — all of which have already been
  restructured once and broke the original absolute XPaths. So when a *green* UI test goes red,
  suspect upstream markup first: re-probe the live page before rewriting the test. Prefer attribute
  or text selectors over positional paths. Playwright is now **1.65.0**, so `getByRole` and the
  other `getBy*` engines are available — the existing attribute selectors predate the upgrade and
  could be moved to roles when next touched.
- `scenario2` is popup-aware: the support banner is `target="_blank"`, so it captures the second tab
  with `context.waitForEvent('page')` and asserts against that document, not `page`.
- `tests/prod.yml` — all API request bodies and credentials, loaded via `js-yaml` with the **relative
  path `tests/prod.yml`**, so tests must be invoked from the repo root or they throw ENOENT.
- **Allure 3 API**: import `link`/`label` from **`allure-js-commons`**, not from the `allure` object
  that `allure-playwright` re-exports. That object is a legacy compat shim whose `link()` takes
  `(type, url, name)` — passing it `(url, name)` silently files the URL under the link's `type` and
  produces a broken link in the report, with no error. The reporter also adds `language` and
  `framework` labels on its own, so don't set those by hand or they appear twice.

## CI

`.github/workflows/main.yml` runs on every push: both suites with `continue-on-error: true` and
`if: always()`, then merges `allure-results` with the history kept on the `gh-pages` branch and
redeploys the report there. Test failures are expected not to fail the workflow — that's deliberate,
since the suite always contains one failing test.
