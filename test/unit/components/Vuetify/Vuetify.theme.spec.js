import { test } from '@/test'
import themeMixin from '@/components/Vuetify/mixins/theme'

test('theme.ts', ({ mount }) => {
  it('should watch theme', async () => {
    const wrapper = mount({
      mixins: [themeMixin()],
      render: h => h('div')
    })

    expect(wrapper.vm.style).toMatchSnapshot()
    wrapper.vm.$vuetify.theme.primary = '#000'
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.style).toMatchSnapshot()
  })

  it('should set a CSP nonce', async () => {
    // Delete the old stylesheet first
    let el = document.getElementById('vuetify-theme-stylesheet')
    el.parentNode.removeChild(el)

    Vue.prototype.$vuetify.options.cspNonce = 'asdfghjkl'
    const app = mount(VApp, { attachToDocument: true })

    el = document.getElementById('vuetify-theme-stylesheet')
    expect(el).toBeTruthy()
    expect(el.getAttribute('nonce')).toBe('asdfghjkl')
  })
})
