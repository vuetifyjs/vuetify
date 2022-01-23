// @ts-nocheck
/* eslint-disable */

// Components
import { VTooltip } from '../VTooltip'

// Utilities
import {
  mount,
  MountOptions,
  Wrapper,
} from '@vue/test-utils'
import { createVuetify } from '@/framework'
import { describe, expect, it } from '@jest/globals'

describe('VTooltip - V3', () => {
  const vuetify = createVuetify()

  function mountFunction (options = {}) {
    return mount(VTooltip, {
      global: { 
        plugins: [vuetify],
      },
      ...options,
    })
  }
  beforeEach(() => {    
    document.documentElement.style.overflowY = 'scroll'
  })
  
  afterEach(() => {  
    // clean up
    document.body.outerHTML = '' // each test will create teleport target in packages\vuetify\src\composables\teleport.ts
    jest.clearAllMocks()
  })

  // issue #14420
  it('should render tooltip width fit into small screen if both max-width & content exceeds small screen width', async () => {
    const SMALL_SCREEN_WIDTH = 200
    jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => SMALL_SCREEN_WIDTH)
    
    const buttonComponent = {
      template: ` 
        <button id="tooltip-parent">
          <v-tooltip
                :text="'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'"
                :modelValue="true" 
                activator="parent"
                max-width="300" />
          Example
        </button>
      `,
      components: {
        VTooltip
      },
    }
    const buttonWrapper = mount(buttonComponent, {
      global: { 
        plugins: [vuetify],
      }
    })
    await buttonWrapper.vm.$nextTick()
    const overlayDom = document.getElementsByClassName('v-overlay')[0]
    expect(overlayDom.classList.contains('v-overlay--active')).toBe(true)
    const overlayContent = document.getElementsByClassName('v-overlay__content')[0]
    
    expect(parseInt(overlayContent.style['max-width'].replace('px', ''), 10) < SMALL_SCREEN_WIDTH).toBe(true)
  })

  // issue #14420
  it('should respect max-width even if content exceeds max-width', async () => {
    jest.spyOn(document.documentElement, 'clientWidth', 'get').mockImplementation(() => 1263)
    
    const buttonComponent = {
      template: ` 
        <button id="tooltip-parent">
          <v-tooltip
                :text="'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'"
                :modelValue="true" 
                activator="parent"
                max-width="300" />
          Example
        </button>
      `,
      components: {
        VTooltip
      },
    }
    const buttonWrapper = mount(buttonComponent, {
      global: { 
        plugins: [vuetify],
      }
    })
    await buttonWrapper.vm.$nextTick()
    const overlayDom = document.getElementsByClassName('v-overlay')[0]
    expect(overlayDom.classList.contains('v-overlay--active')).toBe(true)
    const overlayContent = document.getElementsByClassName('v-overlay__content')[0]
    expect(overlayContent.style['max-width']).toBe('300px')
  })

})



describe.skip('VTooltip', () => {
  type Instance = InstanceType<typeof VTooltip>
  let mountFunction: (options?: MountOptions<Instance>) => Wrapper<Instance>

  beforeEach(() => {
    document.body.setAttribute('data-app', 'true')

    mountFunction = (options = {}) => {
      return mount(VTooltip, options)
    }
  })

  it('should render component with top and match snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        openDelay: 0,
        top: true,
      },
      scopedSlots: {
        activator: '<span>activator</span>',
      },
      slots: {
        default: '<span>content</span>',
      },
    })

    expect(wrapper.vm.offsetX).toBeFalsy()
    expect(wrapper.vm.offsetY).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      value: true,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with left and match snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        openDelay: 0,
        left: true,
      },
      scopedSlots: {
        activator: '<span>activator</span>',
      },
      slots: {
        default: '<span>content</span>',
      },
    })

    expect(wrapper.vm.offsetX).toBeTruthy()
    expect(wrapper.vm.offsetY).toBeFalsy()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      value: true,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with bottom and match snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        openDelay: 0,
        bottom: true,
      },
      scopedSlots: {
        activator: '<span>activator</span>',
      },
      slots: {
        default: '<span>content</span>',
      },
    })

    expect(wrapper.vm.offsetX).toBeFalsy()
    expect(wrapper.vm.offsetY).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      value: true,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with right and match snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        openDelay: 0,
        right: true,
      },
      scopedSlots: {
        activator: '<span>activator</span>',
      },
      slots: {
        default: '<span>content</span>',
      },
    })

    expect(wrapper.vm.offsetX).toBeTruthy()
    expect(wrapper.vm.offsetY).toBeFalsy()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({
      value: true,
    })
    await wrapper.vm.$nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with custom eager and match snapshot', () => {
    const wrapper = mountFunction({
      propsData: {
        eager: true,
      },
      scopedSlots: {
        activator: '<span>activator</span>',
      },
      slots: {
        default: '<span>content</span>',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with value=true and match snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: true,
      },
      scopedSlots: {
        activator: '<span>activator</span>',
      },
      slots: {
        default: '<span>content</span>',
      },
    })

    expect(wrapper.vm.isActive).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with min/max width and match snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        value: true,
        minWidth: 100,
        maxWidth: 200,
      },
      scopedSlots: {
        activator: '<span>activator</span>',
      },
      slots: {
        default: '<span>content</span>',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should render component with zIndex prop and match snapshot', async () => {
    const wrapper = mountFunction({
      propsData: {
        zIndex: 42,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should display tooltip after mouseenter and hide after mouseleave', async () => {
    jest.useFakeTimers()
    const wrapper = mountFunction({
      propsData: {
        openDelay: 123,
        closeDelay: 321,
      },
      scopedSlots: {
        activator: '<span v-on="props.on" class="activator">activator</span>',
      },
      slots: {
        default: '<span class="content">content</span>',
      },
    })

    const activator = wrapper.find('.activator')
    const cb = jest.fn()
    wrapper.vm.$on('input', cb)

    activator.trigger('mouseenter')
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect((setTimeout as any).mock.calls[0][1]).toBe(123)
    expect(cb).toHaveBeenCalledWith(true)

    activator.trigger('mouseleave')
    jest.runAllTimers()
    await wrapper.vm.$nextTick()
    expect((setTimeout as any).mock.calls[1][1]).toBe(321)
    expect(cb).toHaveBeenCalledWith(false)
  })

  it(`should warn if activator isn't scoped`, () => {
    mountFunction({
      propsData: {
        openDelay: 0,
      },
      slots: {
        activator: '<span>activator</span>',
        default: '<span>content</span>',
      },
    })

    expect(`[Vuetify] The activator slot must be bound, try '<template v-slot:activator="{ on }"><v-btn v-on="on">'`).toHaveBeenWarned()
  })

  it(`should open and close`, () => {
    jest.useFakeTimers()
    const wrapper = mountFunction({
      propsData: {
        openDelay: 0,
        closeDelay: 0,
      },
      scopedSlots: {
        activator: '<span v-on="props.on" class="activator">activator</span>',
      },
      slots: {
        default: '<span class="content">content</span>',
      },
    })

    expect(wrapper.vm.isActive).toBeFalsy()

    wrapper.find('.activator').trigger('focus')
    jest.runAllTimers()
    expect(wrapper.vm.isActive).toBeTruthy()

    wrapper.find('.activator').trigger('blur')
    jest.runAllTimers()
    expect(wrapper.vm.isActive).toBeFalsy()

    wrapper.vm.isActive = true

    wrapper.find('.activator').trigger('keydown.esc')
    jest.runAllTimers()
    expect(wrapper.vm.isActive).toBeFalsy()

    jest.useRealTimers()
  })
})
