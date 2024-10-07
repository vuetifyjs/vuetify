---
meta:
  title: アイコン・コンポーネント
  description: アイコンコンポーネントは、Material Design Icons、Font Awesomeなど、複数の一般的なアイコンフォントと互換性があります。
  keywords: icons, vuetify icon component, vue icon component
related:
  - /features/icon-fonts/
  - /components/buttons/
  - /components/cards/
assets:
  - https://use.fontawesome.com/releases/v5.0.8/css/all.css
  - https://fonts.googleapis.com/css?family=Material+Icons
---

# Icons

`v-icon` コンポーネントは、アプリケーションのさまざまな側面にコンテキストを提供するために、グリフの大きなセットを提供します。 利用可能なすべてのアイコンの一覧については、公式の [Material Design Icons](https://materialdesignicons.com/) ページをご覧ください。 これらのアイコンのいずれかを使用するには、単純に `mdi-` プレフィックスに続いて アイコン名を使用します。

<entry-ad />

## 使い方

アイコンは、2 つのテーマ （light, dark）と 5 つのサイズ （x-small, small, medium （デフォルト）, large, x-large）で表現されます。

<usage name="v-icon" />

## API

- [v-icon](/api/v-icon)

<inline-api page="components/icons" />

## サンプル

### Props

#### 色

カラーヘルパーを使用すると、アイコンの色を標準のdark、lightテーマから変更できます。

<example file="v-icon/prop-color" />

### イベント

#### クリック

`v-icon` にクリックイベントをバインドすると、自動的にカーソルがポインターになります。

<example file="v-icon/event-click" />

### その他

#### Buttons

アイコンをボタン内部で使用し、ボタンを強調させるための動きを付けることができます。

<example file="v-icon/misc-buttons" />

#### Font Awesome

[Font Awesome](https://fontawesome.com/icons/) もサポートされています。 アイコン名の `fa-` プレフィックスを使用するだけです。 Font Awesome iconsをプロジェクトに含める必要がありますので、ご注意ください。 インストール方法の詳細については、 [インストールページ](/features/icon-fonts#install-font-awesome-5-icons) を参照してください。

<example file="v-icon/misc-font-awesome" />

#### マテリアルデザイン

[Material Design](https://material.io/tools/icons/?style=baseline) もサポートされています。 インストール方法の詳細については、 [こちら](/features/icon-fonts#install-material-icons)をご覧ください。

<example file="v-icon/misc-md" />

#### MDI SVG

[@mdi/js](https://www.npmjs.com/package/@mdi/js) パッケージを使用するときに、実際に使用するアイコンのみを手動でインポートできます。 `VIcon` コンポーネントで SVG アイコンを使用したい場合は、それらの [使用方法](/features/icon-fonts#install-material-design-icons-js-svg)についてご確認ください。

<example file="v-icon/misc-mdi-svg" />

## アクセシビリティ

アイコンはあらゆる種類の有意義な情報を伝えることができるので、可能な限り多くの人に届くことが重要です。 考慮したいユースケースが2つあります:

- **Decorative Icons** は視覚的な補強やブランディングにのみ使用されています。 それらがページから削除された場合でも、ユーザーはあなたのページを理解して使うことができます。

- **Semantic Icons** は、純粋な装飾だけではなく、意味を伝えるために使っているものです。 これには、ボタン、フォーム要素、トグルなど、インタラクティブコントロールとして使用されるテキストのないアイコンが含まれます。

<alert type="error">

  WAI-ARIA Authoring Practices 1.1では、 `aria-hidden="false"` は現在 [ブラウザ間で一貫性のない動作をする](https://www.w3.org/TR/wai-aria-1.1/#aria-hidden) と述べられています。

</alert>

<alert type="info">

  WIP: 私たちのチームは、label プロパティを渡したときに `aria-hidden="false"` をレンダリングしないようにコンポーネントを変更します。

</alert>

### Decorative Font Icons

あなたのアイコンが純粋に装飾的なものである場合は、それぞれのアイコンにアクセスできるように、手動で属性を追加する必要があります。`aria-hidden` (vuetifyによる自動処理)

### Semantic Font Icons

アイコンに意味がある（セマンティック）場合は、(類似した) 要素内の代替テキストを指定する必要があります。 また、支援技術にアクセスできるようにしながら、要素を視覚的に非表示にする適切なCSSを含まれています。

```html
<v-icon aria-hidden="false">
  mdi-account
</v-icon>
```

### Decorative SVG Icons

あなたのアイコンが純粋に装飾的なものである場合は、それぞれのアイコンにアクセスできるように、手動で属性を追加する必要があります。`aria-hidden` (vuetifyによる自動処理)

### Semantic SVG Icons

[v-icon](/components/icons/) コンポーネントに `role="img"` などのアクセシビリティ属性を適用して、意味（セマンティック）を持たせます。

```html
<v-icon aria-label="My Account" role="img" aria-hidden="false">
  mdiAccount
</v-icon>

<script>
import { mdiAccount } from "@mdi/js";

export default {
  data: () => ({
    icons: {
      mdiAccount
    }
  })
};
</script>
```

<backmatter />
