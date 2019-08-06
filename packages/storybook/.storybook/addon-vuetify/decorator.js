import Vue from 'vue';
import Vuetify from 'vuetify';
import { makeDecorator } from '@storybook/addons';
import deepmerge from 'deepmerge'
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.min.css';

Vue.use(Vuetify);

export default makeDecorator({
  name: 'withVuetify',
  parameterName: 'vuetify',
  wrapper: (storyFn, context, { parameters = {} }) => {
    const rtl = new URL(window.location).searchParams.get('eyes-variation') === 'rtl';
    const dark = new URL(window.location).searchParams.get('eyes-variation') === 'dark';
    const vuetify = new Vuetify(deepmerge({
      rtl,
      theme: {
        dark
      }
    }, parameters));
    const WrappedComponent = storyFn(context);

    return Vue.extend({
      vuetify,
      components: { WrappedComponent },
      template: `<v-app><wrapped-component/></v-app>`
    });
  }
});
