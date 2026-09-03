---
meta:
  nav: Audio players
  title: Audio player component
  description: The audio player component wraps the native audio element with a seekable waveform and a configurable transport bar.
  keywords: audio, player, waveform, vuetify audio component, vue audio component
features:
  github: /labs/VAudio/
  label: 'C: VAudio'
  report: true
---

# Audio player

The `v-audio` component is a player for self-hosted audio: a transport bar, a seekable waveform, and a time display.

<PageFeatures />

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VAudio } from 'vuetify/labs/VAudio'

export default createVuetify({
  components: {
    VAudio,
  },
})
```

## Usage

A basic example of the audio player component.

<ExamplesUsage name="v-audio" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-audio](/api/v-audio/) | Primary Component |
| [v-audio-controls](/api/v-audio-controls/) | Sub-component used to display the transport bar |
| [v-audio-waveform](/api/v-audio-waveform/) | Sub-component used to draw the waveform and handle seeking |

<ApiInline hide-links />

::: warning

This component is only useful if you self-host audio or when you can reliably obtain a direct media file URL and it is permitted by the host terms of service to use custom players.

:::

## Guide

The `v-audio` component renders a native `<audio>` element with controls that fit your app design, and a waveform that doubles as the seek surface. It is the audio counterpart to [v-video](/components/videos/), and follows the same structure.

All attributes that are not explicitly defined in the component API (`autoplay`, `muted`, `loop`, etc.) are passed to the underlying native HTML audio element.

### Props

#### Peaks

The waveform is drawn from an array of amplitude values, one per bar, each between 0 and 1.

You supply the values; the component never downloads or decodes the media to derive them. Reading a whole file to compute peaks costs a full download plus a decode that decompresses it into memory — around 10 MB per minute of audio — and it is impossible anyway for any host that does not send CORS headers. Compute them once where the file is produced, store them alongside it, and rendering costs nothing and works on the server. Without peaks the component draws a flat placeholder track that still seeks and still shows progress.

<ExamplesExample file="v-audio/prop-peaks" />

#### Seek target

A visible waveform is always the seek surface. The **seek-target** prop decides what happens when there is no waveform: with `container` and **hide-waveform** the whole component becomes click-to-seek, which suits a compact player in a table row. `none` disables seeking entirely.

<ExamplesExample file="v-audio/prop-seek-target" />

#### Layout

The **variant** prop decides where the waveform sits. By default it is inline, between the actions and the clock; `waveform-top` and `waveform-bottom` give it a row of its own above or below the controls. `mini` reduces the bar to play and time, and `hidden` removes it entirely.

<ExamplesExample file="v-audio/prop-layout" />

#### Density and variants

Three density modes control the bar height and icon sizes, and the **pills**, **floating** and **detached** variants change how the bar sits against its surroundings.

<ExamplesExample file="v-audio/prop-density" />

::: info

The **height** prop sizes the container. To change the height of the waveform itself, pass it through **waveform-props**.

:::

### Slots

#### Append

There is no download prop. A download is an ordinary link, so it belongs in the **append** slot where it stays a real anchor — right-clickable, keyboard-reachable, and yours to label.

<ExamplesExample file="v-audio/slot-append" />

#### Error

The **error** prop puts the component in the error state manually, which is useful when an operation fails before you have a source URL. By default the error state shows an icon and a message; the **error** slot replaces it, and receives a `retry` function.

<ExamplesExample file="v-audio/slot-error" />

## Waveform on its own

`v-audio-waveform` does not need a media element. Given **peaks** and a model it renders and seeks by itself, which is useful for upload previews or for showing progress over audio played elsewhere. Pass **duration** for the tooltip and screen reader announcements to report time rather than a percentage.

<ExamplesExample file="v-audio/misc-waveform" />

## Accessibility

The seek surface is a `role="slider"` with `aria-valuemin`, `aria-valuemax`, `aria-valuenow` and `aria-valuetext`. It is focusable and responds to <kbd>←</kbd> / <kbd>→</kbd>, <kbd>↑</kbd> / <kbd>↓</kbd>, <kbd>Page Up</kbd> / <kbd>Page Down</kbd> and <kbd>Home</kbd> / <kbd>End</kbd>, with the direction inverted in RTL. Exactly one element is the seek slider at a time, and every icon button carries a label from the `$vuetify.audio.*` locale keys.

The native `<audio>` element stays in the DOM but is not exposed to assistive technology: browsers hide `audio` without a `controls` attribute, and giving it one would announce a second, duplicate set of controls. The component's own controls are the accessible interface.
