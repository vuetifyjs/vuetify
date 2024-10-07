---
meta:
  title: インプット・コンポーネント
  description: inputコンポーネントは、Vuetifyのすべてのフォームコンポーネントのベースライン機能であり、カスタム実装のベースラインを提供します。
  keywords: inputs, vuetify input component, vue input component
related:
  - /components/forms/
  - /components/selects/
  - /components/text-fields/
---

# Inputs

`v-input` は、独自のカスタム入力フィールドを作成するための基本のコンポーネントを提供します。 v-input は prepend/append スロット、メッセージ、およびデフォルトのスロットで構成されています。 このコンポーネントは拡張して使用することが_推奨されます_が、拡張せずにそのまま使用することもできます。

<entry-ad />

## 使い方

`v-input` は4つの領域を備えています。  prepend スロット、append スロット、メッセージ、そしてデフォルトのスロットです。 これらのスロットで構成されるコアのロジックは、すべてのフォーム コンポーネント間で共有されます。

<example file="v-input/usage" />

## API

- [v-input](/api/v-input)

<inline-api page="components/inputs" />

## 注意事項

<alert type="warning">

  `v-input` コンポーネントは、Vuetifyのすべてのフォームコントロールのラッパーとして使用されています。 v-inputでは属性を内部の入力に渡すことを想定しているため、**属性は継承しない**ことに注意してください。

</alert>

## サンプル

### Props

#### Error

バリデーション可能な他のVuetifyのコンポーネントと同様に、`v-input`  は **error** prop を使ってエラー状態に設定することができます。**error-messages** prop を使うと、エラーメッセージも追加できます。 **error-count** プロパティを使うと、表示するエラーメッセージの数を指定できます。

#### Error count

`error-count` プロパティを使用すると **v-input** に複数のエラーを追加できます。

<example file="v-input/prop-error-count" />

<example file="v-input/prop-error" />

#### Hide details （詳細の非表示）

**hide-details** prop を `auto` に設定すると、ヒントやエラーメッセージなど、表示するものがある場合にのみメッセージが表示されます。

<example file="v-input/prop-hide-details" />

#### Hint

`v-input` には **hint** を指定できます。これにより、input の使い方をユーザに伝えることができます。 **persistent-hint** prop を設定すると、表示するメッセージがない場合に常時ヒントを表示します。

<example file="v-input/prop-hint" />

#### Loading

`v-input` には **loading** 状態があり、データをロード中であることを示したい場合などに使用できます。 注: ここでは例として `v-text-field` を使用しています。

<example file="v-input/prop-loading" />

#### ルール

`v-input` にはカスタムのバリデーションルールを追加できます。ルールには、`true`またはエラーメッセージを返す関数を追加します。 注: ここでは例として `v-text-field` を使用しています。

<example file="v-input/prop-rules" />

#### Success

バリデーション可能な他のVuetifyコンポーネントと同様に、`v-input` は **success** propを使用して成功状態に設定することができます。**success-messages** propを使用すると、メッセージを追加できます。

<example file="v-input/prop-success" />

### イベント

#### クリックスロット

`v-input` では、`click:append` と `click:prepend` イベントをスロットに持たせることができます。 注: ここでは例として `v-text-field` を使用しています。

<example file="v-input/event-slot-clicks" />

### Slots

#### append と prepend

`v-input` は `append` スロットと `prepend` スロットを備えます。 これらを使ってカスタムアイコンを配置することができます。

<example file="v-input/slot-append-and-prepend" />

<backmatter />
