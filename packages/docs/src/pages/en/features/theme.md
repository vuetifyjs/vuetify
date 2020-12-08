---
meta:
  title: Theme configuration
  description: Setup your application's theme and supplemental colors in a flash.
  keywords: themes
related:
  - /styles/colors/
  - /styles/transitions/
  - /getting-started/wireframes/
nav: Theme
---

# Theme configuration

Easily change the colors of your application programmatically. Rebuild the default stylesheet and customize various aspects of the framework for your particular needs.

<promoted-ad slug="vuemastery-themes" />

## Theme generator

Discover and generate new color themes for your **Vuetify** applications using our [Theme Generator](https://theme-generator.vuetifyjs.com) tool.

## Light and dark

Vuetify supports both **light** and **dark** variants of the Material Design spec. This designation starts at the root application component, `v-app` and is supported by majority of components. By default, your application will use the **light** theme, but this can be easily overwritten by adding the **dark** option in the theme service.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: { dark: true },
})
```

When you designate a component as light or dark, all of its children will inherit and apply the same unless otherwise specified. You can manually turn **dark** on and off by changing `this.$vuetify.theme.dark` to **true** or **false**.

## Customizing

By default, Vuetify has a standard theme applied for all components.

```js
{
  primary: '#1976D2',
  secondary: '#424242',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107',
}
```

This can be easily changed. Simply pass a **theme** property to the Vuetify constructor. You can choose to modify all or only some of the theme properties, with the remaining inheriting from the default.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
})
```

You can also use the pre-defined material colors.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.purple,
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3,
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
})
```

By default, the theme service will use your application's primary color for **anchor** tags. You can override this by adding an anchor property to the theme:

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#b0bec5',
        anchor: '#8c9eff',
      },
    },
  },
})

export default vuetify
```

Under the hood, Vuetify will generate css classes based upon these values that will be accessible in the DOM. These classes will follow the same markup as other helper classes, `primary` or `secondary--text` for example. If you supply an entire color object (as in `colors.purple` above), the lighten/darken variations will be used directly instead of being generated.

These values will also be made available on the instance **$vuetify** object under the **theme** property. This allows you to _dynamically_ modify your theme. Behind the scenes, Vuetify will regenerate and update your theme classes, seamlessly updating your application.

```js
// Light theme
this.$vuetify.theme.themes.light.primary = '#4caf50'

// Dark theme
this.$vuetify.theme.themes.dark.primary = '#4caf50'
```

### Custom theme variants

While Vuetify automatically generates _lighten_ and _darken_ variants for theme colors, you may want to control this yourself. Simply pass a theme object that contains the variants that you wish to modify. Anything not provided will still be generated for you.

```js
// src/plugins/vuetify/theme.js

import colors from 'vuetify/lib/util/colors'

export default {
  primary: {
    base: colors.purple.base,
    darken1: colors.purple.darken2,
  },
  secondary: colors.indigo,
  // All keys will generate theme styles,
  // Here we add a custom `tertiary` color
  tertiary: colors.pink.base,
}
```

You can now import your custom theme object and apply it to Vuetify

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import light from './theme'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: { light },
  },
})
```

Below is a full list of the overwritable keys on the theme object:

```ts
interface ParsedThemeItem {
  base: string
  lighten5: string
  lighten4: string
  lighten3: string
  lighten2: string
  lighten1: string
  darken1: string
  darken2: string
  darken3: string
  darken4: string

  [name: string]: string
}
```

### Disable theme

You can disable theme functionality by using the **disable** property with a value of **true**. This will prevent the creation of the Vuetify stylesheet.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

const vuetify = new Vuetify({
  theme: { disable: true },
})
```

## Options

Vuetify generates theme styles at run-time for SPA's and server side for SSR applications. The generated styles will be placed in a `<style>` tag with an **id** of **vuetify-theme-stylesheet**.

### Minification

The `minifyTheme` option allows you to provide a custom minification implementation. This helps to reduce the initial page size and is suggested to be paired with [`options.themeCache`](#caching). In this example we use the [minify-css-string](https://github.com/bentatum/minify-css-string) package to minify the *generated theme styles*.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import minifyTheme from 'minify-css-string'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: { minifyTheme },
  },
})
```

### Caching

You have the option to pass a custom `themeCache` implementation. This allows you to skip the need to recalculate the theme object. Below is an example using the [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) property:

```js
// src/plugins/vuetify.js

export default new Vuetify({
  theme: {
    options: {
      themeCache: {
        get: key => localStorage.getItem(key),
        set: (key, value) => localStorage.setItem(key, value),
      },
    },
  },
})
```

<alert type="warning">

  The provided `themeCache` object **must** contain a `get` and `set` method. Use them for retrieving and setting the *generated css* string.

</alert>

Caching can also be done through [lru-cache](https://github.com/isaacs/node-lru-cache). This is specifically useful for SSR (Server Side Rendered) applications.

```js
// src/plugins/vuetify.js

const themeCache = new LRU({
  max: 10,
  maxAge: 1000 * 60 * 60, // 1 hour
})

export default new Vuetify({
  theme: {
    options: { themeCache },
  },
})
```

### Custom properties

Enabling `customProperties` will also generate a [css variable](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) for each theme color, which you can then use in your components' `<style>` blocks.

<alert type="warning">

  Custom properties are not natively supported in Internet Explorer. Polyfills are available—**with some limitations**—for Internet Explorer 11:

- [Custom properties polyfill](https://github.com/nuxodin/ie11CustomProperties)
- [CSS vars polyfill](https://github.com/jhildenbiddle/css-vars-ponyfill)

</alert>

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

export default new Vuetify({
  theme: {
    options: { customProperties: true },
  },
})
```

```html
<style scoped>
  .something {
    color: var(--v-primary-base);
    background-color: var(--v-accent-lighten2);
  }
</style>
```

### CSP nonce

Pages with the `script-src` or `style-src` CSP rules enabled may require a **nonce** to be specified for embedded style tags.

```html
<!-- Use with script-src -->
Content-Security-Policy: script-src 'self' 'nonce-dQw4w9WgXcQ'

<!-- Use with style-src -->
Content-Security-Policy: style-src 'self' 'nonce-dQw4w9WgXcQ'
```

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

export default new Vuetify({
  theme: {
    options: { cspNonce: 'dQw4w9WgXcQ' },
  },
})
```

### Variations

When Vuetify generates your *application's theme*, it creates **9 variants** for each color. For majority of users, these variants are rarely used. This is an **opt in** feature that will be __false by default__ in the next major version.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

export default new Vuetify({
  theme: {
    options: { variations: false },
  },
})
```

## Theme Provider

The Vuetify theme system is propagated through the [provide](https://vuejs.org/v2/api/#provide-inject) functionality in Vue. There may be situations in which you need to manually change the provided theme (dark or light).

### API

- [v-theme-provider](/api/v-theme-provider)

### Example

Use the `v-theme-provider` to manually overwrite all children component's current theme **(light/dark)**. In the following example, the root `v-card` is explicitly set to `dark` with 2 children lists. The first one inherits from the parent `v-card` while the second is explicitly set to match the **root** Vuetify theme.

<example file="theme/misc-provider" />

<backmatter />
