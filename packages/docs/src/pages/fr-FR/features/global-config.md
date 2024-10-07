---
meta:
  title: Configuration globale
  description: Vuetify.config is an object containing global configuration options that modify the bootstrapping of your project.
  keywords: vuetify config, global config, global vuetify config, configure vuetify options
related:
  - /features/accessibility/
  - /features/treeshaking/
  - /features/presets/
---

# Configuration globale

`Vuetify.config` is an object containing global configuration options for modifying bootstrapping options.

<entry-ad />

## silent

This option suppresses *all* Vuetify logs and warnings.

- **Type:** `boolean`
- **Default:** `false`

```js
// src/plugins/vuetify.js

import Vuetify from 'vuetify/lib'

Vuetify.config.silent = true
```

<backmatter />
