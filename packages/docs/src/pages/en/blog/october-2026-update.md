---
layout: blog
meta:
  title: October 2026 Update
  description: Paladin and Vuetify0 1.3 shipped a day apart. Alerts can dismiss themselves, the v0 bundle got smaller under Vite 8, and 4.2 and v3 picked up another round of patches.
  keywords: Vuetify October 2026, Vuetify 4.3, Paladin, Vuetify0 1.3, Onyx, Emerald, Bootstrap 6, HeroUI
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

Welcome to the October update. [v4.3 Paladin](/blog/announcing-vuetify-4.3/) shipped on the 19th: data tables, a right-click menu, the new labs players, and Expressive styles on seven components. [Vuetify0 1.3](/blog/announcing-vuetify0-v1-3/) followed the next morning, with Kanban and Menu. Both had a patch before the month was over.

![Hero image for October update](https://cdn.vuetifyjs.com/docs/images/blog/october-2026-update/october-hero.png "October hero image"){ height=112 }

🖊️ John Leider • 📅 November 3rd, 2026

<PromotedEntry />

---

## October in numbers

**60 merged PRs** in the framework repo, **30 features and 42 fixes** (unique commits on `master`) and **8 releases**. **84 issues closed** and **30 opened**. [Vuetify0](https://0.vuetifyjs.com/) merged 126 PRs and shipped three releases, headlined by [v1.3.0](https://0.vuetifyjs.com/releases/?version=v1.3.0). npm downloads of `@vuetify/v0` went from 294k in September to 534k in October.

---

## Thank you, sponsors { #thank-you-sponsors }

Before we dig in, a big thank you to the companies that back Vuetify every single month. Our top and Platinum sponsors are below, and everyone else is on our [sponsors page](/introduction/sponsors-and-backers/). You're the reason we get to keep doing this.

<SponsorSponsors tier="-2" />

<SponsorSponsors tier="1" />

<br>

<SponsorSponsors tier="2" />

---

## Table of Contents

* [v4.3 Paladin](#in-4-3)
* [If you're staying on 4.2 or v3](#if-youre-staying-on-4-2-or-v3)
* [Vuetify0 Progress Update](#vuetify0-progress)
* [Design systems](#design-systems)
* [Play](#play)
* [What's Next](#whats-next)

---

## v4.3 Paladin { #in-4-3 }

<AppFigure :src="vuetifylogo" alt="Vuetify logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify Logo" />

<br>

[v4.3.0](/getting-started/release-notes/?version=v4.3.0) went out on October 19. No breaking changes. [v4.3.1](/getting-started/release-notes/?version=v4.3.1) followed on the 26th. The [release post](/blog/announcing-vuetify-4.3/) has the screenshots. Here's what landed.

### Tables and forms

Select-all on a filtered table used to grab every row, including the ones the filter had hidden. The `filtered` strategy limits it to the rows that match ([041bb72](https://github.com/vuetifyjs/vuetify/commit/041bb7269d228e97f9dda210362d149a4d0ff709)). [VAutocomplete](/components/autocompletes/) and [VCombobox](/components/combobox/) can keep a `filtered-order` after the list narrows ([#23282](https://github.com/vuetifyjs/vuetify/pull/23282)). `row-props` now receives `isSelected` and `isExpanded`, and those rows are marked with data attributes, so you can style them without keeping a second list ([#23238](https://github.com/vuetifyjs/vuetify/pull/23238), thanks [DangTAnh](https://github.com/DangTAnh)).

Checkboxes, radios, and switches can show a description under the label ([3e734be](https://github.com/vuetifyjs/vuetify/commit/3e734be3d6e9141237f1b57dd32a1010f5a4f7b8)). [VDateInput](/components/date-inputs/) shows a localized hint for the format it expects ([#23173](https://github.com/vuetifyjs/vuetify/pull/23173)). A [VTextarea](/components/textareas/) with `auto-grow` keeps the browser's own undo history ([#23279](https://github.com/vuetifyjs/vuetify/pull/23279), thanks [b84330808](https://github.com/b84330808)).

### Labs

Five new labs components, plus one more in the patch a week later. [VAudio](/components/audio-players/) ([#23227](https://github.com/vuetifyjs/vuetify/pull/23227)), [VSplitBtn](/components/split-buttons/) ([#23267](https://github.com/vuetifyjs/vuetify/pull/23267)), [VTimeInput](/components/time-inputs/) ([#23141](https://github.com/vuetifyjs/vuetify/pull/23141)), [VLoadingIndicator](/components/loading-indicators/) ([c5ce339](https://github.com/vuetifyjs/vuetify/commit/c5ce3396e1c3e51c6925aab8f3a63365f7acc42a)), and [VInfiniteCarousel](/components/infinite-carousels/) ([#23116](https://github.com/vuetifyjs/vuetify/pull/23116)). [VCheckboxGroup](/components/checkbox-groups/) arrived in 4.3.1. It owns the selected values of its child checkboxes and shows one label and one set of validation messages. Import it from `vuetify/labs/VCheckboxGroup` ([#23299](https://github.com/vuetifyjs/vuetify/pull/23299)). [VVideo](/components/videos/) got an `actions` prop and a rebuilt progress bar and volume control ([#23241](https://github.com/vuetifyjs/vuetify/pull/23241)).

Labs APIs can still move. Pin the version if you ship one of these.

### Right click, and a long press

[VMenu](/components/menus/) opens on right click with `context-menu` ([#23196](https://github.com/vuetifyjs/vuetify/pull/23196)). `v-touch-hold` is the long-press directive for touch devices ([#23269](https://github.com/vuetifyjs/vuetify/pull/23269)).

### Material Design Expressive

Seven components picked up Expressive options: [VBtn](/components/buttons/), `VIconBtn`, `VBtnGroup`, [VProgressLinear](/components/progress-linear/), [VProgressCircular](/components/progress-circular/), [VSlider](/components/sliders/), and [VTabs](/components/tabs/). They're ordinary props. You don't have to switch blueprints to use them. The `md3` blueprint does turn the new progress look on by default, along with the primary tab slider. Buttons get the new sizes and a radius animation on press ([#23253](https://github.com/vuetifyjs/vuetify/pull/23253)). Progress can split, round, stop, or wave ([#23276](https://github.com/vuetifyjs/vuetify/pull/23276)). Sliders have a `pill` variant and a `centered` prop for a value that starts in the middle ([#22699](https://github.com/vuetifyjs/vuetify/pull/22699), [#23277](https://github.com/vuetifyjs/vuetify/pull/23277)). Tabs have a `slider-variant` for the indicator ([#23181](https://github.com/vuetifyjs/vuetify/pull/23181)). The button sizes have their own guide: [MD3 button sizes](/features/md3-button-sizes/).

### Carousels and slide groups

[VSlideGroup](/components/slide-groups/) has `padding` and `gap`, so tabs and chip groups can space themselves without custom CSS ([#23184](https://github.com/vuetifyjs/vuetify/pull/23184)). A cycling [VCarousel](/components/carousels/) can `pause-on-hover`, and keyboard focus inside it pauses the cycle either way ([e835b88](https://github.com/vuetifyjs/vuetify/commit/e835b885a181052f830f75e80cb716764e634da6)). [VWindow](/components/windows/) and the carousel also take wheel navigation ([#22906](https://github.com/vuetifyjs/vuetify/pull/22906), thanks [mahsarajabpour](https://github.com/mahsarajabpour)).

[VInfiniteCarousel](/components/infinite-carousels/) loops. Arrow keys move between focusable items and scroll them into view, or shift the track when there's nothing to focus. The motion runs on the Web Animations API, so a pause, a reverse, or a drag keeps its place ([#23116](https://github.com/vuetifyjs/vuetify/pull/23116)).

### Layout

Layout item sizes render before mount, so an SSR app stops shifting once it hydrates ([#23250](https://github.com/vuetifyjs/vuetify/pull/23250)). [VRow](/components/grids/) has responsive gap props ([#23246](https://github.com/vuetifyjs/vuetify/pull/23246)). [VNavigationDrawer](/components/navigation-drawers/) has a `modal` prop and `v-model:expanded` ([#23182](https://github.com/vuetifyjs/vuetify/pull/23182)). There's a `vuetify/styles/layers` entry that carries only the default `@layer` order ([ed2dbea](https://github.com/vuetifyjs/vuetify/commit/ed2dbeaa96c944052e85e7bf9678f8b8da9956a3)).

[VAvatarGroup](/components/avatar-groups/), [VHighlight](/components/highlights/), and [VProgress](/components/progress/) left labs. Update any `vuetify/labs` imports.

Display, locale, RTL, and the observers now run on `@vuetify/v0` ([#23210](https://github.com/vuetifyjs/vuetify/pull/23210), [#23220](https://github.com/vuetifyjs/vuetify/pull/23220)). Your app should look the same.

### The week after

[VAlert](/components/alerts/) can dismiss itself. Set `timeout` and it counts down, then closes ([#23280](https://github.com/vuetifyjs/vuetify/pull/23280)). The request has been open since September 2024.

[VDatePicker](/components/date-pickers/) grew a `wheel` prop. A horizontal scroll moves the month, and so does shift plus a vertical one ([#22929](https://github.com/vuetifyjs/vuetify/pull/22929)). The day cell also forwards its own events now, so `@click:day` and `@dblclick:day` are real listeners ([#22491](https://github.com/vuetifyjs/vuetify/pull/22491)). The input variant of [VTimePicker](/components/time-pickers/) picked up the `scrollable` prop the clock variant already had ([ad89b1f](https://github.com/vuetifyjs/vuetify/commit/ad89b1f291033835d77efb776c1f7afe89e0f771)).

[VRangeSlider](/components/range-sliders/) was announcing both thumbs with the same name, so a screen reader couldn't tell the low end from the high one. `start-thumb-aria-label` and `end-thumb-aria-label` split them ([750744d](https://github.com/vuetifyjs/vuetify/commit/750744d2f77ebac8f928bf966d18e312802f0317)). Checkboxes, radios, switches, and color inputs also expose `focus` now, if you've been reaching in to do that yourself ([#23148](https://github.com/vuetifyjs/vuetify/pull/23148)).

4.3.1 also stripped `process.env` out of the published bundles. That throw hit any app whose bundler doesn't invent a `process` global ([#23308](https://github.com/vuetifyjs/vuetify/pull/23308)). `first-day-of-week` and `weekday-format` are honored ([#23310](https://github.com/vuetifyjs/vuetify/pull/23310)), [VCalendar](/components/calendars/) accepts adapter values ([#23313](https://github.com/vuetifyjs/vuetify/pull/23313)), and the date picker takes its month and year steps from the adapter and includes its visible text in the accessible name ([#23311](https://github.com/vuetifyjs/vuetify/pull/23311), [#23315](https://github.com/vuetifyjs/vuetify/pull/23315)). Nested data-table headers order without a column cap ([fa8591c](https://github.com/vuetifyjs/vuetify/commit/fa8591ccff763ec3c53eea9f49d097baae8ca80b)), and a single-select table hides select-all in the mobile header ([#23304](https://github.com/vuetifyjs/vuetify/pull/23304)).

[VCommandPalette](/components/command-palettes/) tells screen readers which item is highlighted ([#23258](https://github.com/vuetifyjs/vuetify/pull/23258)), and custom slots get the keyboard and click wiring instead of having to rebuild it ([#23260](https://github.com/vuetifyjs/vuetify/pull/23260)).

**Details:**

* [Announcing Vuetify v4.3](/blog/announcing-vuetify-4.3/)
* [v4.3.0](/getting-started/release-notes/?version=v4.3.0) · [v4.3.1](/getting-started/release-notes/?version=v4.3.1) · [v4.3.0-beta.0](/getting-started/release-notes/?version=v4.3.0-beta.0)

---

## If you're staying on 4.2 or v3 { #if-youre-staying-on-4-2-or-v3 }

4.3 is a minor with no breaking changes, and a lot of apps still won't take it this month. The patch lines kept moving anyway. [v4.2.4](/getting-started/release-notes/?version=v4.2.4) and [v3.13.6](/getting-started/release-notes/?version=v3.13.6) went out on October 6 and October 5.

Take the overlay leak if you take nothing else. Unmount a `VOverlay` immediately and it used to stick around. That's fixed on both lines ([fc19d63](https://github.com/vuetifyjs/vuetify/commit/fc19d63fda932084c03c6569c596507585890908)).

4.2.4 also puts [VPagination](/components/paginations/) back together inside a flex container ([#23149](https://github.com/vuetifyjs/vuetify/pull/23149)), points carousel and window arrows the right way in RTL, and makes `VWindow` `transition-duration` work once CSS layers are in play. Weekday names on the date picker follow the locale ([#23240](https://github.com/vuetifyjs/vuetify/pull/23240)), router links stay unresolved while a page is leaving ([a795665](https://github.com/vuetifyjs/vuetify/commit/a795665f337cbe85355caddeda0ee5257a7bfb05)), and the Material Icons preset uses real ligatures ([ee5ece2](https://github.com/vuetifyjs/vuetify/commit/ee5ece26729f9ec77961601863fb70a78f045e3f)). 4.2.5 stops an [OTP input](/components/otp-input/) from spilling out of a narrow box, corrects an RTL overlay when the page scroll is locked ([#23261](https://github.com/vuetifyjs/vuetify/pull/23261)), and fills in the Romanian translations ([#23262](https://github.com/vuetifyjs/vuetify/pull/23262)). 4.2.6 lets a [virtual table](/components/data-tables/virtual-tables/) expand a row without `show-expand`, and an indeterminate selection control uses the native state instead of `aria-checked` ([9d10999](https://github.com/vuetifyjs/vuetify/commit/9d109999e22ecafbc773c9db5d62b4ea7393db4e)). On v3, [v3.13.7](/getting-started/release-notes/?version=v3.13.7) gives data-table cells stable keys so a slot stops getting reused for the wrong row ([#23256](https://github.com/vuetifyjs/vuetify/pull/23256)), and brings that expand fix along.

**Details:**

* [v4.2.6](/getting-started/release-notes/?version=v4.2.6) · [v4.2.5](/getting-started/release-notes/?version=v4.2.5) · [v4.2.4](/getting-started/release-notes/?version=v4.2.4)
* [v3.13.7](/getting-started/release-notes/?version=v3.13.7) · [v3.13.6](/getting-started/release-notes/?version=v3.13.6)

---

## Vuetify0 Progress Update { #vuetify0-progress }

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

<br>

[v1.3.0](/blog/announcing-vuetify0-v1-3/) shipped on October 20. [Kanban](https://0.vuetifyjs.com/components/data/kanban) is a board you can drag with a pointer or the keyboard. Space or Enter picks a card up, the arrows move where it will land, Space drops it, and Escape puts it back. The preview follows RTL and skips a column that refuses the card. [Menu](https://0.vuetifyjs.com/components/disclosure/menu) is one compound for a button, a right-click, or a menubar, submenus included ([#1038](https://github.com/vuetifyjs/0/pull/1038)).

[Tour](https://0.vuetifyjs.com/components/disclosure/tour) sequences steps, highlights a target, and anchors the copy to it ([#178](https://github.com/vuetifyjs/0/pull/178)). [Otp](https://0.vuetifyjs.com/components/forms/otp) is the one-time-code row. Paste and SMS autofill spread across the boxes, and a paste into the middle writes from that box and clears whatever comes after ([#787](https://github.com/vuetifyjs/0/pull/787), thanks [sridhar-3009](https://github.com/sridhar-3009)). [Virtualizer](https://0.vuetifyjs.com/components/data/virtualizer) mounts the visible window of a long list and measures each row itself, so a variable height doesn't need a manual `resize()` ([#788](https://github.com/vuetifyjs/0/pull/788)).

A combobox keeps text that matches no option, unless you set `strict` ([#383](https://github.com/vuetifyjs/0/pull/383)). [useFocusTrap](https://0.vuetifyjs.com/composables/system/use-focus-trap) is the loop for anything the browser doesn't trap on its own: a drawer, a dialog rendered as a div, a command palette ([#939](https://github.com/vuetifyjs/0/pull/939), thanks [Haviles04](https://github.com/Haviles04)). Tab wraps inside it, focus moves in when it activates and back when it lets go, and the trap never closes anything itself. Select gained typeahead ([#1058](https://github.com/vuetifyjs/0/pull/1058)). Pagination can shrink its row of page buttons when they overflow and grow back when the container widens ([#1040](https://github.com/vuetifyjs/0/pull/1040)). Checkbox, radio, switch, and toggle groups expose `focus` ([#935](https://github.com/vuetifyjs/0/pull/935)).

The change that hits a normal Vuetify app shipped the same morning, a few hours earlier, as [v1.2.4](https://0.vuetifyjs.com/releases/?version=v1.2.4).

### A smaller bundle

[v1.2.4](https://0.vuetifyjs.com/releases/?version=v1.2.4) stops Vite 8 from pulling unused v0 contexts into a production build ([#1043](https://github.com/vuetifyjs/0/pull/1043), thanks [araishi](https://github.com/araishi)). If the app uses `VSelect`, `VAutocomplete`, `VCombobox`, or `VDataTable`, that's about 23 kB less gzipped JS on Vue 3.5 and about 73 kB on Vue 3.6. The rest of the app's size doesn't matter. Vuetify 4.2 and 4.3 depend on `@vuetify/v0`, so this shows up the next time you refresh the lockfile. You don't have to be writing headless components to get it.

The same tag is quieter everywhere else. `createFilter` does its plain-list work once per pass ([#1053](https://github.com/vuetifyjs/0/pull/1053)). `useResizeObserver` reports border and content box sizes on Safari from before 15.4 ([#1026](https://github.com/vuetifyjs/0/pull/1026)). A reversed virtual list opens at the bottom, and its edge callbacks stop after unmount.

### v1.3.1

[v1.3.1](https://0.vuetifyjs.com/releases/?version=v1.3.1) came out on October 27. If you tried the new Menu and `<Menu.Item disabled>` did nothing, this is why. A bare boolean attribute was arriving as `''`, and an empty string is not disabled. It is `true` now ([#1106](https://github.com/vuetifyjs/0/pull/1106)). The same patch stops pulling the Vue Vapor runtime into apps that don't use it ([#1095](https://github.com/vuetifyjs/0/pull/1095)), and it flips Arrow Left and Arrow Right on horizontal tabs when the page is RTL ([#1105](https://github.com/vuetifyjs/0/pull/1105)).

### Bulma

[@paper/bulma@0.2.0](https://github.com/vuetifyjs/0/releases/tag/%40paper/bulma%400.2.0) lets a compound's parts come in with the parent. Import `BuModal` and `<BuModal.Head />` is there. The old flat names still work ([#946](https://github.com/vuetifyjs/0/pull/946)). The modal also stopped adding a second scrim on top of `.modal-background` ([#961](https://github.com/vuetifyjs/0/pull/961)). Genesis 1.1, the docs kit, added `GnDocsCallout` and `GnDocsBadge`.

### Design systems { #design-systems }

[Emerald](https://0.vuetifyjs.com/systems/emerald) shipped in August. **Onyx** is the other original, and it's still to come. Its own look, the same headless core, meant to sit next to Emerald.

We're also planning four recreations. Each one is a full system on Vuetify0.

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

## Play { #play }

[Play](https://play.vuetifyjs.com/) spent the last week of October learning the imports people are actually writing. `vuetify/*` and `@vuetify/v0` resolve, and `unpkg.com` is accepted in an import hint. Open an old playground and it migrates `vuetify.js`, and bumps Vue when the pin no longer matches the Vuetify you asked for. The same playground can open in [v0 Play](https://v0play.vuetifyjs.com/). Paste on localhost works again. So do bare imports, and saves whose content isn't a tuple.

[MCP v0.12.2](https://github.com/vuetifyjs/mcp/releases/tag/v0.12.2) is housekeeping. The server has a name for the MCP registry ([#51](https://github.com/vuetifyjs/mcp/pull/51)), and the docs stopped telling agents to call `get_available_features`, which isn't there anymore ([#50](https://github.com/vuetifyjs/mcp/pull/50)). The upgrade tools from [September](/blog/september-2026-update/#upgrade-with-vuetify-mcp) are unchanged.

The Nuxt module didn't ship in October. The layer-order fix ([#382](https://github.com/vuetifyjs/nuxt-module/pull/382)) and the `useLayout` rename ([#388](https://github.com/vuetifyjs/nuxt-module/pull/388)) have been merged since September 15, after [v1.0.0-rc.6](https://github.com/vuetifyjs/nuxt-module/releases/tag/v1.0.0-rc.6). They're on main. They're not on npm yet.

---

## What's Next { #whats-next .mt-4 }

The next patch is already on `master`, and it isn't in 4.3.1. Locale was leaking during SSR ([#23325](https://github.com/vuetifyjs/vuetify/pull/23325)). [VFileUpload](/components/file-upload/) was applying its width props to more than the input ([#23327](https://github.com/vuetifyjs/vuetify/pull/23327)). Keyboard navigation in [VColorPicker](/components/color-pickers/) got lost when a swatch row wrapped ([#23331](https://github.com/vuetifyjs/vuetify/pull/23331)). Layout was still counting items that registered and then unmounted ([#23332](https://github.com/vuetifyjs/vuetify/pull/23332)). [VHotkey](/components/hotkeys/) was spelling keys wrong in its accessible label ([#23340](https://github.com/vuetifyjs/vuetify/pull/23340)).

Two more are on `dev`, so they wait for the next minor. [VBadge](/components/badges/) gets an `icon-size` prop ([#23323](https://github.com/vuetifyjs/vuetify/pull/23323)). [VFab](/components/floating-action-buttons/) learns `start` and `end`, so the position doesn't have to be thought of as left and right ([#23341](https://github.com/vuetifyjs/vuetify/pull/23341)).

::: warning

**Help keep Vuetify going.** Open Collective funds are running low, and community support is what lets the team keep shipping. If your team relies on Vuetify, point your organization at [Open Collective](https://opencollective.com/vuetify) or [GitHub Sponsors](https://github.com/sponsors/johnleider).

:::

Thanks to everyone who sent a PR in October: [aozmekik](https://github.com/aozmekik), [ardaalkan](https://github.com/ardaalkan), [ascott18](https://github.com/ascott18), [b84330808](https://github.com/b84330808), [cestercian](https://github.com/cestercian), [DangTAnh](https://github.com/DangTAnh), [diaeai](https://github.com/diaeai), [dilipsaroj](https://github.com/dilipsaroj), [lazerg](https://github.com/lazerg), [mahsarajabpour](https://github.com/mahsarajabpour), [morimorimokenpi](https://github.com/morimorimokenpi), [rafaself](https://github.com/rafaself), [SulimanAbdulrazzaq](https://github.com/SulimanAbdulrazzaq), [userquin](https://github.com/userquin), [vicuts](https://github.com/vicuts) and [ZainnQureshii](https://github.com/ZainnQureshii) in the framework, [araishi](https://github.com/araishi) and [sridhar-3009](https://github.com/sridhar-3009) in Vuetify0, and [Being-RAYtastic](https://github.com/Being-RAYtastic) in Vuetify MCP.

See you in November!

---

*Stay connected with Vuetify updates through our [GitHub repository](https://github.com/vuetifyjs/vuetify), [Discord community](https://community.vuetifyjs.com), and follow [@vuetifyjs](https://twitter.com/vuetifyjs) for the latest announcements.*
