---
meta:
  title: CSS Reset
  description: Vuetify uses ress.min, a complete browser reset based off or normalize.css.
  keywords: ress.min, css reset, vuetify css reset
related:
  - /styles/colors/
  - /styles/text-and-typography/
  - /features/sass-variables/
---

# CSS Reset

Opinionated base styles for Vuetify projects.

<entry-ad />

## Bootstrapping

ress is a modern CSS reset that applies a solid base for stylesheets. It is built on top of [normalize.css](https://github.com/necolas/normalize.css) and adds new features such as specifying `font-family: monospace` for `<code>` elements, removing all `outlines` from elements when hovering, and much much more. Additional information can be found on the [ress GitHub repository](https://github.com/filipelinhares/ress).

<alert type="warning">

  The Vuetify style reset is applied globally and affects default elements such as `button` and `input`. This also includes anything located outside of the [v-app](/components/application) component.

</alert>

These styles are automatically imported within **src/styles/generic/_reset.scss** and bootstrapped as **Generic** styles within **src/styles/generic/_index.scss**:

```scss
// styles/generic/_index.scss

// Generic styling for bare HTML elements (like H1, A, etc.).
// These come with default styling from the browser so that
// we can redefine them here.
@import './reset.scss';

@import './animations.scss';

@import './colors.scss';

@import './elevation.scss';

@import './transitions.scss';
```

## Reset Features

Below is a list of additional *features* that ress provides over the default **normalize.css** functionality

- Apply `box-sizing: border-box` in all elements.
- Reset `padding` and `margin` in all elements.
- Specify `background-repeat: no-repeat` in all elements and pseudo elements.
- Inherit `text-decoration` and `vertical-align` to `::before` and `::after`.
- Remove the `outline` when hovering in all browsers.
- Specify `font-family: monospace` in code elements.
- Reset `border-radius` in input elements.
- Specify font inheritance of form elements.
- Remove the default button styling in all browsers.
- Specify textarea resizability to vertical.
- Apply `cursor: pointer` to button elements.
- Apply `tab-size: 4` in `html`.
- Style `select` like a standard input.
- Style `cursor` by aria attributes.
- Hide content from screens but not screen readers.

For a complete list of all applied styles, see the [ress css stylesheet](https://github.com/filipelinhares/ress/blob/master/ress.css).

<backmatter />
