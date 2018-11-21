import Vue from 'vue'
import { test, resizeWindow } from '@/test'
import Overlayable from '@/mixins/overlayable'

const Mock = {
  mixins: [Overlayable],
  render: h => h('div')
}

test('overlayable.js', ({ mount }) => {
  it('should show / hide the scrollbar', async () => {
    const wrapper = mount(Mock)
    const root = document.documentElement

    await resizeWindow(900)

    expect(wrapper.vm.$vuetify.breakpoint.smAndDown).toBe(true)
    expect(root.classList.contains('overflow-y-hidden')).toBe(false)

    wrapper.vm.hideScroll()

    expect(root.classList.contains('overflow-y-hidden')).toBe(true)

    wrapper.vm.showScroll()

    expect(root.classList.contains('overflow-y-hidden')).toBe(false)

    // Don't hide on larger screens
    await resizeWindow(1600)

    wrapper.vm.hideScroll()

    expect(root.classList.contains('overflow-y-hidden')).toBe(false)
  })

  it('should check if component is inside target', () => {
    const wrapper = mount(Mock)

    const el1 = document.createElement('div')
    const el2 = document.createElement('div')
    const el3 = document.createElement('div')
    const el4 = document.createElement('div')

    el3.appendChild(el4)
    el2.appendChild(el3)

    const isInside = wrapper.vm.isInside

    expect(isInside(el1, el1)).toBe(true)
    expect(isInside(null)).toBe(false)
    expect(isInside(document.body)).toBe(false)
    expect(isInside(el4, el2)).toBe(true)
  })

  it('should create and remove overlay', () => {
    const app = document.createElement('app')
    app.setAttribute('data-app', true)
    document.body.appendChild(app)

    const wrapper = mount(Mock)

    expect(wrapper.vm.overlay).toBeFalsy()

    wrapper.vm.createOverlay()

    expect(app.firstChild).toBe(wrapper.vm.overlay.$el)
    expect(wrapper.vm.overlay).toBeTruthy()

    wrapper.vm.overlay.$destroy()
    wrapper.vm.overlay = null

    wrapper.setProps({ absolute: true })

    wrapper.vm.createOverlay()
  })

  it('should create an overlay, attach and activate', async () => {
    const hideScroll = jest.fn()
    const createOverlay = jest.fn()
    const wrapper = mount(Mock, {
      methods: { hideScroll }
    })
    const eCreateOverlay = wrapper.vm.createOverlay

    wrapper.vm.createOverlay = () => {
      createOverlay()
      eCreateOverlay()
    }

    wrapper.vm.genOverlay()

    expect(wrapper.vm.overlay.isActive).toBe(false)

    await new Promise(resolve => setTimeout(resolve, 150))

    expect(wrapper.vm.overlay.isActive).toBe(true)

    wrapper.vm.genOverlay()

    expect(createOverlay).toHaveBeenCalledTimes(1)
  })

  it('should remove overlay', async () => {
    const showScroll = jest.fn()
    const wrapper = mount(Mock, {
      methods: { showScroll }
    })

    wrapper.vm.genOverlay()

    await new Promise(resolve => setTimeout(resolve, 150))

    wrapper.vm.removeOverlay()

    // Fake transition ending
    const event = new Event('transitionend')
    wrapper.vm.overlay.$el.dispatchEvent(event)

    expect(wrapper.vm.overlay).toBe(null)
    expect(showScroll).not.toBeCalled()

    wrapper.destroy()
    expect(showScroll).toHaveBeenCalledTimes(1)
  })
})
