import Vue from 'vue'
import { test } from '@/test'
import VItem from '@/components/VItemGroup/VItem'

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

test('VItemGroup.ts', ({ mount }) => {
  it('should warn if missing default scopedSlot', () => {
    mount(VItem)

    expect('v-item is missing a default scopedSlot').toHaveBeenTipped()
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
  })
})
