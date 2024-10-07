---
meta:
  title: リストアイテムグループ・コンポーネント
  description: リスト アイテム グループ コンポーネントは、リスト アイテムを使用して一連のコンテンツを表示するためのインターフェイスを提供します。
  keywords: list-groups, vuetify list item group component, vue list item group component
related:
  - /components/lists/
  - /components/item-groups/
  - /components/cards/
---

# List item groups

`v-list-item-group` は選択可能な `v-list-item`のグループを作成する機能を提供します。 `v-list-item-group` コンポーネントは、 [v-item-group](/components/item-groups) をコアとして使用し、対話型リストにクリーンなインターフェイスを提供します。

<entry-ad />

## 使い方

デフォルトでは、 `v-list-item-group` は `v-item-group` と同様に動作します。 **value** が指定されていない場合、グループはインデックスに基づいてデフォルトを指定します。

<example file="v-list-item-group/usage" />

## API

- [v-list-group](/api/v-list-group)
- [v-list-item](/api/v-list-item)
- [v-list-item-action](/api/v-list-item-action)
- [v-list-item-action-text](/api/v-list-item-action-text)
- [v-list-item-avatar](/api/v-list-item-avatar)
- [v-list-item-content](/api/v-list-item-content)
- [v-list-item-group](/api/v-list-item-group)
- [v-list-item-subtitle](/api/v-list-item-subtitle)
- [v-list-item-title](/api/v-list-item-title)

<inline-api page="components/list-item-groups" />

## サンプル

### Props

#### Active class

項目が選択されたときに追加されるクラスを設定できます。

<example file="v-list-item-group/prop-active-class" />

#### Mandatory（必須）

少なくとも 1 つのアイテムを選択する必要があります。

<example file="v-list-item-group/prop-mandatory" />

#### Multiple

複数の項目を一度に選択できます。

<example file="v-list-item-group/prop-multiple" />

### その他

#### Flat list

選択した`v-list-item`の項目のデフォルトのハイライトを簡単に消すことができます。 これにより、ユーザーの選択をより目立たない状態にすることができます。

<example file="v-list-item-group/misc-flat-list" />

#### Selection controls

デフォルトのスロットを使うと、アイテムの内部状態にアクセスしてその状態を切り替えることができます。 **active** propは_boolean_なので、チェックボックスの**true-value** propを使って、その状態を`v-list-item`にリンクさせます。

<example file="v-list-item-group/misc-selection-controls" />

<backmatter />
