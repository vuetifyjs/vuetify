---
meta:
  title: Alert コンポーネント
  description: v-alert コンポーネントは、ユーザーに情報を伝えるために使用されます。 4つのコンテキストスタイルがあり、目立つようにデザインされています。
  keywords: v-alert, alerts, vue alert component, vuetify alert component
related:
  - /components/buttons/
  - /components/icons/
  - /components/snackbars/
---

# Alerts

`v-alert` コンポーネントは、コンテキストの種類に応じたアイコンと色を使って重要な情報をユーザーに伝えます。 デフォルトでは **success**、**info**、**warning**、**error** の4つのバリエーションがあります。 各バリエーションには、それぞれで必要なアクションを表すデフォルトのアイコンが割り当てられています。 `border`、`icon`、`color` など、アラートの多くの部分はあらゆる状況に合わせてカスタマイズできます。

<entry-ad />

## 使い方

最も単純な形式のアラートは、メッセージを表示するフラットな [シート](/components/sheets)形式のアラートです。

<usage name="v-alert" />

## API

- [v-alert](/api/v-alert)

<inline-api page="components/alerts" />

## サンプル

### Props

#### ボーダー

**border** プロパティは、アラートの4辺のいずれかにシンプルなボーダーを追加します。 props は **color**、**dark**、**type** などを組み合わせて個性的なアクセントを加えたアラートにすることができます。

<example file="v-alert/prop-border" />

#### 色付きボーダー

**color-border** prop を指定すると、**border** プロパティを強調し、アラートの背景を取り除きます。 **type** が設定されている場合はデフォルトの色が使用されます。 **color** または **type** が設定されていない場合、現在のテーマの反転色がデフォルトで適用されます (Light時はblack、Dark時はwhite/gray)。

<example file="v-alert/prop-colored-border" />

#### Dense

**dense** プロパティを指定すると、アラートの高さが少し低くなり、シンプルでコンパクトなスタイルになります。 **border** プロパティと同時に利用した場合、コンパクトなスタイルと協調させるためボーダーの太さは細くなります。

<example file="v-alert/prop-dense" />

#### 閉じるボタン付き

**dismissible** prop を指定すると、アラートコンポーネントの端に「閉じる」ボタンが追加されます。 このボタンをクリックすると、valueがfalseに設定され、アラートが非表示になります。 **v-model** をバインディングし、true をセットすると、アラートを再度表示できます。 閉じるアイコンにはデフォルトで `aria-label` が適用されます。これを変更するには、**close-label** prop を指定するか、ロケールの **close** の値を変更します。 ロケール設定をグローバルに変更する方法について詳しくは、[国際化ページ](/features/internationalization)を参照してください。

<example file="v-alert/prop-dismissible" />

#### Icon

**icon** propを設定すると、アラートコンポーネントの始点にアイコンを追加できます。 **type** を指定している場合、アイコンは規定の種類のアイコンで上書きされます。 また、 **icon** prop を _false_ に設定すると、アイコンが削除されます。

<example file="v-alert/prop-icon" />

#### アウトライン

**outlined** prop を指定すると、アラートのスタイルが反転します。現在適用されている **color** はテキストとボーダーに継承されて適用され、背景は透明なります。

<example file="v-alert/prop-outlined" />

<discovery-ad />

#### Prominent

**prominent** prop を指定すると、アラートの高さを広げ、アイコンの背後にハイライトを追加してアラートを際立たせます。 **prominent**と**dense** の両方を一緒に適用すると、通常のアラートの外観になりますが、**prominent**アイコン効果があります。

<example file="v-alert/prop-prominent" />

#### Text

**text** prop は、**color** で指定された色の不透明度を下げたものを背景に適用する、シンプルなアラートのバリエーションを提供します。 他のスタイル用の prop と同様に、**text** は **dense**、**prominent**、**outlined**、 **shaped** などの他の prop と組み合わせて、個性的にカスタマイズされたコンポーネントを生み出すことができます。

<example file="v-alert/prop-text" />

#### Shaped

**shaped** プロパティは、アラートの左上と右下に **border-radius**  を追加します。 他のスタイル用の prop と同様に、**shaped** は **dense**、**prominent**、**outlined**、 **text** などの他の prop と組み合わせて、個性的にカスタマイズされたコンポーネントを生み出すことができます。

<example file="v-alert/prop-shaped" />

#### トランジション

**transition** prop では、アラートが非表示になるときと表示されるときに見えるトランジションを適用できます。 詳細については、[Vuetify の内蔵トランジション](/styles/transitions#motion)、または[独自のトランジションを作成する](/styles/transitions#create-your-own)方法を確認してください。

<example file="v-alert/prop-transition" />

#### Twitter

**color**、**dismissible**、**border**、**elevation**、**icon**、**colored-border** の prop を組み合わせると、このtwitter通知のようなスタイリッシュなカスタムアラートを作成することができます。

<example file="v-alert/misc-twitter" />

#### Type

**type** には `v-alert`、**success**、**info**、**warning**、**error** の4つのデフォルトのスタイルが用意されています。 これらのスタイルは、それぞれ異なるデフォルトのアイコンと色を提供します。 デフォルトの色は、[Vuetifyのテーマ](/features/theme)をカスタマイズすることでグローバルに設定できます。

<example file="v-alert/prop-type" />

## アクセシビリティ

<vuetify-ad slug="vs-video-accessibility" />

By default, `v-alert` components are assigned the [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) role of [**alert**](https://www.w3.org/TR/wai-aria/#alert) which denotes that the alert \"is a live region with important and usually time-sensitive information.\" When using the **dismissible** prop, the close icon will receive a corresponding `aria-label`. この値は、**close-label** prop を変更するか、 [国際化](/features/internationalization)の _close_ プロパティのデフォルト値をカスタマイズすることで変更できます。

<backmatter />
