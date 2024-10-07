---
meta:
  title: グローバル設定
  description: Vuetify.config は、プロジェクトのブートストラップを変更するグローバル設定オプションを含むオブジェクトです。
  keywords: vuetify config, global config, global vuetify config, configure vuetify options
related:
  - /features/accessibility/
  - /features/treeshaking/
  - /features/presets/
---

# グローバル設定

`Vuetify.config` は、ブートストラップオプションを変更するためのグローバル設定オプションを含むオブジェクトです。

<entry-ad />

## silent

このオプションは、 *すべての* Vuetify のログと警告を抑制します。

- **Type:** `boolean`
- **Default:** `false`

```js
// src/plugins/vuetify.js

import Vuetify from 'vuetify/lib'

Vuetify.config.silent = true
```

<backmatter />
