---
nav: Overlays
meta:
  title: Overlay component
  description: The overlay component makes it easy to create a scrim over components or your entire application.
  keywords: overlays, vuetify overlay component, vue overlay component
related:
  - /components/dialogs/
  - /components/menus/
  - /components/tooltips/
---

# Overlays

`v-overlay` is the base for components that float over the rest of the page, such as `v-menu` and `v-dialog`. It can also be used on its own and comes with everything you need to create a custom popover component.

## Usage

In its simplest form, the `v-overlay` component will add a dimmed layer over your application.

<example file="v-overlay/usage" />

<entry />

## API

| Component | Description |
| - | - |
| [v-overlay](/api/v-overlay/) | Primary Component |

<api-inline hide-links />

## Activator

Overlays can be opened with v-model, or by clicking or hovering on an activator element. An activator is mandatory for the connected locationLocation strategy. The activator element (if present) will also be used by some transitions to slide or scale from the activator's location instead of the middle of the screen.

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

Overlay content is absolutely positioned to the center of its container by default.

### Connected

`location-strategy="connected"`

The connected strategy is used by [v-menu](/components/menus) and [v-tooltip](/components/tooltips) to attach the overlay content to an activator element.

`location` selects a point on the activator, and `origin` a point on the overlay content. The content element will be positioned so the two points overlap.

<example file="v-overlay/connected-playground" />

## Scroll Strategies

### Block (default)

`scroll-strategy="block"`

Scrolling is blocked while the overlay is active, and the scrollbar is hidden. If `contained` is also set, scrolling will only be blocked up to the overlay's [`offsetParent`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent).

<example file="v-overlay/scroll-block" />

### Close

`scroll-strategy="close"`

Scrolling when the overlay is active will de-activate it.

<example file="v-overlay/scroll-close" />

### Reposition

`scroll-strategy="reposition"`

When using the `connected` location strategy, this scroll strategy will reposition the overlay element to always respect the activator location.

<example file="v-overlay/scroll-reposition" />

### None

`scroll-strategy="none"`

No scroll strategy is used.

<example file="v-overlay/scroll-none" />

## Examples

### Props

#### Contained

A **contained** overlay is positioned absolutely and contained inside its parent element.

<example file="v-overlay/prop-contained" />

### Misc

#### Advanced

Using the [v-hover](/components/hover), we are able to add a nice scrim over the information card with additional actions the user can take.

<example file="v-overlay/misc-advanced" />

#### Loader

Using the `v-overlay` as a background, add a progress component to easily create a custom loader.

<example file="v-overlay/misc-loader" />
