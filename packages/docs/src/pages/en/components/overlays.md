---
meta:
  nav: Overlays
  title: Overlay component
  description: The overlay component makes it easy to create a scrim over components or your entire application.
  keywords: overlays, vuetify overlay component, vue overlay component
related:
  - /components/dialogs/
  - /components/menus/
  - /components/tooltips/
features:
  github: /components/VOverlay/
  label: 'C: VOverlay'
  report: true
---

# Overlays

`v-overlay` is the base for components that float over the rest of the page, such as `v-menu` and `v-dialog`. It can also be used on its own and comes with everything you need to create a custom popover component.

<PageFeatures />

## Usage

In its simplest form, the `v-overlay` component will add a dimmed layer over your application.

<ExamplesExample file="v-overlay/usage" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-overlay](/api/v-overlay/) | Primary Component |

<ApiInline hide-links />

## Scrim customization

Overlays, dialogs, and temporary navigation drawers share three CSS custom properties:

| Property | Value | Default |
| - | - | - |
| `--v-scrim-blur` | CSS length, such as `8px` | `0px` |
| `--v-scrim-color` | Complete CSS color, such as `rgb(0 0 0)` | Black |
| `--v-scrim-opacity` | Number from `0` to `1` | `0.32` for overlays, `0.2` for drawers |

Tint opacity applies to the background color, so blur keeps its strength. The **scrim** prop still accepts a boolean or a color string. A string overrides `--v-scrim-color`, and its existing alpha is multiplied by the tint opacity. The overlay **opacity** prop or `--v-overlay-opacity` overrides the shared opacity. Set **scrim** to `false` to disable both tint and blur.

Configure these properties on `:root` to reach teleported overlays and drawer scrims:

```css
:root {
  --v-scrim-blur: 8px;
  --v-scrim-color: rgb(0 0 0);
}
```

Leaving `--v-scrim-opacity` unset preserves each component's default. Setting it configures a shared tint opacity. Existing `$overlay-opacity`, `$overlay-scrim-background`, and `$navigation-drawer-scrim-opacity` Sass variables remain fallback values.

You can also configure tokens per theme using [theme variables](/features/theme/#custom-themes):

```js
createVuetify({
  theme: {
    themes: {
      light: {
        variables: {
          'scrim-blur': '8px',
          'scrim-color': 'rgb(0 0 0)',
          'scrim-opacity': 0.24,
        },
      },
    },
  },
})
```

Use a complete CSS color such as `rgb(...)` for the `scrim-color` theme variable; hexadecimal theme variables are converted to RGB channels. Tokens follow the component's selected theme, including teleported overlays and the drawer's sibling scrim. For local configuration, put tokens on the overlay or on a drawer's containing layout; styles on the drawer element do not cascade to its sibling scrim.

<ExamplesExample file="v-overlay/misc-scrim-tokens" />

## Activator

Overlays can be opened with v-model, or by clicking or hovering on an activator element. An activator is mandatory for the connected location strategy. The activator element (if present) will also be used by some transitions to slide or scale from the activator's location instead of the middle of the screen.

Related props:

- `activator`
- `activatorProps`
- `openOnClick`
- `openOnHover`
- `openOnFocus`
- `closeDelay`
- `openDelay`

### Activator prop

The simplest way of providing an activator. Can be a CSS selector to pass to `document.querySelector()`, a component instance, or a HTMLElement. The string `"parent"` is also accepted to automatically bind to the parent element.

```html
<v-overlay activator="#id" />
<v-overlay activator=".class" />
<v-overlay :activator="elementRef" />
<v-btn>
  <v-overlay activator="parent" />
</v-btn>
```

### Activator slot

For more manual control, the slot can be used instead. `props` is an object containing all the relevant ARIA attributes and event handlers, and must be applied to the target element with `v-bind` for the component to work correctly.

```html
<v-overlay>
  <template #activator="{ isActive, props }">
    <v-btn v-bind="props">Overlay is {{ isActive ? 'open' : 'closed' }}</v-btn>
  </template>
</v-overlay>
```

## Location Strategies

### Static (default)

`location-strategy="static"`

Overlay content is positioned relative to the browser viewport. `location` selects a side and alignment
while `origin` helps control transition - e.g. you may want the dialog to appear from the left when snapped
to the left edge.

### Connected

`location-strategy="connected"`

The connected strategy is used by [v-menu](/components/menus) and [v-tooltip](/components/tooltips) to attach the overlay content to an activator element.

`location` selects a point on the activator, and `origin` a point on the overlay content. The content element will be positioned so the two points overlap.

<ExamplesExample file="v-overlay/connected-playground" />

## Scroll Strategies

### Block (default)

`scroll-strategy="block"`

Scrolling is blocked while the overlay is active, and the scrollbar is hidden. If `contained` is also set, scrolling will only be blocked up to the overlay's [`offsetParent`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent).

<ExamplesExample file="v-overlay/scroll-block" />

### Close

`scroll-strategy="close"`

Scrolling when the overlay is active will de-activate it.

<ExamplesExample file="v-overlay/scroll-close" />

### Reposition

`scroll-strategy="reposition"`

When using the `connected` location strategy, this scroll strategy will reposition the overlay element to always respect the activator location.

<ExamplesExample file="v-overlay/scroll-reposition" />

### None

`scroll-strategy="none"`

No scroll strategy is used.

<ExamplesExample file="v-overlay/scroll-none" />

## Examples

### Props

#### Contained

A **contained** overlay is positioned absolutely and contained inside its parent element.

::: info
  Note: The parent element must have position: relative.
:::

<ExamplesExample file="v-overlay/prop-contained" />

### Misc

#### Advanced

Using the [v-hover](/components/hover), we are able to add a nice scrim over the information card with additional actions the user can take.

<ExamplesExample file="v-overlay/misc-advanced" />

#### Loader

Using the `v-overlay` as a background, add a progress component to easily create a custom loader.

<ExamplesExample file="v-overlay/misc-loader" />
