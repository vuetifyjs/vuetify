---
meta:
  title: テキストフィールド・コンポーネント
  description: テキストフィールドコンポーネントは、ユーザからのテキスト入力を受け付けます。
  keywords: text fields, vuetify text field component, vue text field component
related:
  - /components/forms/
  - /components/selects/
  - /components/textarea/
---

# Text fields

テキスト フィールド コンポーネントは、ユーザーが入力した情報を収集するために使用されます。

<entry-ad />

## 使い方

単純なテキストフィールドはプレースホルダやラベルがあります。

<example file="v-text-field/usage" />

## API

- [v-text-field](/api/v-text-field)

<inline-api page="components/text-fields" />

## サンプル

### Props

#### Counter

**counter** プロパティを使用して、文字制限をユーザに通知します。 カウンターはそれ自体でバリデーションを行いません。内蔵バリデーションシステムあるいは3rdパーティのライブラリとペアリングする必要があります。 カウンタは **counter-value** prop とスコープ付きスロット **counter** でカスタマイズできます。

<example file="v-text-field/prop-counter" />

#### Clearable

When **clearable**, you can customize the clear icon with **clear-icon**. Note that **readonly** will not remove the clear icon, to prevent readonly inputs from being cleared you should also disable **clearable**.

<example file="v-text-field/prop-clearable" />

#### 色の変更

必要に応じて、テキストフィールドをマテリアルデザインパレットの任意の色に変更できます。 以下は、バリデーションを含むカスタムフォームの実装例です。

<example file="v-text-field/prop-custom-colors" />

#### Dense

**dense** プロパティでテキストフィールドの高さを減らすことができます。

<example file="v-text-field/prop-dense" />

#### 無効および読み取り専用

テキストフィールドは **disabled** または **readonly** にできます。

<example file="v-text-field/prop-disabled-and-readonly" />

#### Filled

テキストフィールドは、ボックスデザインで使用できます。

<example file="v-text-field/prop-filled" />

#### 詳細の非表示

**hide-details**が`auto` に設定されている場合、表示すべきメッセージ(ヒント、エラーメッセージ、カウンタ値など) がある場合にのみ表示されます。

<example file="v-text-field/prop-hide-details" />

#### Hint

テキスト フィールドの**hint** プロパティは、指定された文字列をテキスト フィールドの下に追加します。 **persistent-hint**（永続的なヒント）を使用すると、テキストフィールドがフォーカスされていないときにヒントが表示されます。 Hintプロップはsolo モードではサポートされて_**いません**_。

<example file="v-text-field/prop-hint" />

#### Icons

**prepend-icon**, **append-icon** と **append-outer-icon** propsを使用して、テキストフィールドにアイコンを追加できます。

<example file="v-text-field/prop-icon" />

#### アウトライン

テキストフィールドは、アウトラインデザインで使用できます。

<example file="v-text-field/prop-outlined" />

#### プレフィックスとサフィックス

**prefix** と **suffix** プロパティを使用すると、テキストフィールドの横に変更できないテキストを追加できます。

<example file="v-text-field/prop-prefixes-and-suffixes" />

#### Shaped

**shaped** テキストフィールドは、 **outlined** で描画されている場合は丸められ、 **filled**の場合は**border-radius**が高くなります。

<example file="v-text-field/prop-shaped" />

#### Single line

シングルライン・テキストフィールドは、フォーカスされた時や入力済のとき、ラベルをフロートしません。

<example file="v-text-field/prop-single-line" />

#### Solo

テキストフィールドは、ソロデザインで使用できます。

<example file="v-text-field/prop-solo" />

#### バリデーション

Vuetify には **rules** プロパティを通じた簡単な検証が含まれています。 このプロパティは `function`, `boolean`, `string` の混合配列を受け付けます。 入力値が変更されると、配列の各要素が検証されます。 関数は現在の v-model を引数として渡し、 `true` / `false` または、エラーメッセージを含む `string` のいずれかを返す必要があります。

<example file="v-text-field/prop-validation" />

### イベント

#### アイコンイベント

`click:prepend`、`click:append`、`click:append-outer`、`click:clear`は、それぞれのアイコンをクリックしたときに発生します。 スロットが代わりに使用されている場合、これらのイベントは発生しないことに注意してください。

<example file="v-text-field/event-icons" />

### Slots

#### アイコンスロット

`prepend`/`append`/`append-outer`アイコンを使う代わりに、スロットを使って入力の機能を拡張することができます。

<example file="v-text-field/slot-icons" />

#### Label

`label` スロットでテキストフィールドのラベルを定義できます - HTMLコンテンツを使用することができます

<example file="v-text-field/slot-label" />

#### Progress

ボトムラインの代わりにプログレスバーを表示できます。 テキストフィールドと同じ色で不確定な状態のデフォルトのプログレスバーを使うか、`progress`スロットでカスタマイズすることができます。

<example file="v-text-field/slot-progress" />

### その他

#### カスタムバリデーション

`v-form` または [vuelidate](https://github.com/monterail/vuelidate) や [vee-validation](https://github.com/logaretm/vee-validate) などのサードパーティープラグインで構築されている間、検証プロセスを合理化することができます。 自分でコントロールすることができます

<example file="v-text-field/misc-custom-validation" />

#### Full width with counter

全幅（full width）のテキストフィールドを使うと無限の入力を作成できます。 この例では`v-divider`でフィールドを区切っています。

<example file="v-text-field/misc-full-width-with-counter" />

#### パスワード入力

HTML input **type** [password](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/password)を使うと、追加のアイコンとコールバックを使って可視性を制御できます。

<example file="v-text-field/misc-password" />

<backmatter />
