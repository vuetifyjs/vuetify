---
meta:
  title: ファイルインプット・コンポーネント
  description: ファイルインプットコンポーネントは、ファイルを選択するためのクリーンなインターフェイスを提供し、詳細な選択情報とアップロードの進行状況を表示する特殊なinputです。
  keywords: file input, file upload, file field
related:
  - /components/text-fields/
  - /components/forms/
  - /components/icons/
---

# File inputs

`v-file-input`コンポーネントは、ファイルを選択するためのクリーンなインターフェイスを提供し、詳細な選択情報やアップロードの進捗状況を表示する特殊な入力です。 これは、標準ファイル入力の直接の代替となるように意図されています。

<entry-ad />

## 使い方

その中核をなす `v-file-input` コンポーネントは、[v-text-field](/components/text-fields) を拡張した基本的なコンテナです。

<usage name="v-file-input" />

## API

- [v-file-input](/api/v-file-input)

<inline-api page="components/file-inputs" />

## サンプル

### Props

#### Accept

`v-file-input` コンポーネントは特定のメディアフォーマット/ファイルタイプのみを受け付けることができます。 詳細については、 [accept 属性](https://developer.mozilla.org/ja/docs/Web/HTML/Element/input/file#accept) のドキュメントを参照してください。

<example file="v-file-input/prop-accept" />

#### Chips

選択したファイルを [chip](/components/chips)として表示することができます。 **chips** と **multiple** propsを使用すると、（ファイル数ではなく）各チップが表示されます。

<example file="v-file-input/prop-chips" />

#### Counter

**show-size**プロパティを**counter**と一緒に使用すると、ファイル総数と合計サイズが入力部の下に表示されます。

<example file="v-file-input/prop-counter" />

#### Dense

`dense` プロパティでfile inputの高さを減らすことができます。

<example file="v-file-input/prop-dense" />

#### Multiple

`v-file-input` は、 **multiple** prop を使用するときに、同時に複数のファイルを含めることができます。

<example file="v-file-input/prop-multiple" />

#### Prepend icon

`v-file-input` には、コンポーネントに設定したり、グローバルに調整したりできるデフォルトの `prepend-icon` があります。 グローバルコンポーネントの変更に関する詳細は、 [アイコンのカスタマイズ ページ](/features/icon-fonts) をご覧ください。

<example file="v-file-input/prop-prepend-icon" />

#### サイズの表示

選択したファイルのサイズ表示は **show-size** プロパティで設定できます。 サイズ表示での換算値は _1024_ ( **true**を指定する場合のデフォルト) または _1000_ のいずれかにすることができます。

<example file="v-file-input/prop-show-size" />

#### バリデーション

他の入力と同様に、**rules** propを使用して独自のカスタムバリデーションパラメータを作成できます。

<example file="v-file-input/prop-validation" />

### Slots

#### Selection

`selection` スロットを使用して、入力選択の外観をカスタマイズできます。 通常、これは[chips](/components/chips)で行われますが、コンポーネントやマークアップを使用することができます。

<example file="v-file-input/slot-selection" />

### その他

#### 複雑な選択スロット

選択スロットの柔軟性により、複雑なユースケースに対応できます。 この例では、最初の 2 つの選択をチップとして表示し、残りの量の数値表示を追加します。

<example file="v-file-input/misc-complex-selection" />

<backmatter />
