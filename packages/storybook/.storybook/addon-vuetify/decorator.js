// Imports
import Vue from 'vue'
import Vuetify from 'vuetify'
import { makeDecorator } from '@storybook/addons'

// Utilities
import deepmerge from 'deepmerge'

// Vuetify
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.min.css'

Vue.use(Vuetify)

export default makeDecorator({
  name: 'withVuetify',
  parameterName: 'vuetify',
  wrapper: (storyFn, context, { parameters = {} }) => {
    // Reduce to one new URL?
    const searchParams = new URL(window.location).searchParams
    const dark = searchParams.get('eyes-variation') === 'dark'
    const rtl = searchParams.get('eyes-variation') === 'rtl'
    const vuetify = new Vuetify(deepmerge({
      rtl,
      theme: { dark }
    }, parameters))
    const WrappedComponent = storyFn(context)

    const fillHeight = parameters.fillHeight === true

    return Vue.extend({
      vuetify,
      components: { WrappedComponent },
      data: () => ({
        fillHeight,
      }),
      template: `
        <v-app>
          <v-container fluid :fill-height="fillHeight">
            <wrapped-component />
          </v-container>
        </v-app>
      `
    })
  }
})
