---
meta:
  title: Progress linearコンポーネント
  description: Progress-linear コンポーネントは、直線状で視覚的に数値データを表示するのに役立ちます。
  keywords: progress linear, vuetify progress linear component, vue progress linear component, linear progress
related:
  - /components/cards/
  - /components/progress-circular/
  - /components/lists/
---

# Progress linear

`v-progress-linear` コンポーネントは、データをユーザーに視覚的に伝えるために使用されます。 また、読み込みや処理などの不確定量を表すこともできます。

<entry-ad />

## 使い方

最もシンプルな形式では、 `v-progress-linear` は水平方向のプログレスバーを表示します。 **value** プロパティを使用して進行状況を制御します。

<example file="v-progress-linear/usage" />

## API

- [v-progress-linear](/api/v-progress-linear)

<inline-api page="components/progress-linear" />

## サンプル

### Props

#### Buffer value

バッファ状態は2つの値を同時に表します。 プライマリ値は **v-model**で制御されますが、バッファは **buffer-value** prop で制御されます。

<example file="v-progress-linear/prop-buffer-value" />

#### Colors

**color** と **background-color** プロパティを使用して色と背景色を設定することもできます。

<example file="v-progress-linear/prop-colors" />

#### Indeterminate

**indeterminate** プロパティを使用して、 `v-progress-linear` を連続的にアニメーションします。

<example file="v-progress-linear/prop-indeterminate" />

#### Reversed

進行状況を逆に表示します(右から左、RTLでは左から右)。

<example file="v-progress-linear/prop-reverse" />

#### Rounded

**rounded** prop は、 `v-progress-linear` コンポーネントにborder radius を追加する代替スタイルです。

<example file="v-progress-linear/prop-rounded" />

#### Stream

**stream** propは**buffer-value**と連携して、何らかのアクションが起こっていることをユーザーに伝えます。 **buffer-value**と**value**を自由に組み合わせて、あなたのデザインを実現することができます。

<example file="v-progress-linear/prop-stream" />

#### Striped

`v-progress-linear`の値部分をストライプ模様の縞々背景にします。

<example file="v-progress-linear/prop-striped" />

#### Query

**query** propがtrueに設定されているとき、**query** propの値はindeterminateの真偽によって制御されます。

<example file="v-progress-linear/prop-query" />

### Slots

#### デフォルト

`v-progress-linear`コンポーネントは、**v-model**を使うとユーザー入力に反応するようになります。 デフォルトのスロットを使ったりローカルのモデルをバインドしたりすることで、プログレスバーの中に表示することができます。 線形タイプのコンポーネントで高度な機能をお探しなら、[v-slider](/components/sliders)をチェックしてみてください。

<example file="v-progress-linear/slot-default" />

### その他

#### Determinate

progress linear コンポーネントは、 **v-model** によってdeterminate 状態を変更することができます。

<example file="v-progress-linear/misc-determinate" />

#### ファイルローダー

`v-progress-linear` コンポーネントは、応答を待っていることをユーザーに伝えるのに適しています。

<example file="v-progress-linear/misc-file-loader" />

#### ツールバーのローダー

**absolute** prop を使用すると、`v-progress-linear` コンポーネントを `v-toolbar`の下部に配置することができます。 また、プログレスの表示/非表示を制御できる**active** propも使っています。

<example file="v-progress-linear/misc-toolbar-loader" />

<backmatter />
