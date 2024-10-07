---
meta:
  title: Material 调色板
  description: 了解MD的颜色。 直接在应用程序中使用javascript颜色包。
  keywords: 颜色，material design 颜色，vuetify 颜色包，material 颜色类
related:
  - /features/theme/
  - /resources/themes/
  - /getting-started/wireframes/
---

# 颜色

通过 **sass** 和 **javascript**，你可以使用 [Material Design 规范](https://material.io/design/color/the-color-system.html)中的所有颜色。 这些值可以在样式表、组件文件和实际组件中通过 **颜色类** 系统使用。

<entry-ad />

## 类

规范中的每种颜色都会被转换为 **background** 和 **text** 变体，以便通过一个类在你的应用中设置样式，例如 `<div class="red">` 或 `<span class="red--text">`。 These class colors are defined [here](https://github.com/vuetifyjs/vuetify/blob/v2-stable/packages/vuetify/src/styles/settings/_colors.scss).

<example file="color/classes" />

文本颜色也支持 **darken** 和 **lighten** 变体，使用 `text--{lighten|darken}-{n}` 即可。

<example file="color/text-classes" />

## Javascript 色彩包

Vuetify 有一个可选的 javascript 颜色包，你可以在你的应用中导入使用。 这也可以用来帮助定义你的应用的主题。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.red.darken1, // #E53935
        secondary: colors.red.lighten4, // #FFCDD2
        accent: colors.indigo.base, // #3F51B5
      },
    },
  },
})
```

## Sass 颜色包

虽然方便，但颜色包会增加大约 30kb 的 CSS 导出大小。 某些项目可能只需要默认提供的类，这些类是运行项目构建 Vuetify 时得到的。 要禁用这个功能，你必须 _手动_ 引入并构建 **sass** 主文件。 这需要一个 [Sass loader](https://github.com/webpack-contrib/sass-loader) 和一个 `.sass`/`.scss` 文件入口。

```sass
// src/sass/main.scss

$color-pack: false;

@import '~vuetify/src/styles/main.sass';
```

你需要将创建的 `main.sass` 文件包含在你的项目中。

```js
// src/index.js

import './src/sass/main.scss'
// OR
require('./src/sass/main.scss')
```

<alert type="error">

  你**必须**配置你的 webpack 以使用`sass` 。 如果你使用的是[预制模板](/getting-started/quick-start#vue-cli-install)，它已经帮你完成了这一步。

</alert>

这也可以在你的 **App.vue** 文件中完成。 请记住，根据你的项目设置，这_将_增加构建时间，因为每次更新你的入口文件时，都需要重新生成 Sass 文件。

```html
<style lang="sass">
  $color-pack: false;

  @import '~vuetify/src/styles/main.sass';
</style>
```

## Material 色彩表

以下是按原色分组的 Material Design 调色板列表。

<color-palette />

<backmatter />
