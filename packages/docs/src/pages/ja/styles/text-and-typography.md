---
meta:
  title: Text and typography
  description: 様々なタイポグラフィスタイルをご覧ください。 様々なウェイト、サイズ、イタリック体をもつ見出しからキャプション等があります。
  keywords: typography, headings, titles, text
related:
  - /styles/display/
  - /styles/content/
  - /components/subheaders/
---

# Text and typography

テキストのサイズ、配置、折り返し、オーバーフロー、変換などを制御します。 <inline-ad slug="scrimba-typography" />

<entry-ad />

## Typography

Typographyヘルパークラスを使用してテキストのサイズとスタイルを制御します。 これらの値は、 [Material Design type specification](https://material.io/design/typography/the-type-system.html) に基づいています。

<example file="text-and-typography/typography" />

これらのクラスは、 `xs` から `xl` までのすべてのブレークポイントに適用できます。 ベースクラスを使用している場合、 `.text-{value}`は `.text-xs-${value}` であると推定されます。

- `.text-{value}` for `xs`
- `.text-{breakpoint}-{value}` for `sm`, `md`, `lg` and `xl`

_value_ プロパティは次のいずれかです:

- `h1`
- `h2`
- `h3`
- `h4`
- `h5`
- `h6`
- `subtitle-1`
- `subtitle-2`
- `body-1`
- `body-2`
- `button`
- `caption`
- `overline`

<br>

<alert type="success">

  **TIP**

  v2.3.0以前のすべてのバージョンでは、これらのクラスは以下のいずれかでした:

  <br>

- `.display-4`
- `.display-3`
- `.display-2`
- `.display-1`
- `.headline`
- `.title`
- `.subtitle-1`
- `.subtitle-2`
- `.body-1`
- `.body-2`
- `.caption`
- `.overline`

</alert>

以下の例では、さまざまなサイズが異なるブレークポイントでどのように表示されるかを示します:

<example file="text-and-typography/typography-breakpoints" />

### Font emphasis

マテリアルデザインは、デフォルトで **100、300、400、500、700、900** フォントウェイトと斜体をサポートしています。

<example file="text-and-typography/font-emphasis" />

## Text

### 配置

配置ヘルパー クラスを使用すると、テキストを簡単に再配置できます。

<example file="text-and-typography/text-justify" />

レスポンシブ・ディスプレイをサポートする配置クラスもあります。

<example file="text-and-typography/text-align" />

### Decoration

<alert type="info">

  **v2.3.0+の新機能**

</alert>

`.text-decoration-none`クラスを使ってテキストの装飾を削除したり、`.text-decoration-overline`、`.text-decoration-underline`、`.text-decoration-line-through`を使って*オーバーライン、アンダーライン、ラインスルー*を追加したりすることができます。

<example file="text-and-typography/text-decoration" />

### Opacity

Opacityヘルパークラスを使用すると、テキストの強調を簡単に調整できます。 `text--primary` の不透明度はデフォルトのテキストと同じです。 `text--secondary` はヒントやヘルパーテキストに使用されます。 `text---disabled` でテキストを強調表示を解除します。

<example file="text-and-typography/text-opacity" />

### Transform

テキストは、capitalizationクラスで大文字や小文字などに変換できます。

<example file="text-and-typography/text-transform" />

テキストの分割や `text-transform` の削除も可能です。 最初の例では、 `text-transform: uppercase` カスタムクラスが上書きされ、テキストの大文字小文字をそのままにすることができます。 2番目の例では、使用可能なスペースに合わせて長い単語を分割します。

<example file="text-and-typography/text-break" />

### ラップとオーバーフロー

`.text-no-wrap` ユーティリティクラスでテキストの折り返しを防ぐことができます。

<example file="text-and-typography/text-no-wrap" />

`.text-truncate` ユーティリティクラスでは、長いコンテンツのテキストを省略できます。

<alert type="info">

  **必須** `display: inline-block` または `display: block` 。

</alert>

<example file="text-and-typography/text-truncate" />

## RTLでのテキスト配置

[RTL](/features/bidirectionality) を使用するとき、**rtl** の指定に関係なく、配置(alignment)を維持したい場合があります。 これは、次の形式のテキストアライメント・ヘルパークラスを使用することで実現できます：`text-<breakpoint>-<direction>` （breakpointは`sm`, `md`, `lg`, `xl`、directionは`left`または`right`です）。 また、directionの`start`と`end`を使用して、rtlに応答するように配置することもできます。

<example file="text-and-typography/text-rtl" />

<backmatter />
