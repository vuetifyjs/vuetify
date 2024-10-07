---
meta:
  title: ブラウザ対応
  description: Vuetifyはすべてのエバーグリーンブラウザと、polyfillによりIE11 / Safariをサポートするプログレッシブフレームワークです。
  keywords: vuetify browser support
related:
  - /getting-started/installation/
  - /getting-started/frequently-asked-questions/
  - /features/sass-variables/
---

# ブラウザ対応

Vuetifyは、ウェブ開発を次のレベルに押し上げるための進歩的なフレームワークです。 このタスクを最高の形で達成するためには、古いバージョンのInternet Explorerサポートを停止するなど、いくつかの犠牲を払わなければなりませんでした。 これは互換性のあるブラウザーの網羅的なリストではありませんが、主にターゲットとするブラウザーです。

<entry-ad />

## ブラウザ

| ブラウザ                            | ステータス           |
| ------------------------------- | --------------- |
| Chromium (Chrome, Edge Insider) | 対応済             |
| Edge                            | 対応済             |
| Firefox                         | 対応済             |
| Safari 10+                      | 対応済             |
| IE11/Safari 9                   | Polyfillによって対応済 |
| IE9 / IE10                      | 非対応             |

## IE11とSafari 9のサポート

Vuetifyは **Internet Explorer 11**と **Safari 9/10**でpolyfillを使用する必要があるES2015/2017の機能を利用しています。

## Vue CLI

残念ながらVue CLI は、さまざまなエラー (シンボルが定義されていないなど) が発生する可能性がある IE11 への互換性を自動的に提供しません。 これらのエラーを解決するには、 手動で`vue.config.js` に `transpileDependencies` パラメータを追加する必要があります。

```js
// vue.config.js

module.exports = {
  transpileDependencies: ['vuetify']
}
```

## Webpack

カスタム Webpack セットアップを使用している場合は、 [core-js](https://github.com/zloirock/core-js) と [regenerator-runtime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime) パッケージをインストールする必要があります。 ターミナルで次のコマンドを実行します:

```bash
yarn add core-js regenerator-runtime
# または
npm install core-js regenerator-runtime --save
```

_main.js_ ファイル、またはアプリケーションの主要なエントリポイントであるものを問わず、できるだけ**早く** プラグインを含めてください。

```js
// src/main. s

// Polyfill
import 'core-js/stable'
import "regenerator-runtime/runtime"

// Imports
import Vue from 'vue'
import vuetify from '@/plugins/vuetify'

new Vue({ vuetify }).$mount('#app')
```

<discovery-ad />

<br>
<br>

### Babel preset-env

必要なpolyfillsを手動でインストールしてインポートする代わりに、[@babel/preset-env](https://github.com/babel/babel/tree/master/packages/babel-preset-env)　をインストールすることを_お勧め_します。 このパッケージは、指定された設定に基づいて **必要な** polyfills のみがアプリケーションに追加されることを保証します。

```bash
yarn add @babel/preset-env -D
# または
npm install @babel/preset-env -D
```

インストールが終わったら、`babel.config.js` にプリセットを追加します:

```js
// babel.config.js

module.exports = {
  presets: ['@babel/preset-env']
}
```

あるいは `.babelrc` ファイルを使用する場合:

```json
// .babelrc

{
  "presets": ["@babel/preset-env"]
}
```

## テンプレートの注意事項

Internet Explorer では `<template>` タグのサポートが限られているため、完全にコンパイルされた dom 要素をブラウザに送信する必要があります。 これは、Vue コードを事前に構築するか、dom 要素を置き換えるヘルパー コンポーネントを作成することで回避できます。 たとえば、IE に直接送信された場合、次のように失敗します:

```html
<!-- Vue Component -->

<template v-slot:items="props">
  <td>{‌{ props.item.name }‌}</td>
</template>
```

<backmatter />
