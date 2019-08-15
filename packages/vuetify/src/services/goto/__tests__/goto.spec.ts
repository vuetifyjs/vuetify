// Lib
import { mount } from '@vue/test-utils'

// Components
import VBtn from '../../../components/VBtn'

// Services
import goTo, { Goto } from '../index'
import { Application } from '../../application/index'

// Types
import { VuetifyServiceContract } from 'vuetify/types/services'

describe('$vuetify.goTo', () => {
  (global as any).performance = require('perf_hooks').performance
  let framework: Record<string, VuetifyServiceContract> = {}

  beforeEach(() => {
    framework = {
      application: new Application(),
    }

    goTo.framework = framework
  })

  it('should throw error when target is undefined or null', async () => {
    expect(() => goTo(undefined))
      .toThrow(new TypeError('Target must be a Number/Selector/HTMLElement/VueComponent, received undefined instead.'))

    expect(() => goTo(null))
      .toThrow(new TypeError('Target must be a Number/Selector/HTMLElement/VueComponent, received null instead.'))
  })

  it('should throw error when target element is not found', async () => {
    expect(() => goTo('#foo'))
      .toThrow(new Error('Target element "#foo" not found.'))
  })

  it('should throw error when container element is not found', async () => {
    expect(() => goTo(0, { container: '#thisContainerDoesNotExist' }))
      .toThrow(new Error('Container element "#thisContainerDoesNotExist" not found.'))
  })

  it('should throw error when container is undefined or null', async () => {
    expect(() => goTo(0, { container: undefined }))
      .toThrow(new TypeError('Container must be a Selector/HTMLElement/VueComponent, received undefined instead.'))

    expect(() => goTo(0, { container: null }))
      .toThrow(new TypeError('Container must be a Selector/HTMLElement/VueComponent, received null instead.'))

    expect(() => goTo(0, { container: 42 as any }))
      .toThrow(new TypeError('Container must be a Selector/HTMLElement/VueComponent, received Number instead.'))
  })

  it('should throw error if easing does not exist', async () => {
    expect(() => goTo(1, { easing: 'thisEasingDoesNotExist' }))
      .toThrow(new TypeError('Easing function "thisEasingDoesNotExist" not found.'))
  })

  it('should not throw error when using VueComponent as target', async () => {
    const btn = mount(VBtn)

    await expect(goTo(btn.vm, { duration: 0 })).resolves.not.toBe(undefined)
  })

  it('should instantiate and return goto', () => {
    expect(new Goto()).toEqual(goTo)
  })
})
