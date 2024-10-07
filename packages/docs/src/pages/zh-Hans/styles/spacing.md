---
meta:
  title: CSS 间距辅助
  description: 间距辅助类允许你以 1 到 5 的增量对任何元素应用 margin 或 padding。
  keywords: 间距辅助类，间距类，vuetify 间距
related:
  - /styles/elevation/
  - /styles/content/
  - /components/grids/
---

# 间距

不通过创建新类的方式来更新您的布局. 间距辅助类在修改元素的 padding 和 margin 时非常有用.<inline-ad slug="scrimba-spacing" />

<entry-ad />

使用 playground 来了解不同的辅助类能做些什么. 要了解 **他们如何工作**，请参阅下面的部分。

<example file="spacing/usage" />

## 如何运行

辅助类应用到元素的 **margin** 或 **padding** 范围是从 _0 到 16_. 每个尺寸增量都与Material Design边距规范一致. 这些类可以通过 `{property}{direction}-{size}` 格式使用。

**property** 应用间距类型:

- `m` - 应用 `margin`
- `p` - 应用 `padding`

**direction** 指定了该属性所应用的侧边:

- `t` - 应用 `margin-top` 和 `padding-top` 的间距
- `b` - 应用 `margin-bottom` 和 `padding-bottom` 的间距
- `l` - 应用 `margin-left` 和 `padding-left` 的间距
- `r` - 应用 `margin-right` 和 `padding-right` 的间距
- `s` - 应用 `margin-left`/`padding-left` _(LTR模式)_ 和 `margin-right`/`padding-right`_(RTL模式)_ 的间距
- `e` - 应用 `margin-right`/`padding-right` _(LTR模式)_ 和 `margin-left`/`padding-left`_(RTL模式)_ 的间距
- `x` - 应用 `*-left` 和 `*-right` 的间距
- `y` - 应用 `*-top` 和 `*-bottom` 的间距
- `a` - 在所有方向应用该间距

**size** 以4px增量控制间距属性:

- `0` - 通过设置为 `0` 来消除所有 `margin` 或 `padding`.
- `1` - 设置 `margin` 或 `padding` 为 4px
- `2` - 设置 `margin` 或 `padding` 为 8px
- `3` - 设置 `margin` 或 `padding` 为 12px
- `4` - 设置 `margin` 或 `padding` 为 16px
- `5` - 设置 `margin` 或 `padding` 为 20px
- `6` - 设置 `margin` 或 `padding` 为 24px
- `7` - 设置 `margin` 或 `padding` 为 28px
- `8` - 设置 `margin` 或 `padding` 为 32px
- `9` - 设置 `margin` 或 `padding` 为 36px
- `10` - 设置 `margin` 或 `padding` 为 40px
- `11` - 设置 `margin` 或 `padding` 为 44px
- `12` - 设置 `margin` 或 `padding` 为 48px
- `13` - 设置 `margin` 或 `padding` 为 52px
- `14` - 设置 `margin` 或 `padding` 为 56px
- `15` - 设置 `margin` 或 `padding` 为 60px
- `16` - 设置 `margin` 或 `padding` 为 64px
- `n1` - 设置 `margin` 为 -4px
- `n2` - 设置 `margin` 为 -8px
- `n3` - 设置 `margin` 为 -12px
- `n4` - 设置 `margin` 为 -16px
- `n5` - 设置 `margin` 为 -20px
- `n6` - 设置 `margin` 为 -24px
- `n7` - 设置 `margin` 为 -28px
- `n8` - 设置 `margin` 为 -32px
- `n9` - 设置 `margin` 为 -36px
- `n10` - 设置 `margin` 为 -40px
- `n11` - 设置 `margin` 为 -44px
- `n12` - 设置 `margin` 为 -48px
- `n13` - 设置 `margin` 为 -52px
- `n14` - 设置 `margin` 为 -56px
- `n15` - 设置 `margin` 为 -60px
- `n16` - 设置 `margin` 为 -64px
- `auto` - 设置间距为 **auto**

## 示例

### 断点

Vuetify 使用Flexbox通过12点网格系统建构. 间距用来创建应用程序内容的特定布局. 它包含5个媒体断点查询来确定特定屏幕的大小或方向: **xs**, **sm**, **md**, **lg** 和 **xl**. 下面的 *视图断点* 表中定义了默认解析，可以通过自定义 [断点服务配置](/features/breakpoints) 进行修改。

<breakpoints-table />

助手类在给定的断点应用 **margin** 或 **padding**。 这些类可以通过 `{property}{direction}-{breakpoint}-{size}` 格式使用。 这不适用于 **xs** ,因为它是推断出来的; 例如: `ma-xs-2` 等于 `ma-2`.

<example file="spacing/breakpoints" />

### 水平布局

使用边距助手类，你可以轻松地水平居中内容。

<example file="spacing/horizontal" />

### 负边距

同样也可以使用从 **1 到 16** 间隔的负边距.

<example file="spacing/negative-margin" />

<backmatter />
