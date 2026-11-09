---
layout: blog
meta:
  title: October 2026 Update
  description: v4.3.0 and Vuetify0 v1.3.0 shipped. What to check before you update, less JavaScript in Vite 8 builds, steadier SSR layouts, and design systems on the way.
  keywords: Vuetify October 2026, Vuetify v4.3.0, Paladin, Vuetify0, Vite 8, bundle size, SSR, Nuxt
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
</script>

# October 2026 Update

Welcome to the October update. [v4.3.0 Paladin](/blog/announcing-vuetify-4.3/) shipped on the 19th, and [Vuetify0 v1.3.0](/blog/announcing-vuetify0-v1-3/) followed the next day. Both have their own posts, so this one covers what they left out: a few things to check before you update, a dependency update that lets Vuetify apps built with Vite 8 ship less JavaScript, SSR layouts that stopped shifting, and the design systems on the way for Vuetify0.

![Hero image for October update](https://cdn.vuetifyjs.com/docs/images/blog/october-2026-update/october-hero.png "October hero image"){ height=112 }

🖊️ John Leider • 📅 November 3rd, 2026

<PromotedEntry />

---

## October in numbers

**60 merged PRs** in the framework repo, **8 releases**, **84 issues closed** and **29 opened**. [Vuetify0](https://0.vuetifyjs.com/) merged 120 PRs and shipped three releases, headlined by [v1.3.0](https://0.vuetifyjs.com/releases/?version=v1.3.0). npm downloads of `@vuetify/v0` went from 298k in September to 562k in October.

---

## Thank you, sponsors { #thank-you-sponsors }

Before we dig in, a big thank you to the companies that back Vuetify every single month. Our top and Platinum sponsors are below, and everyone else is on our [sponsors page](/introduction/sponsors-and-backers/). You're the reason we get to keep doing this.

<SponsorSponsors tier="-2" />

<SponsorSponsors tier="1" />

<br>

<SponsorSponsors tier="2" />

---

## Table of Contents

* [Before you update](#before-you-update)
* [Spotlight: the library grew, the bundle shrank](#spotlight)
* [v4.3.0 Paladin, in short](#in-4-3)
* [SSR layout](#ssr-layout)
* [v4.2.x and v3.13.x](#patches)
* [Vuetify0 Progress Update](#vuetify0-progress)
  * [Design systems](#design-systems)
* [Play, MCP and Nuxt](#ecosystem)
* [What's Next](#whats-next)

---

## Before you update { #before-you-update }

* **Dismissible VAlert in a flex container?** Since v4.3.0 the alert collapses when dismissed, which can look wrong next to flex siblings. `:transition="false"` turns it off ([#23280](https://github.com/vuetifyjs/vuetify/pull/23280)).
* **Building with Vite 8?** Refresh your lockfile so it resolves `@vuetify/v0` v1.2.4 or later. An app that uses VSelect ships about 23 kB less gzipped JS on Vue 3.5, and about 73 kB less on Vue 3.6, with no code changes. [The spotlight](#spotlight) explains why.
* **Importing VAvatarGroup, VHighlight or VProgress from `vuetify/labs`?** They left labs in v4.3.0. Import them from `vuetify/components`.
* **Loading Vuetify from a CDN on v4.3.0?** It throws `process is not defined`. Update to v4.3.1 or later ([#23308](https://github.com/vuetifyjs/vuetify/pull/23308), thanks [lazerg](https://github.com/lazerg)).

---

## Spotlight: the library grew, the bundle shrank { #spotlight }

Vuetify gained new labs components in October, and a Vite 8 build still got smaller.

`@vuetify/v0` creates 63 contexts at module level, and none of them were marked as free of side effects. Vite 8 kept them all. Importing VSelect pulls in VHighlight, which imports a v0 helper, and that kept every context in the chunk. Through `useId()` it also kept the whole `vue` namespace, which on Vue 3.6 includes the Vapor runtime. [v1.2.4](https://0.vuetifyjs.com/releases/?version=v1.2.4) marks those calls pure, so Vite can tree-shake the unused ones ([#1043](https://github.com/vuetifyjs/0/pull/1043), thanks [araishi](https://github.com/araishi)).

Gzipped JS of a Vite 8 production build, before → after:

| App uses       | Vue 3.5       | Vue 3.6       |
|----------------|---------------|---------------|
| VSelect only   | 121 → 97 kB   | 171 → 98 kB   |
| all components | 244 → 221 kB  | 294 → 222 kB  |

The saving is the same either way, because none of that code was needed. Vite 7 builds don't change. If your bundle is measured in megabytes you won't notice, but in a small app it's a fair share.

[v1.3.1](https://0.vuetifyjs.com/releases/?version=v1.3.1) goes after the Vue 3.6 part directly: v0 no longer imports `vue` as a namespace, so VDOM apps stop shipping the Vapor runtime ([#1095](https://github.com/vuetifyjs/0/pull/1095)).

Apps on Vuetify v4.2.0 or later get it with their next dependency update.

---

## v4.3.0 Paladin, in short { #in-4-3 }

<AppFigure :src="vuetifylogo" alt="Vuetify logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Logo" />

<br>

[v4.3.0](/getting-started/release-notes/?version=v4.3.0) shipped on October 19: right-click menus, new labs components, MD3 options for buttons, progress indicators, sliders and tabs, VAvatarGroup, VHighlight and VProgress out of labs, and small improvements to data tables. The [release post](/blog/announcing-vuetify-4.3/) walks through them with demos.

Stable components follow semver, so nothing there breaks in a minor. Labs components don't carry that promise, because that's where new APIs settle before promotion. We rarely break them anyway, but this time VVideo moved its translation keys from `$vuetify.video.*` to `$vuetify.media.*` ([2191e30](https://github.com/vuetifyjs/vuetify/commit/2191e305e6210852b3f458970f028998c2f3e5a6)).

### Also in v4.3.x

* [VAlert](/components/alerts/#timeout) can now close itself after a set `timeout`, with an optional countdown shown as a bar along an edge or a ring around the close button. The request had been open since September 2024 ([#23280](https://github.com/vuetifyjs/vuetify/pull/23280)).
* [VDatePicker](/components/date-pickers/) gets a `wheel` prop, so horizontal scrolling or Shift + wheel changes the month, as the `scrollable` prop did in Vuetify 2 ([#22929](https://github.com/vuetifyjs/vuetify/pull/22929), thanks [ascott18](https://github.com/ascott18)). Day buttons forward their events, such as `@click:day` and `@dblclick:day` ([#22491](https://github.com/vuetifyjs/vuetify/pull/22491), thanks [ikushum](https://github.com/ikushum)).
* The input variant of [VTimePicker](/components/time-pickers/) supports the `scrollable` prop ([ad89b1f](https://github.com/vuetifyjs/vuetify/commit/ad89b1f291033835d77efb776c1f7afe89e0f771)).
* [VCommandPalette](/components/command-palettes/) got a11y and custom slot fixes ([#23258](https://github.com/vuetifyjs/vuetify/pull/23258), [#23260](https://github.com/vuetifyjs/vuetify/pull/23260), thanks [MatthewAry](https://github.com/MatthewAry)).
* [VRating](/components/ratings/) scales its icons with a numeric `size` and has an `icon-size` prop ([3112446](https://github.com/vuetifyjs/vuetify/commit/3112446c2a45991eb61e57286558b33928c68b71)).
* [VCheckboxGroup](/components/checkbox-groups/) (labs) holds the `v-model` of its child checkboxes, with one shared label and group validation ([#23299](https://github.com/vuetifyjs/vuetify/pull/23299), thanks [morimorimokenpi](https://github.com/morimorimokenpi)).
* `first-day-of-week` and `weekday-format` now work with date-io adapters ([#23310](https://github.com/vuetifyjs/vuetify/pull/23310)).
* VSelect and VAutocomplete with `multiple` no longer duplicate items in the model ([17b7887](https://github.com/vuetifyjs/vuetify/commit/17b78872e1)).

---

## SSR layout { #ssr-layout }

In server-rendered apps, some layout configurations hit the well-known hydration problem: parts of the layout shifted once the app mounted on the client ([#22925](https://github.com/vuetifyjs/vuetify/issues/22925), [#22944](https://github.com/vuetifyjs/vuetify/issues/22944)). Since v4.3.0 the server renders layout sizes and offsets up front ([#23250](https://github.com/vuetifyjs/vuetify/pull/23250)).

It started as a quick look at one drawer report. Testing the fix with a few more layouts turned up other shifts and hydration mismatches, so the fix grew to cover them, checked against over 20 layout variations. As a bug fix it could have gone into a patch release, but changing how every layout item gets its size carries regression risk, so it waited for v4.3.0. If you render on the server, a smoke test of a few distinct layouts after updating would be recommended.

Some setups still shift, mostly where the server can't know a size up front. The PR description lists them with workarounds.

---

## v4.2.x and v3.13.x { #patches }

If you can't move to v4.3.x yet, these fixes landed on the older lines in October:

| Fix | Version | Link |
|-----|---------|------|
| VPagination fits in a flex container | v4.2.4 | [#23149](https://github.com/vuetifyjs/vuetify/pull/23149) |
| VCarousel and VWindow arrows point the right way in RTL | v4.2.4 | [e19e47c](https://github.com/vuetifyjs/vuetify/commit/e19e47c025) |
| VWindow `transition-duration` works with CSS layers | v4.2.4 | [d6ab69b](https://github.com/vuetifyjs/vuetify/commit/d6ab69bfe5) |
| Correct week start and date formatting for Danish, Serbian and Central Kurdish | v4.2.4 | [#23240](https://github.com/vuetifyjs/vuetify/pull/23240), thanks [SulimanAbdulrazzaq](https://github.com/SulimanAbdulrazzaq) |
| VOtpInput stays inside a narrow container | v4.2.5 | [a4c36f9](https://github.com/vuetifyjs/vuetify/commit/a4c36f92d006b4828797814f9aee6159c8ad4e52) |
| VOverlay content in RTL stays in place when page scroll is locked | v4.2.5 | [#23261](https://github.com/vuetifyjs/vuetify/pull/23261), thanks [diaeai](https://github.com/diaeai) |
| VDataTableVirtual allows expanding rows without `show-expand` | v4.2.6, v3.13.7 | [8b41813](https://github.com/vuetifyjs/vuetify/commit/8b41813068) |
| VDataTable cell slots no longer get reused for the wrong row | v3.13.7 | [#23256](https://github.com/vuetifyjs/vuetify/pull/23256), thanks [cestercian](https://github.com/cestercian) |

**Details:**

* [v4.2.6](/getting-started/release-notes/?version=v4.2.6) · [v4.2.5](/getting-started/release-notes/?version=v4.2.5) · [v4.2.4](/getting-started/release-notes/?version=v4.2.4)
* [v3.13.7](/getting-started/release-notes/?version=v3.13.7) · [v3.13.6](/getting-started/release-notes/?version=v3.13.6)

---

## Vuetify0 Progress Update { #vuetify0-progress }

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

<br>

[v1.3.0](https://0.vuetifyjs.com/releases/?version=v1.3.0) shipped on October 20 with Kanban, Menu, Tour, Otp and Virtualizer, plus useFocusTrap and typeahead in Select. The [release post](/blog/announcing-vuetify0-v1-3/) covers them. Otp and Virtualizer come from [sridhar-3009](https://github.com/sridhar-3009) ([#787](https://github.com/vuetifyjs/0/pull/787), [#788](https://github.com/vuetifyjs/0/pull/788)), and useFocusTrap from [Haviles04](https://github.com/Haviles04) ([#939](https://github.com/vuetifyjs/0/pull/939)).

[v1.3.1](https://0.vuetifyjs.com/releases/?version=v1.3.1) followed on October 27. A bare `disabled` attribute, as in `<Menu.Item disabled>`, used to arrive as an empty string and left the item enabled. It now counts as `true` ([#1106](https://github.com/vuetifyjs/0/pull/1106)). Arrow keys on horizontal tabs also follow RTL ([#1105](https://github.com/vuetifyjs/0/pull/1105)).

Support for non-Gregorian calendars in `useDate` is merged but not released yet ([#1100](https://github.com/vuetifyjs/0/pull/1100)).

[@paper/bulma v0.2.0](https://github.com/vuetifyjs/0/releases/tag/%40paper/bulma%400.2.0) lets you reach a compound's parts from the parent import: import `BuModal` and use `<BuModal.Head />` ([#946](https://github.com/vuetifyjs/0/pull/946)).

### Design systems { #design-systems }

Vuetify0 is headless. Design systems are what give it a look. [Emerald](https://0.vuetifyjs.com/systems/emerald) shipped in August. **Onyx**, the second original system, is still to come, with its own look on the same headless core.

We're also planning full recreations of other design systems on Vuetify0:

* **Bootstrap 6**
* **Ant Design**
* **Material Design 1**, an anniversary edition of the look Vuetify started with
* **HeroUI**

No dates yet. [Bulma](https://0.vuetifyjs.com/systems/bulma) is the recreation that's already out.

::: success

**Adopting Vuetify0 for your business?** Teams building production design systems, internal tooling, or product UI on top of Vuetify0 can [reach out](mailto:john@vuetifyjs.com) to talk through adoption, partnership, and roadmap input.

:::

**Details:**

* [Announcing Vuetify0 v1.3](/blog/announcing-vuetify0-v1-3/)
* [v1.3.0](https://github.com/vuetifyjs/0/releases/tag/v1.3.0) · [v1.3.1](https://github.com/vuetifyjs/0/releases/tag/v1.3.1) · [v1.2.4](https://github.com/vuetifyjs/0/releases/tag/v1.2.4)
* [Vuetify0 documentation](https://0.vuetifyjs.com/)

---

## Play, MCP and Nuxt { #ecosystem }

[Play](https://play.vuetifyjs.com/) resolves `vuetify/*` and `@vuetify/v0` imports, and accepts `unpkg.com` in import hints. Old playgrounds migrate `vuetify.js` when opened, and bump Vue when the pinned version doesn't fit the chosen Vuetify. A playground can also open in [v0 Play](https://v0play.vuetifyjs.com/). Pasting on localhost and bare imports work again.

[Vuetify MCP v0.12.2](https://github.com/vuetifyjs/mcp/releases/tag/v0.12.2) registers the server with the MCP registry ([#51](https://github.com/vuetifyjs/mcp/pull/51)) and stops pointing agents at a removed tool ([#50](https://github.com/vuetifyjs/mcp/pull/50), thanks [Being-RAYtastic](https://github.com/Being-RAYtastic)).

The Nuxt module had no release in October. The layer-order fix ([#382](https://github.com/vuetifyjs/nuxt-module/pull/382)) and the fix for shadowing Nuxt's `useLayout` ([#388](https://github.com/vuetifyjs/nuxt-module/pull/388)) are merged after [v1.0.0-rc.6](https://github.com/vuetifyjs/nuxt-module/releases/tag/v1.0.0-rc.6), but not on npm yet.

---

## What's Next { #whats-next .mt-4 }

Patches ship weekly, and [v4.3.2](/getting-started/release-notes/?version=v4.3.2) went out on November 3. The deadline for v4.4.0 is December 8. Merged on `dev` for it so far:

* [VBadge](/components/badges/) gets an `icon-size` prop ([#23323](https://github.com/vuetifyjs/vuetify/pull/23323), thanks [morimorimokenpi](https://github.com/morimorimokenpi))
* [VFab](/components/floating-action-buttons/) with a `start` or `end` location flips in RTL ([#23341](https://github.com/vuetifyjs/vuetify/pull/23341))

One open PR may make it too: type definitions for components, written by hand next to their sources ([#23266](https://github.com/vuetifyjs/vuetify/pull/23266)). They make it easier to wrap Vuetify components in your own. Type-checking an app that calls `createVuetify()` also takes about a quarter of the time and memory it does now.

::: warning

**Help keep Vuetify going.** Open Collective funds are running low, and community support is what lets the team keep shipping. If your team relies on Vuetify, point your organization at [Open Collective](https://opencollective.com/vuetify) or [GitHub Sponsors](https://github.com/sponsors/johnleider).

:::

Thanks to everyone who sent a PR in October: [aozmekik](https://github.com/aozmekik), [ardaalkan](https://github.com/ardaalkan), [ascott18](https://github.com/ascott18), [b84330808](https://github.com/b84330808), [cestercian](https://github.com/cestercian), [DangTAnh](https://github.com/DangTAnh), [diaeai](https://github.com/diaeai), [dilipsaroj](https://github.com/dilipsaroj), [ikushum](https://github.com/ikushum), [lazerg](https://github.com/lazerg), [mahsarajabpour](https://github.com/mahsarajabpour), [MatthewAry](https://github.com/MatthewAry), [morimorimokenpi](https://github.com/morimorimokenpi), [rafaself](https://github.com/rafaself), [SulimanAbdulrazzaq](https://github.com/SulimanAbdulrazzaq), [userquin](https://github.com/userquin), [vicuts](https://github.com/vicuts) and [ZainnQureshii](https://github.com/ZainnQureshii) in the framework, [araishi](https://github.com/araishi) and [sridhar-3009](https://github.com/sridhar-3009) in Vuetify0, and [Being-RAYtastic](https://github.com/Being-RAYtastic) in Vuetify MCP.

See you in November!

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://community.vuetifyjs.com), and follow [@vuetifyjs](https://twitter.com/vuetifyjs) for the latest announcements.*
