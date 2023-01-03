---
meta:
  title: Global configuration
  description: Vuetify.config is an object containing global configuration options that modify the bootstrapping of your project.
  keywords: vuetify config, global config, global vuetify config, configure vuetify options
related:
  - /features/accessibility/
  - /features/treeshaking/
  - /features/presets/
---

# Global configuration

Vuetify allows you to set default prop values globally or per component when setting up your application. Using this functionality you can for example disable **ripple** on all components, or set the default **elevation** for all sheets or buttons.

<entry />

## Setup

Use the **defaults** property of the Vuetify configuration object to set default prop values. Here we have disabled **ripple** for all components that support it, and set the default **elevation** to `4` for all `<v-sheet>` components.

```js { resource="src/plugins/vuetify.js" }
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

export default createVuetify({
  defaults: {
    global: {
      ripple: false,
    },
    VSheet: {
      elevation: 4,
    },
  },
})
```

## Priority

When creating and mounting a component, Vuetify uses the following priority in determining which prop value to use:

1. Value set as prop value to the component itself
2. Value defined in component specific section of defaults configuration object
3. Value defined in global section of defaults configuration object
4. Value defined in the prop definition of the Vueitfy component itself.
