---
meta:
  title: CSS リセット
  description: Vuetify は ress.min を使用していますが、これは normalize.css または normalize.css に基づいた完全なブラウザリセットです。
  keywords: ress.min, css reset, vuetify css reset
related:
  - /styles/colors/
  - /styles/text-and-typography/
  - /features/sass-variables/
---

# CSS リセット

Vuetifyプロジェクトのためのオピニオンベースのスタイル。

<entry-ad />

## Bootstrapping

ress は、スタイルシートのための強固な基盤を適用するモダンな CSS reset です。 [normalize.css](https://github.com/necolas/normalize.css) の上に構築されており、`<code>`要素に `font-family: monospace` を指定したり、ホバー時の要素からすべての`outlines`を削除したり、その他多くの新機能が追加されています。 追加情報は [ress GitHub リポジトリ](https://github.com/filipelinhares/ress) にあります。

<alert type="warning">

  Vuetifyスタイルのリセットはグローバルに適用され、`button`や`input`などのデフォルトの要素に影響します。 これには、 [v-app](/components/application) コンポーネントの外部にあるものも含まれます。

</alert>

これらのスタイルは **src/styles/generic/_reset.scss** 内で自動的にインポートされ、 **src/styles/generic/_index.scss** 内で **Generic** スタイルとしてブートストラップされます。

```scss
// styles/generic/_index.scss

// 素のHTML要素（H1やAなど）のための一般的なスタイリング。
// これらはブラウザからのデフォルトのスタイリングが付属しているので、
// ここで再定義することができます。
@import './reset.scss';

@import './animations.scss';

@import './colors.scss';

@import './elevation.scss';

@import './transitions.scss';
```

## リセット機能

以下は、デフォルトの**normalize.css**機能に対してressが提供する追加の*機能*のリストです。

- `box-sizing: border-box` をすべての要素に適用します。
- すべての要素の `padding` と `margin` をリセットします。
- すべての要素と擬似要素に `background-repeat: no-repeat` を指定します。
- `text-decoration` と `vertical-align` を `::before` と `::after` に継承します。
- すべてのブラウザでホバリングしたときの `outline` を削除します。
- コード要素に `font-family: monospace` を指定します。
- 入力要素の `border-radius` をリセットします。
- フォーム要素のフォント継承を指定します。
- すべてのブラウザでデフォルトのボタンのスタイリングを削除します。
- textareaのサイズ変更を垂直方向に指定します。
- ボタン要素に `cursor: pointer` を適用します。
- `tab-size: 4` を `html` に適用します。
- `select` をスタンダードなinputスタイルにします。
- カーソル`cursor`のスタイルを aria 属性で指定します。
- 画面ではコンテンツを非表示にしますが、スクリーンリーダーには適用しません。

適用されたすべてのスタイルの完全なリストについては、 [ress css stylesheet](https://github.com/filipelinhares/ress/blob/master/ress.css) を参照してください。

<backmatter />
