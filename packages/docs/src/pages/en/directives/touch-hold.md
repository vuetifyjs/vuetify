---
meta:
  nav: Touch hold
  title: Touch hold directive
  description: The touch hold directive calls a function when an element is touched and held.
  keywords: touch hold, long press, vuetify touch hold directive, vue long press directive
related:
  - /directives/touch/
  - /components/menus/
  - /components/tooltips/
---

# Touch hold directive

The `v-touch-hold` directive calls a function when the user touches an element and holds it without moving.

<PageFeatures />

## Usage

On a touch device, touch and hold a file to start selecting. Once a hold fires, the tap that would follow it is cancelled, and the browser's own long-press behavior (text selection, the iOS link callout and the Android context menu) is suppressed for the element.

<ExamplesExample file="v-touch-hold/usage" />

::: info

`v-touch-hold` only reacts to touch. For mouse and keyboard users, pair it with a `@contextmenu` listener.

:::

<PromotedEntry />

## API

| Directive                                    | Description              |
|----------------------------------------------|--------------------------|
| [v-touch-hold](/api/v-touch-hold-directive/) | The touch hold directive |

<ApiInline hide-links />
