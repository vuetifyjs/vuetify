---
meta:
  title: Bidirectionnalité (LTR/RTL)
  description: Vuetify est configurable et compatible avec les langues RTL.
  keywords: rtl, droite à gauche, bidirectionalité
related:
  - /features/accessibility/
  - /features/internationalization/
  - '/styles/text-and-typography/#rtl-alignment'
---

# Bidirectionnalité (LTR/RTL)

Vuetify supports RTL **(right to left)** languages and can be activated by using the **rtl** option when bootstrapping your application. You can find additional information about [implementing bidirectionality](https://material.io/design/usability/bidirectionality.html) on the specification site.

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

You can also change this dynamically at any point by modifying the **rtl** value on the vuetify object.

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
