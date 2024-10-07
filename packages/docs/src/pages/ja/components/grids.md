---
meta:
  title: Grid system
  description: Vuetifyは、アプリケーションのブレークポイントをレイアウトおよび制御するための12分割されたマテリアルデザイングリッドをサポートしています。
  keywords: grids, vuetify grid component, layout component, flex component
related:
  - /styles/flex/
  - /features/breakpoints/
  - /styles/display/
---

# Grid system

Vuetifyは、 flex-boxを使用する12ポイントのグリッドシステムを備えています。 グリッドを使用すると、アプリケーションのコンテンツにかっちりとしたレイアウトを持たせることができます。  特定の画面サイズや向きに対応するため、**xs**、**sm**、**md**、**lg**、**xl**の5種類のメディアブレークポイントが用意されています。 これらのブレークポイントは、Viewport Breakpoints テーブルで以下のように定義されています。[ブレークポイントサービス](/features/breakpoints)を編集してカスタマイズすることもできます。

<promoted-ad slug="vuemastery-grids" />

<breakpoints-table />

## 使い方

Vuetifyのグリッドシステムは、 [Bootstrap grid](https://getbootstrap.com/docs/4.0/layout/grid/)から大きく影響を受けています。 グリッドシステムでは、container、row、columnを使ってコンテンツの配置や調整を行います。 **flexbox をご存知でない場合**は、[CSS Tricks flexbox guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-background) で経緯、用語、ガイドライン、およびコードサンプルを参照してください。

<example file="grid/usage" />

## API

- [v-container](/api/v-container)
- [v-row](/api/v-row)
- [v-col](/api/v-col)
- [v-spacer](/api/v-spacer)

<inline-api page="components/grids" />

## サブコンポーネント

### v-container

`v-container` は、サイトのコンテンツ間にパディングを入れ、コンテンツを中央に配置する機能を提供します。 また、すべてのビューポートやデバイスサイズで動作するように、**fluid** prop を使って総合的にコンテナを拡張することもできます。 Maintains previous 1.x functionality in which props are passed through as classes on `v-container` allowing for the application of helper classes (such as `ma-#`/`pa-#`/`fill-height`) to easily be applied.

### v-col

`v-col`はコンテンツを保持する要素で、`v-row` の直接の子要素である必要があります。 これは 1.x の `v-flex` に置き換わる、2.x の要素です。

### v-row

`v-row` は、`v-col` のラッパーコンポーネントです。 flex プロパティを使用して、内部の列のレイアウトとフローを制御します。 **24px** が標準の gutter となっています。 これは **dense** prop で縮小することや、**no-gutters** で完全に取り除くことができます。 これは、1.x の `v-layout` に置き換わる、2.x の要素です。

### v-spacer

`v-spacer` は、親子コンポーネント間で残りの幅を分配します。基本的でありながら汎用性の高い、間隔調整用のコンポーネントです。 子コンポーネントの前または後に単一の `v-spacer` を配置すると、子コンポーネントはコンテナの左または右に寄せられます。 複数のコンポーネント間に複数の `v-spacer` を使用すると、残りの幅が各 v-spacer 間で均等に分配されます。

## ヘルパークラス

`fill-height` は `height: 100%` を要素に適用します。 `v-container`に適用すると、`align-items: center` も適用されます。

## 注意事項

<alert type="info">

  1.x のグリッドシステムは、2.x のグリッドシステムに移行するため非推奨となりました。 1.x のグリッドシステムのドキュメントは [v1.5 docs](https://v15.vuetifyjs.com/framework/grid) から参照できます。

</alert>

<alert type="info">

  グリッドコンポーネントのブレークポイントの prop は、`同等またはそれ以上`の方式で適用されます。 このことから、**xs** のブレークポイントは暗黙で仮定されるため、prop の内容からは削除されました。 これは `v-col` の **offset**、**justify**、**align**、および単一のブレークポイントの prop に適用されます。

- **justify-sm** や **justify-md** のような prop は存在しますが、**justify-xs** は存在せず、単に **justify** となります。
- **xs** prop は `v-col` には存在しません。 **cols** prop もこれと同様です。

</alert>

<alert type="info">

  IE11でグリッドシステムを使用する場合、「min-height」では不十分であり、望ましくない結果が生じるため、明示的な「height」を設定する必要があります。

</alert>

## サンプル

### Props

#### 配置

**align** と **align-self** prop を使用すると、flex アイテムとその親の縦方向の配置を変更できます。

<example file="grid/prop-align" />

#### ブレークポイントのサイズ

列の幅は、自動的に親コンテナのサイズに合わせて同等の幅になります。 これは **cols** prop で変更できます。 また、**sm**、**md**、**lg**、**xl** prop を使用して、ビューポートのサイズによって列の幅を指定することもできます。

<example file="grid/prop-breakpoint-sizing" />

#### Justify

**justify** プロパティを使用すると、flex項目の水平方向の配置を変更できます。

<example file="grid/prop-justify" />

#### no-gutters

**no-gutters** prop を使用すると、`v-row` から負のマージンを削除し、その直接の `v-col` の子要素からパディングを削除することができます。

<example file="grid/prop-no-gutters" />

#### オフセット

オフセットは、まだ表示されていない可能性のある要素を埋め合わせる場合や、コンテンツの位置を指定したい場合に便利です。 ブレークポイントと同様に、オフセットには既定のサイズを指定できます。 これにより、アプリケーションのレイアウトをニーズに合うように細かく調整できます。

<example file="grid/prop-offset" />

#### ブレークポイントのオフセット

オフセットは、ブレークポイントごとに適用することもできます。

<example file="grid/prop-offset-breakpoint" />

#### 順序

グリッドの各項目の順序を指定することができます。 オフセットと同様に、サイズごとに異なる順序を設定できます。 これにより、あらゆるアプリケーションのニーズに合わせて、独自の画面レイアウトをデザインできます。

<example file="grid/prop-order" />

#### 順序: 最初と最後

明示的に **first** または **last** を指定することで、それぞれ `order` の CSS プロパティの **-1** または **13** に対応する値が割り当てられます。

<example file="grid/prop-order-first-and-last" />

### その他

#### 列方向のラッピング

特定の行 (`.flex-nowrap` ユーティリティクラスが適用されていないもの) に含まれる列の数が 12 を超える場合、溢れる列は新しい行に改行されて表示されます。

<example file="grid/misc-column-wrapping" />

#### 等幅の列

等幅の列は、複数の行に区切ることができます。 古いバージョンのブラウザーで回避策はあるものの、[Safari では flexbox のバグ](https://github.com/philipwalton/flexbugs#11-min-and-max-size-declarations-are-ignored-when-wrapping-flex-items)がありました。 最新版を使用する場合、これは必要ではありません。

<example file="grid/misc-equal-width-columns" />

#### 拡大と縮小

デフォルトでは、flex コンポーネントは自動的に行または列の空き領域を埋めます。 また、決まったサイズが指定されていない場合、flex コンテナー内の他のフレックス要素に応じて縮小します。 `v-col` の列の幅は **cols** prop を使って指定できます。値には **1 〜 12** を指定します。

<example file="grid/misc-grow-and-shrink" />

#### マージンヘルパー

[auto margin helper ユーティリティ](/styles/flex#auto-margins) を使用すると、子同士の列を互いに離すことができます。

<example file="grid/misc-margin-helpers" />

#### ネストしたグリッド

非常にカスタマイズされたレイアウトを実現するために、他のフレームワークと同様にグリッドをネストすることができます。

<example file="grid/misc-nested-grid" />

#### 1列の幅

自動レイアウトを使用する場合、幅を指定する必要のある列は 1つのみです。その前後に、自動的にサイズが変更される兄弟の要素が含まれます。

<example file="grid/misc-one-column-width" />

#### 行と列のブレークポイント

レイアウトは解像度に基づいて動的に変更されます。 **(上の `row` のレイアウトが、画面サイズを変えてsm、md、lgのブレークポイントに当たったときにどのように変化するか観察してください)**

<example file="grid/misc-row-and-column-breakpoints" />

#### スペーサー

`v-spacer` コンポーネントは、空間を確保したい場合や、2つのコンポーネント間に空間を取りたい場合に便利です。

<example file="grid/misc-spacer" />

#### ユニークなレイアウト

Vuetifyグリッドシステムのパワーと柔軟性により、素晴らしいユーザーインターフェースを作成できます。

<example file="grid/misc-unique-layouts" />

#### 変化のあるコンテンツ幅

コンテンツの本来の幅に基づいてサイズ変更が起きるように、列のブレークポイント幅の割り当てを変更できます。

<example file="grid/misc-variable-content" />

<backmatter />
