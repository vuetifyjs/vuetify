---
meta:
  title: Border radius
  description: Use border utilities to quickly style the border-radius of any element.
  keywords: border radius classes, radius utilities, vuetify radius helper classes
related:
  - /styles/text-and-typography/
  - /components/sheets/
  - /components/buttons/
---

# Border Radius

Use border utilities to quickly style the border-radius of any element.

<entry-ad />

## Usage

<example file="border-radius/usage" />

## Caveats

<alert type="info">

  The infixes **sm**, **lg**, and **xl** correlate to the border radius *size* and are not affected by breakpoints.

</alert>

## SASS Variables

Configure or disable the border radius helper classes. Requires the use of the [vue-cli-plugin-vuetify](https://github.com/vuetifyjs/vue-cli-plugins/tree/master/packages/vue-cli-plugin-vuetify) library and a configured `variables.s(c|a)ss` file. Additional information on how to configure variables is located on the [SASS Variables](/features/sass-variables) documentation page.

Rounded sizes are based off of the `$border-radius-root` variable which has a default value of **0.25rem**.

```scss
$rounded: (
  0: 0,
  'sm': $border-radius-root / 2,
  null: $border-radius-root,
  'lg': $border-radius-root * 2,
  'xl': $border-radius-root * 6,
  'pill': 9999px,
  'circle': 50%
);
```

### Overwriting Radiuses

You can change or add *border-radius* sizes by adding a list named `$rounded` in your project's `variables` file.

```scss
$rounded: (
  'sm': $border-radius-root / 3,
  'lg': $border-radius-root * 2
);
```

## Examples

### Misc

#### Pill and circle

You can create pills with the `.rounded-pill` class and circles with the `.rounded-circle` class.

<example file="border-radius/misc-pill-and-circle" />

#### Removing Border Radius

Use the `.rounded-0` helper class to *remove* all of an elements radius or select by side or corner; e.g. `.rounded-l-0` and `.rounded-tr-0`.

<example file="border-radius/misc-removing-border-radius" />

#### Rounding all corners

The **rounded** helper classes allow you to modify the *border radius* of an element. Use the `.rounded-sm`, `.rounded`, `.rounded-lg`, and `.rounded-xl` to add a border radius of varying size.

<example file="border-radius/misc-rounding-all-corners" />

#### Rounding by side

Border radius is configurable on a per side basis using the infix classes, **t, r, b, l**; e.g. `.rounded-b-xl` and `.rounded-t`.

<example file="border-radius/misc-rounding-by-side" />

#### Rounding by corner

Border radius is configurable on a per corner basis using the infix classes, **tl, tr, br, bl**; e.g. `.rounded-br-xl` and `.rounded-tr`.

<example file="border-radius/misc-rounding-by-corner" />

<backmatter />
