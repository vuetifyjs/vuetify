---
meta:
  title: Icon Fonts
  description: Vuetifyは、プリフィックスとグローバルオプションを使用して、Material Design Icons、Font awesome他のアイコンセットをサポートしています。
  keywords: vue icon component, iconfont, icon libraries, vuetify icons
related:
  - /components/icons/
  - /components/buttons/
  - /components/avatars/
---

# Icon Fonts

VuetifyはMaterial Design Icons、Material Icons、Font Awesome 4とFont Awesome 5をサポートしています。 デフォルトでは、 [Material Design Icons](https://materialdesignicons.com/) を使用します。

<entry-ad />

## 使い方

フォントライブラリを変更するには、インスタンス生成時に `iconfont` オプションを追加します。

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

定義済みオプションを使用すると、選択されたプリセットに基づいてデフォルト値が事前に埋められます。 これは、デフォルトの **icon** 値を持つコンポーネントのデフォルトを上書きします。 For more information, view the default [icon preset values](https://github.com/vuetifyjs/vuetify/tree/v2-stable/packages/vuetify/src/services/icons/presets).

## アイコンフォントのインストール

指定したアイコンライブラリを含める必要があります (デフォルトの場合でも)。 CDNリンクを含めるか、アイコンライブラリをアプリケーションにインポートすることによって行うことができます。

<alert type="info">

  このページでは、 "Material Icons" は [official google icons](https://material.io/resources/icons/) を、"Material Design Icons" は [サードパーティのライブラリ](https://materialdesignicons.com/) を参照しています。

</alert>

### Material Design Icons

下のツールを使用するとMaterial Design Iconsを検索でき、アイテムをクリックすることでクリップボードにコピーできます。

<icon-list />

これはVuetifyのデフォルトのアイコンフォントです。 CDNでインクルードすることができます：

```html
<link href="https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css" rel="stylesheet">
```

あるいは、ローカル依存としてインストールします：

```bash
$ yarn add @mdi/font -D
// あるいは
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

SVG のパスは [@mdi/js](https://www.npmjs.com/package/@mdi/js) で指定したものを使用してください。 これは、本番環境用にアプリケーションを最適化する際に推奨されるインストールです。 デフォルトのアイコン以外にも使用する予定がある**場合にのみ**、これを含める必要があります。

```bash
$ yarn add @mdi/js -D
// あるいは
$ npm install @mdi/js -D
```

**mdiSvg** のアイコンフォントを指定します:

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

使用するアイコンのみをカスタムインポートすることで、バンドルサイズを大幅に小さくすることが出来ます。

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

インストールは上記と同じです。 ビルドプロセスがないプロジェクトの場合は、CDN からアイコンをインポートすることをお勧めします。

```html
<link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
```

また、yarn または npm を使用してローカルにインストールすることもできます。 こちらは公式の Google リポジトリではないので、アップデートを受けられない可能性があることを覚えておいてください。

```bash
$ yarn add material-design-icons-iconfont -D
// または
$ npm install material-design-icons-iconfont -D
```

パッケージをインストールしたら、main entry jsファイルにインポートします。 これは通常、`src/`フォルダ内にある`main.js`, `index.js`、または`app.js`です。 SSR アプリケーションを使用している場合は、 `client.js` または `entry-client.js` ファイルがある可能性があります。

```js
// src/plugins/vuetify.js

import 'material-design-icons-iconfont/dist/material-design-icons.css' // css-loaderを使用していることを確認してください
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

同上。 上cdn を使用して FontAwesome をインストールするのが最も簡単な方法です:

```html
<link href="https://cdn.jsdelivr.net/npm/font-awesome@4.x/css/font-awesome.min.css" rel="stylesheet">
```

FontAwesome **4** のインストールは、新しいバージョンと同じで、異なるリポジトリからインストールするだけです。 `@fortawesome` ではなく、 `font-awesome` リポジトリをターゲットにします。

```bash
$ yarn add font-awesome@4.7.0 -D
// あるいは
$ npm install font-awesome@4.7.0 -D
```

忘れてはいけないのは、あなたのプロジェクトはcssを認識する必要があるということです。 Webpackを使用している場合は、 [css loader](https://github.com/webpack-contrib/css-loader)をインストールしてセットアップしてください。

```js
// src/plugins/vuetify.js

import 'font-awesome/css/font-awesome.min.css' // css-loader を使用していることを確認してください。
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

最も簡単に**FontAwesome** を使う方法は CDN を使用することです。 メインの `index.html` の先頭に、次のスニペットを配置します:

```html
<link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">
```

お好みのパッケージマネージャーを使用して [無料の](https://fontawesome.com/) バージョンの **FontAwesome** をローカルにインストールして呼び出すこともできます:

```bash
$ yarn add @fortawesome/fontawesome-free -D
// あるいは
$ npm install @fortawesome/fontawesome-free -D
```

メインエントリポイント内では、パッケージの **all.css** をインポートするだけです。 設定済みの webpack プロジェクトを使用している場合は、webpack [css loader](https://github.com/webpack-contrib/css-loader) を使用して `.css` ファイルのサポートを設定する必要があります。 すでに [Vue CLI](https://cli.vuejs.org/)を使用している場合は、これは自動的に行われます。

```js
// src/plugins/vuetify.js

import '@fortawesome/fontawesome-free/css/all.css' // css-loader を使用していることを確認してください。
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

必要な依存関係を追加します。

```bash
$ yarn add @fortawesome/fontawesome-svg-core @fortawesome/vue-fontawesome/free-solid-svg-icons -D
// or
$ npm install @fortawesome/fontaesawesome-svg-core @fortawesome/vue-fontawesome-fontawesome-fontsawes @fortawesome/free-solid-svg-icons -D
```

そしてグローバルに `font-awesome-icon` コンポーネントを追加し、 `faSvg` を Vuetify の設定でiconfontとして設定します。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon) // コンポーネントをグローバルに登録
library.add(fas) // 必要なiconsを含めます

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'faSvg',
  },
})
```

## カスタムアイコンの使用

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

## 再利用可能なカスタムアイコン

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

## カスタムコンポーネント

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

## コンポーネントアイコン

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
        component: IconComponent, // コンポーネントがグローバルに登録されている場合は、ここに文字列を使用できます。
        props: { // 必要に応じてコンポーネントにpropsを渡す
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

## 欠落しているMaterial Iconsの使用

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
      // 'visibility_outline'や'visibility_off_round'などが有効になります。
    }
  }
})
```

Finally you can use the material icons like this.

```html
<!-- props として使用しています。 ダブルクォートとシングルクォートに注意してください。 -->
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

<!-- アイコンコンポーネントとして直接使用 -->
<v-icon>$visibility_outline</v-icon>
```

<backmatter />
