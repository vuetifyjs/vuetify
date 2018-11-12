import Vue from 'vue'
import { test } from '@/test'
import VItem from '@/components/VItemGroup/VItem'

const itemWarning = '[Vuetify] The v-item component must be used inside a v-item-group'

test('VItem', ({ mount }) => {
  it('should warn if missing default scopedSlot', () => {
    mount(VItem)

    expect('v-item is missing a default scopedSlot').toHaveBeenTipped()
    expect(itemWarning).toHaveBeenTipped()
  })

  it('should warn if multiple elements', () => {
    const Mock = {
      name: 'test',

      render: h => h(VItem, {
        scopedSlots: {
          default: () => '<div>foo</div>'
        }
      })
    }

    mount(Mock)

    expect('v-item should only contain a single element').toHaveBeenTipped()
    expect(itemWarning).toHaveBeenTipped()
  })

  it('should match snapshot activeClass', async () => {
    const Mock = {
      name: 'test',

      render: h => h(VItem, {
        props: { activeClass: 'foo' },
        scopedSlots: {
          default: () => h('div')
        }
      })
    }

    const wrapper = mount(Mock)

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.vm.$children[0].isActive = true

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(itemWarning).toHaveBeenTipped()
  })
})
