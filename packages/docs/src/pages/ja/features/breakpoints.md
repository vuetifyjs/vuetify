---
meta:
  title: Display Breakpoints
  description: Vuetify Breakpoint サービスを使用してビューポート情報にアクセスします。
  keywords: breakpoints, grid breakpoints
related:
  - /directives/resize/
  - /styles/display/
  - /styles/text-and-typography/
---

# Display Breakpoints

Vuetifyを使用すると、ウィンドウサイズに基づいてアプリケーションのさまざまなアスペクトを制御できます。 このサービスは、 [grids](/components/grids/) や他のレスポンシブヘルパークラスと連携して動作します (例: [display](/styles/display/))。

<entry-ad />

<breakpoints-table />

## ブレークポイントサービス

**ブレークポイントサービス** は、コンポーネント内のビューポート情報にアクセスするプログラム的な方法です。 ビューポートのサイズに基づいてアプリケーションのアスペクトを制御するために使用できる `$vuetify` オブジェクトに多数のプロパティが表示されます。 `name` プロパティは、現在アクティブなブレークポイントに関連しています; 例えば、*xs, sm, md, lg, xl*。

以下のスニペットで **v-card** コンポーネントの [height](/components/cards/) プロパティを変更するには、switch 文と現在のブレークポイント名を使用します。

```html
<!-- Vue Component -->

<template>
  <v-card :height="height">
    ...
  </v-card>
</template>

<script>
  export default {
    computed: {
      height () {
        switch (this.$vuetify.breakpoint.name) {
          case 'xs': return 220
          case 'sm': return 400
          case 'md': return 500
          case 'lg': return 600
          case 'xl': return 800
        }
      },
    },
  }
</script>
```

## 使い方

モバイルデバイスでフルスクリーンダイアログに変換する`v-dialog`コンポーネントを使用した実際の例を試してみましょう。 これを追跡するには、比較している値に対する画面のサイズを決定する必要があります。 次のスニペットでは、`mounted`と`beforeDestroy`のライフサイクルフックを使って、`resize`リスナーをウィンドウにバインドしています。

```html
<!-- Vue Component -->

<script>
  export default {
    data: () => ({ isMobile: false }),

    beforeDestroy () {
      if (typeof window === 'undefined') return

      window.removeEventListener('resize', this.onResize, { passive: true })
    },

    mounted () {
      this.onResize()

      window.addEventListener('resize', this.onResize, { passive: true })
    },

    methods: {
      onResize () {
        this.isMobile = window.innerWidth < 600
      },
    },
  }
</script>
```

[v-resize](/directives/resize/) ディレクティブの使用を選択した場合でも、不要な定型文が必要になります。 代わりに、`$vuetify.breakpoint` オブジェクトの**mobile**プロパティにアクセスしてみましょう。 これにより、現在のビューポートが**mobile-breakpoint**オプションよりも大きいか小さいかに応じて、ブール値`true`または`false`が返されます。

```html
<!-- Vue Component -->

<template>
  <v-dialog :fullscreen="$vuetify.breakpoint.mobile">
    ...
  </v-dialog>
</template>
```

ブレークポイントサービスは_dynamic_で、Vuetifyの **イニシャル**起動時やビューポートのサイズ変更時に更新されます。

### ブレークポイントサービスオブジェクト

ブレークポイントサービスのpublic signatureは次のとおりです:

```ts
{
  // Breakpoints
  xs: boolean
  sm: boolean
  md: boolean
  lg: boolean
  xl: boolean

  // Conditionals
  xsOnly: boolean
  smOnly: boolean
  smAndDown: boolean
  smAndUp: boolean
  mdOnly: boolean
  mdAndDown: boolean
  mdAndUp: boolean
  lgOnly: boolean
  lgAndDown: boolean
  lgAndUp: boolean
  xlOnly: boolean

  // 画面の幅 < mobileBreakpoint のとき true
  mobile: boolean
  mobileBreakpoint: number

  // Current breakpoint name (e.g. 'md')
  name: string

  // Dimensions
  height: number
  width: number

  // Thresholds
  // オプションで設定可能
  {
    xs: number
    sm: number
    md: number
    lg: number
  }

  // Scrollbar
  scrollBarWidth: number
}
```

