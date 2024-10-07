---
meta:
  title: Display helpers
  description: ディスプレイヘルパークラスを使用すると、要素がビューポートに基づいて表示されるタイミングを制御できます。
  keywords: display helper classes, display classes, vuetify display
related:
  - /styles/text-and-typography/
  - /directives/resize/
  - /features/breakpoints/
---

# Display helpers

ディスプレイヘルパーを使用すると、コンテンツの表示を制御できます。 これには、現在のビューポートまたは実際の要素表示タイプに基づいて条件付きで表示されることが含まれます。

<entry-ad />

<breakpoints-table />

## Display

要素の`display`プロパティを指定します。 これらのクラスは、 `xs` から `xl` までのすべてのブレークポイントに適用できます。 ベースクラス`.d-{value}`を使用する場合、 `.d-${value}-xs` と推定されます。

- `.d-{value}` for `xs`
- `.d-{breakpoint}-{value}` for `sm`, `md`, `lg` and `xl`

_value_ プロパティは次のいずれかです:

- `none`
- `inline`
- `inline-block`
- `block`
- `table`
- `table-cell`
- `table-row`
- `flex`
- `inline-flex`

ディスプレイヘルパークラスの特定のブレークポイントを設定する場合、指定以降のすべての画面幅に適用されます。 例えば、 `d-lg-flex` は `lg` と `xl` のサイズ画面に適用されます。

<example file="display/display-inline" />

<example file="display/display-block" />

## Visibility

現在の **viewport** に基づいて要素を条件付きで表示します。 ブレークポイント・ユーティリティ・クラスは、常に下から上に向かって適用されます。 つまり、 `.d-none` であれば、すべてのブレークポイントに適用されます。 ただし、 `.d-md-none` は `md` 以降にのみ適用されます。

| スクリーンサイズ           | クラス                             |
| ------------------ | ------------------------------- |
| 全て非表示              | `.d-none`                       |
| Hidden only on xs  | `.d-none .d-sm-flex`            |
| Hidden only on sm  | `.d-sm-none .d-md-flex`         |
| Hidden only on md  | `.d-md-none .d-lg-flex`         |
| Hidden only on lg  | `.d-lg-none .d-xl-flex`         |
| Hidden only on xl  | `.d-xl-none`                    |
| Visible on all     | `.d-flex`                       |
| Visible only on xs | `.d-flex .d-sm-none`            |
| Visible only on sm | `.d-none .d-sm-flex .d-md-none` |
| Visible only on md | `.d-none .d-md-flex .d-lg-none` |
| Visible only on lg | `.d-none .d-lg-flex .d-xl-none` |
| Visible only on xl | `.d-none .d-xl-flex`            |

<example file="display/visibility" />

さらに、横方向表示ヘルパークラスを使って、現在の**ビューポート**に基づいて要素を表示することもできます。 これらのクラスは、 `hidden-{breakpoint}-{condition}` 形式で適用できます。

_condition_ は以下のクラスベースを適用します:

- `only` - `xs` から `xl` ブレークポイントでのみ要素を非表示にする
- `and-down` - 指定されたブレークポイントと `sm` から `lg` ブレークポイント以下の要素を非表示にする
- `and-up` - 指定されたブレークポイントと `sm` から `lg`以上のブレークポイントの要素を非表示にする

さらに、 **media types** は `only` conditionを使用してターゲットにできます。 `hidden-screen-only` と `hidden-print-only` の両方が現在サポートされています。

## 印刷時の表示

印刷用に表示プロパティを変更することもできます。

- `.d-print-none`
- `.d-print-inline`
- `.d-print-inline-block`
- `.d-print-block`
- `.d-print-table`
- `.d-print-table-row`
- `.d-print-table-cell`
- `.d-print-flex`
- `.d-print-inline-flex`

printユーティリティー・クラスは、印刷時の表示ユーティリティーを使用しない場合にも組み合わせることができます。

<example file="display/print" />

## アクセシビリティ

### スクリーンリーダー

`d-sr`ユーティリティクラスを使用して、スクリーンリーダーを*除く*すべてのデバイスのコンテンツを条件付きで非表示にします。

- `d-sr-only` は要素を視覚的には非表示にしますが、**スクリーンリーダー** 対してはアナウンスします。
- `d-sr-only-focusable` （d-srのフォーカスが可能な）要素は、フォーカスが設定されるまで視覚的に非表示になります。 これは、 *スキップ・リンク*を実装するときに便利です。 <backmatter />
