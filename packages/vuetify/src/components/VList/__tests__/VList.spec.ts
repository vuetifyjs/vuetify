// Components
import { VList, VListItem } from '..'

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

  it('should give link items role=listitem to satisfy ARIA requirements', async () => {
    const wrapper = mount({ template: '<VList><VListItem href="/test">Link</VListItem></VList>' }, { global: { plugins: [vuetify], components: { VList, VListItem } } })
    const item = wrapper.find('.v-list-item')
    expect(item.attributes('role')).toBe('listitem')
  })
})
