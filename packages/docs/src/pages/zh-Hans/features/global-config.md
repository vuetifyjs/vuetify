---
meta:
  title: 全局配置
  description: Vuetify.config文件是一个包含修改项目引导的全局配置选项的对象。
  keywords: vuetify配置, 全局配置, 全局vuetify配置, 配置vuetify选项
related:
  - /features/accessibility/
  - /features/treeshaking/
  - /features/presets/
---

# 全局配置

`Vuetify.config`是一个包含修改全局引导配置的对象。

<entry-ad />

## silent

此选项将停止 *所有的* Vuetify 日志和警告。

- **类型:** `boolean`
- **默认值:** `false`

```js
// src/plugins/vuetify.js

import Vuetify from 'vuetify/lib'

Vuetify.config.silent = true
```

<backmatter />
