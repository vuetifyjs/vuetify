---
meta:
  title: テキストエリア・コンポーネント
  description: textarea コンポーネントは、ユーザーからの長いテキスト入力を受け付けるテキストフィールドです。
  keywords: textareas, vuetify textarea component, vue textarea component
related:
  - /components/forms/
  - /components/selects/
  - /components/text-fields/
---

# Textareas

テキストエリアコンポーネントは、大量のテキストデータをまとめるために使用されます。

<entry-ad />

## 使い方

最も単純な形式の`v-textarea`は、複数行のテキストフィールドで、大量のテキストを扱うとき役立ちます。

<example file="v-textarea/usage" />

## API

- [v-textarea](/api/v-textarea)

<inline-api page="components/textareas" />

## サンプル

### Props

#### Auto grow

`auto-grow` propを使用すると、テキストの分量に応じて、textarea のサイズは自動的に拡張されます。

<example file="v-textarea/prop-auto-grow" />

#### Background color

`background-color` と `color` プロパティを使用すると、 `v-textarea`をより細かくスタイリングできます。

<example file="v-textarea/prop-background-color" />

#### ブラウザのautocomplete

`autocomplete` プロパティで、ブラウザーがユーザー入力を予測できるように設定できます。

<example file="v-textarea/prop-browser-autocomplete" />

#### Clearable

`clearable` propを使うと、`v-textarea`からテキストをクリアできるようになります。アイコンは`clearable-icon` propでカスタマイズできます。

<example file="v-textarea/prop-clearable" />

#### Counter

`counter` プロパティは、 `v-textarea` の文字制限をユーザに通知します。

<example file="v-textarea/prop-counter" />

#### Icons

`append-icon` と `prepend-icon` プロパティは、 `v-textarea` にコンテキストを追加するのに役立ちます。

<example file="v-textarea/prop-icons" />

#### No resize

`v-textarea`には、 `no-resize` プロパティを使用して、コンテンツのサイズに関係なく、同じサイズを維持するオプションがあります。

<example file="v-textarea/prop-no-resize" />

#### Rows

`rows` prop で、テキストエリアの行数を定義できます。行の高さを定義する `row-height` prop と組み合わせると、さらにカスタマイズすることができます。

<example file="v-textarea/prop-rows" />

### その他

#### サインアップフォーム

代替の入力スタイルを使用することで、簡単に構築でき、使いやすい素晴らしいインターフェースを作成できます。

<example file="v-textarea/misc-signup-form" />

<backmatter />
