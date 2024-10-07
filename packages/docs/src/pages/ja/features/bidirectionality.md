---
meta:
  title: 右書き言語対応 （RTL）
  description: VuetifyはRTL(右から左に記述する)言語と互換性があります。
  keywords: rtl, right-to-left, bidirectionality
related:
  - /features/accessibility/
  - /features/internationalization/
  - '/styles/text-and-typography/#rtl-alignment'
---

# 右書き言語対応 （RTL）

VuetifyはRTL **(右から左)** 言語をサポートしており、アプリケーションの起動時に **rtl** オプションを使用することで有効にできます。 [bidirectionalityの実装](https://material.io/design/usability/bidirectionality.html) についての追加情報はMD仕様サイトに記載されています。

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

また、vuetifyオブジェクトの **rtl** の値を変更することで、いつでも動的に変更することができます。

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
