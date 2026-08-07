---
layout: blog
meta:
  title: July 2026 Update
  description: Vuetify0 shipped 1.0, Vuetify 3.13 closed the v3 line and started its LTS clock, and v4.1 picked up five patches
  keywords: Vuetify July 2026, Vuetify0 1.0, Vuetify 3.13 LTS, Shadow DOM, VVirtualScroll
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
    return `https://cdn.vuetifyjs.com/docs/images/blog/july-2026-update/releases-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

# July 2026 Update

**Two things finished in July.** On the 22nd [Vuetify0 hit 1.0](/blog/announcing-vuetify0-v1/) — the headless layer under everything we build is now locked under semver, with CI failing any PR that moves it. Five days later [v3.13.0](/getting-started/release-notes/?version=v3.13.0) shipped as the last v3 minor, which starts the [LTS clock](/introduction/long-term-support/) on a line that has been going since 2022. In between, v4.1 took five patches, one of which is smaller than it sounds and more interesting than it looks: `document.activeElement` lies to you when your app is inside a custom element, and fixing that quietly made Vuetify usable inside a web component.

![Hero image for July update](https://cdn.vuetifyjs.com/docs/images/blog/july-2026-update/july-hero.png "July hero image"){ height=112 }

🖊️ Jacek Czarniecki • 📅 August 10th, 2026

<PromotedEntry />

---

## A month of endings

**72 commits**, **14 authors**, **nine framework releases** across two lines, and **seven** Vuetify0 releases from rc.6 through 1.0.2. No new features in v4 — July was entirely patches, docs, and the two milestones above. If you were waiting on `v4.2`, that work is partially done but queued for thorow review; keeping 4.1 boring while v0 went 1.0 was the deliberate part.

---

## Table of Contents

* [Releases](#releases)
  * [Key Improvements](#key-improvements)
* [Spotlight: Vuetify0 1.0](#vuetify0-1-0)
* [Spotlight: v3.13 and the LTS clock](#v3-13-lts)
* [Framework Updates](#framework-updates)
  * [Vuetify inside a shadow root](#shadow-dom)
  * [Virtual scroll and selects](#virtual-scroll)
  * [Bug Fixes](#bug-fixes)
  * [In Development](#in-development)
* [Around Vuetify0](#around-vuetify0)
* [Ecosystem](#ecosystem)
* [Product Updates](#product-updates)
* [July 2026 Changelog](#july-2026-changelog)
* [What's Next](#whats-next)
  * [Looking Further Ahead](#looking-ahead)

---

## Releases

Nine releases, two lines. On v4: [v4.1.3](/getting-started/release-notes/?version=v4.1.3) (Jul 2), [v4.1.4](/getting-started/release-notes/?version=v4.1.4) (Jul 7), [v4.1.5](/getting-started/release-notes/?version=v4.1.5) (Jul 13), [v4.1.6](/getting-started/release-notes/?version=v4.1.6) (Jul 23) and [v4.1.7](/getting-started/release-notes/?version=v4.1.7) (Jul 30). On v3: [v3.12.9](/getting-started/release-notes/?version=v3.12.9), [v3.12.10](/getting-started/release-notes/?version=v3.12.10), [v3.12.11](/getting-started/release-notes/?version=v3.12.11), and then [v3.13.0](/getting-started/release-notes/?version=v3.13.0) on July 27 to close the line.

The v3 patches are mostly backports: if a fix applied to both trees, it went to both. Following patch releases v3.13.x are meant to ship mostly important bug fixes and security pathes, so the LTS can stabilize.

<AppFigure :src="releasesimg" alt="July Releases Banner" title="July Releases Banner" />

### Key Improvements

* **[Vuetify0 1.0](/blog/announcing-vuetify0-v1/)** — 19 composables, 17 utilities and a 13-component spine that keep their names and signatures for the whole 1.x line
* **[Vuetify 3.13](/getting-started/release-notes/?version=v3.13.0)** — final v3 minor: new multi-selection events on the select family, a mobile header slot and `aria-sort` on VDataTable, a `types` prop for VSkeletonLoader, `size` on VBtnGroup
* **Shadow DOM** — keyboard nav, focus traps, hotkeys and dialog autofocus all work inside an open shadow root now ([#23024](https://github.com/vuetifyjs/vuetify/pull/23024), [#23027](https://github.com/vuetifyjs/vuetify/pull/23027))
* **[VVirtualScroll](/components/virtual-scroller/)** — recalculates on item resize ([#22938](https://github.com/vuetifyjs/vuetify/pull/22938)) and stops dropping the top of the list when you append to the bottom
* **[VSelect / VAutocomplete / VCombobox](/components/selects/)** — one PR ([#23029](https://github.com/vuetifyjs/vuetify/pull/23029)) that closed four separate list-with-selection issues, some open since 2024
* **[defaults](/features/global-configuration/)** — nested root defaults survive the teleport reset, which fixes three long-standing reports at once ([#23015](https://github.com/vuetifyjs/vuetify/pull/23015))

View the complete list of changes in the [Full Changelog](#july-2026-changelog).

---

## Spotlight: Vuetify0 1.0 { #vuetify0-1-0 }

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

<br>

July started with the [release candidate](/blog/announcing-vuetify0-rc/) on the 2nd and ended with [1.0.0](/blog/announcing-vuetify0-v1/) on the 22nd. The API commitment made back in the beta held all the way through — nothing renamed, nothing removed.

One thing to be clear about, because "1.0" reads like "everything is finished": **it isn't, and that's on purpose.** v0 is a headless meta-framework — you build your components on top of it, so what has to stop moving first is the logic underneath, not the component list. Locked today: 19 composables, 17 utilities, and a 13-component spine — `Atom`, `AspectRatio`, `Theme`, `Group`, `Selection`, `Single`, `Step`, `Tabs`, `Toggle`, `Collapsible`, `Checkbox`, `Radio`, `Switch`. Everything else stays `preview` and graduates one at a time on its own milestone.

To be clear about what "locked" means: the shape stays put, the code does not. Fixes, performance work and new additive options ship as normal — what cannot happen is a rename, a removal, or a changed signature outside a major. And it is not a promise in a blog post either: a CI check fails any PR that alters the public API.

Promotions have a rule too — a component can't be marked more stable than the composables it imports, so nothing gets a stable badge on top of a moving base.

<!-- TODO: screenshot — the v0 maturity matrix at https://0.vuetifyjs.com/roadmap#maturity-matrix, showing the 13 stable components -->

**Details:**

* [Announcing Vuetify0 1.0](/blog/announcing-vuetify0-v1/)
* [Announcing the Vuetify0 Release Candidate](/blog/announcing-vuetify0-rc/)
* [Vuetify0 Documentation](https://0.vuetifyjs.com/)

---

## Spotlight: v3.13 and the LTS clock { #v3-13-lts }

<AppFigure :src="vuetifylogo" alt="Vuetify logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Logo" />

<br>

[v3.13.0](/getting-started/release-notes/?version=v3.13.0) is the last v3 minor. It shipped on July 27, and that date is now the LTS start on the [support table](/introduction/long-term-support/) — **v3 gets critical bug fixes and security patches until July 27th, 2027.**

We also shortened the LTS window from 18 months to 12, and a smaller number deserves a reason. Eighteen months made sense when a major landed every four years and upgrading meant a rewrite. v3 → v4 is nothing like that — the [upgrade guide](/getting-started/upgrade-guide/) is short, and a year is plenty for a team that puts it on the board. Keeping it open longer would mostly mean maintaining two codebases, which slows down the one you are actually going to use.

3.13 is not a goodbye commit either — it shipped real features, most of them backports of things v4 users already had:

* **VSelect/VAutocomplete/VCombobox** — new events for multi-selection, closing [#4054](https://github.com/vuetifyjs/vuetify/issues/4054) and [#5682](https://github.com/vuetifyjs/vuetify/issues/5682), both filed in 2018, back when Vuetify 1 was the current version
* **VDataTable** — a mobile header slot, `aria-sort` on sortable headers, and aria labels on the selection checkboxes
* **VSkeletonLoader** — a `types` prop, a new `chip-group` type, and fixes to the `table` type
* **VBtnGroup** — a `size` prop, so grouped buttons size alignes with standalone ones

If you are on v3 and staying there for now, 3.13 is the version to land on.

**Details:**

* [v3.13 Release Notes](/getting-started/release-notes/?version=v3.13.0)
* [Long-term support](/introduction/long-term-support/)
* [Upgrade guide](/getting-started/upgrade-guide/)

---

## Framework Updates

### Vuetify inside a shadow root { #shadow-dom }

Small fix, worth more than its diff. If you have ever mounted Vuetify inside a custom element — micro-frontends, embedded widgets, a component you hand to another team's page — you probably hit this and filed it as "keyboard nav is broken."

It comes down to one bit of DOM behavior. `document.activeElement` stops at the shadow boundary and hands you the *host* element, not the input that actually has focus. Everything built on top inherits that lie: `el.contains(document.activeElement)` says false for elements that are genuinely focused, `elements.indexOf(document.activeElement)` comes back `-1`. So arrow-key navigation in VList has no starting point, focus traps let Tab walk out, `useHotkey` decides you are not typing in an input, and VDialog autofocuses the wrong node.

The fix is a `getActiveElement()` that walks down through `shadowRoot.activeElement` until it bottoms out, then using it everywhere we were reading the raw property:

```ts
export function getActiveElement (): Element | null {
  let active = document.activeElement
  while (active?.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement
  }
  return active
}
```

[#23024](https://github.com/vuetifyjs/vuetify/pull/23024) landed it in `focusTrap`, `getNextElement` and `focusChild`; [#23027](https://github.com/vuetifyjs/vuetify/pull/23027) followed up across VDialog, VField, VTextField, VTextarea, VFileInput, `useActivator`, `useHotkey` and VCommandPalette. Nothing to change on your side.

An afternoon of work, and that is the point: **it was not a hard problem, it was just an unexplored one.** Nobody had pushed on Vuetify-in-a-web-component hard enough for these to surface. Now that focus behaves, the next thing you will run into is styling — Vuetify's CSS lives in the document, so a shadow root gets none of it unless you inject the stylesheet inside the boundary, and any teleported overlay lands on `document.body`, outside your shadow root, where that stylesheet does not reach either. `attach` takes an element, so you can point your menus and dialogs back inside:

```vue
<v-menu :attach="shadowContainer">
```

We are not claiming this is solved. What we are saying is the door is open, and we would like to know what is behind it. If you are shipping Vuetify as a web component — or gave up on it a year ago — try it again on v4.1.6+ and [open an issue](https://issues.vuetifyjs.com/) for what breaks. Concrete reproductions are what turn this from an afternoon into a supported story.

### Virtual scroll and selects { #virtual-scroll }

The other big theme was virtual scrolling, and it fed straight into the select family — the menus render through the same [virtual list](/components/virtual-scroller/), so a scroller bug is a VSelect bug wearing a different issue number.

[#22938](https://github.com/vuetifyjs/vuetify/pull/22938) — thanks to [@pinichi](https://github.com/pinichi) — makes the scroller recalculate visible items when an item resizes, instead of trusting the height it measured on first render. That is the bug where a row expands and everything below it drifts. A companion fix stops the scroller from trimming items off the top when you append to the bottom, which is the classic infinite-scroll-loses-your-place report ([#20959](https://github.com/vuetifyjs/vuetify/issues/20959)).

With those in place, [#23029](https://github.com/vuetifyjs/vuetify/pull/23029) reworked how VSelect, VAutocomplete and VCombobox drive their lists and closed four issues in one go ([#22531](https://github.com/vuetifyjs/vuetify/issues/22531), [#22539](https://github.com/vuetifyjs/vuetify/issues/22539), [#21404](https://github.com/vuetifyjs/vuetify/issues/21404), [#20482](https://github.com/vuetifyjs/vuetify/issues/20482)) — all variations on "the menu scrolls to the wrong item when something is already selected." VDataTableVirtual got its own version of the same problem fixed for expanded rows ([#23014](https://github.com/vuetifyjs/vuetify/pull/23014)).

### Notable Bug Fixes

| Component                | Fix                                                    | Version | PR / commit                                                    |
|--------------------------|--------------------------------------------------------|---------|----------------------------------------------------------------|
| **rounded**              | Translate `2xl`, `3xl`, etc. to classes                | v4.1.3  | [0ea03f4](https://github.com/vuetifyjs/vuetify/commit/0ea03f4) |
| **VDataTable**           | Keep rows visible after hiding a custom-filter column  | v4.1.3  | [#22971](https://github.com/vuetifyjs/vuetify/pull/22971)      |
| **VDateInput**           | Derive display format from the date adapter locale     | v4.1.3  | [#22976](https://github.com/vuetifyjs/vuetify/pull/22976)      |
| **VOtpInput**            | Correct focus movement in RTL, and mobile paste        | v4.1.3  | [f0145aa](https://github.com/vuetifyjs/vuetify/commit/f0145aa) |
| **VMenu**                | Correct close cascade for nested menus                 | v4.1.4  | [5902e09](https://github.com/vuetifyjs/vuetify/commit/5902e09) |
| **VMenu**                | Click-outside detection when the content resizes       | v4.1.4  | [007f546](https://github.com/vuetifyjs/vuetify/commit/007f546) |
| **VNumberInput**         | Accept a non-ASCII minus sign                          | v4.1.4  | [6063d7a](https://github.com/vuetifyjs/vuetify/commit/6063d7a) |
| **VNumberInput**         | Keep all decimals when `precision` is `null`           | v4.1.4  | [87b0e57](https://github.com/vuetifyjs/vuetify/commit/87b0e57) |
| **types**                | Support route autocompletion when using `to` prop      | v4.1.5  | [d4d7b4b](https://github.com/vuetifyjs/vuetify/commit/d4d7b4b) |
| **VCalendar**            | Missing interval props, and no bleed into the next day | v4.1.5  | [#23000](https://github.com/vuetifyjs/vuetify/pull/23000)      |
| **VOverlay**             | Skip the click-outside DOM scan while inactive         | v4.1.5  | [74e297f](https://github.com/vuetifyjs/vuetify/commit/74e297f) |
| **defaults**             | Keep nested root defaults through the teleport reset   | v4.1.6  | [#23015](https://github.com/vuetifyjs/vuetify/pull/23015)      |
| **VList**                | Keyboard navigation inside an open Shadow DOM          | v4.1.6  | [#23024](https://github.com/vuetifyjs/vuetify/pull/23024)      |
| **VDialog / VField**     | Focus resolution in Shadow DOM                         | v4.1.6  | [#23027](https://github.com/vuetifyjs/vuetify/pull/23027)      |
| **VDialog**              | Defer autofocus until the inner field can take it      | v4.1.6  | [8908e7e](https://github.com/vuetifyjs/vuetify/commit/8908e7e) |
| **VImg**                 | Handle null ref error                                  | v4.1.6  | [0f72baf](https://github.com/vuetifyjs/vuetify/commit/0f72baf) |
| **VVirtualScroll**       | Recalculate visible items on item resize               | v4.1.6  | [#22938](https://github.com/vuetifyjs/vuetify/pull/22938)      |
| **VSelects**             | Reliable list rendering with an existing selection     | v4.1.6  | [#23029](https://github.com/vuetifyjs/vuetify/pull/23029)      |
| **VDataTableVirtual**    | No scroll glitches with expanded rows                  | v4.1.6  | [#23014](https://github.com/vuetifyjs/vuetify/pull/23014)      |
| **elevation**            | `hover-elevation` no longer requires `elevation`       | v4.1.7  | [378f593](https://github.com/vuetifyjs/vuetify/commit/378f593) |
| **VAutocomplete**        | Camelize item props for prepend icon and avatar        | v4.1.7  | [8a20623](https://github.com/vuetifyjs/vuetify/commit/8a20623) |
| **VProgressLinear**      | avoid dropping the transition timing (Vite 8)          | v4.1.7  | [f23af8a](https://github.com/vuetifyjs/vuetify/commit/f23af8a) |
| **VTextField**           | Respect `hide-details="auto"` with a counter           | v4.1.7  | [#22620](https://github.com/vuetifyjs/vuetify/pull/22620)      |

Two of these deserve a note. The `defaults` fix ([#23015](https://github.com/vuetifyjs/vuetify/pull/23015)) is the one where a teleported component forgot your root defaults, because the reset threw away too much — it closes [#23009](https://github.com/vuetifyjs/vuetify/issues/23009), [#22506](https://github.com/vuetifyjs/vuetify/issues/22506) and [#21814](https://github.com/vuetifyjs/vuetify/issues/21814) in one go.

And if you moved to Vite 8, grab v4.1.7. Several components used `transition: inherit` next to their own `transition-property`, which Vite 8's CSS pipeline no longer keeps intact — the inherited duration and timing function vanished and the animation snapped instead of easing. Now spelled out as longhands ([#23046](https://github.com/vuetifyjs/vuetify/issues/23046)).

---

## Around Vuetify0 { #around-vuetify0 }

Shipping 1.0 was only part of the month. A few things worth pointing at:

**Accessibility got a number.** An [axe-core sweep](https://github.com/vuetifyjs/0/pull/736) now runs over all 40 components in real Chromium, using each component's own `@example` as the fixture. First pass: 10 violations across 7 components. Nothing was fixed in that PR — the point was to stop guessing. It runs as an advisory CI job that posts the breakdown to the step summary, so the number can only go down from here.

Individual fixes followed, most of them from [@sridhar-3009](https://github.com/sridhar-3009): `Snackbar` got an `urgent` prop that flips the live region from `role="status"` to `role="alert"`, `Breadcrumbs` stopped stranding collapsed links in the accessibility tree, `Carousel` pauses autoplay on keyboard focus, and Button / Toggle / PaginationItem now activate on Enter and Space when you render them `as` something that isn't a `<button>`.

**The benchmarks got trustworthy.** They used to be written by whoever ran `pnpm metrics` last — laptop runs and CI runs overwriting each other, with the homepage reporting whichever landed most recently. Two identical CI runs on the same day disagreed by 18%. It is nailed down now: one writer, one runner, and a check that fails any feature PR that touches the metrics files. Numbers you can actually compare between versions.

<!-- TODO: screenshot — the Benchmark Explorer at https://0.vuetifyjs.com with the tier filter open -->

**The docs picked up a tour.** The home hero CTA is now "Take a tour" instead of "Ask AI", and component pages carry step-through popovers. Elsewhere: API reference filtering by component name, a searchable releases page with install snippets, and a [compatibility page](https://0.vuetifyjs.com/guide/integration/compatibility) answering the question that shows up every week — *can I use v0 alongside Vuetify / PrimeVue / Nuxt UI / VueUse?* (Short answer: yes for styled libraries, they are a different layer; don't stack it with another headless library, that's the same layer.)

<!-- TODO: screenshot — the v0 docs guided tour popover mid-step on a component page -->

**And a calendar.** The [roadmap](https://0.vuetifyjs.com/roadmap) now publishes dates for v1.1 through v1.5, each showing what is new and which preview primitives graduate to stable with it — DataTable, DataGrid and Alert in September, through DatePicker in December.

<!-- TODO: screenshot — the v1.1–v1.5 release calendar timeline on the v0 roadmap page -->

::: success

**Adopting Vuetify0 for your business?** Teams building production design systems, internal tooling, or product UI on top of v0 can [reach out](mailto:john@vuetifyjs.com) to talk through adoption, partnership, and roadmap input.

:::

---

## Ecosystem

**[CLI](https://github.com/vuetifyjs/cli) v1.2** added a `release-notes` command. `vuetify release-notes` prints the notes for the latest Vuetify release; pass `v0` to read Vuetify0's instead, or `--version 4.1.1` for a specific one. It reads the GitHub Releases API with native `fetch`, so no new dependencies, and it links back to the docs release-notes page. Landed after v1.2.1 and coming in the next release: the same output links to [pkg-diff](https://github.com/vuetifyjs/pkg-diff), so you can see what actually changed in the published tarball before you upgrade.

<!-- TODO: screenshot — terminal running `vuetify release-notes` -->

Nuxt 4.5 ships its own `useLayout`, which collides with ours. The CLI templates now set `prefixComposables: ['useLayout']` so a fresh `vuetify create` doesn't start with an ambiguous auto-import.

**[Nuxt Module](https://github.com/vuetifyjs/nuxt-module) v1.0.0-rc.3** is the other half of that: selective imports and prefixing for composables, so you can pull in only what you use and rename anything that clashes with your own code or with Nuxt's.

**[MCP](https://github.com/vuetifyjs/mcp) v0.8.0** re-synced its composable and component inventory against the v0 1.0 barrels, so whatever agent you have wired up gets what actually shipped instead of the RC list.

---

## What's Next { .mt-4 }

August is where v4.2 stops being a milestone and starts being a release. The VTreeview accessibility work, the VSlider `pill` variant, VBreadcrumbs collapse and dynamic masks for VMaskInput are all written and waiting for a few final touches.

With v0 at 1.0, Vuetify finally has something that won't move underneath it, so the **theme**, **locale** and **date** migrations go from "planned" to actual PRs. v0's own [v1.1](https://0.vuetifyjs.com/roadmap) is dated September 4, bringing DataTable, DataGrid and Alert.

---

::: warning

**Vuetify needs your support.** The OpenCollective trend keeps picking up slowly and we appreciate every contribution toward ongoing work on the framework and the tools around it. If your team relies on Vuetify, make the case to your manager that sponsoring the OSS you build on is worth a line in the budget. Point them at [Open Collective](https://opencollective.com/vuetify) or [GitHub Sponsors](https://github.com/sponsors/johnleider). Every contribution keeps Vuetify afloat.

:::

Vuetify is and always will be free and open source. If your team builds on the framework, Vuetify0, the MCP, the CLI, the Nuxt module, the ESLint plugin, or any of the design systems coming behind them, your support directly funds continued development. [Vuetify One](https://one.vuetifyjs.com/) and [GitHub Sponsors](https://github.com/sponsors/johnleider) are the most direct ways to help.

Thanks to everyone who sent a PR this month — fourteen people touched the framework in July, and several of the fixes above came from outside the core team. See you in August.

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://community.vuetifyjs.com), and follow [@vuetifyjs](https://twitter.com/vuetifyjs) for the latest announcements. The best is yet to come!*
