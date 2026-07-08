---
layout: blog
meta:
  title: June 2026 Update
  description: June took Vuetify 4.1 stable, hardened the new overlay location strategy across two patch releases, and — after a security incident cost us our Discord server — rebuilt the community's home.
  keywords: Vuetify June 2026, Vuetify 4.1 stable, Ascendant, VOverlay location strategy, VSwitch MD3, VCalendar interval-highlight, Vuetify Discord incident, Vuetify0 beta
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
  const onelogo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vone-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const releasesimg = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/blog/june-2026-update/releases-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
  const v0img = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/blog/june-2026-update/v0-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

# June 2026 Update

**June was a stabilization month, and then some.** May opened the v4.1 minor in beta; June carried it across the line — [v4.1.0](/getting-started/release-notes/?version=v4.1.0) went stable on June 2, followed by two patch releases that spent almost all of their energy hardening the new overlay location strategy and cleaning up the edges of a large minor. It was also the month a security incident cost us our Discord server. No package, release, or user data was touched — but the community's home was, and rebuilding it became part of the month's work.

![Hero image for June update](https://cdn.vuetifyjs.com/docs/images/blog/june-2026-update/june-hero.png "June hero image"){ height=112 }

🖊️ Jacek Czarniecki • 📅 July 8th, 2026

<PromotedEntry />

---

## A month of settling in

Where May was a feature sprint, June was about making that work solid. **52 commits**, **two dozen fixes**, and **four releases**, with the stable [v4.1.0](/getting-started/release-notes/?version=v4.1.0) at the center. The new viewport/static location strategy that shipped with the minor turned out to be the month's main character — real-world usage surfaced a string of placement edge cases (iOS keyboards, `calc()` sizes, percentage boundaries, closing animations), and the two follow-up patches worked through them one by one. Meanwhile [Vuetify0](https://0.vuetifyjs.com/) settled into the [beta announced June 2](/blog/announcing-vuetify0-beta/), with its public API frozen and the road to v1 opening up.

---

## Table of Contents

* [Releases](#releases)
  * [Key Improvements](#key-improvements)
* [Spotlight: Vuetify 4.1 Goes Stable](#vuetify-4-1)
* [Framework Updates](#framework-updates)
  * [New Features](#new-features)
  * [Bug Fixes](#bug-fixes)
  * [In Development](#in-development)
* [Security Incident](#security-incident)
* [Vuetify0 Progress Update](#vuetify0-progress)
* [Product Updates](#product-updates)
* [June 2026 Changelog](#june-2026-changelog)
* [What's Next](#whats-next)
  * [Looking Further Ahead](#looking-ahead)

---

## Releases

June shipped **four framework releases**. [v4.0.9](/getting-started/release-notes/?version=v4.0.9) (June 2) was a small patch on the stable v4.0 line — an SSR fix for `VProgressLinear`, a `VNumberInput` control-state fix, and a focus-trap scroll fix. The same day, [v4.1.0](/getting-started/release-notes/?version=v4.1.0) went stable, finalizing the VSwitch MD3 work and folding in the late-May fixes. From there the month was patches: [v4.1.1](/getting-started/release-notes/?version=v4.1.1) (June 8) and [v4.1.2](/getting-started/release-notes/?version=v4.1.2) (June 16), each a round of fixes led by the overlay location strategy.

<AppFigure :src="releasesimg" alt="June Releases Banner" title="June Releases Banner" />

### Key Improvements

* **[Vuetify 4.1](/getting-started/release-notes/?version=v4.1.0)** — the first minor of the v4 line went stable on June 2
* **[VSwitch](/components/switches/)** — MD3 alignment, a `size` prop, and a `square` inset variant, finalized in the stable release
* **[VCalendar](/components/calendars/)** — new `interval-highlight` prop ([#22885](https://github.com/vuetifyjs/vuetify/pull/22885))
* **[VExpansionPanels](/components/expansion-panels/)** — improved focus styles and a `hover` prop to opt out of the hover effect ([#22827](https://github.com/vuetifyjs/vuetify/pull/22827))
* **[VOverlay](/components/overlays/)** — a run of static-location fixes: edge snapping ([#22921](https://github.com/vuetifyjs/vuetify/pull/22921)), iOS keyboard attachment ([#22923](https://github.com/vuetifyjs/vuetify/pull/22923)), `calc()`/`min()`/`vw` sizes, and reactive dimensions
* **Forced-colors mode** — `VHeatmap` and `VHighlight` now render correctly under Windows high-contrast themes

View the complete list of changes in the [Full Changelog](#june-2026-changelog).

**Details:**

* [v4.1.2](https://vuetifyjs.com/getting-started/release-notes/?version=v4.1.2)
* [v4.1.1](https://vuetifyjs.com/getting-started/release-notes/?version=v4.1.1)
* [v4.1.0](https://vuetifyjs.com/getting-started/release-notes/?version=v4.1.0)
* [v4.0.9](https://vuetifyjs.com/getting-started/release-notes/?version=v4.0.9)

---

## Spotlight: Vuetify 4.1 Goes Stable (Ascendant) { #vuetify-4-1 }

<AppFigure :src="vuetifylogo" alt="Vuetify logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Logo" />

<br>

May opened [v4.1.0](/getting-started/release-notes/?version=v4.1.0) in beta; **on June 2 it went stable**. The minor — codenamed **Ascendant** — brought seven labs promotions, four new components (`VHeatmap`, `VHighlight`, `VMonthPicker`, `VDateRangePicker`), and a broad wave of feature props across data tables, pickers, and overlays. That was covered in depth in the [May update](/blog/may-2026-update/); June's job was to make it stable.

The last additions to land before GA were the **VSwitch** MD3 changes — alignment with the MD3 spec ([#22879](https://github.com/vuetifyjs/vuetify/pull/22879)), a `size` prop ([#22882](https://github.com/vuetifyjs/vuetify/pull/22882)), and a `square` inset variant ([#22881](https://github.com/vuetifyjs/vuetify/pull/22881)) — plus **VExpansionPanel** focus polish and the **VCalendar** `interval-highlight` prop. Everything after that was a fix.

**Details:**

* [v4.1 Release Notes](/getting-started/release-notes/?version=v4.1.0)
* [Roadmap](/introduction/roadmap/)

---

## Framework Updates

### New Features

June was deliberately feature-light — the point was to stabilize, not to add. A handful of additions still made it into the stable release and the patches that followed:

**[VSwitch](/components/switches/)** — the MD3 work that had been in flight through late May landed in the stable release: alignment with the MD3 spec, a `size` prop, and a new `square` inset variant. Follow-up patches tuned the inset track color and gave the outline a neutral color.

**[VCalendar](/components/calendars/)** — a new `interval-highlight` prop lets you highlight specific intervals in the day and week views ([#22885](https://github.com/vuetifyjs/vuetify/pull/22885)).

**[VExpansionPanels](/components/expansion-panels/)** — improved focus styling across the panel headers, plus a `hover` prop on `VExpansionPanelTitle` to disable the hover effect where it isn't wanted ([#22827](https://github.com/vuetifyjs/vuetify/pull/22827)).

### Bug Fixes

The overlay location strategy introduced in v4.1 was the month's dominant fix theme. It's a powerful feature, and putting it in front of real layouts surfaced the placement edge cases you'd expect — most of them now closed.

| Component                               | Fix                                              | Version | PR                                                        |
|-----------------------------------------|--------------------------------------------------|---------|-----------------------------------------------------------|
| **VProgressLinear**                     | Avoid `opacity:NaN` when rendering with SSR      | v4.0.9  | [#22880](https://github.com/vuetifyjs/vuetify/pull/22880) |
| **VNumberInput**                        | Keep both controls enabled when empty            | v4.0.9  | —                                                         |
| **focusTrap**                           | Prevent page scroll when capturing focus         | v4.0.9  | —                                                         |
| **VSelect**                             | Close menu when click lands inside host overlay  | v4.1.1  | —                                                         |
| **VSnackbar**                           | More reliable progress bar                       | v4.1.1  | —                                                         |
| **VNumberInput**                        | Emit `change` when using controls and arrows     | v4.1.1  | —                                                         |
| **VTooltip**                            | Avoid stealing focus                             | v4.1.1  | —                                                         |
| **VTable**                              | Apply background and border for `fixed-footer`   | v4.1.1  | —                                                         |
| **VMenu**                               | Prevent focus change during IME input            | v4.1.1  | [#21008](https://github.com/vuetifyjs/vuetify/pull/21008) |
| **VHeatmap**                            | Keep legend bar visible in forced-colors mode    | v4.1.1  | —                                                         |
| **VHighlight**                          | Support forced-colors mode                       | v4.1.1  | —                                                         |
| **VOverlay**                            | Static location should snap to edges using CSS   | v4.1.2  | [#22921](https://github.com/vuetifyjs/vuetify/pull/22921) |
| **VOverlay**                            | Keep overlay attached with iOS keyboard open     | v4.1.2  | [#22923](https://github.com/vuetifyjs/vuetify/pull/22923) |
| **VOverlay**                            | Resolve `calc`/`min`/`vw` sizes to pixels        | v4.1.2  | —                                                         |
| **VDialog**                             | Clear inline styles when enabling fullscreen     | v4.1.2  | —                                                         |
| **VTreeview**                           | Apply `hide-actions` to group nodes              | v4.1.2  | —                                                         |
| **VPagination**                         | Predictable length behavior in flex container    | v4.1.2  | [#22912](https://github.com/vuetifyjs/vuetify/pull/22912) |
| **theme**                               | Async transition should return a Promise         | v4.1.2  | —                                                         |

### In Development

**Validation rules out of labs** — the `rules` utilities are being promoted from labs to core ([2871f71](https://github.com/vuetifyjs/vuetify/commit/2871f71)). The work merged in June and is queued for the next release, part of the year-long push to drain labs by November.

---

## Security Incident { #security-incident }

On June 3, a maintainer's personal machine was compromised by a commodity infostealer after a social-engineering lure. The attacker used browser-stored credentials to take over the Vuetify **Discord support account**, added 2FA to lock the owner out, and sent an extortion demand, which was refused.

**No Vuetify package, source, release, CI pipeline, or user data was affected.** The release pipeline's existing protections — OIDC-based trusted publishing to npm and mandatory 2FA — limit what any single stolen credential can do, and there is no sign any were used against project infrastructure. Tokens on the affected host were rotated or revoked as a precaution.

The support account was recovered on June 10, but **the original community server was deleted and cannot be restored** — Discord support confirmed the loss of the server, its channels, and its message history is permanent. A replacement server was opened while recovery was pending and is now the official home of the community.

::: warning

The original Discord server is permanently gone. Request an invite to the new one at [community.vuetifyjs.com](https://community.vuetifyjs.com). If any other server or DM claims to be us and asks for money, credentials, or 2FA codes, **it is not us**.

:::

The full write-up — timeline, scope, root cause, and public indicators of compromise — is on the [incident report page](/about/incidents/2026-06-nyven-infostealer/).

---

## Vuetify0 Progress Update { #vuetify0-progress }

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

<br>

June was Vuetify0's first month in beta. The [beta was announced on June 2](/blog/announcing-vuetify0-beta/) with the public API frozen, so the work shifted from adding primitives to hardening the ones that shipped — edge cases, documentation, and the road to **v1.0 in July**. With a frozen target now in place, the **theme**, **locale**, and **date** v0 migrations inside the framework have something stable to build against.

<AppFigure :src="v0img" alt="Vuetify0 Progress" title="Vuetify0 June Progress" />

::: success

**Adopting Vuetify0 for your business?** Teams building production design systems, internal tooling, or product UI on top of v0 can [reach out](mailto:john@vuetifyjs.com) to talk through adoption, partnership, and roadmap input.

:::

**Details:**

* [Announcing the Vuetify0 Beta](/blog/announcing-vuetify0-beta/)
* [Vuetify0 Documentation](https://0.vuetifyjs.com/)
* [v0play](https://v0play.vuetifyjs.com)

---

## Product Updates

### Vuetify One

<AppFigure :src="onelogo" alt="Vuetify One logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify One Logo" />

<br>

The docs picked up a round of housekeeping in June — SEO length limits enforced on page meta titles and descriptions, unified CDN links, and a corrected MD2 typography snippet in the upgrade guide. The Discord invite link across the docs was updated to point at the new community server.

### Nuxt Module

The [Nuxt Module](https://github.com/vuetifyjs/nuxt-module) continued its march toward a stable v1, with [Andrei Elkin](https://github.com/AndreyYolkin) keeping up the package-resolution and reliability work carried over from May.

---

## June 2026 Changelog

The following section provides an overview of the changes made in June 2026 across the Vuetify framework.

**Key Improvements:**

* v4.0.9: stable-line patch — `VProgressLinear` SSR opacity, `VNumberInput` empty-state controls, focus-trap scroll
* v4.1.0: stable release of the v4.1 minor — VSwitch MD3 (`size`, `square` inset, spec alignment), `VCalendar` `interval-highlight`, `VExpansionPanel` focus polish and `hover` prop
* v4.1.1: fixes across VSelect, VSnackbar, VNumberInput, VTooltip, VTable, VMenu (IME), plus forced-colors support for VHeatmap and VHighlight
* v4.1.2: overlay static-location hardening (edge snapping, iOS keyboard, `calc()`/`min()`/`vw` sizes, reactive dimensions), plus VDialog, VTreeview, VPagination, and theme fixes

**Expand** this section to see the detailed changelog for June 2026:

<details>
<summary>June 2026 Full Changelog</summary>

### v4.0.9 (2026-06-02)

**:wrench: Bug Fixes**

* **VProgressLinear:** avoid `opacity:NaN` when rendering with SSR ([#22880](https://github.com/vuetifyjs/vuetify/issues/22880))
* **VNumberInput:** keep both controls enabled when empty
* **focusTrap:** prevent page scroll when capturing focus

---

### v4.1.0 (2026-06-02)

**:rocket: Features**

* **VSwitch:** align with MD3 spec ([#22879](https://github.com/vuetifyjs/vuetify/issues/22879)); add `size` prop ([#22882](https://github.com/vuetifyjs/vuetify/issues/22882)); add `square` inset variant ([#22881](https://github.com/vuetifyjs/vuetify/issues/22881))
* **VCalendar:** add `interval-highlight` prop ([#22885](https://github.com/vuetifyjs/vuetify/issues/22885))
* **VExpansionPanelTitle:** add `hover` prop to disable hover effect ([#22827](https://github.com/vuetifyjs/vuetify/issues/22827))

**:wrench: Bug Fixes**

* **VSwitch:** tune track color for inset material; outline should have neutral color
* **VExpansionPanel:** improved focus styles
* **VDialog:** no viewport margin for fullscreen dialog
* **VDataTableVirtual:** align `caption` slot with VTable

---

### v4.1.1 (2026-06-08)

**:wrench: Bug Fixes**

* **VSelect:** close menu when click lands inside host overlay
* **VSnackbar:** more reliable progress bar
* **VNumberInput:** emit `change` when using controls and arrows
* **VOverlay:** respect % dimension boundaries
* **VTooltip:** avoid stealing focus; merge content class and props
* **VTable:** apply background and border for `fixed-footer`
* **VMenu:** prevent focus change during IME input ([#21008](https://github.com/vuetifyjs/vuetify/issues/21008))
* **VHeatmap:** keep legend bar visible in forced-colors mode
* **VHighlight:** support forced-colors mode

---

### v4.1.2 (2026-06-16)

**:wrench: Bug Fixes**

* **VOverlay:** static location should snap to edges using CSS ([#22921](https://github.com/vuetifyjs/vuetify/issues/22921)); keep overlay attached with iOS keyboard open ([#22923](https://github.com/vuetifyjs/vuetify/issues/22923)); resolve size with CSS function (calc, min, vw) to pixels; dimension props should be reactive in static strategy; do not clear position when closing
* **VDialog:** clear inline styles when enabling fullscreen mode
* **VTreeview:** apply `hide-actions` to group nodes
* **VPagination:** predictable length behavior in flex container ([#22912](https://github.com/vuetifyjs/vuetify/issues/22912))
* **theme:** async transition should return a Promise
* **utilities:** merge height values into a single group

</details>

---

## What's Next { .mt-4 }

July finishes the year's first arc. **Vuetify0** reaches **v1.0**, ending the beta and giving the framework a stable foundation to migrate onto. **Vuetify 4.1** continues its patch cadence, with the `rules` promotion and more overlay and treeview polish already queued. And with a v0 v1 in hand, the **theme**, **locale**, and **date** migrations move from planning to real work.

* [Vuetify 4.1](/getting-started/release-notes/?version=v4.1.0) is stable — try the new components and labs promotions in your project today
* The [Vuetify0 beta](/blog/announcing-vuetify0-beta/) has frozen its public API ahead of v1 — try it via [v0play](https://v0play.vuetifyjs.com)
* Join the rebuilt community server at [community.vuetifyjs.com](https://community.vuetifyjs.com)

### Looking Further Ahead { #looking-ahead }

The theme for the rest of the year hasn't changed: **finishing what we started**.

**A clean finish for labs**: our roadmap commitments for the remainder of 2026 stay narrowed to one outcome — **by November 1st, 2026, labs will be drained**. Every component still incubating will either graduate into core or be retired; nothing will be left in an "unfinished" state. June's `rules` promotion is one more step down that list.

**A community-driven issue board**: we're building a curated view into the issue board where the community can surface and vote on what matters most, opening a direct line into what we tackle next. More as it takes shape.

**A modernized docs experience (later this year)**: we're planning a significant UX upgrade to the Vuetify docs, porting over features introduced first to the [Vuetify0 documentation](https://0.vuetifyjs.com/). For a preview of where we're headed, spend some time in the [v0 docs](https://0.vuetifyjs.com/) — the navigation, search, and interactive code samples are an early taste of what's coming.

::: error

**Vuetify needs your support.** OpenCollective funds are exhausted and we're currently unable to compensate contributors for ongoing work on the framework and ecosystem tools. If your team relies on Vuetify, please consider sponsoring us via [Open Collective](https://opencollective.com/vuetify) or [GitHub Sponsors](https://github.com/sponsors/johnleider). Every contribution keeps Vuetify shipping.

:::

Vuetify is and always will be free and open source. If your team builds on the framework, the v0 beta, the MCP, the CLI, the Nuxt module, the ESLint plugin, or any of the design systems coming behind them, your support directly funds continued development. [Vuetify One](https://one.vuetifyjs.com/) and [GitHub Sponsors](https://github.com/sponsors/johnleider) are the most direct ways to help.

To everyone who checked in, shared the verified invite, and helped us rebuild the community server after this month's incident — thank you. It meant a lot.

Thank you for being part of the Vuetify community. See you in July!

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://community.vuetifyjs.com), and follow [@vuetifyjs](https://twitter.com/vuetifyjs) for the latest announcements. The best is yet to come!*
