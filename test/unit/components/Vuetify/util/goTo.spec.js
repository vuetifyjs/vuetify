import Vue from 'vue'
import goTo from '@/components/Vuetify/util/goTo'
import VBtn from '@/components/VBtn'
import { test } from '@/test'

test('goTo.js', ({ mount }) => {
  it('should throw error when target is undefined or null', async () => {
    goTo(undefined)
    expect('[Vuetify] Target must be a Selector/Number/DOMElement/VueComponent, received undefined instead.').toHaveBeenWarned()

    goTo(null)
    expect('[Vuetify] Target must be a Selector/Number/DOMElement/VueComponent, received null instead.').toHaveBeenWarned()
  })

  it('should throw error if easing does not exist', async () => {
    goTo(0, { easing: 'thisEasingDoesNotExist' })
    expect('[Vuetify] Easing function \'thisEasingDoesNotExist\' not found.').toHaveBeenWarned()
  })

  it('should not throw error when using VueComponent as target', async () => {
    const wrapper = mount(VBtn)

    goTo(wrapper.vm)
  })
})
