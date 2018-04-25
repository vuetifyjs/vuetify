import { test } from '@/test'
import Snackbar from '@/components/Vuetify/util/snackbar'

test('snackbar.js', ({ mount }) => {
  it('should functionally work', async () => {
    const wrapper = mount({
      data: () => ({}),
      render: h => h('div', {
        attrs: {
          'data-app': true,
        },
        staticClass: 'application',
      }, h('div'))
    }, {
      attachToDocument: true,
    })
    wrapper.vm.$snackbar = Snackbar
    wrapper.vm.$snackbar.error({
      message: 'test-message',
      timeout: 1000
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.contains('.v-snack')).toEqual(true)
    expect(wrapper.contains('.error')).toEqual(true)
  });
})