---
meta:
  title: バッジ・コンポーネント
  description: バッジコンポーネントは要素の小さなステータス記述子です。 これは通常、数字または短い文字のセットを含みます。
  keywords: badges, vuetify badge component, vue badge component
related:
  - /components/avatars/
  - /components/icons/
  - /components/toolbars/
---

# Badges

`v-badge` コンポーネントは、アバターのようなアイコンやテキストをコンテンツに上付きまたは下付きで表示して、情報を明瞭に示したり、特定の要素に注目を集めるために使用します。 バッジのコンテンツには数字やアイコンを入れるのが一般的です。

<entry-ad />

## 使い方

最も単純なバッジは、コンテンツの右上に表示するものです。ラップするコンテンツに badge slot が必要です。

<usage name="v-badge" />

## API

- [v-badge](/api/v-badge)

<inline-api page="components/badges" />

## サンプル

### その他

#### カスタマイズオプション

`v-badge` コンポーネントは、多数の要素に対して様々なユースケースを実現する柔軟性を備えています。 場所を調整するオプションとして、**offset-x** と **offset-y** prop が利用できます。

<example file="v-badge/misc-customization" />

#### 動的な通知

バッジを動的なコンテンツに組み込むことで、通知システムなどを構築できます。

<example file="v-badge/misc-dynamic" />

#### ホバー表示

可視性コントロールを活用すると、さまざまな表現を実現できます。たとえば、ホバー時にバッジを表示することができます。

<example file="v-badge/misc-hover" />

#### タブ

バッジは、ユーザーにさまざまなレベルの情報を伝えるのに役立てることができます。

<example file="v-badge/misc-tabs" />

<backmatter />
