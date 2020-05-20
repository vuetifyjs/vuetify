/**
 * plugins/app.js
 *
 * Automatically loads and bootstraps files
 * in the `./src/components/app` folder.
 */

// Imports
import Vue from 'vue'

// Get all .vue files within `src/components/app`
const requireComponent = require.context('@/components', true, /\.vue$/)

for (const file of requireComponent.keys()) {
  const componentConfig = requireComponent(file)

  console.log(componentConfig.default.name)

  Vue.component(
    componentConfig.default.name,
    componentConfig.default || componentConfig,
  )
}