Access these properties within Vue files by referencing `$vuetify.breakpoint.<property>`; where `<property>` corresponds to a value listed in the  [Breakpoint service](#breakpoint-service-object) object. In the following snippet we log the current viewport width to the console once the component fires the mounted lifecycle hook:

```html
<!-- Vue Component -->

<script>
  export default {
    mounted () {
      console.log(this.$vuetify.breakpoint.width)
    }
  }
</script>
```

While the `$vuetify` object supports SSR (Server-Side Rendering) including platforms such as NUXT, the breakpoint service detects the height and width values as **0**. This sets the initial breakpoint size to **xs** and in some cases can cause the layout to _snap_ in place when the client side is hydrated in NUXT. In the upcoming section we demonstrate how to use `boolean` breakpoint values in the template and script tags of Vue components.

### ブレークポイント条件

The breakpoint and conditional values return a `boolean` that is derived from the current viewport size. Additionally, the breakpoint service mimics the [Vuetify Grid](/components/grids) naming conventions and has access to properties such as `xlOnly`, `xsOnly`, `mdAndDown`, and others. In the following example we change the minimum height of `v-sheet` to **300** when on the _extra small_ breakpoint and only show rounded corners on extra small screens:

```html
<!-- Vue Component -->

<template>
  <v-sheet
    :min-height="$vuetify.breakpoint.xs ? 300 : '20vh'"
    :rounded="$vuetify.breakpoint.xsOnly"
  >
    ...
  </v-sheet>
</template>
```

These *conditional values* enable responsive functionality to Vuetify features that don't support responsive by default or at all. In the next section we customize the **default** breakpoint values used in both _JavaScript and CSS_.

### モバイルブレークポイント

<alert type="info">

  **v2.3.0+の新機能**

</alert>

`mobileBreakpoint` オプションは、有効な設定オプションとしてブレークポイント名 (*xs, sm, md, lg, xl*) を受け付けます。 指定された値は、 [v-navigation-drawer](/components/navigation-drawers/) のようなコンポーネントをサポートするように伝播されます。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

export default new Vuetify({
  breakpoint: {
    mobileBreakpoint: 'sm' // This is equivalent to a value of 960
  },
})
```

個々のコンポーネントは、 **mobile-breakpoint** プロパティを使用して、継承された `デフォルト` の値を上書きできます。 次の例では、ビューポートのサイズが `1024px` 未満の場合、 *mobile state* に _v-banner_を強制します:

```html
<template>
  <v-banner mobile-breakpoint="1024">
    ...
  </v-banner>
</template>
```

次のセクションでは、サイズブレークを決定する閾値をカスタマイズする方法について説明します。

### Thresholds

<alert type="warning">

  このセクションでは、`$grid-breakpoints`変数を変更します。 セットアップの詳細は [SASS variables](/features/sass-variables/) のページをご覧ください。

</alert>

`thresholds` オプションは、ビューポートの計算に使用される値を変更します。 以下のスニペットは、 *xs* から *lg* ブレークポイントをオーバーライドし、 `scrollBarWidth` を _24_ に増加します。

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

export default new Vuetify({
  breakpoint: {
    thresholds: {
      xs: 340,
      sm: 540,
      md: 800,
      lg: 1280,
    },
    scrollBarWidth: 24,
  },
})
```

ブレークポイントサービスに `xl` プロパティがないことに気づくかもしれません。これは意図的です。 ビューポートの計算は、常に _0_から始まり、上に向かって進んでいきます。 _xs_ 閾値の `340` の値は、 _0 から 340_ のウィンドウサイズが、 *extra small* スクリーンであると見なされることを意味します。

これらの変更を *cssヘルパークラス* に伝えるには、 `$grid-breakpoints` SASS変数を新しい値で更新する必要があります。 **large と extra-large** の画面では、定義されたブレークポイントからブラウザのスクロールバーの幅を*差し引きます*。

```scss
// styles/variables.scss

$grid-breakpoints: (
  'xs': 0,
  'sm': 340px,
  'md': 540px,
  'lg': 800px - 24px,
  'xl': 1280px - 24px
);
```

<backmatter />
