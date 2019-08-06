import { configure, addDecorator, storiesOf } from '@storybook/vue'
import { withKnobs, text, boolean, number, object, array, select } from '@storybook/addon-knobs'
import { withA11y } from '@storybook/addon-a11y'
import { withTemplate } from '~storybook/addon-show-vue-markup'
import { withVuetify } from '~storybook/addon-vuetify'
import { registerStories } from 'vue-storybook'

addDecorator(withTemplate)
addDecorator(withKnobs)
addDecorator(withA11y)
addDecorator(withVuetify)

const reqVue = require.context('../stories', true, /\.vue$/)
const reqIndex = require.context('../stories', true, /index\.js$/)

function loadStories() {
  const keysVue = reqVue.keys()
  for (let i = 0; i < keysVue.length; i++) {
    const filename = keysVue[i]
    registerStories(reqVue, filename, storiesOf, {
      knobs: {
        text,
        boolean,
        number,
        object,
        array,
        select
      }
    })
  }

  const keysIndex = reqIndex.keys()
  for (let i = 0; i < keysIndex.length; i++) {
    const filename = keysIndex[i]
    reqIndex(filename)
  }
}

configure(loadStories, module)
