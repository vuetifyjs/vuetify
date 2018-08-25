import Vue from 'vue'
import Vuetify from '@/'

describe('full import', () => {
  Vue.use(Vuetify)
  const registeredComponents = Object.keys(Vue.options.components).sort()
  const registeredDirectives = Object.keys(Vue.options.directives).sort()

  it('should register all subcomponents', () => {
    expect(registeredComponents).toMatchSnapshot()
  })

  it('should register all names in PascalCase', () => {
    registeredComponents.forEach(name =>
      expect(name).toMatch(/^(?:[A-Z][a-z]*)+$/)
    )
  })

  it('should register all directives', () => {
    expect(registeredDirectives).toMatchSnapshot()
  })
})
