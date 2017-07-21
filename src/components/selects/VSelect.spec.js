import { test } from '~util/testing'
import VSelect from '~components/selects/VSelect'

test('VSelect.js', ({ mount }) => {
  it('should return numeric 0', () => {
    const item = { value: 0, text: '0' }
    const wrapper = mount(VSelect, {
      propsData: {
        value: null,
        items: [item],
        multiple: true
      }
    })

    const change = jest.fn()
    wrapper.instance().$on('change', change)
    wrapper.instance().selectItem(item)

    expect(change).toBeCalledWith([0])
  })

  it('should be in an error state', async () => {
    const wrapper = mount(VSelect, {
      propsData: {
        value: null,
        items: [0, 1, 2],
        required: true
      }
    })

    wrapper.instance().focus()
    wrapper.instance().blur()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.hasError).toBe(true)
  })
})
