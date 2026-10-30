---
meta:
  nav: Maps
  title: SVG map component
  description: Display a self-hosted SVG map with selection, tooltips, panning, and zooming, without a mapping library.
  keywords: vuetify map component, vue svg map, self-hosted map, interactive regions
features:
  github: /labs/VMap/
  label: 'C: VMap'
  report: true
---

# Maps

The `v-map` component displays one SVG file as an interactive map. It implements navigation and region interaction using Vue and browser APIs. Map files are supplied by your application, and no map service or additional mapping dependency is used.

<PageFeatures />

## Installation

Import the Labs component in your component or register it with your Vuetify instance:

```js
import { VMap } from 'vuetify/labs/VMap'
```

## Usage

The example uses a schematic SVG with three service areas. Host your own map file and pass its URL to **src**. The complete file is loaded once for each source change. Inline SVG markup can be supplied using **svg**, which takes precedence over **src**.

<ExamplesExample file="v-map/usage" />

## API

| Component | Description |
| - | - |
| [v-map](/api/v-map/) | Interactive SVG map |

<ApiInline hide-links />

## Guide

### Preparing an SVG

Provide a valid SVG namespace and a positive `viewBox`. Numeric `width` and `height` can be used if a `viewBox` is absent. Give interactive paths or groups unique identifiers. Labels come from `aria-label`, a child `<title>`, or the identifier. **region-labels** overrides these labels.

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600">
  <path id="DZ" aria-label="Algeria" d="..." />
  <g id="TN">
    <title>Tunisia</title>
    <path d="..." />
  </g>
</svg>
```

Use an identifier on the enclosing group to treat a region containing several shapes as one target. Alternatively, `data-region` specifies a region identifier while retaining separate SVG element identifiers.

When shapes inside a group have their own SVG identifiers, put `data-region` on the group to keep them in one interactive region. Descendant SVG identifiers remain available for local references; a descendant with its own `data-region` defines a separate region.

The supported SVG subset includes paths, groups, basic shapes, text, gradients, clipping, masks, and local `<use>` references. Safe presentation properties in inline styles are retained. Export artwork with presentation attributes or inline styles: stylesheets, scripts, animation, foreign HTML, images, and external references are omitted. SVG identifiers and local references are scoped to each map instance.

### Selection and colors

`v-model` holds the selected region identifier, or `null`. Activating the selected region clears it. **region-colors** assigns fills by identifier, while **selected-color** controls the selected fill. Values accept theme names or CSS colors. Original SVG fills are preserved unless overridden.

<ExamplesExample file="v-map/prop-region-colors" />

### Navigation

- Drag to pan within the map bounds.
- Use the mouse wheel or double click to zoom around the pointer. Shift-double-click zooms out.
- Pinch with two pointers to zoom on touch devices.
- Focus the map and use arrow keys to pan, `+` and `-` to zoom, and `Home` to reset.
- Focus a region and press `Enter` or `Space` to select it.

`v-model:zoom` is the magnification relative to the full SVG. **min-zoom** and **max-zoom** constrain navigation, with a minimum supported magnification of one. **readonly** freezes selection while preserving navigation. **disabled** also disables navigation and removes map controls and regions from keyboard interaction. RTL changes the control layout while preserving the orientation of the map.

### Tooltips and markers

The `tooltip` slot receives the region identifier, title, and selection state. The default slot accepts SVG elements in the original map coordinate system, allowing markers and labels to follow navigation.

<ExamplesExample file="v-map/slot-tooltip" />

Latitude and longitude require a conversion matching the projection used to create your SVG. Zooming reveals the geometry already present in the file; it does not request additional map detail.

### Loading and rendering

SVG parsing starts after mounting in the browser, keeping server rendering free of DOM access. Source changes cancel the previous request and clear stale geometry. Use the `loading` and `error` slots to customize these states, and the **load** and **error** events to observe them. Only the supplied **src** is fetched; the component has no external provider fallback.
