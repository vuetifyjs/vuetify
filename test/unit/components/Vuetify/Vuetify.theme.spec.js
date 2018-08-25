import Vue from 'vue'
import { ServiceInstance } from '@/components/Vuetify/services/ThemeService'
import { test } from '@/test'

test('Vuetify.theme', ({ mount }) => {
  it('should watch theme', async () => {
    const vm = new ServiceInstance()

    expect(vm.style).toMatchSnapshot()
    vm.$vuetify.theme.primary = '#000'
    await vm.$nextTick()
    expect(vm.style).toMatchSnapshot()
  })

  it('should generate theme using css variables', async () => {
    const vm = new ServiceInstance()

    vm.$vuetify.options.customProperties = true
    await vm.$nextTick()
    expect(vm.style).toMatchSnapshot()
  })

  it('should set a CSP nonce', async () => {
    // Delete the old stylesheet first
    let el = document.getElementById('vuetify-theme-stylesheet')
    el.parentNode.removeChild(el)

    Vue.prototype.$vuetify.options.cspNonce = 'asdfghjkl'
    const vm = new ServiceInstance()

    el = document.getElementById('vuetify-theme-stylesheet')
    expect(el).toBeTruthy()
    expect(el.getAttribute('nonce')).toBe('asdfghjkl')
  })
})
