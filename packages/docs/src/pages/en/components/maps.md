---
meta:
  nav: Maps
  title: SVG map component
  description: Display an SVG map with selection, tooltips, panning, and zooming, without a mapping library.
  keywords: vuetify map component, vue svg map, interactive regions
features:
  github: /labs/VMap/
  label: 'C: VMap'
  report: true
---

# Maps

The `v-map` component turns an SVG file into an interactive map with selectable regions, tooltips, panning, and zooming. Your application supplies the SVG; there is no map service or mapping dependency.

<PageFeatures />

## Installation

```js
import { VMap } from 'vuetify/labs/VMap'
```

## Usage

The component does not fetch anything. Load the SVG in your application and pass its markup to **svg**, and make sure the artwork's license allows your use.

<ExamplesExample file="v-map/usage" />

## API

| Component | Description |
| - | - |
| [v-map](/api/v-map/) | Interactive SVG map |

<ApiInline hide-links />

## Guide

### Preparing an SVG

The SVG needs a positive `viewBox`, or numeric `width` and `height`. Every shape or group with an `id` becomes a region, labelled by its `aria-label`, a child `<title>`, or the `id` itself.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600">
  <path id="DZ" aria-label="Algeria" d="..." />
  <g id="TN">
    <title>Tunisia</title>
    <path d="..." />
  </g>
</svg>
```

A group with an `id` is one region. If the shapes inside need their own identifiers, put `data-region` on the group instead.

Scripts, stylesheets, animation, images, foreign HTML, and external references are removed. Use presentation attributes or inline styles for styling.

### Region data and colors

**regions** attaches data to regions by identifier. `title` and `color` replace the label and fill; any other field is passed through to the slots and the `click:region` event. Fills and strokes in the SVG win over **base-color** and **base-stroke**, which only apply to shapes without them.

<ExamplesExample file="v-map/prop-regions" />

<ExamplesExample file="v-map/prop-multiple" />

Use **highlighted** to highlight regions from outside the map, for example from a related table. With `v-model:highlighted`, the map also writes back the region under the pointer or focus.

### Stroke width

Strokes are set with Sass variables, or at runtime with CSS variables. Selected and focused regions copy the base width unless their own is set.

| CSS variable | Sass variable | Applies to |
| - | - | - |
| `--v-map-base-stroke` | `$map-base-stroke` | Shapes without their own stroke, including `map` slot content. Also set by **base-stroke** |
| `--v-map-base-stroke-width` | `$map-base-stroke-width` | Stroke width of those shapes |
| `--v-map-selected-stroke` | `$map-selected-stroke` | Outline of selected regions |
| `--v-map-selected-stroke-width` | `$map-selected-stroke-width` | Width of the selected outline |
| `--v-map-focus-stroke` | `$map-focus-stroke` | Keyboard focus outline |
| `--v-map-focus-stroke-width` | `$map-focus-stroke-width` | Width of the focus outline |

Region strokes are drawn in map units and thicken as you zoom in, while the focus outline keeps its on-screen width. To control border thickness on screen, derive the base stroke width from `v-model:zoom`, and give the focus outline its own width.

<ExamplesExample file="v-map/misc-zoom-stroke" />

### Navigation

- Drag with the primary or middle mouse button to pan. Double click zooms in, `Shift` + double click zooms out.
- `Ctrl` / `⌘` + wheel and trackpad pinch always zoom. The plain wheel zooms only with **wheel-zoom**, so the map does not capture page scrolling.
- Tab enters the map at one region and leaves it again. Arrow keys move to the neighbouring region in that direction, `Home` and `End` to the first and last.
- `Shift` + arrow keys pan without moving focus. `Enter` or `Space` selects.

**zoom-on-focus** fits each focused region in the view; without it, the view only pans to keep the focused region visible.

<ExamplesExample file="v-map/prop-zoom-on-focus" />

### Custom controls

The default slot renders outside the SVG and receives `zoom`, its limits, and `setZoom`, `zoomIn`, `zoomOut`, `resetZoom`, and `reveal`. The same functions, except `setZoom`, are exposed on the component ref. `reveal(ids, { zoom: true })` brings regions into view, for example from a table. No buttons or global shortcuts are built in.

<ExamplesExample file="v-map/misc-hotkeys" />

### Tooltips and markers

The `tooltip` slot receives the `region` with its **regions** fields. `Escape` hides the tooltip until another region is hovered or focused.

<ExamplesExample file="v-map/slot-tooltip" />

The `map` slot renders inside the SVG, in the map's own coordinates. Interactive content there needs its own labels and keyboard handling, and should stop pointer events so it does not select the region underneath or start a drag.

<ExamplesExample file="v-map/slot-map" />

Placing points by latitude and longitude requires the projection the SVG was made with.

### Server rendering

The SVG is parsed in the browser after mounting, so server rendering outputs an empty container.
