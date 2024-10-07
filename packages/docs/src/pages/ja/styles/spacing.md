---
meta:
  title: CSS スペーシング・ヘルパー
  description: スペーシングヘルパークラスを使用すると、1から5までの増分で任意の要素にマージンまたはパディングを適用できます。
  keywords: spacing helper classes, spacing classes, vuetify spacing
related:
  - /styles/elevation/
  - /styles/content/
  - /components/grids
---

# Spacing

新しいクラスを作成せずにレイアウトを更新します。 スペーシングヘルパーは、要素のパディングやマージンを変更するのに便利です。<inline-ad slug="scrimba-spacing" />

<entry-ad />

プレイグラウンドを使って、さまざまなヘルパークラスで何ができるのかを実感してください。 ヘルパークラスがどのように機能するかについての説明は、以下の「**どのように機能するか**」のセクションを参照してください。

<example file="spacing/usage" />

## どのように機能するか

ヘルパークラスは **0から16** までの範囲の要素に **margin** または _padding_を適用します。 各サイズ増分は、一般的なMaterial Designの間隔に合わせて設計されています。 これらのクラスは、 `{property}{direction}-{size}` 形式で適用できます。

**property** には以下の間隔のタイプが適用されます:

- `m` - `margin` を適用する
- `p` - `padding` を適用する

**direction** は、プロパティが適用される側を指定します:

- `t` - `margin-top`および`padding-top`の間隔を適用します。
- `b` - `margin-bottom` と `padding-bottom` の間隔を適用します。
- `l` - `margin-left` と `padding-left` の間隔を適用します。
- `r` - `margin-right` と `padding-right` の間隔を適用します。
- `s` - `margin-left`/`padding-left` _(LTRモードの場合)_ と `margin-right`/`padding-right` _(RTLモードの場合)_ の間隔を適用します。
- `e` - `margin-right`/`padding-right` _(LTRモードの場合)_ と `margin-left`/`padding-left` _(RTLモードの場合)_の間隔を適用します。
- `x` - `*-left` と `*-right` の間隔を適用します。
- `y` - `*-top` と `*-bottom` の間隔を適用します。
- `a` - プロパティの間隔を、天地左右すべての方向に適用します。

**size** は 4px の間隔でプロパティの増分を制御します:

- `0` - `margin` あるいは `padding` を `0` に設定し、それらを全て取り去ります。
- `1` - `margin` あるいは `padding` を 4px に設定
- `2` - `margin` あるいは `padding` を 8px に設定
- `3` - `margin` あるいは `padding` を 12px に設定
- `4` - `margin` あるいは `padding` を 16px に設定
- `5` - `margin` あるいは `padding` を 20px に設定
- `6` - `margin` あるいは `padding` を 24px に設定
- `7` - `margin` あるいは `padding` を 28px に設定
- `8` - `margin` あるいは `padding` を 32px に設定
- `9` - `margin` あるいは `padding` を 36px に設定
- `10` - `margin` あるいは `padding` を 40px に設定
- `11` - `margin` あるいは `padding` を 44px に設定
- `12` - `margin` あるいは `padding` を 48px に設定
- `13` - `margin` あるいは `padding` を 52px に設定
- `14` - `margin` あるいは `padding` を 56px に設定
- `15` - `margin` あるいは `padding` を 60px に設定
- `16` - `margin` あるいは `padding` を 64px に設定
- `n1` - `margin` を -4px に設定
- `n2` - `margin` を -8px に設定
- `n3` - `margin` を -12px に設定
- `n4` - `margin` を -16px に設定
- `n5` - `margin` を -20px に設定
- `n6` - `margin` を -24px に設定
- `n7` - `margin` を -28px に設定
- `n8` - `margin` を -32px に設定
- `n9` - `margin` を -36px に設定
- `n10` - `margin` を -40px に設定
- `n11` - `margin` を -44px に設定
- `n12` - `margin` を -48px に設定
- `n13` - `margin` を -52px に設定
- `n14` - `margin` を -56px に設定
- `n15` - `margin` を -60px に設定
- `n16` - `margin` を -64px に設定
- `auto` - 間隔を **auto** に設定

## サンプル

### ブレークポイント

Vuetifyは、 Flexboxを使用する12ポイントのグリッドシステムを備えています。 Spacing は、アプリケーションのコンテンツ内に特定のレイアウトを作成するために使用されます。 特定の画面サイズまたは向きをターゲットにするために使用される5つのメディアブレークポイント（**xs**, **sm**, **md**, **lg**, **xl**）で構成されています。 デフォルトの解像度は *Viewport Breakpoints* テーブルで以下に定義されており、 [breakpoint service config](/features/breakpoints)をカスタマイズすることで変更できます。

<breakpoints-table />

ヘルパークラスは特定のブレークポイントに **margin** または **padding** を適用します。 これらのクラスは次の形式で適用できます: `{property}{direction}-{breakpoint}-{size}`. これは、推測される **xs** には適用されません。 例えば `ma-xs-2` は `ma-2` と同じです。

<example file="spacing/breakpoints" />

### Horizontal

marginヘルパークラスを使えば、コンテンツを簡単に水平方向にセンタリングすることができます。

<example file="spacing/horizontal" />

### ネガティブ・マージン

マージンは、ネガティブ側にも同様に **1 から 16** の間隔で適用できます。

<example file="spacing/negative-margin" />

<backmatter />
