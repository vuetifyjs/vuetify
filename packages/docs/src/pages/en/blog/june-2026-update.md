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
* **[VSwitch](/components/switches/)** — MD3 alignment, a long awaited `size` prop, and a `square` nobody asked for, 😂 LOL, quite a mix
* **[VCalendar](/components/calendars/)** — new `interval-highlight` for subtle row tint on mouse hover ([#22885](https://github.com/vuetifyjs/vuetify/pull/22885))
* **[VExpansionPanels](/components/expansion-panels/)** — improved focus styles and a `hover` prop to opt-out of the hover effect ([#22827](https://github.com/vuetifyjs/vuetify/pull/22827))
* **[VOverlay](/components/overlays/)** — a handful of location fixes after introducing edge snapping ([#22921](https://github.com/vuetifyjs/vuetify/pull/22921)), iOS keyboard attachment ([#22923](https://github.com/vuetifyjs/vuetify/pull/22923)), finished by restoring `calc()`/`min()`/`vw` support for sizing
* **Forced-colors mode** — `VHeatmap` and `VHighlight` now render correctly for people relying on forced high-contrast override

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

May opened [v4.1.0](/getting-started/release-notes/?version=v4.1.0) in beta; **on June 2 it went stable**. The release brought us four new components (`VHeatmap`, `VHighlight`, `VMonthPicker`, `VDateRangePicker`), already covered in [the previous blog post](/blog/may-2026-update/) and a broad wave of feature props across data tables, pickers, and overlays.

**Details:**

* [v4.1 Release Notes](/getting-started/release-notes/?version=v4.1.0)
* [Roadmap](/introduction/roadmap/)

---

## Framework Updates

June was deliberately feature-light — the team waited for feedback from users adopting latest version for new features and improvements.

### Bug Fixes

The overlay location strategy introduced in v4.1 was the month's dominant fix theme. It's a powerful feature, and putting it in front of real layouts surfaced the placement edge cases you'd expect — most of them now closed.

| Component           | Fix                                             | Version | PR / commit                                               |
|---------------------|-------------------------------------------------|---------|-----------------------------------------------------------|
| **VProgressLinear** | Avoid `opacity:NaN` when rendering with SSR     | v4.0.9  | [#22880](https://github.com/vuetifyjs/vuetify/pull/22880) |
| **VNumberInput**    | Keep both controls enabled when empty           | v4.0.9  | [e0133c2](https://github.com/vuetifyjs/vuetify/commit/e0133c2) |
| **focusTrap**       | Prevent page scroll when capturing focus        | v4.0.9  | [451e7c3](https://github.com/vuetifyjs/vuetify/commit/451e7c3) |
| **VSelect**         | Close menu when click lands inside host overlay | v4.1.1  | [7ed9a54](https://github.com/vuetifyjs/vuetify/commit/7ed9a54) |
| **VSnackbar**       | More reliable progress bar                      | v4.1.1  | [5e6fe60](https://github.com/vuetifyjs/vuetify/commit/5e6fe60) |
| **VNumberInput**    | Emit `change` when using controls and arrows    | v4.1.1  | [2ab2509](https://github.com/vuetifyjs/vuetify/commit/2ab2509) |
| **VTooltip**        | Avoid stealing focus                            | v4.1.1  | [77d1a8a](https://github.com/vuetifyjs/vuetify/commit/77d1a8a) |
| **VTable**          | Apply background and border for `fixed-footer`  | v4.1.1  | [ecabcc5](https://github.com/vuetifyjs/vuetify/commit/ecabcc5) |
| **VMenu**           | Prevent focus change during IME input           | v4.1.1  | [#21008](https://github.com/vuetifyjs/vuetify/pull/21008) |
| **VHeatmap**        | Keep legend bar visible in forced-colors mode   | v4.1.1  | [58e3e7d](https://github.com/vuetifyjs/vuetify/commit/58e3e7d) |
| **VHighlight**      | Support forced-colors mode                      | v4.1.1  | [067228c](https://github.com/vuetifyjs/vuetify/commit/067228c) |
| **VOverlay**        | Static location should snap to edges using CSS  | v4.1.2  | [#22921](https://github.com/vuetifyjs/vuetify/pull/22921) |
| **VOverlay**        | Keep overlay attached with iOS keyboard open    | v4.1.2  | [#22923](https://github.com/vuetifyjs/vuetify/pull/22923) |
| **VOverlay**        | Resolve `calc`/`min`/`vw` sizes to pixels       | v4.1.2  | [bf105bf](https://github.com/vuetifyjs/vuetify/commit/bf105bf) |
| **VDialog**         | Clear inline styles when enabling fullscreen    | v4.1.2  | [ea29378](https://github.com/vuetifyjs/vuetify/commit/ea29378) |
| **VTreeview**       | Apply `hide-actions` to group nodes             | v4.1.2  | [e5555ae](https://github.com/vuetifyjs/vuetify/commit/e5555ae) |
| **VPagination**     | Predictable length behavior in flex container   | v4.1.2  | [#22912](https://github.com/vuetifyjs/vuetify/pull/22912) |
| **theme**           | Async transition should return a Promise        | v4.1.2  | [904f949](https://github.com/vuetifyjs/vuetify/commit/904f949) |

### In Development

**Deferred to v4.2** — keeping v4.1 tight meant several in-flight initiatives slipped past the minor and now sit against the [v4.2.0 milestone](https://github.com/vuetifyjs/vuetify/milestone/90). Most are feature PRs that were already open before v4.1 went stable:

* **[VTreeview](/components/treeview/)** — a set of accessibility improvements: more aria attributes and correct keyboard navigation
* **[VSlider](/components/sliders/)** — a `pill` variant to match MD3 ([#22699](https://github.com/vuetifyjs/vuetify/pull/22699))
* **[VBreadcrumbs](/components/breadcrumbs/)** — improved accessibility and a collapse menu ([#22358](https://github.com/vuetifyjs/vuetify/pull/22358))
* **[VMaskInput](/components/mask-inputs/)** — multiple and dynamic mask resolution ([#22501](https://github.com/vuetifyjs/vuetify/pull/22501))

---

## Security Incident { #security-incident }

If you somehow missed the [deep dive into the incident](/about/incidents/2026-06-nyven-infostealer/), a long story short is that Discord failed us by shipping insecure client (2FA is a joke) and having no backup, no "security cooldown" nor tools to recover the server after the takeover. After a shaky two weeks, we had set up a new one and get things back on track. All community members are welcome to re-join.

**No Vuetify package, source, release, CI pipeline, or user data was affected.** But the team still took the opportunity to rotate the security tokens and strenghten the internal policies. One interesting side-effect of "what if" planning was a new project [pkg-diff](https://github.com/vuetifyjs/pkg-diff). It appears despite constant problems around NPM packages security, we had not found even one decent tool to diff packages - some were slow, other limited, so we created our own and since it is computing everything in-browser, everyone is free to use it :)

![pkg-diff screenshot](https://cdn.vuetifyjs.com/docs/images/blog/june-2026-update/pkg-diff-screenshot.png)

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

::: warning

**Vuetify needs your support.** OpenCollective trend slowly picks up and we appreciate every contribution and support for ongoing work on the framework and ecosystem tools. If your team relies on Vuetify, please educate your boss about importance of sponsoring OSS projects like Vuetify. You can point them to [Open Collective](https://opencollective.com/vuetify) or [GitHub Sponsors](https://github.com/sponsors/johnleider). Every contribution keeps Vuetify afloat.

:::

Vuetify is and always will be free and open source. If your team builds on the framework, the v0 beta, the MCP, the CLI, the Nuxt module, the ESLint plugin, or any of the design systems coming behind them, your support directly funds continued development. [Vuetify One](https://one.vuetifyjs.com/) and [GitHub Sponsors](https://github.com/sponsors/johnleider) are the most direct ways to help.

To everyone who checked in, shared the verified invite, and helped us rebuild the community server after this month's incident — thank you. It meant a lot.

Thank you for being part of the Vuetify community. See you in July!

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://community.vuetifyjs.com), and follow [@vuetifyjs](https://twitter.com/vuetifyjs) for the latest announcements. The best is yet to come!*
