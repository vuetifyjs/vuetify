import Vue from 'vue'
import ThemeService from '@/components/Vuetify/services/ThemeService'
import { test } from '@/test'

test('Vuetify.theme', ({ mount }) => {
  it('should watch theme', async () => {
    const vm = new ThemeService()

    expect(vm.style).toMatchSnapshot()
    vm.$vuetify.theme.primary = '#000'
    await vm.$nextTick()
    expect(vm.style).toMatchSnapshot()
  })

  it('should set a CSP nonce', async () => {
    // Delete the old stylesheet first
    let el = document.getElementById('vuetify-theme-stylesheet')
    el.parentNode.removeChild(el)

    Vue.prototype.$vuetify.options.cspNonce = 'asdfghjkl'
    const vm = new ThemeService()

    el = document.getElementById('vuetify-theme-stylesheet')
    expect(el).toBeTruthy()
    expect(el.getAttribute('nonce')).toBe('asdfghjkl')
  })
})
