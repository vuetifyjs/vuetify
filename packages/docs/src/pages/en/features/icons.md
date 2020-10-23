---
meta:
  title: Icons
  description: Vuetify supports Material Design Icons, Font awesome and other icon sets through prefixes and global options.
  keywords: vue icon component, iconfont, icon libraries, vuetify icons
related:
  - /components/icons/
  - /components/buttons/
  - /components/avatars/
---

# Icons

Vuetify comes bootstrapped with support for Material Design Icons, Material Icons, Font Awesome 4 and Font Awesome 5. By default, applications will default to use [Material Design Icons](https://materialdesignicons.com/).

<entry-ad />

## Usage

In order to change your font library, add the `iconfont` option during instantiation.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
  },
})
```

Using a predefined option will pre-fill defaults based upon the selected preset. This will overwrite the defaults of components that have default **icon** values. For more information, view the default [icon preset values](https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/services/icons/presets).

## Installing iconfonts

You are required to include the specified icon library (even if using default). This can be done by including a CDN link or importing the icon library into your application.

<alert type="info">

  In this page "Material Icons" is used to refer to the [official google icons](https://material.io/resources/icons/) and "Material Design Icons" refers to the [extended third-party library](https://materialdesignicons.com/)

</alert>

### Material Design Icons

Use this tool to search for any Material Design Icons and copy them to your clipboard by clicking the item.

<icon-list />

This is the default icon font for Vuetify. You can include it through a CDN:

```html
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
```

Or as a local dependency:

```bash
$ yarn add @mdi/font -D
// OR
$ npm install @mdi/font -D
```

```js
// src/plugins/vuetify.js

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
})
```

### Material Design Icons - JS SVG

Use the SVG paths as designated in [@mdi/js](https://www.npmjs.com/package/@mdi/js). This is the recommended installation when optimizing your application for production. You **ONLY** need to include this if you plan on using more than the default icons.

```bash
$ yarn add @mdi/js -D
// OR
$ npm install @mdi/js -D
```

Specify the **mdiSvg** iconfont:

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
})
```

You can custom import only the icons you use granting a much smaller bundle size.

```html
<!-- Vue Component -->

<template>
  <v-icon>{{ svgPath }}</v-icon>
</template>

<script>
  import { mdiAccount } from '@mdi/js'

  export default {
    data: () => ({
      svgPath: mdiAccount
    }),
  }
</script>
```

### Material Icons

Installation is the same as the above. For projects without a build process, it is recommended to import the icons from CDN

```html
<link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
```

Alternatively, it is possible to install locally using yarn or npm. Keep in mind that this is not an official google repository and may not receive updates

```bash
$ yarn add material-design-icons-iconfont -D
// OR
$ npm install material-design-icons-iconfont -D
```

Once you have installed the package, import it into your main entry js file. This is typically the `main.js`, `index.js` or `app.js` located in your `src/` folder. If you are using an SSR application, you may have a `client.js` or `entry-client.js` file.

```js
// src/plugins/vuetify.js

import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
})
```

### Font Awesome 4 Icons

Same as above. Installing FontAwesome through cdn is the easiest way to check it out within your project:

```html
<link href="https://cdn.jsdelivr.net/npm/font-awesome@4.x/css/font-awesome.min.css" rel="stylesheet">
```

Installing FontAwesome**4** is the same as its newer version, just from a different repository. You will be targeting the `font-awesome` repo as opposed to `@fortawesome` one.

```bash
$ yarn add font-awesome@4.7.0 -D
// OR
$ npm install font-awesome@4.7.0 -D
```

Don't forget, your project will need to recognize css. If you are using webpack, install and setup the [css loader](https://github.com/webpack-contrib/css-loader).

```js
// src/plugins/vuetify.js

import 'font-awesome/css/font-awesome.min.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa4',
  },
})
```

### Font Awesome 5 Icons

The easiest way to get started with **FontAwesome** is to use a cdn. Within the head of your main `index.html` place this snippet:

