---
meta:
  title: 突变观察者指令
  description: 突变观察者指令使用Mutation observer API. 它允许您确定什么时候更新元素。
  keywords: 突变, vuetify 突变指令, 突变观察者指令
related:
  - /components/sheets/
  - /components/images/
---

# 突变观察者

`v-mutate `指令使用 [Mutation Observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)。 它提供了一个易于使用的接口，用于检测元素的更新。

<entry-ad />

## 使用

默认情况下， `v-mutate` 指令将启用 [Mutation Observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) 中所有可用的选项。 这可以通过两种方式之一加以修改。 您可以使用键名为 <strong x-id=“1”>handler</strong> 和 <strong x-id=“1”>options</strong> 的对象，也可以使用指令的 `modifier` 修饰符属性, `v-mutate.attr.sub=“onMutate”`

<example file="v-mutate/usage" />

## API

- [v-mutate](/api/v-mutate)

<inline-api page="directives/mutate" />

## 示例

### 选项

#### 修饰符

`v-mutate` 指令的修饰符可接受的所有可用选项可在 [Mutation Observer API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) 中找到。 为简洁起见，使用缩略语 —**attr** (属性), **child** (子列表), **sub** (子树) 和 **char** (字符数据).

<example file="v-mutate/option-modifiers" />

<backmatter />
