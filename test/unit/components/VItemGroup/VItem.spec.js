import Vue from 'vue'
import { test } from '@/test'
import VItem from '@/components/VItemGroup/VItem'

const registrableWarning = '[Vuetify] The v-item component must be used inside a v-item-group'

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
    expect(registrableWarning).toHaveBeenTipped()
  })
})
