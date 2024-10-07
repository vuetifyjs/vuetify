---
meta:
  title: ナビゲーションドロワー・コンポーネント
  description: ナビゲーションドロワーコンポーネントには、アプリケーションの内部ナビゲーションリンクが含まれており、画面上に永続的に表示することも、プログラムで制御することもできます。
  keywords: navigation drawer, vuetify navigation drawer component, vue navigation drawer component
related:
  - /components/lists/
  - /components/icons/
  - /getting-started/wifreflames/
---

# Navigation drawers

`v-navigation-drawer` コンポーネントは、ユーザーがアプリケーション内を移動するために使用するものです。 ナビゲーション・ドロワーは、 **vue-router** の有無にかかわらず、ボックス内で動作するように事前設定されています。 表示の目的で、いくつかの例は `v-card` 要素でラップされています。 アプリケーション内では、一般的に`v-app`直下の子要素として`v-navigation-drawer`を配置します。

<entry-ad />

## 使い方

ナビゲーションドロワーは主にアプリケーションのページへのリンクを保存するために使用されます。 **v-model** の開始値として`null` を使用すると、ドロワーがモバイルでは閉じた状態、デスクトップでは開いた状態として初期化されます。 [nav](/components/lists) プロパティを使用して、ドロワーを **v-list** コンポーネントとペアリングするのが一般的です。

<example file="v-navigation-drawer/usage" />

## API

- [v-navigation-drawer](/api/v-navigation-drawer)

<inline-api page="components/navigation-drawers" />

## 注意事項

<alert type="error">

  **app** プロパティが有効な `v-navigation-drawer` を使用している場合は、例のように **absolute** プロパティを使用する必要はありません。

</alert>

<alert type="info">

  **expand-on-hover** prop は **v-main** のコンテンツエリアを変更しません。 コンテンツエリアを **expand-on-hover** に応答させるには、データプロパティに **mini-variant.sync** をバインドします。

</alert>

## サンプル

### Props

#### Bottom drawer

**bottom** プロパティを使用すると、モバイルデバイスの場合、ドロワーを画面下部から開くように移動することができます。 これは代替のスタイルであり、**mobile-breakpoint** を満たすときに有効になります。

<example file="v-navigation-drawer/prop-bottom-drawer" />

#### Expand on hover

コンポーネントを **mini-variant** モードにし、マウスホバーで開くようにします。 これは、**v-main** の領域を**変更しません**。 幅は、**mini-variant-width** プロパティで設定できます。

<example file="v-navigation-drawer/prop-expand-on-hover" />

#### Images

**src** プロパティを利用することで、ドロワーに任意の背景画像を適用できます。 必要な場合は、`img` スロットを利用して、`v-img` によるカスタマイズができます。

<example file="v-navigation-drawer/prop-images" />

#### Mini variant

**mini-variant** プロパティを利用すると、ドロワーは細くなり（デフォルトで56px）、`v-list` 内は先頭にある要素以外すべて非表示になります。 この例では、 **.sync** 修飾子を使用して、ドロワーの開閉を紐づけています。

<example file="v-navigation-drawer/prop-mini-variant" />

#### Permanent and floating（永続的・浮遊）

デフォルトでは、ナビゲーションドロワーにはコンテンツと分離させるために右側に1pxの境界線があります。 この例ではドロワーを左側から離し、浮かんでいる（float）ようにしたいです。 **floating** propは右側の境界線（**right**を使っている場合は左側）を削除します。

<example file="v-navigation-drawer/prop-permanent-and-floating" />

#### Right

ナビゲーションドロワーは、アプリケーション（または要素）の右側に配置することもできます。 これは、ナビゲーションリンクが持たないような補助的な情報を表示するサイドカードを作る場合にも便利です。 **RTL**（右から左へ記述される言語）を利用する場合は、明示的に **right** を定義する必要があります。

<example file="v-navigation-drawer/prop-right" />

#### Temporary

temporary は、ドロワーをアプリケーション画面の上に重なるように表示し、幕（overlay）を表示して背景を暗くします。 モバイル端末ではデフォルトでこの挙動になります。 ドロワーの外をクリックすることで、ドロワーは閉じます。

<example file="v-navigation-drawer/prop-temporary" />

### その他

#### 色付きドロワー

ナビゲーションドロワーは、アプリケーションのデザインに合わせてカスタマイズできます。 ここでは、 **append** スロットを使用してカスタム背景色と追加コンテンツエリアを適用します。

<example file="v-navigation-drawer/misc-colored" />

#### 結合ドロワー

この例では、ネストしたドロワーに対応するカスタム幅を定義します。 `v-row` を使用して、ドロワーとリストが水平方向に隣り合ってスタックするようにします。

<example file="v-navigation-drawer/misc-combined" />

<backmatter />
