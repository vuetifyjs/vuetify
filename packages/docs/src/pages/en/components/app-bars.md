---
meta:
  nav: App bars
  title: App-bar component
  description: The app bar component is a supercharged toolbar with advanced scrolling techniques and application layout support.
  keywords: app bars, vuetify app bar component, vue app bar component
related:
  - /components/buttons/
  - /components/icons/
  - /components/toolbars/
features:
  figma: true
  label: 'C: VAppBar'
  report: true
  github: /components/VAppBar/
  spec: https://m2.material.io/components/app-bars-top
---

<script setup>
  import PropScrollBehavior from '@/examples/v-app-bar/prop-scroll-behavior.vue'
</script>

# App bars

The `v-app-bar` component is a toolbar at the top of the application that holds navigation and actions.

<PageFeatures />

## Usage

<ExamplesUsage name="v-app-bar" />

::: warning

`v-app-bar` depends on Vuetify's [layout system](/features/application-layout/) and must be placed inside `v-app` or `v-layout`.

:::

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-app-bar](/api/v-app-bar/) | Primary Component |
| [v-app-bar-nav-icon](/api/v-app-bar-nav-icon/) | A customized [v-btn](/components/buttons/) component that uses a default *icon* value of **$menu** |
| [v-app-bar-title](/api/v-app-bar-title/) | An extension of `v-toolbar-title` that is used for scrolling techniques |

<ApiInline hide-links />

::: tip

The app-bar component works great in conjunction with a [v-navigation-drawer](/components/navigation-drawers) for providing site navigation in your application.

:::

## Anatomy

The recommended placement of elements inside of `v-app-bar` is:

- Place `v-app-bar-nav-icon` or other navigation items on the far left
- Place `v-app-bar-title` to the right of navigation
- Place contextual actions to the right of navigation
- Place overflow actions to the far right

![App Bar Anatomy](https://cdn.vuetifyjs.com/docs/images/components-temp/v-app-bar/v-app-bar-anatomy.png)

| Element / Area | Description |
| - | - |
| 1. Container | The App Bar container holds all `v-app-bar` components |
| 2. App Bar Icon (optional) | A styled icon button component created that is often used to control the state of a `v-navigation drawer` |
| 3. Title (optional) | A heading with increased **font-size** |
| 4. Action items (optional) | Used to highlight certain actions not in the overflow menu |
| 5. Overflow menu (optional) | Place less often used action items into a hidden menu |

::: warning

The first and last `v-btn` directly inside `v-app-bar` get a small margin from the app bar's edges. If you wrap a button in another element, such as a `div`, it loses this margin and touches the edge of the app bar. Place buttons in the **prepend** and **append** slots to keep it.

:::

## Examples

### Props

#### Scroll behavior

**scroll-behavior** takes one or more of these values, separated by spaces:

- **hide**: The default slot area will shift up and hide as the user scrolls down. The extension slot remains visible.
- **fully-hide**: The entire app bar will hide as the user scrolls down.
- **collapse**: Shrink horizontally to a small bar in one corner.
- **elevate**: Add a drop shadow to the app bar when scrolling. Applies after any amount of scrolling, ignoring **scroll-threshold**.
- **fade-image**: Fade out the image as the user scrolls down.
- **inverted**: Reverse the other values, applying them at the top of the page and removing them on scroll. Has no effect on its own.

**scroll-threshold** sets how many pixels the user scrolls before the behavior applies. To follow a scrollable element instead of the window, pass its selector to **scroll-target**.

<prop-scroll-behavior />

#### Density

Use `density="compact"` for a shorter app bar, for example in dense desktop layouts.

<ExamplesExample file="v-app-bar/prop-density" />

#### Images

**image** sets a background image. To change how the image renders, put your own `v-img` in the **image** slot.

<ExamplesExample file="v-app-bar/prop-image" />

#### Prominent

`density="prominent"` makes the app bar taller, with room for a long title or an image.

<ExamplesExample file="v-app-bar/prop-prominent" />
