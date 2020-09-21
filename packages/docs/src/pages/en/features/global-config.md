---
meta:
  title: Global Configuration
  description: Vuetify.config is an object containing global configuration options that modify the bootstrapping of your project.
  keywords: vuetify config, global config, global vuetify config, configure vuetify options
related:
  - /getting-started/accessibility/
  - /features/treeshaking/
  - /features/presets/
---

# Global Configuration

Vuetify.config is an object containing global configuration options that modify bootstrapping options.

<entry-ad />

## silent

This option suppresses *all* Vuetify logs and warnings.

* **Type:** `boolean`
* **Default:** `false`

```js
// src/plugins/vuetify.js

import Vuetify from 'vuetify/lib'

Vuetify.config.silent = true
```

<backmatter />