```html
<link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">
```

To install locally you can pull in the [Free](https://fontawesome.com/) version of **FontAwesome** using your preferred package manager:

```bash
$ yarn add @fortawesome/fontawesome-free -D
// OR
$ npm install @fortawesome/fontawesome-free -D
```

Within your main entry point, simply import the package's **all.css**. If you are using a configured webpack project, you will need to setup support for `.css` files using the webpack [css loader](https://github.com/webpack-contrib/css-loader). If you are already using [Vue CLI](https://cli.vuejs.org/), this is done for you automatically.

```js
// src/plugins/vuetify.js

import '@fortawesome/fontawesome-free/css/all.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa',
  },
})
```

### Font Awesome SVG Icons

Add required dependencies.

```bash
$ yarn add @fortawesome/fontawesome-svg-core @fortawesome/vue-fontawesome @fortawesome/free-solid-svg-icons -D
// or
$ npm install @fortawesome/fontawesome-svg-core @fortawesome/vue-fontawesome @fortawesome/free-solid-svg-icons -D
```

Then add globally `font-awesome-icon` component and set `faSvg` as iconfont in Vuetify config.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon) // Register component globally
library.add(fas) // Include needed icons

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'faSvg',
  },
})
```

## Using custom icons

Let's say your application calls for a custom icon in a Vuetify component. Instead of creating a wrapper component or manually defining the specific icon each time a component appears, you can configure it at a global level.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa',
    values: {
      cancel: 'fas fa-ban',
      menu: 'fas fa-ellipsis-v',
    },
  },
})
```

If you are using a icon library that does not have a preset, you can create a custom one.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

const MY_ICONS = {
  complete: '...',
  cancel: '...',
  close: '...',
  delete: '...', // delete (e.g. v-chip close)
  clear: '...',
  success: '...',
  info: '...',
  warning: '...',
  error: '...',
  prev: '...',
  next: '...',
  checkboxOn: '...',
  checkboxOff: '...',
  checkboxIndeterminate: '...',
  delimiter: '...', // for carousel
  sort: '...',
  expand: '...',
  menu: '...',
  subgroup: '...',
  dropdown: '...',
  radioOn: '...',
  radioOff: '...',
  edit: '...',
  ratingEmpty: '...',
  ratingFull: '...',
  ratingHalf: '...',
  loading: '...',
  first: '...',
  last: '...',
  unfold: '...',
  file: '...',
}

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    values: MY_ICONS,
  },
})
```

## Reusable custom icons

Vuetify will _automatically_ merge any icon strings provided into the pool of available presets. This allows you to create custom strings that can be utilized in your application by simply referencing the **global icons**.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default
    values: {
      product: 'mdi-dropbox',
      support: 'mdi-lifebuoy',
      steam: 'mdi-steam-box',
      pc: 'mdi-desktop-classic',
      xbox: 'mdi-xbox',
      playstation: 'mdi-playstation',
      switch: 'mdi-nintendo-switch',
    },
  },
})
```

This can help ensure your application is always using a specific icon given a provided string. Here are a few ways that you can use `<v-icon>` with this system.

```html
<!-- Vue Component -->

<template>
  <div>
    <v-icon>$vuetify.icons.product</v-icon>
    <v-icon>$product</v-icon>

    <v-icon v-text="'$vuetify.icons.support'"></v-icon>
    <v-icon v-text="'$support'"></v-icon>

    <v-icon v-html="'$vuetify.icons.steam'"></v-icon>
    <v-icon v-html="'$steam'"></v-icon>

    <v-icon v-text="platform"></v-icon>
  </div>
</template>

<script>
  export default {
    data: () => ({
      user: {
        name: 'John Leider',
        platform: 'pc',
      },
    }),

    computed: {
      platform () {
        return '$' + this.user.platform
      }
    }
  }
</script>
```

## Custom components

You can utilize the same icon strings in your own custom components. Any time **$vuetify.icons** (or shortcut **$**) is passed in through _v-text_, _v-html_ or as text, `<v-icon>` will look up that specified value. This allows you to create customized solutions that are easy to build and easy to manage.

