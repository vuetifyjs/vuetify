---
meta:
  title: 图标字体
  description: Vuetify 通过前缀和全局选项支持 Material Design 图标、Font awesome 等图标集。
  keywords: vue 图标组件，图标字体，图标库，vuetify 图标
related:
  - /components/icons/
  - /components/buttons/
  - /components/avatars/
---

# 图标字体

Vuetify 支持引导 Material Design 图标, Material 图标, Font Awesome 4 和 Font Awesome 5 默认情况下，应用程序将默认使用 [Material Design 图标](https://materialdesignicons.com/)。

<entry-ad />

## 使用

要更改你的字体库，需要在实例化过程中添加 `iconfont`选项。

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

使用预定义选项将根据所选预设填充默认值。 这将覆盖组件的默认 <strong x-id=“1”>图标</strong> 值。 For more information, view the default [icon preset values](https://github.com/vuetifyjs/vuetify/tree/v2-stable/packages/vuetify/src/services/icons/presets).

## 安装图标字体

您需要包括指定的图标库（即使使用默认值）。 这可以通过包含一个 CDN 链接或将图标库导入到您的应用程序中来完成。

<alert type="info">

  在本页中，"Material 图标"被用来指代[谷歌官方图标](https://material.io/resources/icons/)，“Material Design 图标”指代[扩展的第三方库](https://materialdesignicons.com/)

</alert>

### Material Design 图标

使用此工具可搜索任何 Material Design 图标，并通过单击项目将其复制到剪贴板。

<icon-list />

这是Vuetify的默认图标字体。 您可以通过 CDN 引入它：

```html
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
```

或者作为本地依赖：

```bash
$ yarn add @mdi/font -D
// 或
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
    iconfont: 'mdi', // 默认值 - 仅用于展示目的
  },
})
```

### Material Design 图标 - JS SVG

使用 [@mdi/js](https://www.npmjs.com/package/@mdi/js) 中指定的 SVG 路径。 这是为生产应用程序优化时推荐的安装方式。 如果计划使用多个默认图标，你 <strong x-id=“1”>只</strong> 需要包含此项。

```bash
$ yarn add @mdi/js -D
// 或
$ npm install @mdi/js -D
```

指定 **mdiSvg** 图标字体：

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

您可以只导入您自定义使用的图标，以获取较小的bundle大小。

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

### Material 图标

安装与上面相同。 对于没有构建过程的项目，建议从CDN导入图标

```html
<link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
```

或者，可以使用yarn 或 npm 在本地安装。 请记住，这不是 google 官方的仓库，可能无法获取更新

```bash
$ yarn add material-design-icons-iconfont -D
// 或
$ npm install material-design-icons-iconfont -D
```

一旦您安装了包，将其导入到您的入口 js 文件中。 这通常是位于您的 `src/` 文件夹中的 `main.js`, `index.js` 或 `app.js` 。 如果您正在使用 SSR 应用程序，您可能有 `client.js` 或 `entry-client.js` 文件。

```js
// src/plugins/vuetify.js

import 'material-design-icons-iconfont/dist/material-design-icons.css' // 确保您正在使用 css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'md',
  },
})
```

### Font Awesome 4 图标

与上面相同。 通过 cdn 安装 FontAwesome 是在你的项目内导入图标的最简单方式：

```html
<link href="https://cdn.jsdelivr.net/npm/font-awesome@4.x/css/font-awesome.min.css" rel="stylesheet">
```

安装 FontAwesome**4** 与其新版本相同，只是从一个不同的仓库安装。 您将定向到 `font-awesome` 仓库而不是 `@fortawesome` .

```bash
$ yarn add font-awesome@4.7.0 -D
// 或
$ npm install font-awesome@4.7.0 -D
```

别忘了，你的项目需要识别css。 如果您正在使用webpack，安装和设置 [css-loader](https://github.com/webpack-contrib/css-loader)。

```js
// src/plugins/vuetify.js

import 'font-awesome/css/font-awesome.min.css' // 确保您正在使用 css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa4',
  },
})
```

### Font Awesome 5 图标

从 **FontAwesome** 开始最简单的方式是使用 cdn。 在你的主 `index.html` 的头部放置这个代码片段：

```html
<link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">
```

要在本地安装，你可以使用你喜欢的包管理器拉取 **FontAwesome** 的  \[免费\](https://fontawesome.com/) 版本：

```bash
$ yarn add @fortawesome/fontawesome-free -D
// 或
$ npm install @fortawesome/fontawesome-free -D
```

在您的主入口，只需导入包的 **all.css**。 如果您正在使用已配置的 webpack 项目，您需要使用 webpack [css-loader](https://github.com/webpack-contrib/css-loader) 设置对 `.css` 文件的支持 如果您已经在使用 [Vue CLI](https://cli.vuejs.org/), 这些已经自动为您完成。

```js
// src/plugins/vuetify.js

import '@fortawesome/fontawesome-free/css/all.css' // 确保您正在使用 css-loader
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa',
  },
})
```

### Font Awesome SVG 图标

添加必需的依赖项。

```bash
$ yarn add @fortawesome/fontawesome-svg-core @fortawesome/vue-fontawesome @fortawesome/free-solid-svg-icons -D
// 或
$ npm install @fortawesome/fontawesome-svg-core @fortawesome/vue-fontawesome @fortawesome/free-solid-svg-icons -D
```

然后在 Vuetify 配置中全局添加 `font-awesome-icon` 组件，并设置 `faSvg` 作为图标字体。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon) // 全局注册组件
library.add(fas) // 包含需要的图标

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'faSvg',
  },
})
```

## 使用自定义图标

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

You can import and assign an svg to an icon value. The imported svg should contain only the path without the `<svg>` wrapper. For importing a more elaborate svg, use a [component icon](#component-icons).

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import myIconSvg from 'myIcon.svg'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa',
    values: {
      customIconSvg: myIconSvg,
      customIconSvgPath: 'M14.989,9.491L6.071,0.537C5.78,0.246,5.308,0.244,5.017,0.535c-0.294,0.29-0.294,0.763-0.003,1.054l8.394,8.428L5.014,18.41c-0.291,0.291-0.291,0.763,0,1.054c0.146,0.146,0.335,0.218,0.527,0.218c0.19,0,0.382-0.073,0.527-0.218l8.918-8.919C15.277,10.254,15.277,9.784,14.989,9.491z',
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

## 可复用的自定义图标

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

## 自定义组件

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

### Font Awesome Pro 图标

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
      // 设置menu 为 light (默认是solid)
      menu: {
        component: FontAwesomeIcon,
        props: {
          icon: ['fal', 'bars'],
        },
      },
      // 可复用的自定义图标
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

## 组件图标

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
        component: IconComponent, // 如果组件全局注册, 您在这里可以使用字符串
        props: { // 如果需要您可以传递 props 到组件
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

## 缺失的 Material 图标

Some material icons are missing by default. 例如，虽然说 `person` 和 `person_outline` 可用，但是 `visibility_outline` 却不可用，即便 `visibility` 是可用。 To use missing material icons, include the font below (remove another material font if already registered).

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
      // 这将启用 'visibility_outline', 'visibility_off_round' 等.
    }
  }
})
```

Finally you can use the material icons like this.

```html
<!-- 作为prop使用. 注意双引号和单引号 -->
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

<!-- 直接作为图标组件使用 -->
<v-icon>$visibility_outline</v-icon>
```

<backmatter />
