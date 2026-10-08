---
emphasized: true
meta:
  nav: Videos
  title: Video component
  description: The video component acts as a customizable wrapper for native video element.
  keywords: video, player, vuetify video component, vue video component
features:
  github: /labs/VVideo/
  label: 'C: VVideo'
  report: true
---

# Video

The `v-video` component is useful for background video or as a customizable player for self-hosted content.

<PageFeatures />

## Installation

Labs components require manual import and registration with the Vuetify instance.

```js { resource="src/plugins/vuetify.js" }
import { VVideo } from 'vuetify/labs/VVideo'

export default createVuetify({
  components: {
    VVideo,
  },
})
```

## Usage

A basic example of the video component.

<ExamplesUsage name="v-video" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-video](/api/v-video/) | Primary Component |
| [v-video-controls](/api/v-video-controls/) | Sub-component used to display a video player controls |
| [v-media-volume](/api/v-media-volume/) | Volume control |

<ApiInline hide-links />

::: warning

This component is only useful if you self-host videos or when you can reliably obtain direct media file URL and it is permitted by the host terms of service to use custom players.

:::

## Guide

The `v-video` component lets you display videos with controls that nicely fit into your app design. It comes equiped with common keyboard shortcuts, and a control bar composed from built-in and custom actions.

All attributes that are not explicitly defined in the component API (`autoplay`, `muted`, `loop`, etc.) are passed to the underlying native HTML video element.

### Props

The `v-video` component has several props that allow you to customize its appearance and behavior.

#### Actions

The **actions** prop lists the controls to render, in order: `play`, `progress`, `time`, `elapsed`, `remaining`, `volume`, `fullscreen` and `-` for a spacer. Without `progress` in the list, the progress bar is stacked on top of the control bar. Any other name renders the `action.<name>` slot. With **pills**, every action gets its own box, and actions wrapped in parentheses share one, e.g. `play (prev next) progress (volume fullscreen)`. A `-` inside parentheses splits the box in two. In the array form, a nested array is one box. Names are delimited with spaces or commas. Use **hide-controls** to remove the control bar entirely.

<ExamplesExample file="v-video/prop-actions" />

#### Chapters

The **chapters** prop splits the progress bar at each `start`, given in seconds or as formatted time (`'1:10'`). The hover tooltip and the announced position include the chapter `title`.

<ExamplesExample file="v-video/prop-chapters" />

#### Image

You can display a cover image before the video is loaded.

<ExamplesExample file="v-video/prop-image" />

#### Start at

Video can automatically skip to certain timestamp upon load. It can be useful to let the users continue where they stopped last time.

<ExamplesExample file="v-video/prop-start-at" />

::: info
**start-at** applies to the first loaded file only. To resume a later file, seek from the `loaded` event, which fires for every file:

```html
<v-video :src="file.src" @loaded="el => el.currentTime = file.resumeAt" />
```

:::

#### Color

You can control the icon color and background color of the controls.

<ExamplesExample file="v-video/prop-color" />

#### Density

Three density modes provide basic control over control bar height and the icon sizes.

<ExamplesExample file="v-video/prop-density" />

#### Rounded

Border radius for the video and controls can be controled separately if you pass an array to the `rounded` prop.

<ExamplesExample file="v-video/prop-rounded" />

### Slots

The `v-video` component has several slots that allow you to customize the appearance and behavior of its items.

<!--
#### Sources

Using the the **sources** slot you can make it possible to select different playback quality.

<ExamplesExample file="v-video/slot-sources" />
-->

#### Error

The `error` prop can be used to manually force the error state. This might be useful if an operation fails and you did not obtain the source URL or Blob yet. By default error state shows only an icon, but you can add more details simply using the `error` slot and trigger retry using the exposed `retry` method.

<ExamplesExample file="v-video/slot-error" />

#### Header

Optional **header** slot make it possible to put additional content on top of the video.

<ExamplesExample file="v-video/slot-header" />

#### Append and prepend

`v-video` has `append` and `prepend` slots. You can place custom controls in them. They render at the edges of the control bar, unless you list `prepend` or `append` in **actions** to put them elsewhere.

<ExamplesExample file="v-video/slot-append-and-prepend" />

#### Controls

Whenever provided customizability is not enough, the `controls` slot lets you drop all the built-in controls and easily define your own set of actions.

<ExamplesExample file="v-video/slot-controls" />

## Examples

The following are a collection of examples that demonstrate more advanced and real world use of the `v-video` component.

### Video card

Props like `floating` and `detached`, together with `elapsed` and `remaining` actions around the progress bar, can help you seamlesly integrate the video within card layout.

<ExamplesExample file="v-video/misc-in-card" />

### YouTube clone

Easily recreate the most familiar interface to let your users focus on the content.

<ExamplesExample file="v-video/misc-tube" />

### Minimalistic players

You can override bottom panel to have achieve minimalistic design.

<ExamplesExample file="v-video/misc-mini" />

<!--
### Progress tracker

Tap into exposed `video` element to achieve more control and precisely track the progress.

<ExamplesExample file="v-video/misc-progress-tracker" />
-->