```html
<!-- Vue Component -->

<template>
  <div class="my-component">
    <v-icon v-text="icon"></v-icon>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        default: '$cancel'
      }
    }
  }
</script>
```

### Font Awesome Pro Icons

You can utilize component icons with Font Awesome Pro to select individual icon weights:

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars } from '@fortawesome/pro-light-svg-icons'
import { faVuejs } from '@fortawesome/free-brands-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faBars, faVuejs)

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    values: {
      // set menu to light (default is solid)
      menu: {
        component: FontAwesomeIcon,
        props: {
          icon: ['fal', 'bars'],
        },
      },
      // reusable custom icon
      vuejs: {
        component: FontAwesomeIcon,
        props: {
          icon: ['fab', 'vuejs'],
        },
      },
    },
  },
})
```

## Component icons

Instead of provided icon fonts presets you can use your own component icons. You also can switch icons that are used in Vuetify component with your own.

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import IconComponent from './IconComponent.vue'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    values: {
      product: {
        component: IconComponent, // you can use string here if component is registered globally
        props: { // pass props to your component if needed
          name: 'product',
        },
      },
    },
  },
})
```

If you want your SVG icon to inherit colors and scale correctly - be sure add the following css to it:

```stylus
.your-svg-icon
  fill: currentColor
```

## Missing Material Icons

Some material icons are missing by default. For example, `person` and `person_outline` are available, but `visibility_outline` isn't, while `visibility` is. To use missing material icons, include the font below (remove another material font if already registered).

```html
<link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp"
/>
```

You can add your custom component. Let me assume it is **@/components/MaterialIcon.vue**.

```html
<template>
  <i :class="standardClass">{{ parsed.id }}</i>
</template>

<script>
export default {
  props: {
    name: {
      type: String
    }
  },
  computed: {
    parsed() {
      const check = (customSuffixes, standardSuffix) => {
        for (let suffix of customSuffixes) {
          suffix = `_${suffix}`
          if (this.name.endsWith(suffix)) {
            return {
              suffix: standardSuffix,
              id: this.name.substring(0, this.name.indexOf(suffix))
            }
          }
        }
        return false
      }

      return (
        check(['fill', 'filled'], '') ||
        check(['outline', 'outlined'], 'outlined') ||
        check(['two-tone', 'two-toned'], 'two-tone') ||
        check(['round', 'rounded'], 'round') ||
        check(['sharp', 'sharpened'], 'sharp') || {
          suffix: '',
          id: this.name
        }
      )
    },
    standardClass() {
      if (this.parsed.suffix) {
        return `material-icons-${this.parsed.suffix}`
      }
      return 'material-icons'
    }
  }
}
</script>
```

Then you need to register the exact material icons you want.

```js
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import MaterialIcon from '@/components/MaterialIcon'

function missingMaterialIcons(ids) {
  const icons = {}
  for (const id of ids) {
    for (const suffix of ['fill', 'outline', 'two-tone', 'round', 'sharp']) {
      const name = `${id}_${suffix}`
      icons[name] = {
        component: MaterialIcon,
        props: {
          name
        }
      }
    }
  }
  return icons
}

Vue.use(Vuetify, {
  // iconfont: 'md',
  icons: {
    values: {
      ...missingMaterialIcons(['visibility', 'visibility_off'])
      // This will enable 'visibility_outline', 'visibility_off_round' and so on.
    }
  }
})
```

Finally you can use the material icons like this.

```html
<!-- using as a prop. Be careful of double and single quotation. -->
<v-text-field
    label="password"
    :append-icon="
      pwShow
        ? '$visibility_outline'
        : '$visibility_off_outline'
    "
    @click:append="pwShow = !pwShow"
    :type="pwShow ? 'text' : 'password'"
  />

<!-- using directly as an icon component -->
<v-icon>$visibility_outline</v-icon>
```

<backmatter />
