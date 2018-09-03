import Vue from 'vue'
import { test } from '@/test'
import VItem from '@/components/VItemGroup/VItem'

const registrableWarning = '[Vuetify] The v-item component must be used inside a v-item-group'
const valueWarning = '[Vuetify] Implementing component is missing a value property'

const vm = new Vue()
const defaultSlot = () => vm.$createElement('div', 'foobar')

const Mock = {
  name: 'test',

  render: h => h(VItem, {
    scopedSlots: {
      default: defaultSlot
    }
  })
}

test('VItem', ({ mount }) => {
  it('should warn if missing default scopedSlot', () => {
    mount(VItem)

    expect('v-item is missing a default scopedSlot').toHaveBeenTipped()
    expect(valueWarning).toHaveBeenTipped()
    expect(registrableWarning).toHaveBeenTipped()
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
    expect(valueWarning).toHaveBeenTipped()
    expect(registrableWarning).toHaveBeenTipped()
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
    expect(registrableWarning).toHaveBeenTipped()

    wrapper.vm.$children[0].isActive = true

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()

    expect(valueWarning).toHaveBeenTipped()
  })
})
