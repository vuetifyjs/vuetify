---
meta:
  title: 双向性(LTR/RTL)
  description: Vuetify 是可配置的，并与 RTL 语言兼容。
  keywords: rtl, 右至左, 双向性
related:
  - /features/accessibility/
  - /features/internationalization/
  - '/styles/text-and-typography/#rtl-alignment'
---

# 双向性(LTR/RTL)

Vuetify 支持 RTL **(从右至左)** 语言，可以通过使用 **rtl** 选项在程序启动时激活。 您可以在规范站点找到关于 [实现双向性](https://material.io/design/usability/bidirectionality.html) 的额外信息。

<entry-ad />

```js
// src/plugins/vuetify.js

import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  rtl: true,
})
```

<app-img src="https://cdn.vuetifyjs.com/images/accessibility/rtl.png" alt="rtl" width="320" />

您也可以在任何时候通过修改 vuetify 对象上的 **rtl** 值来动态地更改它。

```html
<!-- App.vue -->

<template>
  <v-app>
    ...
  </v-app>
</template>

<script>
  export default {
    methods: {
      changeRTL () {
        this.$vuetify.rtl = true
      },
    },
  }
</script>
```

<backmatter />
