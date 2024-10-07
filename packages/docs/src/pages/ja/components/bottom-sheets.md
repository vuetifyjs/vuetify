---
meta:
  title: ボトムシート・コンポーネント
  description: ボトムシートコンポーネントは、ダイアログスタイルの方法で他の要素より上にコンテンツを乗せるために使用されます。
  keywords: bottom sheets, vuetify bottom sheet component, vue bottom sheet component
related:
  - /components/dialog/
  - /components/lists/
  - /components/menus/
---

# Bottom sheets

ボトムシートは、`v-bottom-navigation` に似た、画面の下からスライドするように改良された`v-dialog` です。 ボトム ナビゲーション コンポーネントがボタンや特定のアプリケーション レベルのアクションのためのものであるのに対し、ボトム シートには何でも含めることができます。

<entry-ad />

## 使い方

アプリケーションでよく使われるアクションの例を下に示します。

<usage name="v-bottom-sheet" />

## API

- [v-bottom-sheet](/api/v-bottom-sheet)

<inline-api page="components/bottom-sheets" />

## サンプル

### Props

#### Inset

ボトムシートはInset（差し込み）でき、デスクトップでの最大幅を70%に減らすことができます。 **width** プロパティを使用することで手動でさらに削減できます。

<example file="v-bottom-sheet/prop-inset" />

#### Model

ボトムシートは、**v-model** を使って制御できます。 ボトムシートを閉じることもできますし、それができない場合には `activator` スロットを使うこともできます。

<example file="v-bottom-sheet/prop-model" />

#### Persistent （永続的表示）

永続的な（Persistent）ボトムシートは、外側をクリックしても閉じることはできません。

<example file="v-bottom-sheet/prop-persistent" />

### その他

#### 音楽プレーヤー

Insetボトムシートを使用すると、シンプルな音楽プレーヤーなどの実用的なコンポーネントを作ることができます。

<example file="v-bottom-sheet/misc-player" />

#### リストで開く

機能をもつリストをボトムシートに結合することで、単純な`open in`コンポーネントを作成できます。

<example file="v-bottom-sheet/misc-open-in-list" />

<backmatter />
