---
meta:
  title: ボタン・コンポーネント
  description: ボタンコンポーネントは、ユーザーが取ることができるアクションを伝えるもので、一般的にはダイアログ、フォーム、カード、ツールバーに配置されます。
  keywords: buttons, vuetify button component, vue button component
related:
  - /components/button-groups/
  - /components/icons/
  - /components/floating-action-buttons/
---

# Buttons

`v-btn` コンポーネントは、標準の HTML のボタンをマテリアルデザインのテーマと多数のオプションを備えたボタンで置き換えます。 背景やテキストの色は、任意のカラーヘルパークラスを使って変更できます。 <inline-ad slug="scrimba-buttons" />

<entry-ad />

## 使い方

大文字のテキスト、わずかな浮き上がり、ホバー効果、クリック時の波紋エフェクトを含むボタンは、最も単純な形式のボタンです。

<usage name="v-btn" />

## API

- [v-btn](/api/v-btn)
- [v-btn-toggle](/api/v-btn-toggle)

<inline-api page="components/buttons" />

## 注意事項

<alert type="warning">

  `v-btn` は、**dark** プロパティを使用したときに唯一動作が変化するコンポーネントです。 通常、他のコンポーネントでは **dark** prop を使って背景が暗い色であること、およびテキストを白にする必要があることを示します。 `v-btn` でもこの動作はするものの、白い背景では無効状態の区別がつかなくなるため、**背景に色を付けた場合にのみ** dark prop を使用することをお勧めします。 テキストを白くする必要がある場合は、単に `white--text` クラスを追加します。

</alert>

## サンプル

### Props

#### Block

**block** を指定すると、ボタンは利用できる幅いっぱいに広がります。

<example file="v-btn/prop-block" />

#### Depressed

**depressed** を指定すると、ボタンの背景色は維持されますが、ボックスに影が付かなくなります。

<example file="v-btn/prop-depressed" />

#### フローティングボタン

フローティングボタンは丸いデザインで、通常、アイコンを含みます。

<example file="v-btn/prop-floating" />

#### Icon

アイコンは、ボタンのメインのコンテンツとして使用できます。 icon prop を指定すると、ボタンが丸いデザインになり、**text** prop のスタイルがボタンに適用されます。

<example file="v-btn/prop-icon" />

#### Loading

loading prop を指定すると、ユーザーに処理中であることを伝えることができます。 デフォルトの動作では `v-progress-circular` コンポーネントが使用されますが、カスタマイズすることもできます。

<example file="v-btn/prop-loaders" />

<random-ad />

#### Outlined

**outlined** を指定すると、現在ボタンに適用されている色を継承した境界線が表示されます。

<example file="v-btn/prop-outlined" />

#### Plain

**plain** を指定すると、**hover** と **focus** に反応するベースラインの不透明度が低くなります。

<example file="v-btn/prop-plain" />

#### Rounded

**rounded** を指定すると、ボタンの角が丸くなります。動作は通常のボタンと変わりません。

<example file="v-btn/prop-rounded" />

#### サイズ

さまざまな用途に合うように、ボタンには異なるサイズを設定することができます。

<example file="v-btn/prop-sizing" />

#### Text

テキストボタンは、ボックスの影と背景を持ちません。 ホバーしたときだけボタンのコンテナが表示されます。 **color** prop を使用すると、指定した色が、背景ではなくボタンのテキストに適用されます。

<example file="v-btn/prop-text" />

#### Tile

**tile** を指定すると、ボタンの角の丸みがなくなります。動作は通常のボタンと変わりません。

<example file="v-btn/prop-tile" />

### その他

#### Raised

**raised** を指定すると、ボックスに影が付き、クリック時に影が濃くなります。 これはデフォルトのスタイルです。

<example file="v-btn/misc-raised" />

<backmatter />
