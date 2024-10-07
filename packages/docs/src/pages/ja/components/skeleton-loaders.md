---
meta:
  title: スケルトンローダー・コンポーネント
  description: v-skeleton-loader コンポーネントは、プロジェクト内の多くの役割を満たすことができる多彩なツールです。 中心にあるコンポーネントは、何かが来ているが、まだ利用できないというユーザーへの指示を提供します。
  keywords: skeleton-loader, material loader, bar loader
related:
  - /components/cards/
  - /components/progress-circular/
  - /components/buttons/
---

# Skeleton loaders

`v-skeleton-loader` コンポーネントは、プロジェクト内の多くの役割を満たすことができる多彩なツールです。  その中心にあるコンポーネントは、何かが来ているが、まだ利用できないということをユーザーに示すものです。 カスタムサンプルを作成するために組み合わせることができる30以上の事前定義オプションがあります。

<entry-ad />

## 使い方

`v-skeleton-loader`コンポーネントは、コンテンツが来ている/ロードされていることを視覚的に示すインジケータをユーザーに提供します。 これは従来のフルスクリーンローダーよりも優れています。

<example file="v-skeleton-loader/usage" />

## API

- [v-skeleton-loader](/api/v-skeleton-loader)

<inline-api page="components/skeleton-loaders" />

## サンプル

### その他

#### ボイラープレート・コンポーネント

`v-skeleton-loader` は、モックアップを作成する際にboilerplate designs として使用できます。 事前に定義された様々なオプションを組み合わせて使用したり、独自の実装を作成したりすることができます。 この例では、**data** プロパティでカスタマイズして、一度に複数の `v-skeleton-loader`に同じプロパティを適用します。

<example file="v-skeleton-loader/misc-boilerplate" />


<!-- #### Implementation methods

There are 2 ways that you can utilize the `v-skeleton-component`. The **default slot** or a **v-if** conditional. The built in slot is the most convenient and easiest to use, but generates an extra div once rendered. If the extra div is an issue in your setup, you can utilize a **v-if** conditional with a Vuetify [transition component](/styles/transitions) or a custom one.

<example file="v-skeleton-loader/misc-implementation" /> -->

## アクセシビリティ

デフォルトでは、`v-skeleton-loader` コンポーネントは [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) role の [**alert**](https://www.w3.org/TR/wai-aria/#alert) が割り当てられています。 私たちはこのroleを2つのariaプロパティで補強しています。 [**aria-busy**](https://www.w3.org/TR/wai-aria-1.0/states_and_properties#aria-busy)の値が**true**のとき、必要な所有要素がウィジェットにないことを示します。 [**aria-live**](https://www.w3.org/TR/wai-aria-1.1/#aria-live)の値が**polite**のとき、スクリーンリーダーのライブリージョンの優先度を設定します。

<backmatter />
