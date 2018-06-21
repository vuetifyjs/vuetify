import Vue from 'vue'
import Vuetify from '@/'
import { mount } from 'avoriaz'
import { test } from './describe'
import { kebabSink, pascalSink } from './fixtures/fixtures'

test('full import', () => {
  Vue.use(Vuetify)
  it('should render kebab sink', async () => {
    const { render } = await kebabSink
    const app = Vue.extend({ render })
    mount(app)
  })
  it('should render pascal sink', async () => {
    const { render } = await pascalSink
    const app = Vue.extend({ render })
    mount(app)
  })
})
