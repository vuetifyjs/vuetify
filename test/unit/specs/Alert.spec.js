import { mount } from 'avoriaz'
import { createRenderer } from 'vue-server-renderer'
import Vue from 'vue/dist/vue.common'
import Vuetify from 'src/index'
import Alert from 'src/components/alerts/Alert'

Vue.use(Vuetify)

describe('Alert.vue', () => {

  it('should have an alert class', () => {
    const wrapper = mount(Alert)

    expect(wrapper.hasClass('alert')).toBe(true)
  })

  it('should render correct contents', () => {
    const wrapper = mount(Alert)
    const renderer = createRenderer()

    renderer.renderToString(wrapper.vm, (err, str) => {
      expect(str).toMatchSnapshot()
    })
  })

})
