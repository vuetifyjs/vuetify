---
layout: blog
meta:
  title: July 2026 Update
  description: July closed the Vuetify 3 line with v3.13.0 entering long-term support, shipped Vuetify0 1.0, and kept the v4.1 patch cadence running with five releases
  keywords: Vuetify July 2026, Vuetify 3.13 LTS, Vuetify0 1.0, Vuetify 4.1, Vuetify CLI, pkg-diff
---

<script setup>
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  const zerologo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vzero-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const vuetifylogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vuetify-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const mcplogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vmcp-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const releasesimg = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/blog/july-2026-update/releases-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const v0img = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/blog/july-2026-update/v0-releases-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

# July 2026 Update

Welcome to the July 2026 Vuetify update! This month closes out two long-running efforts at once — **Vuetify0 1.0** shipped stable on July 22 after 214 merged pull requests, and **v3.13.0** landed five days later as the final Vuetify 3 minor, moving the v3 line into [long-term support](/introduction/long-term-support/) through July 27th, 2027. Underneath both, the v4.1 patch line kept its weekly cadence with five releases.

![Hero image for July update](https://cdn.vuetifyjs.com/docs/images/blog/july-2026-update/july-hero.png "July hero image"){ height=112 }

🖊️ John Leider • 📅 August 7th, 2026

<PromotedEntry />

---

## Stable ground

**386 commits** across 11 active repositories and **264 merged PRs**, with two releases doing most of the work. v3.13.0 is the last minor Vuetify 3 will get — from here the line takes critical bug fixes and security patches only, for twelve months. Vuetify0 1.0 gives the framework's logic layer a semver-locked surface for the first time, which is what the theme, locale, and date migrations have been waiting on.

The numbers lean hard toward v0: 214 of the month's merged PRs landed in [vuetifyjs/0](https://github.com/vuetifyjs/0), where our team spent the month hardening the surface ahead of the release rather than adding to it. The framework side was quieter — 34 merged PRs, no labs promotions, no new components — but shipped nine releases across the v4 and v3 lines, and the accessibility pass across v0 accounted for a large share of the rest. We're grateful to everyone in the community who filed a fix this month.

| Metric                  | Count                                             |
|-------------------------|---------------------------------------------------|
| Total Commits           | 386                                               |
| Total PRs Merged        | 264                                               |
| Active Repositories     | 11                                                |
| Vuetify Releases        | 9 (v4.1.3 → v4.1.7, v3.12.9 → v3.13.0)            |
| Components Promoted     | 0 (framework) · 13 (Vuetify0 stable spine)        |
| Vuetify0 Releases       | 11 tags, including **v1.0.0**                     |

Counts cover July 1–31, 2026 (America/Chicago), by commit date and merge date. Cherry-picks and back-ports between the `master`, `dev`, and `v3-stable` branches are counted once, not once per branch.

---

## Table of Contents

* [Releases](#releases)
  * [Key Improvements](#key-improvements)
* [Vuetify 3 Enters LTS](#vuetify-3-lts)
* [Vuetify0 1.0](#vuetify0-1-0)
* [Framework Updates](#framework-updates)
  * [New Features](#new-features)
  * [Bug Fixes](#bug-fixes)
  * [In Development](#in-development)
* [Tooling Updates](#ecosystem-tooling)
* [July 2026 Changelog](#july-2026-changelog)
* [What's Next](#whats-next)

---

## Releases

**Nine framework releases** shipped in July across two lines. The v4 line ran weekly patches — [v4.1.3](/getting-started/release-notes/?version=v4.1.3) (July 2), [v4.1.4](/getting-started/release-notes/?version=v4.1.4) (July 7), [v4.1.5](/getting-started/release-notes/?version=v4.1.5) (July 13), [v4.1.6](/getting-started/release-notes/?version=v4.1.6) (July 23), and [v4.1.7](/getting-started/release-notes/?version=v4.1.7) (July 30), The v3 line took three patches and then [v3.13.0](/getting-started/release-notes/?version=v3.13.0) on July 27.

<AppFigure :src="releasesimg" alt="July Releases Banner" title="July Releases Banner" />

### Key Improvements

* **[Vuetify 3.13](/getting-started/release-notes/?version=v3.13.0)** — the final v3 minor; the line now sits in [LTS](/introduction/long-term-support/) until July 27th, 2027
* **[VSelect / VAutocomplete / VCombobox](/components/selects/)** — new events for multi-selection in v3.13.0, plus a run of focus and native-form-submission fixes ([#23038](https://github.com/vuetifyjs/vuetify/pull/23038), [#23022](https://github.com/vuetifyjs/vuetify/pull/23022), [#23029](https://github.com/vuetifyjs/vuetify/pull/23029))
* **[VSkeletonLoader](/components/skeleton-loaders/)** — a new `types` prop, a `chip-group` type, and `table-cell` reintroduced ([#23037](https://github.com/vuetifyjs/vuetify/pull/23037))
* **[VBtnGroup](/components/button-groups/)** — a `size` prop matching standalone buttons ([`eada595`](https://github.com/vuetifyjs/vuetify/commit/eada595))
* **Shadow DOM** — keyboard navigation and focus resolution work inside an open shadow root ([#23024](https://github.com/vuetifyjs/vuetify/pull/23024), [#23027](https://github.com/vuetifyjs/vuetify/pull/23027))
* **Defaults** — nested root defaults survive a teleport reset, and parent config no longer leaks into menu and dialog content ([#23015](https://github.com/vuetifyjs/vuetify/pull/23015), [#23016](https://github.com/vuetifyjs/vuetify/pull/23016))

View the complete list of changes in the [Full Changelog](#july-2026-changelog).

**Details:**

* [v4.1.7](/getting-started/release-notes/?version=v4.1.7) · [v4.1.6](/getting-started/release-notes/?version=v4.1.6) · [v4.1.5](/getting-started/release-notes/?version=v4.1.5) · [v4.1.4](/getting-started/release-notes/?version=v4.1.4) · [v4.1.3](/getting-started/release-notes/?version=v4.1.3)
* [v3.13.0](/getting-started/release-notes/?version=v3.13.0) · [v3.12.11](/getting-started/release-notes/?version=v3.12.11) · [v3.12.10](/getting-started/release-notes/?version=v3.12.10) · [v3.12.9](/getting-started/release-notes/?version=v3.12.9)

---

## Vuetify 3 Enters LTS { #vuetify-3-lts }

<AppFigure :src="vuetifylogo" alt="Vuetify logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Logo" />

<br>

Vuetify 3 shipped on November 1st, 2022. Nearly four years and thirteen minors later, **[v3.13.0](/getting-started/release-notes/?version=v3.13.0) is the last one**. As of July 27th, 2026 the v3 line is in [long-term support](/introduction/long-term-support/) and will receive critical bug fixes and security patches — and nothing else — until **July 27th, 2027**.

**The LTS window is twelve months, not eighteen.** The previous policy gave the outgoing major 18 months. That is now 12, and the [long-term support page](/introduction/long-term-support/) and [release cycle](/introduction/why-vuetify/) docs have been updated to match. Check your migration plan against the new number.

**v3.13.0 also carries features.** It is the only place July's four new ones shipped — on the v4 line the same commits sit on `dev`, queued for [v4.2.0](https://github.com/vuetifyjs/vuetify/milestone/90) in September. They arrive alongside accessibility work back-ported from May:

* **[VSelect / VAutocomplete / VCombobox](/components/selects/)** — new events for multi-selection ([#23038](https://github.com/vuetifyjs/vuetify/pull/23038))
* **[VDataTable](/components/data-tables/basics/)** — a community-contributed `mobile.header` slot ([#21429](https://github.com/vuetifyjs/vuetify/pull/21429)), plus `aria-sort` on sortable headers and `aria-label`s on selection controls
* **[VSkeletonLoader](/components/skeleton-loaders/)** — the `types` prop, `chip-group`, and `table-cell`
* **[VBtnGroup](/components/button-groups/)** — the `size` prop

The v3 documentation stays at [v3.vuetifyjs.com](https://v3.vuetifyjs.com/), and the docs site trimmed its outdated cross-version content in the process ([`e3fb29d`](https://github.com/vuetifyjs/vuetify/commit/e3fb29d)). If you are still on v3, start with the [upgrade guide](/getting-started/upgrade-guide/). You have a year.

**Details:**

* [Long-term support](/introduction/long-term-support/)
* [Roadmap](/introduction/roadmap/)
* [v3.13.0 Release Notes](/getting-started/release-notes/?version=v3.13.0)

---

## Vuetify0 1.0 { #vuetify0-1-0 }

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

<br>

[Vuetify0 shipped 1.0](/blog/announcing-vuetify0-v1/) on **July 22nd**. The package is now plain `@vuetify/v0` — no `beta`, no `rc`, no tag required. The announcement post has the full surface; this is how July got there.

<AppFigure :src="v0img" alt="Vuetify0 1.0" title="Vuetify0 1.0" />

The month opened with the release candidate. [v1.0.0-rc.6](https://github.com/vuetifyjs/0/releases) landed July 2 alongside the promotion of **ten composables from preview to stable** — `createModel`, `createSelection`, `createSingle`, `createStep`, `createGroup`, `createNested`, `createRegistry`, `useTheme`, `useStorage`, and `useBreakpoints` ([#470](https://github.com/vuetifyjs/0/pull/470)). Three more RCs followed, and on July 20 the **1.0 component spine** — thirteen components: `Atom`, `AspectRatio`, `Theme`, `Group`, `Selection`, `Single`, `Step`, `Tabs`, `Toggle`, `Collapsible`, `Checkbox`, `Radio`, and `Switch` — was promoted to stable in one pass ([#655](https://github.com/vuetifyjs/0/pull/655)), taking the stable component count from zero to thirteen. Two days later, 1.0.0.

**No new composables or components shipped in July.** The API had been frozen since the June beta, so the month went into hardening what already existed — accessibility, performance, and correctness.

### Accessibility

We've added an [axe-core](https://github.com/dequelabs/axe-core) sweep that now runs against every component ([#736](https://github.com/vuetifyjs/0/pull/736)). The fixes that preceded it:

* **Avatar, Scrim, Popover, Tooltip, Select, Toggle** — restored dropped alt text and completed missing ARIA wiring ([#618](https://github.com/vuetifyjs/0/pull/618))
* **Switch, Form, Slider** — correct ARIA states for mixed, native-validation, and grouped controls ([#619](https://github.com/vuetifyjs/0/pull/619))
* **Carousel** — autoplay pauses on keyboard focus, satisfying WCAG 2.2.2 ([#625](https://github.com/vuetifyjs/0/pull/625))
* **Snackbar** — an `urgent` prop that switches the live region to `role="alert"` ([#624](https://github.com/vuetifyjs/0/pull/624))
* **Breadcrumbs** — collapsed-item count and `aria-expanded` on the expander ([#634](https://github.com/vuetifyjs/0/pull/634))
* **Button, Toggle, Pagination** — Enter/Space activation on non-native `as` elements ([#645](https://github.com/vuetifyjs/0/pull/645))
* **Treeview** — `aria-current` on the active item ([#626](https://github.com/vuetifyjs/0/pull/626)); **Splitter** — a localized handle label ([#627](https://github.com/vuetifyjs/0/pull/627))

### Performance

`createRegistry` sits underneath most of v0, so it got the attention. Reactive `keys`/`values`/`entries` are memoized behind a version signal ([#540](https://github.com/vuetifyjs/0/pull/540)), field-only upserts skip version notification ([#542](https://github.com/vuetifyjs/0/pull/542)), and the hot paths dropped `indexOf` and a `values()` copy ([#531](https://github.com/vuetifyjs/0/pull/531)). `createDataGrid` skips the row reorder on sort when no manual order is in effect ([#555](https://github.com/vuetifyjs/0/pull/555)), and baseline benchmarks landed on `createGroup`, `createSingle`, and `createStep` so future regressions show up ([#604](https://github.com/vuetifyjs/0/pull/604)), alongside a bundle-size gate on the key exports ([#605](https://github.com/vuetifyjs/0/pull/605)) and an SSR hydration smoke-test harness ([#607](https://github.com/vuetifyjs/0/pull/607)).

### Correctness

Four fixes to know about if you were running an RC:

* `useResizeObserver` was silently ignoring border-box measurements ([#725](https://github.com/vuetifyjs/0/pull/725))
* `isArray` and `isObject` now narrow correctly against element types, tuples, and `readonly` ([#745](https://github.com/vuetifyjs/0/pull/745), [#746](https://github.com/vuetifyjs/0/pull/746))
* `useStack` leaked its singleton across SSR requests ([#569](https://github.com/vuetifyjs/0/pull/569))
* A security review produced a guard sweep against prototype pollution and CSS injection ([#489](https://github.com/vuetifyjs/0/pull/489))

Two structural changes landed alongside. **`@vuetify/paper` came out of the publish path** ([#671](https://github.com/vuetifyjs/0/pull/671)) and out of the consumer-facing docs ([#672](https://github.com/vuetifyjs/0/pull/672)). And the release pipeline now blocks prereleases from claiming the `latest` dist-tag ([#665](https://github.com/vuetifyjs/0/pull/665)) and makes publishes idempotent ([#696](https://github.com/vuetifyjs/0/pull/696)) — both fallout from the tagging problems earlier in the year.

Two patches followed: **v1.0.1** (July 24) and **v1.0.2** (July 29).

::: success

**Adopting Vuetify0 for your business?** Teams building production design systems, internal tooling, or product UI on top of v0 can [reach out](mailto:john@vuetifyjs.com) to talk through adoption, partnership, and roadmap input.

:::

**Details:**

* [Announcing Vuetify0 1.0](/blog/announcing-vuetify0-v1/)
* [Vuetify0 Documentation](https://0.vuetifyjs.com/)
* [v0play](https://v0play.vuetifyjs.com)

---

## Framework Updates

<AppFigure :src="vuetifylogo" alt="Vuetify logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Logo" />

<br>

Nothing was promoted out of labs in July and no new components were added — the last promotions were the seven that landed in May. Our team spent the month on correctness instead, concentrated in three areas: **Shadow DOM**, **defaults inheritance**, and the **select family**.

### New Features

Four features landed on July 27, and all of them **shipped in v3.13.0, not on the v4 line**. On v4 the same commits are merged to `dev` and arrive with [v4.2.0](https://github.com/vuetifyjs/vuetify/milestone/90):

* **[VSelect / VAutocomplete / VCombobox](/components/selects/)** — new events for multi-selection ([#23038](https://github.com/vuetifyjs/vuetify/pull/23038))
* **[VSkeletonLoader](/components/skeleton-loaders/)** — a `types` prop, and `table-cell` reintroduced ([#23037](https://github.com/vuetifyjs/vuetify/pull/23037)); separately, a `chip-group` type ([`06cbc10`](https://github.com/vuetifyjs/vuetify/commit/06cbc10))
* **[VBtnGroup](/components/button-groups/)** — a `size` prop aligned with standalone buttons ([`9b46baa`](https://github.com/vuetifyjs/vuetify/commit/9b46baa))

### Bug Fixes

**Shadow DOM.** Components mounted inside an open shadow root resolved focus against the wrong root, breaking keyboard navigation in lists and stealing focus in dialogs. Three fixes closed it ([#23024](https://github.com/vuetifyjs/vuetify/pull/23024), [#23027](https://github.com/vuetifyjs/vuetify/pull/23027), [`8908e7e`](https://github.com/vuetifyjs/vuetify/commit/8908e7e)).

**Defaults.** Two leaks. Parent component config bled into teleported menu and dialog content ([#23016](https://github.com/vuetifyjs/vuetify/pull/23016)), and nested root defaults were dropped by the teleport reset ([#23015](https://github.com/vuetifyjs/vuetify/pull/23015)). Either one gives you a component that styles correctly in isolation and wrongly in place.

**The select family.** Focus behavior, native form submission, and list reliability all got passes. Most of these were long-standing reports rather than v4.1 regressions.

| Component                          | Fix                                                       | Version | PR / commit                                                        |
|------------------------------------|-----------------------------------------------------------|---------|---------------------------------------------------------------------|
| **locale**                         | Correctly resolve Kurdish locale to RTL                    | v4.1.3  | [`4782312`](https://github.com/vuetifyjs/vuetify/commit/4782312)   |
| **VBtn**                           | No letter-spacing for RTL locales                          | v4.2.0  | [`3956c08`](https://github.com/vuetifyjs/vuetify/commit/3956c08)   |
| **VOtpInput**                      | Move focus correctly in RTL mode                           | v4.1.3  | [`f0145aa`](https://github.com/vuetifyjs/vuetify/commit/f0145aa)   |
| **VSelect/VAutocomplete/VCombobox**| Respect `no-auto-scroll`                                   | v4.1.3  | [`adb2597`](https://github.com/vuetifyjs/vuetify/commit/adb2597)   |
| **VDataTable**                     | Apply `text-align` to columns with align `start`           | v4.1.3  | [`02f5f81`](https://github.com/vuetifyjs/vuetify/commit/02f5f81)   |
| **VDateInput**                     | Do not fill range on blur                                  | v4.1.4  | [`b7569fe`](https://github.com/vuetifyjs/vuetify/commit/b7569fe)   |
| **rounded**                        | Translate `2xl`, `3xl`, etc. to classes                    | v4.1.3  | [`0ea03f4`](https://github.com/vuetifyjs/vuetify/commit/0ea03f4)   |
| **VDateInput**                     | Derive display format from the date adapter locale         | v4.1.3  | [#22976](https://github.com/vuetifyjs/vuetify/pull/22976)          |
| **theme**                          | `provideTheme` current should use `computedThemes`         | v4.1.4  | [#22987](https://github.com/vuetifyjs/vuetify/pull/22987)          |
| **VMenu**                          | Correct close cascade for nested menus                     | v4.1.4  | [`5902e09`](https://github.com/vuetifyjs/vuetify/commit/5902e09)   |
| **VMenu**                          | Correct click-outside detection when content resizes       | v4.1.4  | [`007f546`](https://github.com/vuetifyjs/vuetify/commit/007f546)   |
| **VNumberInput**                   | Accept a non-ASCII minus sign                              | v4.1.4  | [`6063d7a`](https://github.com/vuetifyjs/vuetify/commit/6063d7a)   |
| **VNumberInput**                   | Keep all decimals when `precision` is null                 | v4.1.4  | [`87b0e57`](https://github.com/vuetifyjs/vuetify/commit/87b0e57)   |
| **date**                           | Correct locale on `StringDateAdapter`                      | v4.1.4  | [`83ed8d4`](https://github.com/vuetifyjs/vuetify/commit/83ed8d4)   |
| **VOverlay**                       | Skip click-outside DOM scan for inactive overlays          | v4.1.5  | [`74e297f`](https://github.com/vuetifyjs/vuetify/commit/74e297f)   |
| **VTreeview**                      | More aria attributes and correct keyboard navigation       | v4.2.0  | [#22903](https://github.com/vuetifyjs/vuetify/pull/22903)          |
| **VDataTable**                     | Hide empty header cell in mobile view                      | v4.1.5  | [`a759055`](https://github.com/vuetifyjs/vuetify/commit/a759055)   |
| **VCalendar**                      | Prevent next-day hours when customizing intervals          | v4.1.5  | [`4e36892`](https://github.com/vuetifyjs/vuetify/commit/4e36892)   |
| **VSwitch**                        | Resolve inset thumb scale ratios in Sass                   | v4.1.5  | [`86fcfaa`](https://github.com/vuetifyjs/vuetify/commit/86fcfaa)   |
| **types**                          | Preserve `RouteLocationRaw` in emitted declarations        | v4.1.5  | [`d4d7b4b`](https://github.com/vuetifyjs/vuetify/commit/d4d7b4b)   |
| **VMaskInput**                     | Preserve value when pasting over a selection               | v4.1.5  | [#23003](https://github.com/vuetifyjs/vuetify/pull/23003)          |
| **VImg**                           | Handle image ref deferred by a Nuxt page transition        | v4.1.6  | [`0f72baf`](https://github.com/vuetifyjs/vuetify/commit/0f72baf)   |
| **VList**                          | Keyboard navigation inside an open Shadow DOM              | v4.1.6  | [#23024](https://github.com/vuetifyjs/vuetify/pull/23024)          |
| **VDialog/VField**                 | Correct focus resolution in Shadow DOM                     | v4.1.6  | [#23027](https://github.com/vuetifyjs/vuetify/pull/23027)          |
| **VDialog**                        | Defer auto-focus until the inner field is focusable        | v4.1.6  | [`8908e7e`](https://github.com/vuetifyjs/vuetify/commit/8908e7e)   |
| **VSelect**                        | Only focus the first item when opened with the keyboard    | v4.1.6  | [`4bb9151`](https://github.com/vuetifyjs/vuetify/commit/4bb9151)   |
| **VSelect**                        | Release focus on the first click outside                   | v4.1.6  | [`ff966d2`](https://github.com/vuetifyjs/vuetify/commit/ff966d2)   |
| **defaults**                       | Keep nested root defaults through teleport reset           | v4.1.6  | [#23015](https://github.com/vuetifyjs/vuetify/pull/23015)          |
| **VDataTableVirtual**              | Avoid scroll glitches with expanded rows                   | v4.1.6  | [#23014](https://github.com/vuetifyjs/vuetify/pull/23014)          |
| **VVirtualScroll**                 | Trim leading items when appending to the bottom            | v4.1.6  | [`1ac7cb7`](https://github.com/vuetifyjs/vuetify/commit/1ac7cb7)   |
| **VVirtualScroll**                 | Call `calculateVisibleItems` after `updateOffsets`         | v4.1.6  | [#22938](https://github.com/vuetifyjs/vuetify/pull/22938)          |
| **VOverlay**                       | Handle `transition` prop correctly for target assignment   | v4.1.6  | [#22190](https://github.com/vuetifyjs/vuetify/pull/22190)          |
| **defaults**                       | Avoid parent config leaking into menu and dialog content   | v4.2.0  | [#23016](https://github.com/vuetifyjs/vuetify/pull/23016)          |
| **VStepperWindow/VTouch**          | Only remove touch handlers when not null                   | v4.1.7  | [#23030](https://github.com/vuetifyjs/vuetify/pull/23030)          |
| **VStepperVerticalItem**           | Unnecessary error color on step content                    | v4.1.7  | [`fce4eaa`](https://github.com/vuetifyjs/vuetify/commit/fce4eaa)   |
| **v-touch**                        | React to binding value changes                             | v4.2.0  | [`937a471`](https://github.com/vuetifyjs/vuetify/commit/937a471)   |
| **v-tooltip**                      | Correctly handle `true` and `undefined`                    | v4.2.0  | [`cef88bf`](https://github.com/vuetifyjs/vuetify/commit/cef88bf)   |
| **VAutocomplete/VCombobox**        | Camelize item props for prepend icon and avatar            | v4.1.7  | [`8a20623`](https://github.com/vuetifyjs/vuetify/commit/8a20623)   |
| **elevation**                      | `hover-elevation` should not require `elevation`           | v4.1.7  | [`378f593`](https://github.com/vuetifyjs/vuetify/commit/378f593)   |
| **VProgressLinear/VIconBtn**       | Avoid Vite v8 dropping transition timing                   | v4.1.7  | [`f23af8a`](https://github.com/vuetifyjs/vuetify/commit/f23af8a)   |
| **VTextField**                     | Respect `hide-details="auto"` with a counter               | v4.1.7  | [#22620](https://github.com/vuetifyjs/vuetify/pull/22620)          |

Rows marked **v4.2.0** are merged to `dev` and had not shipped on the v4 line by the end of July. One further fix — `VNumberInput` stripping the grouping separator before parsing ([`94e94a9`](https://github.com/vuetifyjs/vuetify/commit/94e94a9)) — landed on July 31 but had not been released when the month closed.

### In Development

The [v4.2.0 milestone](https://github.com/vuetifyjs/vuetify/milestone/90) is targeting **September 1st** and carries the feature work that slipped past v4.1. The queue is largely unchanged since June, now with a date attached:

* **[VSlider](/components/sliders/)** — a `pill` variant to match MD3 ([#22699](https://github.com/vuetifyjs/vuetify/pull/22699))
* **[VMaskInput](/components/mask-inputs/)** — multiple and dynamic mask resolution ([#22501](https://github.com/vuetifyjs/vuetify/pull/22501))
* **[VTimePicker](/components/time-pickers/)** — keyboard controls ([#22604](https://github.com/vuetifyjs/vuetify/pull/22604))
* **[VBtn / VIconBtn](/components/buttons/)** — sizes, spacing, and focus aligned with MD3 ([#21831](https://github.com/vuetifyjs/vuetify/pull/21831))
* **[VDatePicker](/components/date-pickers/)** — week selection ([#20867](https://github.com/vuetifyjs/vuetify/pull/20867))
* **[VField](/components/text-fields/)** — a `border` prop ([#19819](https://github.com/vuetifyjs/vuetify/pull/19819))

Opened in July and still open at the end of it: persistent menus for the select family ([#23008](https://github.com/vuetifyjs/vuetify/pull/23008)) and a `toggle-on-click` prop for VAutocomplete and VCombobox ([#23023](https://github.com/vuetifyjs/vuetify/pull/23023)).

---

## Tooling Updates { #ecosystem-tooling }

### Vuetify CLI

<AppFigure :src="mcplogo" alt="Vuetify MCP logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify MCP Logo" />

<br>

The [CLI](https://github.com/vuetifyjs/cli) shipped four releases in July and gained a command. **`vuetify release-notes`** ([#23](https://github.com/vuetifyjs/cli/pull/23)) prints release notes for Vuetify or Vuetify0 from the terminal:

```bash
npx vuetify release-notes            # latest Vuetify release
npx vuetify release-notes v0         # latest Vuetify0 release
npx vuetify release-notes --version v4.1.7
```

It reads the GitHub Releases API directly — no new dependencies — and links to both the docs release-notes page and the GitHub release. It shipped in **v1.2.0-beta.3** and went stable in **v1.2.0** on July 15.

`vuetify analyze` got a correctness fix ([#26](https://github.com/vuetifyjs/cli/pull/26)). Lowercase `create*` factories such as `createSelection` and `createRegistry` were classified as utilities rather than composables, because the shipped import map has no `composables` key — roughly thirty core v0 composables were mislabeled. The Nuxt templates now set `prefixComposables` to avoid a naming collision introduced upstream ([#25](https://github.com/vuetifyjs/cli/issues/25)), and feature application was fixed when converting a project to JavaScript ([#19](https://github.com/vuetifyjs/cli/pull/19)).

**Releases:** v1.2.0-beta.2 (July 1) · v1.2.0-beta.3 (July 15) · **v1.2.0** (July 15) · v1.2.1 (July 22)

### pkg-diff

[pkg-diff](https://github.com/vuetifyjs/pkg-diff), the in-browser NPM package diffing tool that came out of June's security work, **went live** in July at [pkg-diff.vuetifyjs.com](https://pkg-diff.vuetifyjs.com/). All fifteen of the month's commits went into it: the Coolify deploy, accessible themes, a version dropdown grouped by dist-tag, an `av=prev` URL parameter, and **a CLI**, so an agent can diff two package versions without a browser. A matching link from the Vuetify CLI's `release-notes` output was merged on July 25, after v1.2.1, so it was still unreleased when the month closed.

### Vuetify MCP

The [MCP server](https://github.com/vuetifyjs/mcp) shipped **v0.8.0** on July 22, resyncing its published composable and component inventory against v0 1.0 ([#26](https://github.com/vuetifyjs/mcp/pull/26), [#27](https://github.com/vuetifyjs/mcp/pull/27)). Upgrade if you use it for v0 lookups — anything before 0.8.0 predates the 1.0 surface.

### Nuxt Module

The [Nuxt module](https://github.com/vuetifyjs/nuxt-module) reached **v1.0.0-rc.3** on July 20, adding **selective imports and prefixing for composables** — which you want when Vuetify's composable names collide with your own auto-imports. rc.2 shipped earlier in the month.

### Backend Fixes

Not user-facing, but worth recording. **Every non-happy-path OAuth callback was returning a 500.** The first fix swapped a throwing `schema.parse()` for `safeParse` ([#103](https://github.com/vuetifyjs/api/pull/103)), which was not the cause. The cause was a custom Hono `compose()` that never assigned a handler's returned `Response` to the context, so every early return was discarded ([#104](https://github.com/vuetifyjs/api/pull/104)). The docs AI assistant now escalates to the full documentation index instead of refusing off an index-only view ([#105](https://github.com/vuetifyjs/api/pull/105)). And the [issues app](https://issues.vuetifyjs.com/) verifies your Vuetify One session on boot, so a valid login stops showing as logged-out ([#79](https://github.com/vuetifyjs/issues/pull/79)).

---

## July 2026 Changelog

The following section provides an overview of the changes made in July 2026 across the Vuetify framework.

**Key Improvements:**

* **Shadow DOM**: keyboard navigation and focus resolution corrected for lists, dialogs, and fields
* **Defaults**: two inheritance leaks closed around teleported menu and dialog content
* **Select family**: multi-selection events, focus behavior, and native form submission
* **Virtual scrolling**: item trimming, visible-item recalculation, and expanded-row scroll glitches
* **RTL and locale**: Kurdish RTL resolution, VBtn letter-spacing, VOtpInput focus direction
* **Accessibility**: VTreeview aria attributes and keyboard navigation; VDataTable `aria-sort` and selection labels on v3

**Expand** this section to see the detailed changelog for July 2026:

<details>

### :rocket: Features

All four component features below shipped in **v3.13.0**; the v4 equivalents are merged to `dev` for v4.2.0.

* **VSelect/VAutocomplete/VCombobox:** new events for multi-selection ([#23038](https://github.com/vuetifyjs/vuetify/pull/23038)) ([45079af](https://github.com/vuetifyjs/vuetify/commit/45079af))
* **VSkeletonLoader:** add `types` prop & reintroduce `table-cell` ([#23037](https://github.com/vuetifyjs/vuetify/pull/23037)) ([b5d380b](https://github.com/vuetifyjs/vuetify/commit/b5d380b))
* **VSkeletonLoader:** add `chip-group` type ([06cbc10](https://github.com/vuetifyjs/vuetify/commit/06cbc10))
* **VBtnGroup:** add `size` prop to align with standalone buttons ([9b46baa](https://github.com/vuetifyjs/vuetify/commit/9b46baa))
* **VDataTable:** add mobile header slot — v3.13.0 ([#21429](https://github.com/vuetifyjs/vuetify/pull/21429))
* **VDataTable:** add `aria-sort` to sortable headers — v3.13.0 ([25c0f0f](https://github.com/vuetifyjs/vuetify/commit/25c0f0f))
* **VDataTable:** add aria-labels for selection controls — v3.13.0 ([db186fc](https://github.com/vuetifyjs/vuetify/commit/db186fc))

### :wrench: Bug Fixes

* **VNumberInput:** strip grouping separator before parsing number ([94e94a9](https://github.com/vuetifyjs/vuetify/commit/94e94a9))
* **VProgressLinear,VIconBtn:** avoid Vite v8 dropping transition timing ([f23af8a](https://github.com/vuetifyjs/vuetify/commit/f23af8a))
* **VTextField:** respect `hide-details="auto"` with counter ([#22620](https://github.com/vuetifyjs/vuetify/pull/22620))
* **elevation:** `hover-elevation` prop should not require `elevation` ([378f593](https://github.com/vuetifyjs/vuetify/commit/378f593))
* **VAutocomplete,VCombobox:** camelize item props for prepend icon and avatar ([8a20623](https://github.com/vuetifyjs/vuetify/commit/8a20623))
* **v-tooltip:** correctly handle `true` and `undefined` ([cef88bf](https://github.com/vuetifyjs/vuetify/commit/cef88bf))
* **defaults:** avoid parent config leaking into menu and dialog content ([#23016](https://github.com/vuetifyjs/vuetify/pull/23016))
* **VStepperWindow/VTouch:** only remove touchHandlers when not null ([#23030](https://github.com/vuetifyjs/vuetify/pull/23030))
* **VStepperVerticalItem:** unnecessary error color to step content ([fce4eaa](https://github.com/vuetifyjs/vuetify/commit/fce4eaa))
* **v-touch:** react to binding value changes ([937a471](https://github.com/vuetifyjs/vuetify/commit/937a471))
* **VSelect/VAutocomplete/VCombobox:** reliable list with selection ([#23029](https://github.com/vuetifyjs/vuetify/pull/23029))
* **VListItem/VChip/VDatePickerHeader:** only attach click when interactive ([#23028](https://github.com/vuetifyjs/vuetify/pull/23028))
* **VDialog/VField:** correct focus resolution in Shadow DOM ([#23027](https://github.com/vuetifyjs/vuetify/pull/23027))
* **VDialog:** defer auto-focus until the inner field is focusable ([8908e7e](https://github.com/vuetifyjs/vuetify/commit/8908e7e))
* **VList:** resolve keyboard navigation inside an open Shadow DOM ([#23024](https://github.com/vuetifyjs/vuetify/pull/23024))
* **VAutocomplete,VCombobox,VSelect:** improvements for native form submissions ([#23022](https://github.com/vuetifyjs/vuetify/pull/23022))
* **VSelect:** release focus on first click outside ([ff966d2](https://github.com/vuetifyjs/vuetify/commit/ff966d2))
* **VSelect:** only focus first item when menu is opened with keyboard ([4bb9151](https://github.com/vuetifyjs/vuetify/commit/4bb9151))
* **defaults:** keep nested root defaults through teleport reset ([#23015](https://github.com/vuetifyjs/vuetify/pull/23015))
* **VDataTableVirtual:** avoid scroll glitches with expanded rows ([#23014](https://github.com/vuetifyjs/vuetify/pull/23014))
* **VVirtualScroll:** trim leading items when appending to bottom ([1ac7cb7](https://github.com/vuetifyjs/vuetify/commit/1ac7cb7))
* **VVirtualScroll:** call calculateVisibleItems after updateOffsets ([#22938](https://github.com/vuetifyjs/vuetify/pull/22938))
* **VOverlay:** handle transition prop correctly for target assignment ([#22190](https://github.com/vuetifyjs/vuetify/pull/22190))
* **VImg:** handle image ref deferred by Nuxt page transition ([0f72baf](https://github.com/vuetifyjs/vuetify/commit/0f72baf))
* **VMaskInput:** preserve value when pasting over a selection ([#23003](https://github.com/vuetifyjs/vuetify/pull/23003))
* **VCalendar:** add missing interval props ([#23000](https://github.com/vuetifyjs/vuetify/pull/23000))
* **VCalendar:** prevent next day hours when customizing intervals ([4e36892](https://github.com/vuetifyjs/vuetify/commit/4e36892))
* **VTreeview:** make sure toRaw is used on children ([#22640](https://github.com/vuetifyjs/vuetify/pull/22640))
* **VTreeview:** more aria attributes and correct keyboard navigation ([#22903](https://github.com/vuetifyjs/vuetify/pull/22903))
* **types:** preserve RouteLocationRaw in emitted declarations ([d4d7b4b](https://github.com/vuetifyjs/vuetify/commit/d4d7b4b))
* **VSwitch:** resolve inset thumb scale ratios in Sass ([86fcfaa](https://github.com/vuetifyjs/vuetify/commit/86fcfaa))
* **VDataTable:** hide empty header cell in mobile view ([a759055](https://github.com/vuetifyjs/vuetify/commit/a759055))
* **VOverlay:** skip click-outside DOM scan for inactive overlays ([74e297f](https://github.com/vuetifyjs/vuetify/commit/74e297f))
* **VMenu:** correct close cascade for nested menus ([5902e09](https://github.com/vuetifyjs/vuetify/commit/5902e09))
* **VMenu:** correct click-outside detection when content resizes ([007f546](https://github.com/vuetifyjs/vuetify/commit/007f546))
* **VNumberInput:** accept non-ASCII minus sign ([6063d7a](https://github.com/vuetifyjs/vuetify/commit/6063d7a))
* **VNumberInput:** keep all decimals when precision is null ([87b0e57](https://github.com/vuetifyjs/vuetify/commit/87b0e57))
* **date:** correct locale on StringDateAdapter ([83ed8d4](https://github.com/vuetifyjs/vuetify/commit/83ed8d4))
* **theme:** provideTheme current should use computedThemes ([#22987](https://github.com/vuetifyjs/vuetify/pull/22987))
* **VDateInput:** derive display format from date adapter locale ([#22976](https://github.com/vuetifyjs/vuetify/pull/22976))
* **VDateInput:** do not fill range on blur ([b7569fe](https://github.com/vuetifyjs/vuetify/commit/b7569fe))
* **VAutocomplete:** don't trigger keydown listener during IME composition ([#22974](https://github.com/vuetifyjs/vuetify/pull/22974))
* **VDataTable:** keep rows visible after hiding a column with a custom filter ([#22971](https://github.com/vuetifyjs/vuetify/pull/22971))
* **VSelect/VAutocomplete/VCombobox:** respect `no-auto-scroll` ([adb2597](https://github.com/vuetifyjs/vuetify/commit/adb2597))
* **rounded:** translate `2xl`, `3xl`, etc. to classes ([0ea03f4](https://github.com/vuetifyjs/vuetify/commit/0ea03f4))
* **VOtpInput:** move focus correctly in RTL mode ([f0145aa](https://github.com/vuetifyjs/vuetify/commit/f0145aa))
* **VDataTable:** apply text-align to columns with align 'start' ([02f5f81](https://github.com/vuetifyjs/vuetify/commit/02f5f81))
* **locale:** correctly resolve Kurdish locale to RTL ([4782312](https://github.com/vuetifyjs/vuetify/commit/4782312))
* **VBtn:** no letter-spacing for RTL locales ([3956c08](https://github.com/vuetifyjs/vuetify/commit/3956c08))

### :books: Documentation

* Add the [Vuetify0 1.0 announcement](/blog/announcing-vuetify0-v1/) ([#23025](https://github.com/vuetifyjs/vuetify/pull/23025)) and the [RC announcement](/blog/announcing-vuetify0-rc/) ([#22981](https://github.com/vuetifyjs/vuetify/pull/22981))
* Update the roadmap and announce v3.13.0 as LTS ([8306637](https://github.com/vuetifyjs/vuetify/commit/8306637))
* Trim outdated content and redirect LTS to the root domain ([e3fb29d](https://github.com/vuetifyjs/vuetify/commit/e3fb29d))
* Add `/.well-known/security.txt` ([#23010](https://github.com/vuetifyjs/vuetify/pull/23010))
* New VMenu examples ([#19710](https://github.com/vuetifyjs/vuetify/pull/19710)), VTreeview footer slot example, VDataTable fixed-footer example
* Add a new 'silver' sponsor tier

</details>

---

## What's Next { .mt-4 }

August turns back to features. The [v4.2.0 milestone](https://github.com/vuetifyjs/vuetify/milestone/90) is dated **September 1st** — the MD3 button alignment, VSlider's `pill` variant, VTimePicker keyboard controls, and VMaskInput's dynamic masks are all queued against it. Expect the v4.1 patch line to keep running underneath it.

With Vuetify0 1.0 out and its API locked under semver for the whole 1.x line, the framework's **theme**, **locale**, and **date** migrations onto v0 have a target that will not move. Those branches have been waiting since spring. They now have something stable to land against.

* [Vuetify 3.13](/getting-started/release-notes/?version=v3.13.0) is the last v3 minor — if you are still on v3, the [LTS clock](/introduction/long-term-support/) runs to July 27th, 2027
* [Vuetify0 1.0](/blog/announcing-vuetify0-v1/) is stable and untagged — `pnpm add @vuetify/v0`
* [pkg-diff](https://pkg-diff.vuetifyjs.com/) is live, with a CLI if you drive it from an agent

::: warning

**Vuetify needs your support.** Every contribution funds ongoing work on the framework and the ecosystem tools around it. If your team relies on Vuetify, point your organization at [Open Collective](https://opencollective.com/vuetify) or [GitHub Sponsors](https://github.com/sponsors/johnleider).

:::

Vuetify is and always will be free and open source. If your team builds on the framework, Vuetify0, the MCP server, the CLI, the Nuxt module, or the design systems coming behind them, [Vuetify One](https://one.vuetifyjs.com/) and [GitHub Sponsors](https://github.com/sponsors/johnleider) are the most direct ways to help.

Nearly four years of Vuetify 3 ended this month, and a lot of you have been here for all of it. Thank you to everyone who filed an issue, opened a PR, or tested a release candidate in July.

See you in August!

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://community.vuetifyjs.com), and follow [@vuetifyjs](https://twitter.com/vuetifyjs) for the latest announcements. The best is yet to come!*
