// Components
import { VVideo } from '../VVideo'

// Utilities
import { render, screen, userEvent } from '@test'
import { nextTick, ref } from 'vue'
import { makeSilentWav } from '@/labs/VAudio/__tests__/wav'

const SILENT_WAV = makeSilentWav(4)

function video () {
  return document.querySelector('video')!
}

async function whenLoaded () {
  await vi.waitUntil(() => document.querySelector('.v-video--loaded'), { timeout: 4000 })
}

describe('VVideo', () => {
  it('should mount the video only after the first click', async () => {
    const onLoaded = vi.fn()
    render(() => <VVideo src={ SILENT_WAV } onLoaded={ onLoaded } />)

    expect(document.querySelector('video')).toBeNull()
    expect(document.querySelector('.v-video')).toHaveClass('v-video--idle')

    await userEvent.click(screen.getByCSS('.v-video__center-icon'))
    await whenLoaded()

    expect(onLoaded).toHaveBeenCalledWith(video())
    await vi.waitUntil(() => !video().paused, { timeout: 4000 })
  })

  it('should mount eagerly and apply startAt and volume on load', async () => {
    const progress = ref(0)
    render(() => <VVideo src={ SILENT_WAV } eager startAt={ 2 } volume={ 40 } v-model:progress={ progress.value } />)

    expect(video()).toBeTruthy()
    await whenLoaded()

    expect(video().currentTime).toBe(2)
    expect(progress.value).toBe(50)
    expect(video().volume).toBeCloseTo(0.4)
  })

  it('should play at full volume when volume is not set', async () => {
    render(() => <VVideo src={ SILENT_WAV } eager />)
    await whenLoaded()

    expect(video().volume).toBe(1)
  })

  it('should change volume with up/down after clicking the video', async () => {
    const volume = ref(50)
    render(() => <VVideo src={ SILENT_WAV } eager v-model:volume={ volume.value } />)
    await whenLoaded()

    await userEvent.click(video())
    await userEvent.keyboard('{ArrowUp}')
    expect(volume.value).toBe(60)
    expect(video().currentTime).toBeLessThan(1)
  })

  it('should sync playing and volume both ways', async () => {
    const playing = ref(false)
    const volume = ref(50)
    render(() => <VVideo src={ SILENT_WAV } eager v-model:playing={ playing.value } v-model:volume={ volume.value } />)
    await whenLoaded()

    playing.value = true
    await vi.waitUntil(() => !video().paused, { timeout: 4000 })

    video().pause()
    await vi.waitUntil(() => !playing.value)

    volume.value = 20
    await nextTick()
    expect(video().volume).toBeCloseTo(0.2)
  })

  it('should seek from seek() and the arrow keys', async () => {
    const vm = ref<VVideo>()
    render(() => <VVideo ref={ vm } src={ SILENT_WAV } eager />)
    await whenLoaded()

    vm.value!.seek({ to: '50%' })
    expect(video().currentTime).toBe(2)
    vm.value!.seek({ by: -1 })
    expect(video().currentTime).toBe(1)

    const press = (key: string) => screen.getByCSS('.v-video').dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }))
    press('ArrowRight')
    expect(video().currentTime).toBe(4)
    press('ArrowLeft')
    expect(video().currentTime).toBe(0)
  })

  it('should reset progress and load the new file when src changes', async () => {
    const src = ref(SILENT_WAV)
    const progress = ref(0)
    render(() => <VVideo src={ src.value } eager startAt={ 2 } v-model:progress={ progress.value } />)
    await whenLoaded()
    expect(progress.value).toBe(50)

    src.value = makeSilentWav(2)
    await nextTick()
    expect(progress.value).toBe(0)
    await vi.waitUntil(() => video().duration === 2, { timeout: 4000 })
  })

  it('should enter the error state and recover on retry', async () => {
    const error = ref<MediaError | boolean>(true)
    const vm = ref<VVideo>()
    render(() => <VVideo ref={ vm } src={ SILENT_WAV } eager v-model:error={ error.value } />)

    expect(document.querySelector('.v-video')).toHaveClass('v-video--error')
    expect(document.querySelector('.v-video__overlay-fill .v-icon')).toBeTruthy()

    vm.value!.retry()
    await nextTick()
    expect(error.value).toBe(false)
    expect(document.querySelector('.v-video')).toHaveClass('v-video--loading')
    await whenLoaded()
  })

  it('should pause when the error prop is set', async () => {
    const error = ref(false)
    render(() => <VVideo src={ SILENT_WAV } eager error={ error.value } />)
    await whenLoaded()
    video().play()
    await vi.waitUntil(() => !video().paused, { timeout: 4000 })

    error.value = true
    await nextTick()
    expect(video().paused).toBe(true)
    expect(document.querySelector('.v-video')).toHaveClass('v-video--error')
  })

  it('should mount and assign a srcObject set after mount', async () => {
    const ctx = new AudioContext()
    const stream = ctx.createMediaStreamDestination().stream
    const srcObject = ref<MediaStream>()
    render(() => <VVideo srcObject={ srcObject.value } />)
    expect(document.querySelector('video')).toBeNull()

    srcObject.value = stream
    await vi.waitUntil(() => document.querySelector('video')?.srcObject === stream)

    await ctx.close()
  })
})
