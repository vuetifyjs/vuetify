---
meta:
  title: クリックアウトサイド・ディレクティブ
  description: v-click-outside ディレクティブは、target 要素以外の何かがクリックされたときに関数を呼び出します。
  keyword: click outside, click directive, vue click directive, vuetify click directives
related:
  - /components/dialog/
  - /directives/intersect/
---

# Click outside

`v-click-outside` ディレクティブは、target 要素以外の何かがクリックされたときに関数を呼び出します。 `v-menu` や `v-dialog` のようなコンポーネントが内部的に使用しています。

<entry-ad />

## 使い方

`v-click-outside` ディレクティブは、ユーザがターゲット要素の外側をクリックしたときに呼び出されるハンドラを提供します。

<example file="v-click-outside/usage" />

## API

- [v-click-outside](/api/v-click-outside)

<inline-api page="directives/click-outside" />

## サンプル

### オプション

#### 外側のクリックで閉じる

オプションで `closeOnOutsideClick` ハンドラを指定し、 `true` または `false` を返します。 この関数は、外部クリック機能を起動するかどうかを決定します。

<example file="v-click-outside/option-close-on-outside-click" />

#### Include

必要に応じて、`HTMLElement` の配列を返す`include`関数を`options` オブジェクト内で提供します。 この関数は、クリックが外に出なければならない追加の要素を決定します。

<example file="v-click-outside/option-include" />

<backmatter />
