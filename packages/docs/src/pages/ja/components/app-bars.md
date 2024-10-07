---
meta:
  title: App-barコンポーネント
  description: app barコンポーネントは、高度なスクロールテクニックとアプリのレイアウトをサポートする強化されたツールバーです。
  keywords: app bars, vuetify app bar component, vue app bar component
related:
  - /components/buttons/
  - /components/icons/
  - /components/toolbars/
---

# App bars

`v-app-bar` コンポーネントは、一般的にサイト ナビゲーションのためのメイン基盤を提供し、あらゆるグラフィカル ユーザー インターフェイス (GUI) で極めて重要になるコンポーネントです。 v-app-bar コンポーネントを [v-navigation-drawer](/components/navigation-drawers) と組み合わせることで、アプリケーションにサイトナビゲーション機能を持たせることができます。

<entry-ad />

## 使い方

`v-app-bar`コンポーネントは、アプリケーション全体に関わるアクションや情報を提供するために使用します。

<usage name="v-app-bar" />

## API

- [v-app-bar](/api/v-app-bar)
- [v-app-bar-nav-icon](/api/v-app-bar-nav-icon)
- [v-app-bar-title](/api/v-app-bar-title)

<inline-api page="components/app-bars" />

## サブコンポーネント

### v-app-bar-nav-icon

スタイル付きのアイコン ボタン コンポーネントです。[v-toolbar](/components/toolbars) と `v-app-bar` で使用するために特別に設計されています。 ツールバーの左側では、通常、ハンバーガー メニューとして表示されます。このメニューはナビゲーション ドロワーの状態を制御するためによく利用されます。 `default` スロットは、このコンポーネントのアイコンと機能をカスタマイズするために使用できます。 これは **関数型** コンポーネントです。

### v-app-bar-title

[shrink-on-scroll](/components/toolbars/) prop とともに使用するために特別に変更された `v-toolbar-title` です。 小さな画面では `v-toolbar-title` は切り捨てられます ([issue #12514](https://github.com/vuetifyjs/vuetify/issues/12514) を参照) が、展開したときには絶対位置を使用して全体が表示されます。 `shrink-on-scroll` はリサイズウォッチャーといくつかの追加を行うため、これを指定せずに `v-app-bar-title` を使用することはお勧めしません。

## 注意事項

<alert type="warning">

  `icon` prop を指定した `v-btn` を `v-toolbar` と `v-app-bar`  の中で使用している場合、Material Design Specification に沿って適切な間隔を確保するため、これらのバーのサイズが自動的に拡大され、負のマージンが適用されます。 ボタンを `div` のようなコンテナで囲む場合、適切に配置するためにはそのコンテナにマイナスのマージンをかける必要があります。

</alert>

## サンプル

### Props

#### 折りたたみ可能なバー

**collapse** と **collapse-on-scroll** prop を指定すると、ユーザーが操作するツールバーの状態を簡単に制御できます。

<example file="v-app-bar/prop-collapse" />

#### Dense

**app-bar** を高密度のスタイルにすることができます。 高密度のアプリバーは、通常より高さが低くなります。

<example file="v-app-bar/prop-dense" />

#### Elevate on scroll （スクロール時にバーを上げる）

**elevate-on-scroll** prop を使用する場合、ユーザーが下方向にスクロールし始めるまで、 `v-app-bar` は 0dp の高さにとどまります。 一度スクロールし始めると、バーは4dpに上がります。

<example file="v-app-bar/prop-elevate-on-scroll" />

#### スクロール時に画像をフェードする

`v-app-bar` の背景画像は、スクロール時にフェードさせることができます。 それには `fade-img-on-scroll` prop を使用します。

<example file="v-app-bar/prop-img-fade" />

#### スクロール時に非表示にする

`v-app-bar` はスクロール時に非表示にすることができます。 それには `hide-on-scroll` prop を指定します。

<example file="v-app-bar/prop-hide" />

#### Images

`v-app-bar` には背景画像を含めることができます。 ソースは `src` prop で設定します。 `v-img` prop をカスタマイズする必要がある場合のために、app-bar には **img** スロットが用意されています。

<example file="v-app-bar/prop-img" />

#### Inverted scrolling

**inverted-scroll** prop を指定すると、ユーザーが指定のしきい値を超えてスクロールするまでバーは非表示になります。 指定のしきい値を超えると、`v-app-bar` は上方向に指定のしきい値を超えてスクロールするまで表示された状態になります。 **scroll-threshold** の値を指定しない場合、デフォルト値として _0_ が使用されます。

<example file="v-app-bar/prop-inverted-scroll" />

#### Prominent

`v-app-bar` に `prominent` prop を指定すると、ユーザーが下方向にスクロールしたときに高さを縮めます。 これにより、ユーザーがコンテンツをスクロールし始めたときに画面の視覚的な領域を小さし、スムーズなトランジションを提供できます。 縮小する量として、**dense** (48px) と **short** (56px) の 2 つのサイズオプションを指定できます。

<example file="v-app-bar/prop-prominent" />

#### Scroll threshold （スクロールの閾値）

`v-app-bar` にはスクロールのしきい値を設定できます。 `scroll-threshold` prop で指定したピクセル数を超えたときにのみスクロールが反応するようになります。

<example file="v-app-bar/prop-scroll-threshold" />

### その他

#### メニュー

v-app-bar には、`v-menu` を追加して機能を簡単に追加することができます。 一番右のアイコンをクリックすると動作を確認できます。

<example file="v-app-bar/misc-menu" />

#### ナビゲーションドロワーの切り替え

関数型コンポーネントの `v-app-bar-nav-icon` を使用すると、 [v-navigation-drawer](/components/navigation-drawers) のように他のコンポーネントの状態を切り替えることができます。

<example file="v-app-bar/misc-app-bar-nav" />

<backmatter />
