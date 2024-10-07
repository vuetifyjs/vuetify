---
meta:
  title: ツールバー・コンポーネント
  description: ツールバーコンポーネントは、影響を受けるコンテンツの上に位置し、ラベル付けや追加アクションのための領域を提供します。
  keywords: toolbars, vuetify toolbar component, vue toolbar component
  related:
    - /components/buttons/
    - /components/footer/
    - /components/tabs/
---

# Toolbars

`v-toolbar` コンポーネントは、一般にサイトナビゲーションの主要なソースであるため、あらゆるグラフィカルユーザーインターフェイス (GUI) にとって極めて重要です。 ツールバーコンポーネントは、 [v-navigation-drawer](/components/navigation-drawers) と [v-card](/components/cards) と組み合わせて使用できます。

<entry-ad />

## 使い方

ツールバーはさまざまな方法で使用できる柔軟なコンテナです。 デフォルトでは、ツールバーはデスクトップでは64px、モバイルでは高さ56pxです。 ツールバーで使用できるヘルパーコンポーネントがいくつかあります。 `v-toolbar-title` はタイトルを表示するために使用され、 `v-toolbar-items` は [v-btn](/components/buttons) をフルheightに拡張するために使用されます。

<usage name="v-toolbar" />

## API

- [v-toolbar](/api/v-toolbar)
- [v-toolbar-items](/api/v-toolbar-items)
- [v-toolbar-title](/api/v-toolbar-title)

<inline-api page="components/toolbars" />


<!-- ## Sub-components

### v-toolbar-items

v-toolbar-items description

### v-toolbar-title

v-toolbar-title description -->

## 注意事項

<alert type="warning">

  `v-toolbar` と `v-app-bar` の内部で `v-btn` が使用されると、自動的にサイズが大きくなり、ネガティブマージンが適用され、Material Design Specificationに従って適切な間隔が確保されます。 ボタンを `div` のようなコンテナで囲む場合、適切に配置するためにはそのコンテナにマイナスのマージンをかける必要があります。

</alert>

## サンプル

### Props

#### Background

**src** プロパティを使用すると、ツールバーは単色ではなく背景を表示できます。 これは **img** スロットを使用し、独自の [v-img](/components/images) コンポーネントを提供することでさらに変更できます。 背景は[v-app-bar](/components/app-bars#prominent-w-scroll-shrink-and-image) を使ってフェードできます。

<example file="v-toolbar/prop-background" />

#### Collapse

ツールバーは、画面のスペースを節約するために折りたたむことができます。

<example file="v-toolbar/prop-collapse" />

#### Dense toolbars

高さを _48px_に縮小します。 **prominent** プロパティと組み合わせて使用すると、高さが _96px_ に減ります。

<example file="v-toolbar/prop-dense" />

#### Extended

ツールバーは `extension` スロットを使用せずに拡張できます。

<example file="v-toolbar/prop-extended" />

### Extension height

拡張したときの高さはカスタマイズできます。

<example file="v-toolbar/prop-extension-height" />

#### Floating with search

フローティングツールバーは、必要な分しかスペースを取らないインライン要素に変わります。 これはコンテンツ上にツールバーを配置する場合に特に便利です。

<example file="v-toolbar/prop-floating-with-search" />

#### ライトとダーク

ツールバーには、ライトとダークの**2つ**のバリエーションがあります。 lightツールバーには暗い色のボタンと暗いテキストがあり、darkツールバーには白い色のボタンと白いテキストがあります。

<example file="v-toolbar/prop-light-and-dark" />

#### Prominent toolbars (目立つツールバー)

Prominent ツールバーは `v-toolbar` の高さを _128px_ に増やし、`v-toolbar-title` をコンテナの下の方に配置します。 [v-app-bar](/components/app-bars#prominent-w-scroll-shrink)ではこれを拡張させ、**prominent** ツールバーを**密集**あるいは**短く**できるようになりました。

<example file="v-toolbar/prop-prominent" />

### その他

#### コンテキストによって変わるバー

アプリの状態の変化に応じてツールバーの見た目を変えることができます。 この例では、`v-select` でユーザーが選択した内容に応じて、ツールバーの色と内容が変化します。

<example file="v-toolbar/misc-contextual-action-bar" />

#### フレキシブル・カード・ツールバー

この例では、**extended** propを使って、ツールバーの拡張されたコンテンツ領域にカードを埋め込んでいます。

<example file="v-toolbar/misc-flexible-and-card" />

#### バリエーション

`v-toolbar` には、テーマやヘルパークラスで適用できる複数のバリエーションがあります。 これらはライト/ダークテーマ、色付き/透明など様々なバリエーションを持っています。

<example file="v-toolbar/misc-variations" />

<backmatter />
