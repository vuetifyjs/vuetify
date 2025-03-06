---
meta:
  nav: Icons
  title: Icon component
  description: The icon component is compatible with multiple common icon fonts such as Material Design Icons, Font Awesome and more.
  keywords: icons, vuetify icon component, vue icon component
related:
  - /features/icon-fonts/
  - /components/buttons/
  - /components/cards/
assets:
  - https://use.fontawesome.com/releases/v5.0.13/css/all.css
  - https://fonts.googleapis.com/icon?family=Material+Icons
features:
  figma: true
  github: /components/VIcon/
  label: 'C: VIcon'
  report: true
  spec: https://m2.material.io/design/iconography/system-icons.html
---

# Icons

The `v-icon` component provides a large set of glyphs to provide context to various aspects of your application. For a list of all available icons, visit the official [Material Design Icons](https://materialdesignicons.com/) page. To use any of these icons simply use the `mdi-` prefix followed by the icon name.

<PageFeatures />

## Usage

Icons come in two themes (light and dark), and five different sizes (x-small, small, medium (default), large, and x-large).

<ExamplesUsage name="v-icon" />

<PromotedEntry />

## API

| Component | Description |
| - | - |
| [v-icon](/api/v-icon/) | Primary Component |

<ApiInline hide-links />

## Examples

### Props

#### Color

Using color helpers you can change the color of an icon from the standard dark and light themes.

<ExamplesExample file="v-icon/prop-color" />

<!-- ### Events

#### Click

Binding any click event to `v-icon` will automatically change the cursor to a pointer.

<ExamplesExample file="v-icon/event-click" /> -->

### Misc

#### Buttons

Icons can be used inside of buttons to add emphasis to the action.

<ExamplesExample file="v-icon/misc-buttons" />

#### Font Awesome

[Font Awesome](https://fontawesome.com/icons/) is also supported. Simply use the `fa-` prefixed icon name. Please note that you still need to include the Font Awesome icons in your project. For more information on how to install it, please navigate to the [installation page](/features/icon-fonts#install-font-awesome-5-icons)

::: info
  Note that this example is using an icon set prefix, because the default icon set in the documentation is `mdi`. You can read more about using multiple icon sets [here](/features/icon-fonts/#multiple-icon-sets)
:::

<ExamplesExample file="v-icon/misc-font-awesome" />

#### Material Design

[Material Design](https://fonts.google.com/icons) is also supported. For more information on how to install it please [navigate here](/features/icon-fonts#install-material-icons)

::: info
  Note that this example is using an icon set prefix, because the default icon set in the documentation is `mdi`. You can read more about using multiple icon sets [here](/features/icon-fonts/#multiple-icon-sets)
:::

<ExamplesExample file="v-icon/misc-md" />

#### MDI SVG

You can manually import only the icons you use when using the [@mdi/js](https://www.npmjs.com/package/@mdi/js) package. Read more about using them [here](/features/icon-fonts#material-design-icons-js-svg).

::: info
  Note that this example is using an icon set prefix, because the default icon set in the documentation is `mdi`. You can read more about using multiple icon sets [here](/features/icon-fonts/#multiple-icon-sets)
:::

<ExamplesExample file="v-icon/misc-mdi-svg" />

## Accessibility

Icons can convey all sorts of meaningful information, so it’s important that they reach the largest amount of people possible. There are two use cases you’ll want to consider:

- **Decorative Icons** are only being used for visual or branding reinforcement. If they were removed from the page, users would still understand and be able to use your page.

- **Semantic Icons** are ones that you’re using to convey meaning, rather than just pure decoration. This includes icons without text next to them used as interactive controls — buttons, form elements, toggles, etc.

::: error
  WAI-ARIA Authoring Practices 1.1 notes that `aria-hidden="false"` currently [behaves inconsistently across browsers](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden).
:::

::: info
  WIP: Our team will change to the component to not render `aria-hidden="false"` when you pass a label  prop.
:::

### Decorative Font Icons

If your icons are purely decorative, you’ll need to manually add an attribute to each of your icons so they’re accessible.`aria-hidden`(automatically by vuetify)

### Semantic Font Icons

If your icons have semantic meaning, you need to provide a text alternative inside a (or similar) element. Also include appropriate CSS to visually hide the element while keeping it accessible to assistive technologies.

```html
<v-icon aria-hidden="false">
  mdi-account
</v-icon>
```

### Decorative SVG Icons

If your icons are purely decorative, you’ll need to manually add an attribute to each of your icons so they’re accessible.`aria-hidden`(automatically by vuetify)

### Semantic SVG Icons

Apply accessibility attributes to the [v-icon](/components/icons/) component, such as `role="img"`, to give it a semantic meaning.

```html { resource="Component.vue" }
<v-icon aria-label="My Account" role="img" aria-hidden="false">
  mdiAccount
</v-icon>

<script setup>
import { mdiAccount } from "@mdi/js";

const icons = { mdiAccount }
</script>
```
