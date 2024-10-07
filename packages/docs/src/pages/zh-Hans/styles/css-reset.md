---
meta:
  title: CSS 重置
  description: Vuetify 使用了 ress.min，这是一个完全基于normalize.css的浏览器重置。
  keywords: ress.min, css 重置, vuetify css 重置
related:
  - /styles/colors/
  - /styles/text-and-typography/
  - /features/sass-variables/
---

# CSS 重置

Vuetify 项目的基础风格。

<entry-ad />

## 引导

ress是一个现代的 CSS 重置，它为样式表提供了一个坚实的基础。 它构建于 [normalize.css](https://github.com/necolas/normalize.css) 之上并添加了新功能如为 `<code>` 元素设置 `font-family: monospace` , 移除元素悬停时的所有 `outlines` , 还有更多. 在 [resse GitHub 仓库](https://github.com/filipelinhares/ress) 上可以找到更多信息。

<alert type="warning">

  Vuetify 样式重置已全局应用，并影响默认元素，如`buton`和`input`。 这也包括位于 [v-app](/components/application) 组件之外的任何元素。

</alert>

这些样式将在 **src/styles/generic/_reset.scss** 中自动导入并作为 **通用** 样式在 **src/styes/generic/_index.scss** 中引导启动：

```scss
// styles/generic/_index.scss

// 纯HTML元素的通用样式 (如 H1, A, 等等.).
// 这些都带有浏览器的默认样式，所以我们可以在此重新定义它们。
@import './reset.scss';

@import './animations.scss';

@import './colors.scss';

@import './elevation.scss';

@import './transitions.scss';
```

## 重置特性

下面是ress在默认 **normalize.css** 功能的情况下附加提供的 *功能* 列表

- 应用 `box-sizing: border-box` 到所有元素.
- 重置所有元素的 `padding` 和 `margin` .
- 在所有元素和为元素中指定  `background-repeat: no-repeat` .
- 继承 `text-decoration` 和 `vertical-align` 到 `::before` 和 `::after`.
- 在所有的浏览器中移除悬停时的 `outline` .
- 指定code元素的字体为 `font-family: monospace` .
- 重置input元素的 `border-radius` .
- 指定表单元素的字体继承。
- 移除所有浏览器中的默认按钮样式。
- 指定文本区域的大小调整为垂直。
- 应用 `cursor: pointer` 到按钮元素.
- 在 `html` 中应用  `tab-size: 4` .
- 像标准input一样的  `select`  样式.
- 由aria属性设置 `cursor` 样式.
- 隐藏屏幕上的内容，但不隐藏屏幕阅读器。

所有应用样式的完整清单, 参见 [ress css 样式表](https://github.com/filipelinhares/ress/blob/master/ress.css).

<backmatter />
