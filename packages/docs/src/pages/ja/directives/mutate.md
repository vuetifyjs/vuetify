---
meta:
  title: Mutation observer directive
  description: mutation observer ディレクティブは、Mutation observer API を利用します。 これにより、要素がいつ更新されるかを判断できます。
  keywords: mutate, vuetify mutate directive, mutation observer directive
related:
  - /components/sheets/
  - /components/images/
---

# Mutation observer

`v-mutate` ディレクティブは [Mutation Observer API](https://developer.mozilla.org/ja/docs/Web/API/MutationObserver) を利用します。 要素が更新されるタイミングを検出するための使いやすいインターフェースを提供します。

<entry-ad />

## 使い方

デフォルトでは、 `v-mutate` ディレクティブは [Mutation Observer API](https://developer.mozilla.org/ja/docs/Web/API/MutationObserver) で利用可能なすべてのオプションを有効にします。 これは二つの方法のいずれかで変更できます。 **handler** と **options** のキーを持つオブジェクトを渡すか、ディレクティブの `modifier` プロパティ,  `v-mutate.attr.sub="onMutate"` を使うことができます。

<example file="v-mutate/usage" />

## API

- [v-mutate](/api/v-mutate)

<inline-api page="directives/mutate" />

## サンプル

### オプション

#### Modifiers

`v-mutate` ディレクティブは、 [Mutation Observer API](https://developer.mozilla.org/ja/docs/Web/API/MutationObserver) で利用可能なすべてのオプションの修飾子を受け付けます。 短縮のため、省略形が使用できます— **attr** (attributes), **child** (childList), **sub** (subtree) と **char** (characterData).

<example file="v-mutate/option-modifiers" />

<backmatter />
