---
layout: blog
meta:
  title: September 2026 Update
  description: This September the team shipped v4.2, followed by 3 patches, while steadily moving to offload more utilities to @vuetify/v0.
  keywords: Vuetify September 2026, Vuetify 4.2, Vuetify 4.3, @vuetify/v0, VInfiniteCarousel, CSS layers, Vuetify MCP
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
</script>

# September 2026 Update

Welcome to the September update! [v4.2.0](/getting-started/release-notes/?version=v4.2.0) shipped, three patches followed, and Vuetify started moving parts of itself onto Vuetify0 for 4.3. The bigger news might be for teams still on Vuetify 2. The Vuetify MCP can now plan your whole upgrade to v4 and do a lot of the heavy lifting for you. [Here's how it works](#upgrade-with-vuetify-mcp).

![Hero image for September update](https://cdn.vuetifyjs.com/docs/images/blog/september-2026-update/september-hero.png "September hero image"){ height=112 }

🖊️ Jacek Czarniecki • 📅 October 7th, 2026

<PromotedEntry />

---

## September in numbers

**24 merged PRs** in the framework repo, **7 features and 21 fixes** (unique commits) and **8 releases** overall. [Vuetify0](https://0.vuetifyjs.com/) merged 34 PRs and shipped three patches. Its npm downloads went from 7.7k in August to 294k in September, because every `vuetify@4.2` install now pulls it in.

---

## Thank you, sponsors { #thank-you-sponsors }

Before we dig in, a big thank you to the companies that back Vuetify every single month. Our top and Platinum sponsors are below, and everyone else is on our [sponsors page](/introduction/sponsors-and-backers/). You're the reason we get to keep doing this.

<SponsorSponsors tier="-2" />

<SponsorSponsors tier="1" />

<br>

<SponsorSponsors tier="2" />

---

## Table of Contents

* [Key Improvements](#key-improvements)
* [Spotlight: Leaving Vuetify 2 behind](#upgrade-with-vuetify-mcp)
* [Spotlight: Vuetify0 inside Vuetify](#vuetify0-inside-vuetify)
* [Framework Updates](#framework-updates)
  * [Bug Fixes](#bug-fixes)
  * [CSS layer order](#css-layer-order)
  * [Coming in 4.3](#coming-in-4-3)
  * [In Development](#in-development)
* [Vuetify0 Progress Update](#vuetify0-progress)
* [Tooling Updates](#ecosystem-tooling)
* [What's Next](#whats-next)

---

## Key Improvements

**Coming in v4.3.0:**

* **Vuetify0 adoption** — RTL, locale and the resize/intersection/mutation observers now delegate to `@vuetify/v0` ([#23213](https://github.com/vuetifyjs/vuetify/pull/23213), [#23214](https://github.com/vuetifyjs/vuetify/pull/23214), [#23220](https://github.com/vuetifyjs/vuetify/pull/23220))
* **[VInfiniteCarousel](https://dev.vuetifyjs.com/en/components/infinite-carousels/)** — new labs component for marquees and logo strips ([#23116](https://github.com/vuetifyjs/vuetify/pull/23116))
* **[VTabs](/components/tabs/)** — `slider-variant="primary"` for the MD3 primary tab slider ([#23181](https://github.com/vuetifyjs/vuetify/pull/23181))
* **[VNavigationDrawer](/components/navigation-drawers/)** — `modal` flag and `v-model:expanded` for rail drawers ([#23182](https://github.com/vuetifyjs/vuetify/pull/23182))
* **[VDateInput](/components/date-inputs/)** — localized format hints as the placeholder ([#23173](https://github.com/vuetifyjs/vuetify/pull/23173))

**Patched in 4.2.x:**

* **CSS layers** — docs now recommend linking `layers.css` in `<head>`, since bundlers can land component CSS before the layer order ([#23205](https://github.com/vuetifyjs/vuetify/pull/23205))
* **VSelect / VAutocomplete** — browser autofill values are now matched against item values, so address autofill from browsers and extensions selects the right item ([#20560](https://github.com/vuetifyjs/vuetify/issues/20560))
* **`menu-elevation`** — is now deprecated in favor of `menu-props` ([#23193](https://github.com/vuetifyjs/vuetify/pull/23193))

**Beyond Vuetify core:**

* **[Vuetify0 1.2.3](https://0.vuetifyjs.com/releases/?version=v1.2.3)**: `useBreakpoints` fixes found while moving Vuetify's display over
* **[Vuetify MCP 0.12](#upgrade-with-vuetify-mcp)**: a new upgrade engine that plans multi-hop upgrades like v2 to v4 and lets your AI agent apply the safe changes for you ([#30](https://github.com/vuetifyjs/mcp/pull/30))

**Details:**

* Vuetify v4.2: [v4.2.3](/getting-started/release-notes/?version=v4.2.3) · [v4.2.2](/getting-started/release-notes/?version=v4.2.2) · [v4.2.1](/getting-started/release-notes/?version=v4.2.1) · [v4.2.0](/getting-started/release-notes/?version=v4.2.0)
* Vuetify v4.1: [v4.1.13](/getting-started/release-notes/?version=v4.1.13)
* Vuetify v3 LTS: [v3.13.5](/getting-started/release-notes/?version=v3.13.5) · [v3.13.4](/getting-started/release-notes/?version=v3.13.4) · [v3.13.3](/getting-started/release-notes/?version=v3.13.3)
* Vuetify0: [v1.2.3](https://0.vuetifyjs.com/releases/?version=v1.2.3) · [v1.2.2](https://0.vuetifyjs.com/releases/?version=v1.2.2) · [v1.2.1](https://0.vuetifyjs.com/releases/?version=v1.2.1)

---

## Spotlight: Leaving Vuetify 2 behind { #upgrade-with-vuetify-mcp }

<AppFigure :src="mcplogo" alt="Vuetify MCP logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify MCP Logo" />

<br>

Vuetify 2's [long-term support](/introduction/long-term-support/) ended on January 23rd, 2025, and a lot of you are still there. We want to help you move.

**The hard part was never the code. It was the map.** v2 to v4 is two majors stacked on top of each other: Vue 2 to Vue 3 and Vuetify 2 to 3 first, then Vuetify 3 to 4. Each hop has its own breaking changes, its own tooling and its own upgrade guide, and it's easy to stall before you start.

[Vuetify MCP v0.12.0](https://github.com/vuetifyjs/mcp/releases/tag/v0.12.0) (September 10) adds an upgrade engine built for exactly this ([#30](https://github.com/vuetifyjs/mcp/pull/30)). The hosted server never sees your code. It gives your AI agent a plan and a rulebook, and the agent does the searching and editing inside your project:

* **`get_upgrade_plan`** splits the trip into hops. Ask for `v2` to `v4` and you get two, each with an effort rating, a rule index and the right tools: [eslint-plugin-vuetify](https://github.com/vuetifyjs/eslint-plugin-vuetify) for the first hop, plus [vuetify-codemods](https://www.npmjs.com/package/vuetify-codemods) for the second.
* **`get_upgrade_rules`** returns every rule with the patterns to grep for, the replacement and a link to the matching upgrade guide section.
* **`get_migration_receipt_schema`** sets how the agent reports back. Each finding names the file, the proposed patch and a confidence level. Safe, exact matches are marked `auto` so they can be applied in bulk, and everything else is marked `review` for a human.

Here's the top of the real plan it returns for a v2 app:

```text
# Vuetify Upgrade Plan: v2 → v4

Total migration hops: 2
Total rules: 35

## Hop 1: v2 → v3
**Effort:** very-high

## Hop 2: v3 → v4
**Effort:** medium
```

**Connecting takes a minute.** The hosted endpoint is free and needs no account:

```bash
# Claude Code
claude mcp add --transport http vuetify-mcp https://mcp.vuetifyjs.com/mcp

# Cursor, VS Code, Windsurf, Trae and Claude (interactive setup)
npx -y @vuetify/mcp config --remote
```

Then hand your agent something like this:

```text
Using the vuetify-mcp server, upgrade this project from Vuetify 2 to Vuetify 4. Start with get_upgrade_plan and take one hop at a time. Report every finding with the migration receipt schema, apply the auto changes, and list the review items for me.
```

**One hop at a time is the point.** Land on Vuetify 3.13 first, get your tests green, then take the second hop. The v3 line is supported until July 27th, 2027, so you have room to breathe in between. For the first hop, the `get_v3_upgrade_playbook` tool from [v0.11.0](https://github.com/vuetifyjs/mcp/releases/tag/v0.11.0) starts by capturing a Playwright baseline of your app, so you can prove nothing broke.

::: tip

Prefer reading the details yourself? The [Vuetify 2 to 3 guide](https://v3.vuetifyjs.com/en/getting-started/upgrade-guide/) and the [Vuetify 3 to 4 guide](/getting-started/upgrade-guide/) are the same sources the MCP rules link back to.

:::

If you've been putting off this upgrade, this is your sign. Try it on a branch and tell us where it trips in [Discord](https://community.vuetifyjs.com).

---

## Spotlight: Vuetify0 inside Vuetify { #vuetify0-inside-vuetify }

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

<br>

Vuetify 4.2 added `@vuetify/v0` but only leaned on a few small helpers. In September the real move started: we're swapping Vuetify's internals for Vuetify0 code, one system at a time, without changing the API or the output. If the two ever disagree, Vuetify keeps its behavior and the gap gets fixed upstream or written down in the PR.

| Area                               | Status                         | PR                                                          |
|------------------------------------|--------------------------------|-------------------------------------------------------------|
| Type guards, `range`, highlighting | shipped in 4.2.0               | [#23039](https://github.com/vuetifyjs/vuetify/pull/23039)   |
| RTL                                | coming in 4.3                  | [#23213](https://github.com/vuetifyjs/vuetify/pull/23213)   |
| Locale (`t()`)                     | coming in 4.3                  | [#23214](https://github.com/vuetifyjs/vuetify/pull/23214)   |
| Resize, intersection and mutation observers | coming in 4.3         | [#23220](https://github.com/vuetifyjs/vuetify/pull/23220)   |
| Display / breakpoints              | in review for 4.3              | [#23210](https://github.com/vuetifyjs/vuetify/pull/23210)   |
| Theme and date systems             | in progress for v5             | [#22765](https://github.com/vuetifyjs/vuetify/pull/22765), [#22768](https://github.com/vuetifyjs/vuetify/pull/22768) |

**RTL and locale.** Direction and translations now live in Vuetify0, while your locale settings still decide which way the page reads. Switching locales updates `isRtl` in the same tick, so nothing ever sees a stale direction. Number formatting (`n()`) stays on Vuetify's own `Intl.NumberFormat` for now, because Vuetify0's version skips `Intl` on the server and would change server-rendered pagination numbers. And since neither Vuetify0 plugin is installed, it never touches `dir` on your `<html>`.

**Observers.** Resize, intersection and mutation observing (`useResizeObserver`, `useIntersectionObserver`, `v-mutate`) now run on Vuetify0. Vuetify gets a net 184 lines lighter and keeps only the precise measurements its layout components depend on.

**Display.** The display PR, still in review, moves breakpoints onto Vuetify0 and uses `matchMedia` where it can, so a zoomed page lands on the same breakpoint as your CSS media queries. Building it shook out two bugs in Vuetify0's `createBreakpoints`, both already fixed in [1.2.3](https://0.vuetifyjs.com/releases/?version=v1.2.3) ([#1003](https://github.com/vuetifyjs/0/pull/1003), [#1004](https://github.com/vuetifyjs/0/pull/1004)).

**Theme stays in Vuetify for 4.x.** Vuetify0 could only have taken over the `prefers-color-scheme` listener, so the full theme rebuild is happening on the v5 track instead (last row above).

### What this means for you

You don't have to do anything. Because Vuetify pulls in `@vuetify/v0@^1.2.1`, a fix to a shared composable reaches Vuetify, [Emerald](https://0.vuetifyjs.com/systems/emerald) and [Bulma](https://0.vuetifyjs.com/systems/bulma) the next time you refresh your lockfile. No waiting on a Vuetify release.

**Vuetify0 is the first dependency Vuetify has ever had.** Ten years and four major versions with an empty `dependencies` field, and the first package we let in is one we built ourselves. That's how much we trust it.

---

## Framework Updates

<AppFigure :src="vuetifylogo" alt="Vuetify logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Logo" />

<br>

### Bug Fixes

| Component                     | Fix                                                                  | Version  | PR / commit                                                    |
|-------------------------------|----------------------------------------------------------------------|----------|----------------------------------------------------------------|
| **VMenu**                     | Focus the selected item when opening with arrow keys                 | v4.1.13  | [d65e89e](https://github.com/vuetifyjs/vuetify/commit/d65e89e) |
| **VCalendar**                 | Show border for outside days when the calendar has events            | v4.1.13  | [#22617](https://github.com/vuetifyjs/vuetify/pull/22617)      |
| **VOverlay**                  | Correct location with CSS `zoom`, also without `currentCSSZoom`      | v4.2.1   | [e64d00e](https://github.com/vuetifyjs/vuetify/commit/e64d00e), [1167eae](https://github.com/vuetifyjs/vuetify/commit/1167eae) |
| **VProgressLinear**           | `height` accepts CSS length units                                    | v4.2.1   | [#23166](https://github.com/vuetifyjs/vuetify/pull/23166)      |
| **VDateInput**                | `placeholder` works as the format hint                               | v4.2.1   | [3072bc5](https://github.com/vuetifyjs/vuetify/commit/3072bc5) |
| **VSelect / VAutocomplete**   | Match browser autofill against item values                           | v4.2.2   | [b6c9f5c](https://github.com/vuetifyjs/vuetify/commit/b6c9f5c) |
| **VAutocomplete / VCombobox** | Menu icon no longer toggles twice                                    | v4.2.2   | [#23200](https://github.com/vuetifyjs/vuetify/pull/23200)      |
| **VSelect family**            | `menu-elevation` applies to the menu content                         | v4.2.2   | [#23193](https://github.com/vuetifyjs/vuetify/pull/23193)      |
| **VPullToRefresh**            | Styles wrapped in the components cascade layer                       | v4.2.2   | [#23207](https://github.com/vuetifyjs/vuetify/pull/23207)      |
| **VTabs**                     | Slider animation restored; `inset-radius` applies to ripple and focus ring | v4.2.2 | [1c5545c](https://github.com/vuetifyjs/vuetify/commit/1c5545c), [bf6abfc](https://github.com/vuetifyjs/vuetify/commit/bf6abfc) |
| **VSwitch**                   | Rotate the thumb icon in vertical direction                          | v4.2.2   | [6b090a0](https://github.com/vuetifyjs/vuetify/commit/6b090a0) |
| **VHighlight**                | Correct foreground color in forced-colors mode                       | v4.2.2   | [c00064f](https://github.com/vuetifyjs/vuetify/commit/c00064f) |
| **VCommandPalette**           | Render the `list.prepend` slot                                       | v4.2.2   | [#23204](https://github.com/vuetifyjs/vuetify/pull/23204)      |
| **VDataTable / VDataIterator**| Emit `update:options` once per search                                | v4.2.3   | [2933523](https://github.com/vuetifyjs/vuetify/commit/2933523) |
| **VIcon / VBadge / VBottomNavigation** | Respect the `theme` prop                                    | v4.2.3   | [3d26868](https://github.com/vuetifyjs/vuetify/commit/3d26868) |
| **VOtpInput**                 | Caret and active slot stay in sync during IME composition            | v4.2.3   | [61719f9](https://github.com/vuetifyjs/vuetify/commit/61719f9) |
| **VTimeline**                 | Nested timelines no longer inherit parent styles                     | v4.2.3   | [#23228](https://github.com/vuetifyjs/vuetify/pull/23228)      |
| **VExpansionPanels**          | `rounded-0` should not appear when `rounded` is not set              | v4.2.3   | [17c9f8d](https://github.com/vuetifyjs/vuetify/commit/17c9f8d) |
| **VProgressLinear**           | Split buffer bar should render when value is 0                       | v4.2.3   | [af79966](https://github.com/vuetifyjs/vuetify/commit/af79966) |

Notably, the autofill fix will make the VSelect and VAutocomplete accept address autofill (both from native browser functionality as well as browser extensions). For example, the browser inserts a code like `US` (a country or territory code) instead of `United States` when the field has `autocomplete='country'`. If you upgrade to the latest Vuetify version, and the `items` effective values are country codes, your users will get country selection autocompleted. If you immediately think "_VSelect cannot hold all the subregions for all countries, what if after country field change, I load the regions/states lazily?_". Well... we got you covered. As long as the app is able to resolve the regions list within 1 second and the field was not focused, it will re-apply the selection after `items` get updated.

Meanwhile, **v3.13 LTS** got three patches: scroll glitches with expanded rows in VDataTableVirtual ([3.13.3](/getting-started/release-notes/?version=v3.13.3)), the CSS `zoom` overlay fixes ([3.13.4](/getting-started/release-notes/?version=v3.13.4)), and focus resolution in Shadow DOM ([3.13.5](/getting-started/release-notes/?version=v3.13.5)).

### CSS layer order { #css-layer-order }

Vuetify 4 relies on the order of its cascade layers... Actually, any website that makes use of CSS layers needs to make sure the browser gets them first. Unfortunately since Vite v8, the order of imports in `main.ts` does not guarantee the effective order for the browser (in production). The order is declared as part of `vuetify/styles/core`, but each component also imports its own CSS that opens `@layer vuetify-components`. Multiple community members reached out to let us know about different scenarios that led UI to "misbehave" - wrong colors, wrong text size. It took the team multiple weeks and fixes on multiple angles to finally solve it... that is, as long as your project matches any of the supported scaffolding templates from `@vuetify/cli`. Still, if you struggle and troubleshooting drags for hours, our Discord server is open and someone will be there to help you get through different problems that arise during v3 » v4 migration.

Anyways, the [layers guide](/styles/layers/#custom-layer-order) now recommends a static `public/layers.css` linked before any other stylesheet:

```html { resource="index.html" }
<head>
  <link rel="stylesheet" href="/layers.css">
</head>
```

The Nuxt module inlines the layer order on its own ([nuxt-module#382](https://github.com/vuetifyjs/nuxt-module/pull/382), merged after rc.6). And v4.3 adds a `vuetify/styles/layers` entry point that contains only the order declaration ([ed2dbea](https://github.com/vuetifyjs/vuetify/commit/ed2dbea)).

### Coming in 4.3 { #coming-in-4-3 }

Merged and shipping in [v4.3.0](https://github.com/vuetifyjs/vuetify/milestone/93), due October 15.

**[VInfiniteCarousel](https://dev.vuetifyjs.com/en/components/infinite-carousels/)** (labs) scrolls its content as one continuous strip, repeating it as many times as needed to fill the container. It animates with the Web Animations API, supports dragging, arrows, reverse direction, gaps, separators and keyboard navigation. It clips with `overflow: clip` so the container does not glitch by unexpectedly moving to a focused item. Ships with touch support and vertical direction from day one. It utilizes WAAPI under the hood for smooth play/pause and dragging with cursor ([#23116](https://github.com/vuetifyjs/vuetify/pull/23116)).

<video width="100%" height="auto" loop controls class="mb-4">
  <source src="https://cdn.vuetifyjs.com/docs/images/blog/september-2026-update/demo-of--v-infinite-carousel.webm" type="video/webm"></source>
</video>

**[VTabs](/components/tabs/)** `slider-variant="primary"` renders the MD3 primary tab slider: thicker, rounded on the leading edge and sized to the tab content. The `md3` blueprint uses it by default ([#23181](https://github.com/vuetifyjs/vuetify/pull/23181), closes [#23168](https://github.com/vuetifyjs/vuetify/issues/23168)).

<video width="100%" height="auto" loop controls class="mb-4">
  <source src="https://cdn.vuetifyjs.com/docs/images/blog/september-2026-update/demo-of--tabs-primary-slider.webm" type="video/webm"></source>
</video>

**[VNavigationDrawer](/components/navigation-drawers/)** rail drawers get `modal`, which shows a scrim while the drawer is expanded, and `v-model:expanded` for opening it from a button instead of hover. Combine with `permanent` to ignore clicks on the scrim ([#23182](https://github.com/vuetifyjs/vuetify/pull/23182), closes [#23017](https://github.com/vuetifyjs/vuetify/issues/23017)).

```html
<v-navigation-drawer v-model:expanded="expanded" modal permanent rail>
  ...
</v-navigation-drawer>
```

**[VDateInput](/components/date-inputs/)** shows a localized format hint as the placeholder, built from `Intl.DisplayNames` and filled in as the user types: `TT.MM.JJJJ` in German, `年/月/日` in Japanese. `placeholder` still overrides it ([#23173](https://github.com/vuetifyjs/vuetify/pull/23173)).

<video width="100%" height="auto" loop controls class="mb-4">
  <source src="https://cdn.vuetifyjs.com/docs/images/blog/september-2026-update/demo-of--v-date-input-localized-hints.webm" type="video/webm"></source>
</video>

**[VSlideGroup](/components/slide-groups/)** takes `padding` and `gap`, which together with `scroll-snap` from 4.2 lets the next item peek in ([#23184](https://github.com/vuetifyjs/vuetify/pull/23184), closes [#11972](https://github.com/vuetifyjs/vuetify/issues/11972) from 2020).

Early October additions on `dev`: wheel navigation for VWindow and VCarousel ([#22906](https://github.com/vuetifyjs/vuetify/pull/22906)), `focus()` and `blur()` exposed on VCheckbox, VRadio, VRadioGroup, VSwitch and VColorInput ([#23148](https://github.com/vuetifyjs/vuetify/pull/23148)), and `data-*` attributes on selected and expanded VDataTable rows.

### In Development

Open PRs on the v4.3.0 milestone:

* **VVideo** ([#23241](https://github.com/vuetifyjs/vuetify/pull/23241)) ships a general overhaul, chapters, buffering, wavy progress bar, easier layout customization.
* **VAudio** ([#23227](https://github.com/vuetifyjs/vuetify/pull/23227)) player for music tracks or podcasts with API aligned to match VVideo enhancements. Offers an optional waveform instead of progress bar.
* **VMenu right-click support** ([#23196](https://github.com/vuetifyjs/vuetify/pull/23196)) for framework-native context menu that requires a single prop in place of hacks and workarounds
* Multiple opt-in improvements to align with MD3

### Behind the scenes

Framework maintainers keep the quality bar high and usually act as gatekeepers, but multiple invisible improvements have been made to make it easier for external contributors to work in the forked repo and create PRs that meet all the quality standards.

* new [`AGENTS.md`](https://github.com/vuetifyjs/vuetify/blob/master/AGENTS.md) landed alongside a handful of files and skills to guide AI tools
* dev/Playground was extended to make it easier to test against different browser locales (if you work with i18n heavy apps, feel free to borrow the trick from [skills/playground](https://github.com/vuetifyjs/vuetify/blob/master/.claude/skills/playground/SKILL.md))
* dependencies are managed with a PNPM catalog which simplifies version lookup and future updates are in 1 file only
* no more legacy Cypress specs and leftovers - codebase is fully migrated to Vitest browser mode and 100% of the 2000+ tests pass green
* ESLint got upgraded to v10, lint checks consume less memory when running locally - though it landed in October, it fits nicely on the list

::: tip

Handy command when quickly changing between branches in case one of them has updated dependencies

```sh
pnpx rimraf -g "node_modules" "**/node_modules" && pnpm i
```

:::

---

## Vuetify0 Progress Update { #vuetify0-progress }

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

<br>

Vuetify0 kept its releases boring in September, the good kind of boring: [v1.2.1](https://0.vuetifyjs.com/releases/?version=v1.2.1) (September 1), [v1.2.2](https://0.vuetifyjs.com/releases/?version=v1.2.2) (September 10) and [v1.2.3](https://0.vuetifyjs.com/releases/?version=v1.2.3) (September 24), and nothing but fixes. Everything new is lining up for 1.3, and there's a lot of it.

### Fixes

* **Forms:** `required` on Input and NumberField now really requires a value, so an empty field fails `submit()` even under the default `novalidate`. A misspelled rule alias fails validation instead of quietly passing ([#954](https://github.com/vuetifyjs/0/pull/954), [#953](https://github.com/vuetifyjs/0/pull/953))
* **createFilter:** `keys` takes a ref or getter, so changing which fields you search re-runs the filter ([#982](https://github.com/vuetifyjs/0/pull/982))
* **findMatchRanges:** directional `ignoreAccents` matches text that's already accented exactly as written ([#944](https://github.com/vuetifyjs/0/pull/944)). It's the engine behind VHighlight's `ignore-accents` in Vuetify 4.2.
* **Toggle:** a disabled Toggle on its default `<button>` uses native `disabled` instead of `aria-disabled` ([#985](https://github.com/vuetifyjs/0/pull/985))
* **useStorage:** if the browser refuses `localStorage`, it falls back to memory instead of throwing ([#1001](https://github.com/vuetifyjs/0/pull/1001))
* **useBreakpoints:** the two fixes found during the [display migration](#vuetify0-inside-vuetify) ([#1003](https://github.com/vuetifyjs/0/pull/1003), [#1004](https://github.com/vuetifyjs/0/pull/1004))

**One behavior change to check.** `useTheme`'s adapter no longer sets `color: var(--*-on-background)` on `[data-theme]`. It still writes the custom properties and `color-scheme`. If you run Vuetify0 without a design system and relied on that inherited text color, set it yourself ([#982](https://github.com/vuetifyjs/0/pull/982)).

### Coming in 1.3 { #v0-coming-in-1-3 }

Vuetify0 1.3.0 is due **October 20** ([milestone](https://github.com/vuetifyjs/0/milestone/8)), and the [roadmap](https://0.vuetifyjs.com/roadmap) has the full release calendar. Already merged for it:

* **Tour** ([#178](https://github.com/vuetifyjs/0/pull/178)): guided product tours, finally. `createTour` sequences the steps, and the `Tour` compound brings the pieces (Root, Activator, Highlight, Content, Keyboard, Title, Description, Progress, Prev, Next and Skip). A step can even wait on a form before letting the user move on.
* **Otp** ([#787](https://github.com/vuetifyjs/0/pull/787)): `Otp.Root`, `Otp.Item` and `Otp.HiddenInput` over `createOtp`. Focus hops from box to box, a paste spreads across every box, each box gets its own `aria-label`, and `autocomplete="one-time-code"` lets phones offer the code from an SMS.
* **createCombobox** ([#383](https://github.com/vuetifyjs/0/pull/383)): non-strict mode now keeps typed text that matches no option. Until now `strict` only changed `aria-autocomplete`, and free text was thrown away.
* **Focusable form controls** ([#935](https://github.com/vuetifyjs/0/pull/935)): Checkbox, Radio, Switch, Toggle and Button roots expose their element, and each `.Group` gets a `focus()` that lands on the selected item, or the first one if nothing is selected.
* **Dialog `scrim`** ([#961](https://github.com/vuetifyjs/0/pull/961)): pass `:scrim="false"` to `Dialog.Content` or `AlertDialog.Content` when you draw your own backdrop, so the page doesn't dim twice.

Also merged and waiting for the next release: **useFocusTrap** ([#939](https://github.com/vuetifyjs/0/pull/939)) keeps Tab and Shift+Tab inside overlays that aren't a native `<dialog>` and returns focus when they close, and plugins can opt into a **Vue DevTools inspector** with `{ devtools: true }` ([#948](https://github.com/vuetifyjs/0/pull/948)).

In review for 1.3:

* **Virtualizer** ([#788](https://github.com/vuetifyjs/0/pull/788)): `Virtualizer.Root` and `Virtualizer.Item` put a component on top of `createVirtual`, which has handled virtual scrolling since 0.1.0. Each item measures its own height, so variable-height lists just work.
* **Kanban** ([#1012](https://github.com/vuetifyjs/0/pull/1012)): a compound over `createKanban` with columns, drag and drop, a keyboard move model and screen reader announcements for every pick-up, move and drop.
* **OverlayPanel** ([#979](https://github.com/vuetifyjs/0/pull/979)): a non-modal overlay that handles stacking, Escape, click-outside and focus return, and leaves positioning up to you.

Further out, `createCalendar` brings month grid geometry and keyboard navigation without selection semantics, on the 1.5 milestone ([#980](https://github.com/vuetifyjs/0/pull/980)).

### Docs

The docs now say "Vuetify0" instead of a bare "v0", so nobody mixes us up with Vercel's v0.dev ([#977](https://github.com/vuetifyjs/0/pull/977)). Every page also has a markdown twin: add `.md` to the URL and you've got something you can hand straight to an LLM ([#976](https://github.com/vuetifyjs/0/pull/976)).

The [`vuetify add`](https://0.vuetifyjs.com/guide/tooling/vuetify-cli) command is documented now too. Pick a Vuetify0 example and it drops the code right into your project ([#973](https://github.com/vuetifyjs/0/pull/973)).

::: success

**Adopting Vuetify0 for your business?** Teams building production design systems, internal tooling, or product UI on top of Vuetify0 can [reach out](mailto:john@vuetifyjs.com) to talk through adoption, partnership, and roadmap input.

:::

**Details:**

* [Vuetify0 Documentation](https://0.vuetifyjs.com/)
* [v1.2.3 Release](https://0.vuetifyjs.com/releases/?version=v1.2.3)
* [v0play](https://v0play.vuetifyjs.com)

---

## Tooling Updates { #ecosystem-tooling }

### Vuetify MCP

[v0.12.0](https://github.com/vuetifyjs/mcp/releases/tag/v0.12.0) (September 10) shipped the upgrade engine covered in the [spotlight above](#upgrade-with-vuetify-mcp). [v0.12.1](https://github.com/vuetifyjs/mcp/releases/tag/v0.12.1) (September 15) fixes the launcher when it runs through an npm bin symlink.

### Nuxt Module

[v1.0.0-rc.6](https://github.com/vuetifyjs/nuxt-module/releases/tag/v1.0.0-rc.6) (September 13) fixes the rules import path. Two fixes merged after it and wait for the next RC: the [layer order](#css-layer-order) fix ([#382](https://github.com/vuetifyjs/nuxt-module/pull/382)), and the module no longer shadows Nuxt 4.5's built-in `useLayout` ([#388](https://github.com/vuetifyjs/nuxt-module/pull/388)).

### ESLint plugin

[v2.7.3](https://github.com/vuetifyjs/eslint-plugin-vuetify/releases/tag/v2.7.3) adds missing typography classes to `no-legacy-utilities` and stops `no-deprecated-classes` from reporting the same class as `no-deprecated-typography`.

---

## What's Next { .mt-4 }

v4.3.0 is due October 15. [v4.2.4](/getting-started/release-notes/?version=v4.2.4) and [v3.13.6](/getting-started/release-notes/?version=v3.13.6) shipped this week. Display is the next system to move onto Vuetify0, and we'll keep porting the rest through 4.x minors.

* Link `layers.css` in `<head>` if your buttons or inputs render at the wrong size
* Try [VInfiniteCarousel](https://dev.vuetifyjs.com/en/components/infinite-carousels/) and MD3 tabs on [dev.vuetifyjs.com](https://dev.vuetifyjs.com)
* Planning a v2 or v3 upgrade? Connect Vuetify MCP to your agent and start with `get_upgrade_plan` ([how it works](#upgrade-with-vuetify-mcp))

::: warning

**Help keep Vuetify going.** Open Collective funds are running low, and community support is what lets the team keep shipping. If your team relies on Vuetify, point your organization at [Open Collective](https://opencollective.com/vuetify) or [GitHub Sponsors](https://github.com/sponsors/johnleider).

:::

Thanks to everyone who sent a PR in September: [SonTT19](https://github.com/SonTT19), [ajslater](https://github.com/ajslater), [lazerg](https://github.com/lazerg), [modos](https://github.com/modos) and [morimorimokenpi](https://github.com/morimorimokenpi) in the framework, [sridhar-3009](https://github.com/sridhar-3009) in Vuetify0, and [MBK-fr](https://github.com/MBK-fr) in the Nuxt module.

See you in October!

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://community.vuetifyjs.com), and follow [@vuetifyjs](https://twitter.com/vuetifyjs) for the latest announcements.*
