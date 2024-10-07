---
meta:
  title: 程序滚动
  description: 可以使用vuetify对象中包含的goTo方法处理应用程序中的程序滚动。
  keywords: 程序滚动, vuetify goto, goto
related:
  - /directives/scroll/
  - /styles/content/
  - /components/app-bars/
---

# 程序滚动

通过使用`$vuetify`对象上的<strong x-id=“1”>goTo</strong>方法，可以在应用程序中以编程方式触发滚动。 此方法支持几种不同类型的目标选择器，以及使用内置的缓动函数选项。

<entry-ad />

## 使用

**goTo** 方法需要 **target** 和 **options**两个参数。 **target** 可以是从页面顶部的像素偏移，也可以是有效的 css 选择器，或者是元素引用。 **options** 是一个包含 **duration**、 **easing**、 **container** 和 **offset** 的对象。

<example file="scroll/usage" />

## API

- [$vuetify](/api/vuetify)

<inline-api page="features/scrolling" />

## 和路由一起使用

**goTo** 函数可以单独导入并在任何地方调用。 这在绑定到 [vue-router](https://router.vuejs.org/) 时特别有用。

```js
// src/router.js

import Router from 'vue-router'
import goTo from 'vuetify/lib/services/goto'

export default new Router({
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0

    if (to.hash) {
      scrollTo = to.hash
    } else if (savedPosition) {
      scrollTo = savedPosition.y
    }

    return goTo(scrollTo)
  },
  routes: [
    //
  ],
})
```

<backmatter />
