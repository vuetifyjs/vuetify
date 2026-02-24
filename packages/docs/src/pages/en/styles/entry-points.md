---
emphasized: true
meta:
  title: Entry points
  description: Vuetify style entry points
  keywords: styles, sass, variables, configuration, core
related:
  - /styles/css-reset/
  - /styles/colors/
  - /features/sass-variables/
---

# Style entry points

Vuetify allows you to import styles via JavaScript (pre-compiled CSS) or SASS (SCSS). Choosing the right entry point depends on whether you need a quick setup or deep customization capabilities (such as overriding SASS variables).

## From javascript

Imports in this section are typically added to your `main.js` or `main.ts` file. These are pre-compiled CSS files, meaning you cannot override SASS variables with them, but they are the easiest way to get started.

### All-in-one

The `vuetify/styles` is the **standard, all-in-one import**. It includes the core framework, utility classes, and the layout system.

* **Best for:** Most applications that do not require granular control over CSS file size.
* **Usage:**

  ```js { resource="src/plugins/vuetify.js" }
  import 'vuetify/styles'
  import { createVuetify } from 'vuetify'
  ```

### Individual modules

If you are strictly managing bundle size or using a manual build process, you can import style modules individually.

#### `vuetify/styles/core`

Contains the CSS reset, typography fundamentals, and basic application structure.

::: info
**Note:** This **must be first** in your import order to ensure the CSS layers have not already been declared elsewhere.
:::

#### `vuetify/styles/colors`

Includes the Material Design color palette utility classes (e.g., `text-red`, `bg-blue-darken-1`). If you are defining your own theme colors and do not use the standard Material palette classes, you may omit this.

#### `vuetify/styles/utilities`

Contains helper classes for layout and spacing (e.g., `d-flex`, `mt-4`, `pa-2`).

**Example of modular import:**

```js { resource="src/plugins/vuetify.js" }
import 'vuetify/styles/core'      // Reset and structure (Required first)
import 'vuetify/styles/colors'    // Optional: standard color classes
import 'vuetify/styles/utilities' // Optional: helper classes
```

-----

## From SASS

Using SASS entry points allows you to utilize Vuetify's compilation-time features. This is required if you wish to override global SASS variables (like changing the default font or border radius) or use Vuetify's internal mixins.

### Main entry point

The `vuetify/styles` acts as the main entry point to load the framework's styles. `$color-pack` and `$utilities` can be configured on this import if you aren't using `styles.configFile`.

```scss { resource="src/styles/main.scss" }
@use 'vuetify';
// OR (these both point to the same file)
@use 'vuetify/styles';
```

This would be the same as only importing `vuetify/styles/core`:

```scss { resource="src/styles/main.scss" }
@use 'vuetify' with (
  $color-pack: false,
  $utilities: false,
);
```

### Sass settings

The `vuetify/settings` module is used to configure global SASS variables. See [sass variables](/features/sass-variables) for more information.

**Example configuration:**

```scss { resource="src/styles/_settings.scss" }
@use 'vuetify/settings' with (
  $utilities: false,
  $body-font-family: ('Remora Sans', sans-serif),
);
```
