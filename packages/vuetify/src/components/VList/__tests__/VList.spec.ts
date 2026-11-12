// Components
import { VList } from '..'

// Utilities
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { createVuetify } from '@/framework'

describe('VList', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount<any>(VList, {
      global: { plugins: [vuetify] },
      ...options,
    })
  }

  afterEach(() => {
    vi.useRealTimers()
  })

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

  it('should not update nested maps after unmount', async () => {
    vi.useFakeTimers()

    const wrapper = mountFunction({
      props: {
        selectable: true,
        items: [{ title: 'One', value: 'one' }, { title: 'Two', value: 'two' }],
      },
    })
    await nextTick()

    const vm = wrapper.vm as any
    wrapper.unmount()
    await nextTick()

    const { children, parents } = vm
    vi.advanceTimersByTime(150)
    await nextTick()

    expect(vm.children).toBe(children)
    expect(vm.parents).toBe(parents)
  })
})
