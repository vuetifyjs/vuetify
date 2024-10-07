---
meta:
  title: Border radius
  description: border ユーティリティを使用すると、任意の要素の border-radius を素早くスタイル付けできます。
  keywords: border radius classes, radius utilities, vuetify radius helper classes
related:
  - /styles/text-and-typography/
  - /components/sheets/
  - /components/buttons/
---

# Border Radius

border ユーティリティを使用すると、任意の要素の border-radius を素早くスタイル付けできます。

<entry-ad />

## 使い方

<example file="border-radius/usage" />

## 注意事項

<alert type="info">

  The infixes **sm**, **lg**, **xl**, and **xxl** correlate to the border radius *size* and are not affected by breakpoints.

</alert>

## SASS変数

border radiusヘルパークラスを設定または無効にします。 [vue-cli-plugin-vuetify](https://github.com/vuetifyjs/vue-cli-plugins/tree/master/packages/vue-cli-plugin-vuetify) ライブラリと `variables.s(c|a)ss` ファイルの使用が必要です。 変数を設定する方法に関する追加情報は、 [SASS変数](/features/sass-variables) のドキュメント ページにあります。

丸めサイズは、`$border-radius-root`変数のデフォルト値**0.25rem**に基づいています。

```scss
$rounded: (
  0: 0,
  'sm': $border-radius-root / 2,
  null: $border-radius-root,
  'lg': $border-radius-root * 2,
  'xl': $border-radius-root * 4,
  'xxl': $border-radius-root * 6,
  'pill': 9999px,
  'circle': 50%
);
```

### 値の上書き

プロジェクトの *変数* ファイルに `$rounded` という名前のリストを追加することで、 `border-radius` サイズを変更または追加できます。

```scss
$rounded: (
  'sm': $border-radius-root / 3,
  'lg': $border-radius-root * 2
);
```

## サンプル

### その他

#### Pill と Circle

`.rounded-pill` クラスでピルを作成し、 `.rounded-circle` クラスで円を作成できます。

<example file="border-radius/misc-pill-and-circle" />

#### Border Radiusを取り除く

`.round-0`ヘルパークラスを使用して、*要素のradius(半径)のすべてを削除*したり、側面や角を選択したりすることができます; 例えば、`.round-l-0`や`.round-tr-0`など。

<example file="border-radius/misc-removing-border-radius" />

#### すべてのコーナーを丸める

**rounded** ヘルパークラスでは、要素の *border radius* を変更できます。 Use the `.rounded-sm`, `.rounded`, `.rounded-lg`, `.rounded-xl` and `.rounded-xxl` to add a border radius of varying size.

<example file="border-radius/misc-rounding-all-corners" />

#### 上下左右それぞれの辺での丸め

Border radiusは、**t, r, b, l**のinfixクラスを使用して、辺ごとに設定可能です。例：`.rounded-b-xl` and `.rounded-t`

<example file="border-radius/misc-rounding-by-side" />

#### 各コーナー単位での丸め

Border radiusは、**tl, tr, br, bl**のinfixクラスを使用して、コーナーごとに設定可能です。

<example file="border-radius/misc-rounding-by-corner" />

<backmatter />
