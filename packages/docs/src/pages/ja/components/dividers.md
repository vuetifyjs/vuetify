---
meta:
  title: ディバイダー・コンポーネント
  description: dividerコンポーネントは、一般的にリストまたはレイアウト内のコンテンツのグループを分けるために使用される細い線です。
  keywords: dividers, vuetify divider component, vue divider component
related:
  - /components/lists/
  - /components/navigation-drawers/
  - /components/toolbars/
---

# Dividers

`v-divider` コンポーネントは、リストまたはレイアウトのセクションを分離するために使用されます。

<entry-ad />

## 使い方

最も単純なDividerは、水平線を表示します。

<usage name="v-divider" />

## API

- [v-divider](/api/v-divider)

<inline-api page="components/dividers" />

## サンプル

### Props

#### Inset

Insetディバイダは72px右に移動されます。 これで、リスト項目と一致するようになります。

<example file="v-divider/prop-inset" />

#### Vertical

垂直区切り線により、独自のレイアウトのためのツールが増えます。

<example file="v-divider/prop-vertical" />

### その他

#### Portrait View

ユースケースに合わせてカスタムカードを作成します。

<example file="v-divider/misc-portrait-view" />

#### Subheaders

区切り線とサブヘッダーは、コンテンツを分割するのに役立ち、オプションで同じ`inset` propを使用して互いに並べることができます。

<example file="v-divider/misc-subheaders" />

## アクセシビリティ

`v-divider` コンポーネントは、デフォルトでは [WAI-ARIA](https://www.w3.org/WAI/standards-guidelines/aria/) ロールの [**separator**](https://www.w3.org/TR/wai-aria/#separator) が割り当てられます。このロールは、ディバイダが「コンテンツのセクションやメニュー項目のグループを分離して区別する」ことを意味します。 ただし、仕切りがインターフェイスの見栄えを良くするための手段にすぎない場合もあります。 このような場合、「暗黙のネイティブロールのセマンティクスがアクセシビリティAPIにマッピングされない要素」を示す[**presentation**](https://www.w3.org/TR/wai-aria/#presentation) のロールを使用する必要があります。 **v-divider** のデフォルトの**separator**ロールをオーバーライドするには、コンポーネントに`role="presentation"` propを追加してください。 さらに、 `v-divider` コンポーネントは `aria-orientation="horizontal"` があります。 `vertical="true"`の場合、 `aria-orientation="vertical"` も自動的に設定されます。 `role="presentation"`の場合、`aria-orientation="undefined"`がデフォルト値となります。

<backmatter />
