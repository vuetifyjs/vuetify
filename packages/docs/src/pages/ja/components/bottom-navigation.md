---
meta:
  title: ボトムナビゲーション・コンポーネント
  description: ボトムナビゲーションコンポーネントはモバイルデバイスに使用され、アプリケーションの主なナビゲーションとして機能します。
  keywords: bottom navigation, vuetify bottom navigation component, vue bottom navigation component
related:
  - /components/buttons/
  - /components/icons/
  - /components/tabs/
---

# Bottom navigation

`v-bottom-navigation` コンポーネントはサイドバーに代わるコンポーネントです。 主にモバイルアプリケーションに使用され、 **icons** と **text**、 **shift**の3つのバリエーションがあります。

<entry-ad />

## 使い方

`v-bottom navigation` は [vue-router](https://router.vuejs.org/ja/)と一緒に使用することを意図していますが、**value**プロパティを使って、ボタンのアクティブな状態をプログラムで制御することもできます。 `v-bottom-navigation` では、ボタンにはその_index_のデフォルト値が与えられます。

<example file="v-bottom-navigation/usage" />

## API

- [v-bottom-navigation](/api/v-bottom-navigation)

<inline-api page="components/bottom-navigation" />

## サンプル

### Props

#### Color

The **color** prop applies a color to the background of the bottom navigation. **light**と**dark**プロパティを使用し、テキストの色を適切に対比させることをお勧めします。

<example file="v-bottom-navigation/prop-color" />

#### Grow

**grow**プロパティを使用すると、[v-btn](/components/buttons/)コンポーネントが利用可能なすべてのスペースを_埋める_(fill) ようになります。 ボタンの最大幅は、[Bottom Navigation MD specification](https://material.io/components/bottom-navigation#specs)では**168px**となっています。

<example file="v-bottom-navigation/prop-grow" />

#### Hide on scroll （スクロール時に非表示にする ）

`v-bottom-navigation`コンポーネントは、**hide-on-scroll**プロパティを使用すると、*上へスクロールしたとき*に非表示になります。 これは [v-app-bar](/components/app-bars/)でサポートされている[スクロールテクニック](https://material.io/archive/guidelines/patterns/scrolling-techniques.html)に似ています。 次の例で、*上下に*スクロールして動作を確かめてみてください。

<example file="v-bottom-navigation/prop-hide-on-scroll" />

#### Horizontal

**horizontal** propを使って、ボタンやアイコンのスタイルを調整することができます。 これは与えられた[v-icon](/components/icons/)とともにボタンテキストを*インライン*で配置します。

<example file="v-bottom-navigation/prop-horizontal" />

#### Scroll threshold （スクロールの閾値）

**scroll-threshold**プロパティを変更して、`v-bottom-navigation` が隠されるまでにユーザーがスクロールしなければいけない距離を長くします。

<example file="v-bottom-navigation/prop-scroll-threshold" />

#### Shift

**shift** プロパティは、アクティブでないときにボタンのテキストを非表示にします。 これにより、 `v-bottom-navigation` コンポーネントに代わるビジュアルスタイルが提供されます。

<alert type="info">

  この機能を動作させるためには、`v-btn` のテキストを `span` タグで囲む **必要** があります。

</alert>

<example file="v-bottom-navigation/prop-shift" />

#### 切り替え

`v-bottom-navigation` の表示状態は、 **input-value** プロパティを使用して切り替えることができます。 **v-model** を使用して現在アクティブなボタンを制御することもできます。

<example file="v-bottom-navigation/prop-toggle" />

<backmatter />
