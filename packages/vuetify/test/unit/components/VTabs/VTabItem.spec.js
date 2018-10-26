import { test } from '@/test'
import VTabItem from '@/components/VTabs/VTabItem'

const contentWarning = '[Vuetify] The v-window-item component must be used inside a v-window'

test('VTabItem', ({ mount }) => {
  it('should not wrap component in transition if false is used', () => {
    const wrapper = mount(VTabItem, {
      propsData: {
        transition: false,
        reverseTransition: false
      }
    })

    expect(contentWarning).toHaveBeenTipped()
  })
})
