import Vue from 'vue'
import Vuetify from '@/'

describe('full import', () => {
  Vue.use(Vuetify)
  const registeredComponents = Object.keys(Vue.options.components).sort()
  it('should register all subcomponents', () => {
    expect(registeredComponents).toMatchSnapshot()
  })

  it('should register all names in PascalCase', () => {
    registeredComponents.forEach(name =>
      expect(name).toMatch(/^(?:[A-Z][a-z]*)+$/)
    )
  })
})
