---
meta:
  title: アバター・コンポーネント
  description: アバターコンポーネントは、画像のサイズとborder radiusを制御するために使用されます。 多数のコンポーネントとともに使用して、より良い視覚的コンテキストを提供できます。
  keywords: avatars, vuetify avatar component, vue avatar component
related:
  - /components/badges/
  - /components/icons/
  - /components/lists/
---

# Avatars

`v-avatar` コンポーネントは、主に円形のユーザープロフィール画像を表示するのに使用できます。 v-avatar コンポーネントでは、レスポンシブな画像、アイコン、テキストのサイズ変更と、border radius の値の追加を動的に行うことができます。 border radius のないアバターを表示するため **tile** のバリエーションが使用できます。

<entry-ad />

## 使い方

最も単純なアバターは、円形のコンテナ内にコンテンツを表示するものです。

<usage name="v-avatar" />

## API

- [v-avatar](/api/v-avatar)

<inline-api page="components/avatars" />

### Props

#### Size

`size` prop では、`v-avatar` の高さと幅を設定できます。 この prop では、アスペクト比1:1を保ちながらサイズを変更します。 size prop は、`height` と `width` の prop で上書きできます。

<example file="v-avatar/prop-size" />

#### Tile

`tile` prop を指定すると、アバターから border radius を取り除き、シンプルな正方形のアバターにします。

<example file="v-avatar/prop-tile" />

### Slots

#### デフォルト

`v-avatar` のデフォルト slot は、`v-icon` コンポーネント、画像、テキストを受け取ります。 これらを他のpropsと混ぜ合わせて、ユニークなものを作ります。

<example file="v-avatar/slot-default" />

<discovery-ad />

### その他

#### 高度な使用方法

Avatar と他のコンポーネントを組み合わせることで、革新的で美しいユーザーインターフェイスをすぐに構築することができます。

<example file="v-avatar/misc-advanced" />

アバターをメニューと組み合わせる、もう1つの例です。

<example file="v-avatar/misc-avatar-menu" />

#### プロファイルカード

**tile** prop を使用すると、洗練された力強いプロフィールカードを作成できます。

<example file="v-avatar/misc-profile-card" />

<backmatter />
