---
meta:
  title: プログラムによるスクロール
  description: アプリケーション内でのプログラムによるスクロールは、vuetify オブジェクトに含まれている goTo メソッドを使用して処理できます。
  keywords: programmatic scrolling, vuetify goto, goto
related:
  - /directives/scroll/
  - /styles/content/
  - /components/app-bars/
---

# プログラムによるスクロール

`$vuetify`オブジェクトにある**goTo**メソッドを使用して、アプリケーション内でプログラムによるスクロールをトリガーできます。 このメソッドは、いくつかの異なるタイプのターゲットセレクター、および組み込みのイージング機能を使用したスムーズなスクロールを含むオプションをサポートしています。

<entry-ad />

## 使い方

**goTo** メソッドは、 **target** と **options** の 2 つのパラメータを取ります。 **target** はページの上部からのピクセルオフセット、有効な css セレクタ、または要素参照のいずれかです。 **options** は、 **duration**、 **easing**、 **container**、 **offset** を含むオブジェクトです。

<example file="scroll/usage" />

## API

- [$vuetify](/api/vuetify)

<inline-api page="features/scrolling" />

## routerでの使用

**goTo** 機能は個別にインポートでき、どこからでも呼び出すことができます。 これは [vue-routor](https://router.vuejs.org/) にフックするときに特に便利です。

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
