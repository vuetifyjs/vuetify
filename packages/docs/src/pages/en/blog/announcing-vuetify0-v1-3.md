---
layout: blog
meta:
  title: Announcing Vuetify0 1.3.0
  description: Vuetify0 1.3.0 adds Kanban and a headless Menu, plus Tour, Otp, Virtualizer, useFocusTrap, and a combobox that commits typed text.
  keywords: Vuetify0 1.3.0, Kanban, Menu, Tour, Otp, Virtualizer, useFocusTrap, @vuetify/v0
---

<script setup>
  import { computed } from 'vue'
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  const zerologo = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vzero-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>

# Announcing Vuetify0 1.3.0

Vuetify0 1.3.0 is out. The documentation is the part of this project I am most proud of, so if you open two pages before the changelog, make them [Kanban](https://0.vuetifyjs.com/components/data/kanban) and [Menu](https://0.vuetifyjs.com/components/disclosure/menu).

![Hero image for the Vuetify0 1.3 release](https://cdn.vuetifyjs.com/docs/images/blog/announcing-vuetify0-v1-3/announcing-vuetify0-v1-3-hero.png "Vuetify0 1.3 hero image"){ height=112 }

🖊️ John Leider • 📅 October 20th, 2026

<PromotedEntry />

---

<AppFigure :src="zerologo" alt="Vuetify0 logo" width="200" height="auto" class="mx-auto mt-4" title="Vuetify0 Logo" />

## Table of Contents

- [Kanban](#kanban)
- [Menu](#menu)
- [Tour, Otp, and Virtualizer](#tour-otp-and-virtualizer)
- [The rest](#the-rest)
- [Upgrade](#upgrade)

---

## Kanban

[Kanban](https://0.vuetifyjs.com/components/data/kanban) is the compound over `createKanban` ([#1012](https://github.com/vuetifyjs/0/pull/1012)). The pieces are `Kanban.Root`, `Kanban.Column`, `Kanban.List`, `Kanban.Item`, `Kanban.Instructions`, and `Kanban.LiveRegion`: boards of movable items in columns.

![A Kanban board with Todo, Doing, and Done columns built from Vuetify0's headless Kanban compound](https://cdn.vuetifyjs.com/docs/images/blog/announcing-vuetify0-v1-3/kanban.png "Kanban"){ width=100% }

Each column binds its item array with `v-model`. A drop writes the new order back, and Root emits `move` once with `{ value, from, to, fromIndex, toIndex }`.

Pointer drag works. So does the keyboard. Space or Enter picks an item up. Arrow keys, Home, and End move a previewed drop target. That preview follows RTL, and it skips a column that is `disabled` or whose `accept` refuses the item. Space or Enter drops. Escape cancels and does not touch the board.

The pending target is `data-target` on the column and the list, and `data-drop="before"` or `data-drop="after"` on the item next to the gap. Every step is announced through the live region. A column gates incoming moves with `accept(value, from, index)` and freezes with `disabled`.

## Menu

[Menu](https://0.vuetifyjs.com/components/disclosure/menu) is one headless compound for a button, a right-click, or a menubar, including submenus ([#1038](https://github.com/vuetifyjs/0/pull/1038)).

`Menu.Root`, `Menu.Bar`, `Menu.Activator`, `Menu.Context`, `Menu.Content`, `Menu.Item`, `Menu.CheckboxItem`, `Menu.RadioGroup`, `Menu.RadioItem`, `Menu.Separator`, `Menu.Sub`, `Menu.SubActivator`, and `Menu.SubContent`.

A click, a right-click, or a pointer switch opens with no item highlighted. Arrow keys and pointer hover move the highlight. Light-dismiss of a submenu closes that layer and leaves the parent menu open.

A follow-up fix ([#1056](https://github.com/vuetifyjs/0/pull/1056)): repeating a typeahead letter still accepts the next character. Letters typed within the pause build a prefix, and a different letter extends it. A repeated letter moves to the next match instead. After the pause, the next letter starts a new search. The same fix runs a click listener on a menu item before the item's own action, including when the item is disabled.

![An open Vuetify0 Menu where typing "p" moves the highlight to the Paste item](https://cdn.vuetifyjs.com/docs/images/blog/announcing-vuetify0-v1-3/menu.png "Menu typeahead"){ width=100% }

## Tour, Otp, and Virtualizer

Three more compounds shipped in this release.

**[Tour](https://0.vuetifyjs.com/components/disclosure/tour)** ([#178](https://github.com/vuetifyjs/0/pull/178)). `createTour` is a headless step sequencer: activator targeting, a form-gated next, and enter, leave, and completed handlers. The Tour compound adds highlight, anchored content, and keyboard chrome. `createTourPlugin` provides one app-level tour. The app owns the catalog and loads one tour at a time.

![A Vuetify0 Tour on step 1 of 3, highlighting a search field with Skip, Back, and Next controls](https://cdn.vuetifyjs.com/docs/images/blog/announcing-vuetify0-v1-3/tour.png "Tour"){ width=100% }

**[Otp](https://0.vuetifyjs.com/components/forms/otp)** ([#787](https://github.com/vuetifyjs/0/pull/787), thanks [@sridhar-3009](https://github.com/sridhar-3009)). `Otp.Root`, `Otp.Item`, and `Otp.HiddenInput` over `createOtp`. Root bridges `v-model`, exposes `role="group"` with a locale-driven default accessible name, and renders a hidden input when `name` is set. Each item is one character (`autocomplete="one-time-code"`). It advances on input, moves back on Backspace of an empty box, supports arrow keys, and spreads pasted or autofilled text across the boxes. `@complete` fires when the code fills. Reject-and-retry lives on `createOtp`'s `onComplete`. Root slots an `items` array derived from `length`, same pattern as Rating, so the boxes are iterated once.

A patch on top of that ([#1011](https://github.com/vuetifyjs/0/pull/1011)): a code the browser inserts in one edit (SMS autofill, a password manager) fills every box. Dropping text onto a filled box writes from that box and clears every box after the pasted text. Pasting 99 into the third box of 11111 leaves 1199.

![A six-box Vuetify0 Otp input with four digits entered](https://cdn.vuetifyjs.com/docs/images/blog/announcing-vuetify0-v1-3/otp.png "Otp"){ width=100% }

**[Virtualizer](https://0.vuetifyjs.com/components/data/virtualizer)** ([#788](https://github.com/vuetifyjs/0/pull/788), also [@sridhar-3009](https://github.com/sridhar-3009)). `Virtualizer.Root`, `Virtualizer.Item`, and `Virtualizer.Spacer` over `createVirtual`. Root renders a keyboard-focusable scroll container and slots the visible window, plus `overscan`. Put a `Spacer` before the rows and a `Spacer` with `edge="end"` after them. Set `as` (for example `li` inside a `ul`) when a `div` cannot sit there. Each item measures its own border box, so variable-height rows with padding or borders need no manual `resize()` call. `@top` and `@bottom`, with `top-threshold` and `bottom-threshold`, drive infinite scroll. `scrollTo(index, options)` and `reset()` come from the default slot or a template ref on Root, which also exposes the container `element`.

![A Vuetify0 Virtualizer list of 10,000 rows where only the visible window is mounted](https://cdn.vuetifyjs.com/docs/images/blog/announcing-vuetify0-v1-3/virtualizer.png "Virtualizer"){ width=100% }

Virtualizer does not impose a role. Pass `role` on Root and Item, and `aria-posinset` / `aria-setsize` on Item, to match the content. For a grid, `aria-rowcount` on Root and `aria-rowindex` on Item. When a focused row scrolls out of the window, focus moves to the scroll container. `renderless` is not supported. Use `createVirtual` directly when you need full control of the markup.

`createVirtual` itself also changed ([#1046](https://github.com/vuetifyjs/0/pull/1046)). `marker` drops content above the list out of the scroll position. `itemKey` keeps a measured height on the item when the array is prepended, filtered, or reordered. `scrollTo` places the window before it writes the scroll position, retries when the browser clamps that write, and runs a call made before the scroll element exists. Pass `ownElement: false` to leave an externally owned scroll element unstyled.

## The rest

**Combobox** ([#383](https://github.com/vuetifyjs/0/pull/383)). A non-strict combobox (the default) now accepts typed text that matches no registered option. Enter, Tab, click-outside, or blur mints a ticket for the typed value, selects it, and emits it through `v-model`. `strict` still discards unmatched text on confirm. There is a `commit()` action on the combobox context. Escape still cancels. Virtual focus reads the option element from the registered ticket (`el`), not `document.querySelector`.

**Dialog** ([#961](https://github.com/vuetifyjs/0/pull/961)). `Dialog.Content` and `AlertDialog.Content` accept `scrim` (default `true`). Pass `false` when you own the backdrop, so an app-level `<Scrim>` does not double-dim the overlay.

**[useFocusTrap](https://0.vuetifyjs.com/composables/system/use-focus-trap)** ([#939](https://github.com/vuetifyjs/0/pull/939), thanks [@Haviles04](https://github.com/Haviles04)). A `<dialog>` opened with `showModal()` is already trapped by the browser. Anything else had to hand-roll it: `Dialog.Content` rendered `as="div"`, a drawer, a command palette. `useFocusTrap` is that loop.

```ts
const panel = useTemplateRef<HTMLElement>('panel')

useFocusTrap(panel, { active: isOpen })
```

Tab and Shift+Tab wrap at the first and last tabbable descendant. Focus moves into the root on activate, and the previously focused element gets it back on deactivate. `initial` chooses where focus lands, or `false` to skip autofocus. `restore: false` leaves focus alone on release. `onEscape` opts into Escape handling. The trap never closes anything itself. With nested traps, the last connected trap owns Tab, and the last connected trap that has `onEscape` owns Escape.

The keydown listener is on `document` in the capture phase, so a later Tab still recovers if focus has left the subtree. Give the root `tabindex="-1"` if it can ever hold zero tabbable descendants. The trap focuses the root as a fallback, and v0 does not write attributes onto elements it did not render.

**Pagination** ([#1040](https://github.com/vuetifyjs/0/pull/1040)). Page buttons can have different widths. The row shrinks when the rendered buttons overflow and grows back when the container widens, or when the current page is shorter. `createOverflow` accepts `probe: true` when the count that fits is not mounted yet. Render `capacity`, measure that row, and call `settle()`.

**Select.** `Select.Activator` accepts `ariaLabelledby` and renders it as `aria-labelledby` ([#1055](https://github.com/vuetifyjs/0/pull/1055)). Pass the id of an existing label when the control's text is the selected value. If `label` and `ariaLabelledby` are both set, `aria-labelledby` is used and `aria-label` is omitted. Printable characters match option text ([#1058](https://github.com/vuetifyjs/0/pull/1058)). Characters typed within one second accumulate, and a repeated letter cycles. A single select updates the value and leaves the list open or closed as it was, once the options are mounted (`eager`, or any list that has already opened). The first character before that opens the list. The matcher is `useTypeahead`.

**Forms** ([#935](https://github.com/vuetifyjs/0/pull/935)). `Checkbox.Root`, `Radio.Root`, `Switch.Root`, `Toggle.Root`, and `Button.Root` expose the rendered host via `AtomExpose.element`, so a template ref can call `.focus()`. `Radio.Group`, `Checkbox.Group`, `Switch.Group`, `Toggle.Group`, and `Button.Group` expose `focus(options?: FocusOptions)`, which focuses the selected item, or the first if none is selected.

**Input** ([#1037](https://github.com/vuetifyjs/0/pull/1037), [@sridhar-3009](https://github.com/sridhar-3009)). `parseValidateOn` and its `ParsedValidateOn` return type are public from the Input barrel. Wrappers that re-implement `validateOn` can reuse the parser. NumberField and `@paper/bulma` now use it.

**DevTools** ([#948](https://github.com/vuetifyjs/0/pull/948)). `createPlugin` can opt a plugin into Vue DevTools with `devtools: true`. Inspector snapshots unwrap refs and class getters. Logger and storage supply an `inspect` hook so method-only contexts still show state. Storage gains `keys()`. The same change declares missing `update:model-value` emits on component roots, so Vue DevTools can track those v-models.

## Upgrade

```bash
pnpm add @vuetify/v0@1.3.0
```

The [full release notes](https://github.com/vuetifyjs/0/releases/tag/v1.3.0) list every commit. The [getting started guide](https://0.vuetifyjs.com/introduction/getting-started) covers setup.

- **Documentation:** [0.vuetifyjs.com](https://0.vuetifyjs.com)
- **Kanban:** [components/data/kanban](https://0.vuetifyjs.com/components/data/kanban)
- **Menu:** [components/disclosure/menu](https://0.vuetifyjs.com/components/disclosure/menu)
- **Release:** [v1.3.0](https://github.com/vuetifyjs/0/releases/tag/v1.3.0)
- **GitHub:** [vuetifyjs/0](https://github.com/vuetifyjs/0)
