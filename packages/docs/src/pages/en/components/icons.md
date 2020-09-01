---
meta:
  title: Icon component
  description: The icon component is compatible with multiple common icon fonts such as Material Design Icons, Font Awesome and more.
  keywords: icons, vuetify icon component, vue icon component
related:
  - /customization/icons/
  - /components/buttons/
  - /components/cards/
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

[Font Awesome](http://fontawesome.io/icons/) is also supported. Simply use the `fa-` prefixed icon name. Please note that you still need to include the Font Awesome icons in your project. For more information on how to install it, please navigate to the [installation page](/customization/icons#install-font-awesome-5-icons)

<example file="v-icon/misc-font-awesome" />

#### Material Design

[Material Design](https://material.io/tools/icons/?style=baseline) is also supported. For more information on how to install it please [navigate here](/customization/icons#install-material-icons)

<example file="v-icon/misc-md" />

#### MDI SVG

You can manually import only the icons you use when using the [@mdi/js](https://www.npmjs.com/package/@mdi/js) package. If you want to use SVG icons with `VIcon` component, read about using them [here](/customization/icons#install-material-design-icons-js-svg).

<example file="v-icon/misc-mdi-svg" />

<backmatter />
