---
emphasized: true
meta:
  nav: Audio players
  title: Audio player component
  description: The audio player component wraps the native audio element with a seek bar and a transport row you compose from built-in and custom actions.
  keywords: audio, player, waveform, vuetify audio component, vue audio component
features:
  github: /labs/VAudio/
  label: 'C: VAudio'
  report: true
---

# Audio player

The `v-audio` component is a player for self-hosted audio: a seek bar, a time display, and a row of actions you compose.

<PageFeatures />

::: warning

This feature requires [v4.3.0](/getting-started/release-notes/?version=v4.3.0)

:::

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
| [v-audio-controls](/api/v-audio-controls/) | Sub-component used to display the seek bar and actions |
| [v-audio-waveform](/api/v-audio-waveform/) | Waveform seek bar, bound through the **progress** slot |
| [v-media-progress-bar](/api/v-media-progress-bar/) | Default seek bar |
| [v-media-volume](/api/v-media-volume/) | Volume control of the `volume` action, configured with **volume-props** |

<ApiInline hide-links />

::: warning

This component is only useful if you self-host audio or when you can reliably obtain a direct media file URL and it is permitted by the host terms of service to use custom players.

:::

## Guide

The `v-audio` component renders a hidden native `<audio>` element and its own controls. The **autoplay**, **loop**, **muted**, **preload** and **crossorigin** props are forwarded to the native element.

### Props

#### Actions

The **actions** prop lists what the controls render, in order. It takes an array or a comma or space separated string. The built-in actions are:

- `play` toggles playback
- `progress` places the seek bar inside the row, which turns the player into a single line
- `time` shows the elapsed and total time
- `elapsed` and `remaining` show a single time
- `volume` adds a mute button with a volume slider
- `-` inserts a spacer

Without `progress` in the list, the seek bar gets its own row above the actions, with the elapsed and total time underneath. **hide-time** hides them, and the `time.total` slot can show the remaining time instead. Any other name renders the `action.<name>` slot, so a `prev` or `shuffle` button is an `#action.prev` or `#action.shuffle` slot away.

<ExamplesExample file="v-audio/prop-actions" />

#### Waveform

`v-audio-waveform` replaces the seek bar through the **progress** slot. Its `props` fit both `v-media-progress-bar` and `v-audio-waveform`, so `v-bind="props"` wires position, duration and seeking. Pass **peaks**, an array of amplitudes between 0 and 1, one per bar. Compute them where the file is produced and store them alongside it.

<ExamplesExample file="v-audio/prop-waveform-peaks" />

To decode in the browser, pass the file as a `Blob` to **peaks-source**: a local file or a server response.

<ExamplesExample file="v-audio/prop-waveform-peaks-source" />

With **live**, the waveform skips decoding and draws bars from the audio as it plays, scrolling right to left.

<ExamplesExample file="v-audio/prop-waveform-live" />

#### Readonly and start position

**readonly** locks the seek bar while playback, volume and custom actions stay usable. **start-at** starts playback at a position in seconds. **v-model:playback-rate** is applied to every file the player loads.

::: info
**start-at** applies to the first loaded file only. To resume a later file, seek from the `loaded` event, which fires for every file:

```html
<v-audio :src="track.src" @loaded="el => el.currentTime = track.resumeAt" />
```

:::

### Slots

#### Custom actions

Each custom action name in **actions** becomes an `action.<name>` slot that receives the player state and methods: `playing`, `progress`, `currentTime`, `duration`, `play`, `pause`, `seek`, `setPlaybackRate` and more. `seek({ to })` and `seek({ by })` take seconds, or a string such as `'50%'` relative to the duration. The **play** slot also receives `props` for the built-in button, so `v-bind="props"` keeps the icon and label in sync. To only restyle the built-in button, pass **play-props** instead. Buttons rendered in slots follow `VAudioControls` defaults, and **gap** sets the spacing between actions and around the seek bar.

<ExamplesExample file="v-audio/slot-actions" />

#### Progress

The **progress** slot replaces the seek bar. Use it to put a title and artwork next to the bar, or to bring your own seek control. Its `props` bind to `v-media-progress-bar` and `v-audio-waveform`; **chapters**, **hide-thumb** and **tooltip** set on `v-audio` are included.

<ExamplesExample file="v-audio/slot-progress" />

#### Append

There is no download prop. A download is an ordinary link, so it belongs in the **append** slot where it stays a real anchor.

<ExamplesExample file="v-audio/slot-append" />

#### Error

The **error** prop puts the component in the error state manually, which is useful when an operation fails before you have a source URL. In the error state an overlay covers the controls with a warning icon, or with the **error** slot. Call `retry()` on the component ref to load the source again.

<ExamplesExample file="v-audio/slot-error" />

## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-audio` component.

### Mobile player

Nested defaults restyle every button in the controls at once, while slots rebuild the seek row and add track navigation.

<ExamplesExample file="v-audio/misc-mobile-player" />

### Waveform on its own

`v-audio-waveform` does not need a media element. Given **peaks**, **max** in seconds and a model it renders and seeks by itself, which is useful for upload previews or for showing progress over audio played elsewhere.

<ExamplesExample file="v-audio/misc-waveform" />

## Accessibility

The seek bar is a `role="slider"` that responds to the arrow keys (hold <kbd>Shift</kbd> for 10× steps), <kbd>Page Up</kbd> / <kbd>Page Down</kbd> and <kbd>Home</kbd> / <kbd>End</kbd>. Every built-in button carries a label from the `$vuetify.media.*` locale keys; give your own slot buttons an `aria-label`.
