import VCard from '@/components/VCard/VCard'
import VBtn from '@/components/VBtn'
import { test } from '@/test'

test('$vuetify.goTo', ({ mount }) => {
  const wrapper = mount(VCard)

  it('should throw error when target is undefined or null', async () => {
    expect(() => wrapper.vm.$vuetify.goTo(undefined))
      .toThrow(new TypeError('Target must be a Number/Selector/HTMLElement/VueComponent, received undefined instead.'))

    expect(() => wrapper.vm.$vuetify.goTo(null))
      .toThrow(new TypeError('Target must be a Number/Selector/HTMLElement/VueComponent, received null instead.'))
  })

  it('should throw error when target element is not found', async () => {
    expect(() => wrapper.vm.$vuetify.goTo('#foo'))
      .toThrow(new Error('Target element "#foo" not found.'))
  })

  it('should throw error when container element is not found', async () => {
    expect(() => wrapper.vm.$vuetify.goTo(0, { container: '#thisContainerDoesNotExist' }))
      .toThrow(new Error('Container element "#thisContainerDoesNotExist" not found.'))
  })

  it('should throw error when container is undefined or null', async () => {
    expect(() => wrapper.vm.$vuetify.goTo(0, { container: undefined }))
      .toThrow(new TypeError('Container must be a Selector/HTMLElement/VueComponent, received undefined instead.'))

    expect(() => wrapper.vm.$vuetify.goTo(0, { container: null }))
      .toThrow(new TypeError('Container must be a Selector/HTMLElement/VueComponent, received null instead.'))

    expect(() => wrapper.vm.$vuetify.goTo(0, { container: 42 }))
      .toThrow(new TypeError('Container must be a Selector/HTMLElement/VueComponent, received Number instead.'))
    })

  it('should throw error if easing does not exist', async () => {
    expect(() => wrapper.vm.$vuetify.goTo(1, { easing: 'thisEasingDoesNotExist' }))
      .toThrow(new TypeError('Easing function "thisEasingDoesNotExist" not found.'))
  })

  it('should not throw error when using VueComponent as target', async () => {
    const btn = mount(VBtn)

    await expect(wrapper.vm.$vuetify.goTo(btn.vm, { duration: 0 })).resolves.not.toBe(undefined)
  })
})
