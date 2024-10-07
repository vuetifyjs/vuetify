---
meta:
  title: FAB コンポーネント
  description: フローティングアクションボタン（またはFAB）コンポーネントは、UIの上にくるか、カードなどの要素に取り付けられるアクションです。
  keywords: floating action button, fab, vuetify fab component, vue fab component
related:
  - /components/buttons/
  - /components/icons/
  - /styles/transitions/
---

# Buttons: Floating Action Button

`v-btn` コンポーネントは、フローティングアクションボタンとして使用できます。 これは、アプリケーションに主要な操作のポイントを提供するものです。 `v-speed-dial` コンポーネントと組み合わせると、ユーザーに提供するさまざまな機能のセットを作成できます。

<entry-ad />

## 使い方

フローティングアクションボタンは、アプリケーションの中心的な操作を案内するためにコンテンツに配置することができます。 ほとんどの場合、デフォルトのサイズを使用して構いませんが、同じようなサイズの要素との連続性を維持する場合は `small` のバリエーションを指定します。

<usage name="v-btn-fab" alt="v-btn" />

## API

- [v-btn](/api/v-btn)
- [v-speed-dial](/api/v-speed-dial)

<inline-api page="components/floating-action-buttons" />


<!-- ## Sub-components

### v-speed-dial

v-speed-dial description -->

## サンプル

### その他

#### アニメーション表示

画面に初めて表示するとき、フローティングアクションボタンにはアニメーションを適用するとよいでしょう。 ここでは v-show と `v-fab-transition` を指定しています。 Vuetifyが提供する任意のカスタムトランジションや独自のトランジションを使用することもできます。

<example file="v-btn-fab/misc-display-animation" />

#### 横長のスクリーン

ボタンのデフォルトの動作を切り替える場合は、変更があることを表現するトランジションを加えることをお勧めします。 これを行うには、アクションが変更されることを Vue のトランジション機構に適切に伝達するため、`key` prop にデータをバインドします。 このときカスタムのトランジションを使用することができますが、`mode` prop には **out-in** を指定してください。

<example file="v-btn-fab/misc-lateral-screens" />

#### 小さいバリエーション

視覚的に目立たせるため、リストのアバターにはそれに合う小さなボタンを使用します。

<example file="v-btn-fab/misc-small" />

#### スピードダイヤル

speed-dial コンポーネントは、FABのインターフェイスを狙い通りにカスタマイズするための堅牢な API を備えます。

<example file="v-btn-fab/misc-speed-dial" />

<backmatter />
