import Vue from 'vue'
import goTo from '@/components/Vuetify/util/goTo'
import VBtn from '@/components/VBtn'
import { test } from '@/test'

test('goTo.js', ({ mount }) => {
  it('should throw error when target is undefined or null', async () => {
    await expect(goTo(undefined))
      .rejects
      .toEqual(new TypeError('Target must be a Selector/Number/DOMElement/VueComponent, received undefined instead.'))

    await expect(goTo(null))
      .rejects
      .toEqual(new TypeError('Target must be a Selector/Number/DOMElement/VueComponent, received null instead.'))
  })

  it('should throw error when target element is not found', async () => {
    await expect(goTo('#foo'))
      .rejects
      .toEqual(new TypeError('Target element "#foo" not found.'))
  })

  it('should throw error if easing does not exist', async () => {
    await expect(goTo(0, { easing: 'thisEasingDoesNotExist' }))
      .rejects
      .toEqual(new TypeError('Easing function \'thisEasingDoesNotExist\' not found.'))
  })

  it('should not throw error when using VueComponent as target', async () => {
    const wrapper = mount(VBtn)

    await expect(goTo(wrapper.vm, { duration: 0 })).resolves.not.toBe(undefined)
  })
})
