---
meta:
  title: 主题配置
  description: 瞬间设置你的应用程序的主题和补充颜色。
  keywords: 主题
related:
  - /styles/colors/
  - /styles/transitions/
  - /getting-started/wireframes/
nav: 主题
---

# 主题配置

轻松更改应用程序的颜色。 重建默认样式表并根据您的特殊需要自定义框架的各个方面。

<promoted-ad slug="vuemastery-themes" />

## 主题生成器

使用我们的 [主题生成器](https://theme-generator.vuetifyjs.com) 工具，为您的 **Vuetify** 应用程序发现和生成新的颜色主题。

## 浅色和深色

Vuetify 支持 **浅色 light** 和 **深色 dark** 变体。 此指定始于根应用程序组件， `v-app` 并得到大多数组件的支持。 默认情况下，您的应用程序将使用 **light** 主题。 但通过在主题服务中添加 **dark** 选项，你可以很容易地覆盖掉它。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: { dark: true },
})
```

当你指定一个组件为浅色或暗色时，除非另有指定，所有子组件将继承并应用同样的组件。 您可以通过更改 `this.$vuetify.theme.dark` 到 **true** 或 **false**来手动打开或关闭 **深色模式**

## 自定义

默认情况下，Vuetify 具有适用于所有组件的标准主题。

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

这些可以轻易地改变。 只需将 ** theme ** 属性传递到 Vuetify 构造器。 您可以选择修改所有或部分主题属性，其余属性继承自默认属性。

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

你也可以使用预定义的 material 颜色。

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

默认情况下，主题服务将为<strong x-id=“1”>锚点</strong>标记使用应用程序的主颜色。 您可以通过向主题添加锚点属性来覆盖这个主题：

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

在幕后，Vuetify将基于这些值生成css类，这些值可以在DOM中访问。 这些类将遵循与其他辅助类相同的标记，例如`primary`或`secondary--text`。 如果提供一个完整的颜色对象（如上文`colors.purple`所述），将直接使用变亮/变暗的变量而不是生成。

这些值也将在<strong x-id=“1”>$vuetify</strong> 实例下的 <strong x-id=“1”>theme</strong> 属性对象上可用。 这允许您 _动态地_ 修改主题。 在场景背后，Vuetify将重新生成和更新您的主题类，无缝地更新您的应用程序。

```js
// Light theme
this.$vuetify.theme.themes.light.primary = '#4caf50'

// Dark theme
this.$vuetify.theme.themes.dark.primary = '#4caf50'
```

### 自定义主题变量

虽然Vuetify会自动生成 _lighten_ 和 _darken_ 变量来显示主题颜色，但您可能想要自己控制这些。 只需传递一个包含你想要修改的变量的主题对象。 任何未提供的东西仍将为您生成。

```js
// src/plugins/vuetify/theme.js

import colors from 'vuetify/lib/util/colors'

export default {
  primary: {
    base: colors.purple.base,
    darken1: colors.purple.darken2,
  },
  secondary: colors.indigo,
  // 所有的键将生成主题样式,
  // 这里我们添加一个自定义的 `tertiary` 颜色
  tertiary: colors.pink.base,
}
```

你现在可以导入你的自定义主题对象并将其应用到 Vuetify

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

下面是主题对象上可覆盖键的完整列表：

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

### 禁用主题

您可以使用值为 **true** 的 ** disable ** 属性来禁用主题功能。 这将防止创建 Vuetify 样式表。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

const vuetify = new Vuetify({
  theme: { disable: true },
})
```

## 选项

Vuetify 会在运行时为SPA和服务器端SSR应用程序生成主题风格。 生成的样式将被放置在一个 `<style>` 标签中，包含一个 **id** 的 **vuetify-theme-styesheet**。

### 最小化

`minifyTheme` 选项允许您提供自定义的最小化实现。 这有助于减少初始页面大小，建议与 [`options.themeCache`](#caching) 配合。 在此示例中，我们使用 [minify-css-string](https://github.com/bentatum/minify-css-string) 包来缩小 *生成的主题样式*。

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

### 缓存

您可以选择传递自定义`themeCache`实现。 这允许您跳过需要重新计算的主题对象。 下面是一个使用 [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) 属性的示例：

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

  提供的 `themeCache` 对象**必须** 包含 `get` 和 `set` 方法。 使用它们来检索和设置 *生成的 css* 字符串。

</alert>

缓存也可以通过 [lru-cache](https://github.com/isaacs/node-lru-cache) 实现。 这对SSR (服务端渲染) 应用程序特别有用。

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

### 自定义属性

启用 `customProperties` 也会为每个主题颜色生成一个 [css变量](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) ，你可以在组件的 `<style>` 块中使用。

<alert type="warning">

  Internet Explorer不支持自定义属性。 Polyfills 是可用的，**有一些限制**——Internet Explorer 11:

- [自定义属性polifill](https://github.com/nuxodin/ie11CustomProperties)
- [CSS变量polyfill](https://github.com/jhildenbidle/css-vars-ponyfill)

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

带有 `script-src` 或 `style-src`  的页面可能需要为嵌入式样标签指定一个 **nonce** 以启用的 CSP 规则。

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

### 变量

当Vuetify生成您的 *应用程序的主题*, 它为每个颜色创建 **9 个变量**。 大多数用户很少使用这些变量。 这是一个在下一个主要版本中 <strong x-id=“1”>选择加入</strong> 的功能，默认情况下为 <strong x-id=“2”>false</strong> 。

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

## 主题提供器

Vuetify主题系统通过Vue上的 [provide](https://vuejs.org/v2/api/#provide-inject) 功能提供。 在某些情况下，您可能需要手动更改提供的主题(dark 或 light)。

### API

- [v-theme-provider](/api/v-theme-provider)

<inline-api page="features/theme" />

### 示例

Use the `v-theme-provider` to manually overwrite all children component's current theme **(light/dark)**. In the following example, the root `v-card` is explicitly set to `dark` with 2 children lists. The first one inherits from the parent `v-card` while the second is explicitly set to match the **root** Vuetify theme.

<example file="theme/misc-provider" />

<backmatter />
