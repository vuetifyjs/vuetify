// Components
import { VVideo } from '../VVideo'

// Utilities
import { shallowMount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import { createVuetify } from '@/framework'

function mountVideo () {
  return shallowMount(VVideo, {
    props: { eager: true, playing: true },
    global: {
      plugins: [createVuetify({ ssr: true })],
      renderStubDefaultSlot: true,
      stubs: {
        VVideoControls: {
          render: () => h('div', { class: 'v-video-controls' }, [h('button', 'Play')]),
        },
      },
    },
  })
}

describe('VVideo controls inactivity', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue()
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.mocked(HTMLMediaElement.prototype.play).mockRestore()
    vi.mocked(HTMLMediaElement.prototype.pause).mockRestore()
    vi.useRealTimers()
  })

  it('should hide after two seconds and reset when moving the cursor over the player', async () => {
    const wrapper = mountVideo()
    await wrapper.get('video').trigger('loadeddata')
    await vi.advanceTimersByTimeAsync(1999)
    expect(wrapper.classes()).not.toContain('v-video--controls-idle')
    await vi.advanceTimersByTimeAsync(1)
    expect(wrapper.classes()).toContain('v-video--controls-idle')

    await wrapper.trigger('pointermove')
    expect(wrapper.classes()).not.toContain('v-video--controls-idle')
    await vi.advanceTimersByTimeAsync(2000)
    expect(wrapper.classes()).toContain('v-video--controls-idle')

    await wrapper.setProps({ controlsHideDelay: 0 })
    await vi.advanceTimersByTimeAsync(10000)
    expect(wrapper.classes()).not.toContain('v-video--controls-idle')
    wrapper.unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('should keep controls available while the pointer is held and reveal them on keyboard activity', async () => {
    const wrapper = mountVideo()
    await wrapper.get('video').trigger('loadeddata')
    wrapper.element.dispatchEvent(new PointerEvent('pointerdown', { button: 0, pointerId: 1, isPrimary: true }))
    await nextTick()
    await vi.advanceTimersByTimeAsync(5000)
    expect(wrapper.classes()).toContain('v-video--controls-interacting')
    expect(wrapper.classes()).not.toContain('v-video--controls-idle')

    document.dispatchEvent(new PointerEvent('pointerup', { pointerId: 1 }))
    await nextTick()
    expect(wrapper.classes()).not.toContain('v-video--controls-interacting')
    await vi.advanceTimersByTimeAsync(2000)
    expect(wrapper.classes()).toContain('v-video--controls-idle')

    await wrapper.get('button').trigger('keydown', { key: 'Tab' })
    expect(wrapper.classes()).not.toContain('v-video--controls-idle')
    await vi.advanceTimersByTimeAsync(2000)
    expect(wrapper.classes()).toContain('v-video--controls-idle')
    wrapper.unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('should reveal idle controls on tap without toggling playback', async () => {
    const wrapper = mountVideo()
    const video = wrapper.get('video')
    const tap = (pointerId: number) => {
      const init = { bubbles: true, button: 0, pointerId, isPrimary: true, pointerType: 'touch' }
      video.element.dispatchEvent(new PointerEvent('pointerdown', init))
      return video.trigger('click')
    }
    await video.trigger('loadeddata')
    await vi.advanceTimersByTimeAsync(2000)
    expect(wrapper.classes()).toContain('v-video--controls-idle')

    await tap(1)
    expect(wrapper.classes()).not.toContain('v-video--controls-idle')
    expect(wrapper.emitted('update:playing')).toBeUndefined()

    await tap(2)
    expect(wrapper.emitted('update:playing')).toEqual([[false]])
    wrapper.unmount()
  })
})
