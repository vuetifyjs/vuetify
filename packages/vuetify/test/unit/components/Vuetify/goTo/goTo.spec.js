import VCard from '@/components/VCard/VCard'
import VBtn from '@/components/VBtn'
import { test } from '@/test'

test('$vuetify.goTo', ({ mount }) => {
  const wrapper = mount(VCard)

  it('should throw error when target is undefined or null', async () => {
    await expect(wrapper.vm.$vuetify.goTo(undefined))
      .rejects
      .toEqual(new TypeError('Target must be a Number/Selector/HTMLElement/VueComponent, received undefined instead.'))

    await expect(wrapper.vm.$vuetify.goTo(null))
      .rejects
      .toEqual(new TypeError('Target must be a Number/Selector/HTMLElement/VueComponent, received null instead.'))
  })

  it('should throw error when target element is not found', async () => {
    await expect(wrapper.vm.$vuetify.goTo('#foo'))
      .rejects
      .toEqual(new TypeError('Target element "#foo" not found.'))
  })

  it('should throw error when container element is not found', async () => {
    await expect(wrapper.vm.$vuetify.goTo(0, { container: '#thisContainerDoesNotExist' }))
      .rejects
      .toEqual(new TypeError('Target element "#thisContainerDoesNotExist" not found.'))
  })

  it('should throw error when container is undefined or null', async () => {
    await expect(wrapper.vm.$vuetify.goTo(0, { container: undefined }))
      .rejects
      .toEqual(new TypeError('Container must be a Selector/HTMLElement/VueComponent, received undefined instead.'))

    await expect(wrapper.vm.$vuetify.goTo(0, { container: null }))
      .rejects
      .toEqual(new TypeError('Container must be a Selector/HTMLElement/VueComponent, received null instead.'))
  })

  it('should throw error if easing does not exist', async () => {
    await expect(wrapper.vm.$vuetify.goTo(0, { easing: 'thisEasingDoesNotExist' }))
      .rejects
      .toEqual(new TypeError('Easing function "thisEasingDoesNotExist" not found.'))
  })

  it('should not throw error when using VueComponent as target', async () => {
    const btn = mount(VBtn)

    await expect(wrapper.vm.$vuetify.goTo(btn.vm, { duration: 0 })).resolves.not.toBe(undefined)
  })
})
