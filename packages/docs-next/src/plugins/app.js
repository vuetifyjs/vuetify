/**
 * plugins/app.js
 *
 * Automatically loads and bootstraps files
 * in the `./src/components/app` folder.
 */

// Imports
import Vue from 'vue'
import {
  camelCase,
  upperFirst,
} from 'lodash'

// Get all .vue files within `src/components/app`
const requireComponent = require.context('@/components/app', true, /\.vue$/)

for (const file of requireComponent.keys()) {
  const componentConfig = requireComponent(file)
  const name = file
    .replace(/index.js/, '')
    .replace(/^\.\//, '')
    .replace(/\.\w+$/, '')
  const componentName = upperFirst(camelCase(name))

  Vue.component(`App${componentName}`, componentConfig.default || componentConfig)
}
