import Vue from 'vue'
import VApp from '../../src/components/VApp/VApp'
import VFooter from '../../src/components/VFooter/VFooter'
import VContainer from '../../src/components/VGrid/VContainer'
import VContent from '../../src/components/VGrid/VContent'
import VNavigationDrawer from '../../src/components/VNavigationDrawer/VNavigationDrawer'
import VToolbar from '../../src/components/VToolbar/VToolbar'
import Vuetify from '../../src/components/Vuetify'
import { mount } from 'avoriaz'
import { test } from './describe'

import parse from 'posthtml-parser'
import renderxml from 'posthtml-render'

import { pascalizeTree } from './fixtures/transformTree'

import { compileToFunctions } from 'vue-template-compiler'

const kebabTemplate = `<v-app>
<v-navigation-drawer app></v-navigation-drawer>
<v-toolbar app></v-toolbar>
<v-content>
  <v-container fluid>
  </v-container>
</v-content>
<v-footer app></v-footer>
</v-app>`

test('super a-la-carte import', () => {
  Vue.use(Vuetify, {
    components: {
      VApp,
      VContainer,
      VContent,
      VFooter,
      VNavigationDrawer,
      VToolbar
    }
  })
  it('should render kebab cpmponents', () => {
    const { render } = compileToFunctions(kebabTemplate)
    const app = Vue.extend({ render })
    mount(app)
  })
  it('should render PascalCase components', () => {
    const { render } = compileToFunctions(
      renderxml(pascalizeTree(parse(kebabTemplate)))
    )
    const app = Vue.extend({ render })
    mount(app)
  })
})
