// Components
import { VList } from '..'

// Utilities
import { mount } from '@vue/test-utils'
import { createVuetify } from '@/framework'

describe('VList', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount<any>(VList, {
      global: { plugins: [vuetify] },
      ...options,
    })
  }

  it('should match a snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it.each([
    { selectable: true, activatable: false, expected: 'listbox' },
    { selectable: false, activatable: true, expected: 'listbox' },
    { selectable: true, activatable: true, expected: 'listbox' },
    { selectable: false, activatable: false, expected: 'list' },
  ])('should have role="$expected" when selectable is $selectable and activatable is $activatable',
    ({ selectable, activatable, expected }) => {
      const wrapper = mountFunction({
        props: { selectable, activatable },
      })

      expect(wrapper.attributes('role')).toBe(expected)
    })
})
