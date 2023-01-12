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

<entry />

## Usage

<example file="border-radius/usage" />

## Caveats

<alert type="info">

  The values **sm**, **md**, **lg**, and **xl** correlate to the border radius *size* and are not affected by breakpoints.

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

<alert type="info">

  Logical values `start` and `end` are only used in the inline direction (left and right) to avoid confusion

</alert>

#### Pill and circle

You can create pills with the `.rounded-pill` class and circles with the `.rounded-circle` class.

<example file="border-radius/misc-pill-and-circle" />

#### Rounding by side

Border radius is configurable on a per-side basis using the infix classes `-t`, `-e`, `-b`, and `-s` (corresponding respectively to the sides **top**, **end**, **bottom** and **start**).

E.g. `.rounded-b-xl` and `.rounded-t`.

<example file="border-radius/misc-rounding-by-side" />

#### Rounding by corner

Border radius is configurable on a per-corner basis using the infix classes, `-ts`, `-te`, `-be`, `-bs` (corresponding respectively to the corners **top-start**, **top-end**, **bottom-end**, **bottom-start**)

E.g. `.rounded-be-xl` and `.rounded-te`.

<example file="border-radius/misc-rounding-by-corner" />

#### Removing Border Radius

Use the `.rounded-0` helper class to remove all border radius on an element, or select by side or corner; e.g. `.rounded-s-0` and `.rounded-te-0`.

<example file="border-radius/misc-removing-border-radius" />
