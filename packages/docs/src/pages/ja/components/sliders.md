---
meta:
  title: スライダー・コンポーネント
  description: スライダーコンポーネントは、数値入力をより適切に視覚化したものです。 数値データを収集するために使用します。
  keywords: sliders, vuetify slider component, vue slider component
related:
  - /components/forms/
  - /components/selects/
  - /components/range-slider/
---

# Sliders

`v-slider` コンポーネントは数値入力の可視化を向上させます。 数値データを収集するために使用します。

<entry-ad />

## 使い方

バーに沿って値の範囲を反映し、そこから単一の値を選択できます。 音量、明るさ、画像フィルタの適用などの設定を調整するのに最適です。

<usage name="v-slider" />

## API

- [v-slider](/api/v-slider)
- [v-range-slider](/api/v-range-slider)

<inline-api page="components/sliders" />

## サンプル

### Props

#### Colors

スライダーの色は props **color**、 **track-color** 、 **thumb-color** で設定できます。

<example file="v-slider/prop-colors" />

#### Disabled

**disabled**(無効化)設定されたスライダーの操作はできません。

<example file="v-slider/prop-disabled" />

#### 離散的な設定

離散的なスライダーでは、現在の正確な量を表示するサムラベル（thumb label）を提供します。 **step** propを使うと、ステップ以外の値を選択できないようになります。

<example file="v-slider/prop-discrete" />

#### Icons

**append-icon** と **prepend-icon** propsを使って、スライダーにアイコンを追加できます。 `@click:append` と `@click:prepend` を使用すると、アイコンをクリックしたときにコールバック関数をトリガーできます。

<example file="v-slider/prop-icons" />

#### ラベルの反転

`v-slider`に**inverse-label** propを指定すると、スライダーの末尾にラベルが表示されます。

<example file="v-slider/prop-inverse-label" />

#### 最小値と最大値

**min** と **max** の値を設定できます。

<example file="v-slider/prop-min-and-max" />

#### Readonly

スライダーに **readonly** を設定すると、見た目は通常のままですが、入力などの操作はできません。

<example file="v-slider/prop-readonly" />

#### Step

`v-slider`は1以外のステップも持つことができます。 これは、値を調整する必要がある一部のアプリケーションで役立ちます。

<example file="v-slider/prop-step" />

#### サムネイル

**thumb-label** propを使うと、スライドしている時あるいは常にサムラベルを表示できます。 **thumb-color** propでカスタムカラーを、**thumb-size** propでカスタムサイズを設定できます。 **always-dirty** propを使うと、**min**の値であっても色が変化しないようになります。

<example file="v-slider/prop-thumb" />

#### Ticks（目盛り）

Tick マークは、ユーザーがスライダーを移動できる既定値を表します。

<example file="v-slider/prop-ticks" />

#### バリデーション

Vuetify には **rules** プロパティを通じた簡単な検証が含まれています。 このプロパティは `function`, `boolean`, `string` の混合配列を受け付けます。 入力値が変更されると、配列の各要素が検証されます。 関数は現在の v-model を引数として渡し、 `true` / `false` または、エラーメッセージを含む `string` のいずれかを返す必要があります。

<example file="v-slider/prop-validation" />

#### 垂直スライダー

**vertical** propを使用して、スライダーを垂直方向に切り替えることができます。 スライダーの高さを変更する必要がある場合は、css を使用します。

<example file="v-slider/prop-vertical" />

### Slots

#### append と prepend

`append`や`prepend`といったスロットを使えば、あらゆる状況に合わせて簡単に`v-slider`をカスタマイズすることができます。

<example file="v-slider/slot-append-and-prepend" />

#### テキスト欄を追加

スライダーは、`append`スロット内の他のコンポーネント、例えば`v-text-field`のようなコンポーネントと組み合わせて、機能を追加することができます。

<example file="v-slider/slot-append-text-field" />

<backmatter />
