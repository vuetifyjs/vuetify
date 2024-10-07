---
meta:
  title: アイテムグループ・コンポーネント
  description: アイテムグループコンポーネントは、コンポーネントから選択可能なアイテムのグループを作成する機能を提供します。
  keywords: item groups, vuetify item group component, vue item group component
related:
  - /components/button-groups/
  - /components/carousels/
  - /components/tabs/
---

# Item groups

`v-item-group` コンポーネントは、コンポーネントから選択可能なアイテムのグループを作成する機能を提供します。 これは `v-tabs` や `v-carousel` などのコンポーネントのベースライン機能です。

<entry-ad />

## 使い方

`v-item-group`の主要な使用法は、**model**によって制御されるべきもののグループを作成することです。

<example file="v-item-group/usage" />

## API

- [v-items](/api/v-item)
- [v-item-group](/api/v-item-group)

<inline-api page="components/item-groups" />


<!-- ## Sub-components

### v-item

v-item description -->

## サンプル

### Props

#### Active class

**active-class** propでは、アクティブなアイテムにカスタムCSSクラスを設定できます。

<example file="v-item-group/prop-active-class" />

#### Mandatory（必須）

**mandatory** アイテムグループでは少なくとも1アイテムを選択する必要があります。

<example file="v-item-group/prop-mandatory" />

#### Multiple

アイテムグループは**複数（multiple）**のアイテムを選択できます。

<example file="v-item-group/prop-multiple" />

### その他

#### Chips

カスタムチップグループを簡単にフックアップできます。

<example file="v-item-group/misc-chips" />

#### 選択

アイテムをお気に入りとしてマークするなど、単一の選択肢の選択、または選択解除を可能にする場合に、アイコンをトグルボタンとして使用することができます。

<example file="v-item-group/misc-selection" />

<backmatter />
