---
meta:
  title: 滚动指令
  description: 滚动指令使你能够在屏幕或元素滚动时有条件地调用方法。
  keywords: 滚动，vuetify 滚动指令，vue 滚动指令，窗口滚动指令。
related:
  - /styles/scroll/
  - /directives/touch-support/
---

# 滚动指令

`v-scroll` 指令允许您在窗口、指定目标或元素本身( 使用`.self` 修饰符)滚动时提供回调。

<entry-ad />

## 使用

默认行为是绑定到窗口。 如果不需要额外的配置选项，您可以简单地传递回调函数。

<example file="v-scroll/usage" />

## API

- [v-scroll](/api/v-scroll)

<inline-api page="directives/scroll" />

## 示例

### 选项

#### Self

`v-scroll` 的默认目标为 `window` , 但是您可以观察它绑定的元素。 在下面的示例中，我们显示使用 **.self**  修饰符 `v-scroll.self` 观看 [`v-card`](/components/cards) 元素。 这会导致方法`onScroll`在您滚动卡片内容时调用；使计数器递增。

<example file="v-scroll/option-self" />

#### Target

为了更好地调整方法，您可以给指定目标绑定滚动事件监听器。

<example file="v-scroll/option-target" />

<backmatter />
