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

::: warning

This feature requires [v4.3.0](/getting-started/release-notes/?version=v4.3.0)

:::

## Usage

Touch and hold a file to start selecting, or hold the left mouse button with the `mouse` modifier. Once a hold fires, the click that would follow it is cancelled, and the browser's own long-press behavior (text selection, the iOS link callout and the Android context menu) is suppressed for the element.

<ExamplesExample file="v-touch-hold/usage" />

::: info

Keyboard users reach neither gesture, so pair the directive with a `@contextmenu` listener where the action has no other route.

:::

<PromotedEntry />

## API

| Directive                                    | Description              |
|----------------------------------------------|--------------------------|
| [v-touch-hold](/api/v-touch-hold-directive/) | The touch hold directive |

<ApiInline hide-links />

## Examples

### Photo gallery

Desktop users get a checkbox on hover, while touch users hold a photo to start selecting and then tap to toggle more.

<ExamplesExample file="v-touch-hold/misc-gallery" />
