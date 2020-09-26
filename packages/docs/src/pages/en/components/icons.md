---
meta:
  title: Icon component
  description: The icon component is compatible with multiple common icon fonts such as Material Design Icons, Font Awesome and more.
  keywords: icons, vuetify icon component, vue icon component
related:
  - /features/icons/
  - /components/buttons/
  - /components/cards/
assets:
  - https://use.fontawesome.com/releases/v5.0.8/css/all.css
  - https://fonts.googleapis.com/css?family=Material+Icons
---

# Icons

The `v-icon` component provides a large set of glyphs to provide context to various aspects of your application. For a list of all available icons, visit the official [Material Design Icons](https://materialdesignicons.com/) page. To use any of these icons simply use the `mdi-` prefix followed by the icon name.

<entry-ad />

## Usage

Icons come in two themes (light and dark), and five different sizes (x-small, small, medium (default), large, and x-large).

<usage name="v-icon" />

## API

- [v-icon](/api/v-icon)

## Examples

### Props

#### Color

Using color helpers you can change the color of an icon from the standard dark and light themes.

<example file="v-icon/prop-color" />

### Events

#### Click

Binding any click event to `v-icon` will automatically change the cursor to a pointer.

<example file="v-icon/event-click" />

### Misc

#### Buttons

Icons can be used inside of buttons to add emphasis to the action.

<example file="v-icon/misc-buttons" />

#### Font Awesome

[Font Awesome](http://fontawesome.io/icons/) is also supported. Simply use the `fa-` prefixed icon name. Please note that you still need to include the Font Awesome icons in your project. For more information on how to install it, please navigate to the [installation page](/features/icons#install-font-awesome-5-icons)

<example file="v-icon/misc-font-awesome" />

#### Material Design

[Material Design](https://material.io/tools/icons/?style=baseline) is also supported. For more information on how to install it please [navigate here](/features/icons#install-material-icons)

<example file="v-icon/misc-md" />

#### MDI SVG

You can manually import only the icons you use when using the [@mdi/js](https://www.npmjs.com/package/@mdi/js) package. If you want to use SVG icons with `VIcon` component, read about using them [here](/features/icons#install-material-design-icons-js-svg).

<example file="v-icon/misc-mdi-svg" />

## Accessibility

Icons can convey all sorts of meaningful information, so it’s important that they reach the largest amount of people possible. There are two use cases you’ll want to consider:

- **Decorative Icons** are only being used for visual or branding reinforcement. If they were removed from the page, users would still understand and be able to use your page.

- **Semantic Icons** are ones that you’re using to convey meaning, rather than just pure decoration. This includes icons without text next to them used as interactive controls — buttons, form elements, toggles, etc.

<alert type="error">

  WAI-ARIA Authoring Practices 1.1 notes that `aria-hidden="false"` currently [behaves inconsistently across browsers](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden).

</alert>

<alert type="info">

  WIP: Our team will change to the component to not render `aria-hidden="false"` when you pass a label  prop.

</alert>

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

If your icon has semantic meaning, all you need to do is throw a attribute.The attribute and the element are added so that your icons are properly accessible.`role="img"<v-icon>`.

```html
<v-icon aria-label="My Account" role="img" aria-hidden="false">
  mdiAccount
</v-icon>

<script>
import { mdiAccount } from "@mdi/js";

export default {
  data: () => ({
    icons: {
      mdiAccount
    }
  })
};
</script>
```

<backmatter />
