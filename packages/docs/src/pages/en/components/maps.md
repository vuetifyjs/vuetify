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

The `v-map` component displays one SVG file as an interactive map. It implements navigation and region interaction using Vue and browser APIs. Map files are supplied by your application, and no map service or additional mapping dependency is used.

<PageFeatures />

## Installation

Import the Labs component in your component or register it with your Vuetify instance:

```js
import { VMap } from 'vuetify/labs/VMap'
```

## Usage

The example supplies a schematic SVG with three service areas through **svg**. Applications own the SVG source and any loading or caching. The component does not make network requests. Use SVG artwork with a license compatible with your application.

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

`v-model` holds the selected region identifier, or `null`. Activating the selected region clears it. **region-colors** assigns fills by identifier, while **selected-color** controls the selected fill. Values accept theme names or CSS colors. Original SVG fills are preserved unless overridden. Shapes without a fill use a transparent fallback.

<ExamplesExample file="v-map/prop-region-colors" />

Enable **multiple** to select regions independently. The model then contains an array of identifiers.

<ExamplesExample file="v-map/prop-multiple" />

### Navigation

- Drag to pan within the map bounds.
- Double click to zoom around the pointer. Shift-double-click zooms out.
- Enable **wheel** to opt into mouse wheel zoom. It is off by default so the map does not capture page scrolling. Browser shortcuts with modifier keys remain available.
- Pinch with two pointers to zoom on touch devices.
- Tab enters the map at one region. Arrow keys move focus toward neighbouring regions; `Home` and `End` focus the first and last region. Tab leaves the map.
- Press `Enter` or `Space` to select a focused region. Regions outside the viewport are revealed by panning, with reduced motion preferences respected.

`v-model:zoom` is the magnification relative to the full SVG. **min-zoom** and **max-zoom** constrain navigation, with a minimum supported magnification of one. **zoom-step** sets the relative increment for wheel zoom, double click, and the exposed zoom methods, and controls continuous pinch sensitivity. Smaller values produce gentler zoom changes. **readonly** freezes selection while preserving navigation. **disabled** also disables navigation, hover and focus styles, and region keyboard interaction.

Enable **zoom-on-focus** to fit the focused region in the viewport. Small regions are magnified and larger regions can zoom out, within **min-zoom** and **max-zoom**. This requires **pan** and **zoomable**, and respects reduced motion preferences. When disabled, keyboard navigation keeps the existing zoom and pans to reveal the focused region.

<ExamplesExample file="v-map/prop-zoom-on-focus" />

### Custom controls

The default slot renders inside `.v-map`, outside the SVG. It receives a mutable `zoom` ref, the zoom limits, and `zoomIn`, `zoomOut`, and `reset` functions. Use these to build buttons or bind a slider to `zoom.value`. The component does not ship control buttons or global zoom keyboard shortcuts. Application shortcuts can be added with `useHotkey`.

The following example enables shortcuts only while focus is inside its map. They are inactive elsewhere, and text inputs retain their normal behavior.

<ExamplesExample file="v-map/misc-hotkeys" />

### Tooltips and markers

The `tooltip` slot receives the region identifier, title, and selection state. The tooltip follows the pointer, and anchors to a region when it receives keyboard focus.

<ExamplesExample file="v-map/slot-tooltip" />

Use the `map` slot for SVG elements in the original map coordinate system. It receives `regions`, `selected`, and `viewBox`. Slot content is authored by the application; add its interactions and accessible labels explicitly. For example, text labels can use `pointer-events="none"` to leave region interaction available underneath.

This example gives an office marker its own tooltip and selection state. Pointer and activation events stop at the marker so they do not select a map region or start a drag. The marker can also be activated with `Enter` or `Space`.

<ExamplesExample file="v-map/slot-map" />

Latitude and longitude require a conversion matching the projection used to create your SVG. Zooming reveals the geometry already present in the file; it does not request additional map detail.

### Loading and rendering

SVG parsing starts after mounting in the browser, keeping server rendering free of DOM access. Changing **svg** clears stale geometry. Use the `error` slot to customize parsing errors, and the **load** and **error** events to observe parsing results. Fetch a file, import it as raw text, or read an uploaded file in application code before passing its contents to **svg**. Loading indicators and network errors belong to that application code.
