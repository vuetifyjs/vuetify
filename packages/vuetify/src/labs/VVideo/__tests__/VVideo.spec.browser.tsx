// Components
import { VVideo } from '../VVideo'
import { VVideoControls } from '../VVideoControls'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'

// Utilities
import { render, screen, userEvent } from '@test'
import { nextTick, ref } from 'vue'
import { makeSilentWav } from '@/labs/composables/__tests__/wav'

const SILENT_WAV = makeSilentWav(4)

function video () {
  return screen.getByCSS('video') as HTMLVideoElement
}

async function whenLoaded () {
  await expect.poll(() => screen.getByCSS('.v-video'), { timeout: 4000 }).toHaveClass('v-video--loaded')
}

describe('VVideo', () => {
  it('should mount the video only after the first click', async () => {
    const onLoaded = vi.fn()
    render(() => <VVideo src={ SILENT_WAV } onLoaded={ onLoaded } />)

    expect(screen.queryByCSS('video')).toBeNull()
    expect(screen.getByCSS('.v-video')).toHaveClass('v-video--idle')

    await userEvent.click(screen.getByCSS('.v-video__center-icon'))
    await whenLoaded()

    expect(onLoaded).toHaveBeenCalledWith(video())
    await expect.poll(video, { timeout: 4000 }).toHaveProperty('paused', false)
  })

  it('should mount eagerly and apply startAt and volume on load', async () => {
    const progress = ref(0)
    render(() => <VVideo src={ SILENT_WAV } eager startAt="0:02" volume={ 40 } v-model:progress={ progress.value } />)

    expect(screen.queryByCSS('video')).not.toBeNull()
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

  it('should unmute to the volume set before muting with the keyboard', async () => {
    const volume = ref(100)
    render(() => <VVideo src={ SILENT_WAV } eager v-model:volume={ volume.value } />)
    await whenLoaded()

    volume.value = 30
    await userEvent.click(video())
    await userEvent.keyboard('m')
    expect(volume.value).toBe(0)

    await userEvent.click(screen.getByRole('button', { name: 'Unmute' }))
    expect(volume.value).toBe(30)
  })

  it('should sync playing and volume both ways', async () => {
    const playing = ref(false)
    const volume = ref(50)
    render(() => <VVideo src={ SILENT_WAV } eager v-model:playing={ playing.value } v-model:volume={ volume.value } />)
    await whenLoaded()

    playing.value = true
    await expect.poll(video, { timeout: 4000 }).toHaveProperty('paused', false)

    video().pause()
    await expect.poll(() => playing.value).toBe(false)

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

    await userEvent.click(video())
    await userEvent.keyboard('{ArrowRight}')
    expect(video().currentTime).toBe(4)
    await userEvent.keyboard('{ArrowLeft}')
    expect(video().currentTime).toBe(0)
  })

  it('should reset progress on src change and apply startAt to the first file only', async () => {
    const src = ref(SILENT_WAV)
    const progress = ref(0)
    render(() => <VVideo src={ src.value } eager startAt={ 2 } v-model:progress={ progress.value } />)
    await whenLoaded()
    expect(progress.value).toBe(50)

    src.value = makeSilentWav(3)
    await nextTick()
    expect(progress.value).toBe(0)
    await expect.poll(() => video().duration, { timeout: 4000 }).toBe(3)
    expect(video().currentTime).toBe(0)
  })

  it('should enter the error state and recover on retry', async () => {
    const error = ref<MediaError | boolean>(true)
    const vm = ref<VVideo>()
    render(() => <VVideo ref={ vm } src={ SILENT_WAV } eager v-model:error={ error.value } />)

    expect(screen.getByCSS('.v-video')).toHaveClass('v-video--error')
    expect(screen.queryByCSS('.v-video__overlay-fill .v-icon')).not.toBeNull()

    vm.value!.retry()
    await nextTick()
    expect(error.value).toBe(false)
    expect(screen.getByCSS('.v-video')).toHaveClass('v-video--loading')
    await whenLoaded()
  })

  it('should pause when the error prop is set', async () => {
    const error = ref(false)
    render(() => <VVideo src={ SILENT_WAV } eager error={ error.value } />)
    await whenLoaded()
    video().play()
    await expect.poll(video, { timeout: 4000 }).toHaveProperty('paused', false)

    error.value = true
    await nextTick()
    expect(video()).toHaveProperty('paused', true)
    expect(screen.getByCSS('.v-video')).toHaveClass('v-video--error')
  })

  it('should mount and assign a srcObject set after mount', async () => {
    const context = new AudioContext()
    const stream = context.createMediaStreamDestination().stream
    const srcObject = ref<MediaStream>()
    render(() => <VVideo srcObject={ srcObject.value } />)
    expect(screen.queryByCSS('video')).toBeNull()

    srcObject.value = stream
    await expect.poll(() => screen.queryByCSS('video')).toHaveProperty('srcObject', stream)

    await context.close()
  })

  it('should lock the volume when muted', async () => {
    const volume = ref(50)
    render(() => <VVideo src={ SILENT_WAV } eager muted v-model:volume={ volume.value } />)
    await whenLoaded()

    expect(screen.getByRole('button', { name: 'Unmute' })).toHaveClass('v-icon-btn--disabled')

    await userEvent.click(video())
    await userEvent.keyboard('{ArrowUp}m')
    expect(volume.value).toBe(50)
  })

  it('should keep playback state when controlsProps tries to override it', async () => {
    render(() => <VVideo src={ SILENT_WAV } eager volume={ 50 } controlsProps={{ volume: 0 }} />)
    await whenLoaded()

    expect(screen.getByRole('button', { name: 'Mute' })).toBeVisible()
  })

  it('should paint the progress bar from its own clock while playing', async () => {
    render(() => <VVideo src={ makeSilentWav(10) } eager />)
    await whenLoaded()

    const bar = screen.getByRole('slider')
    const playhead = () => bar.style.getPropertyValue('--v-media-progress-bar-playhead')

    video().play()
    await expect.poll(playhead, { timeout: 4000 }).not.toBe('')

    // timeupdate fires every ~250ms, the clock moves the bar on every frame
    const samples = new Set<string>()
    await expect.poll(() => samples.add(playhead()).size, { timeout: 200, interval: 16 }).toBeGreaterThanOrEqual(4)

    bar.classList.add('v-media-progress-bar--dragging')
    await expect.poll(playhead).toBe('')
    bar.classList.remove('v-media-progress-bar--dragging')
    await expect.poll(playhead).not.toBe('')

    video().pause()
    await expect.poll(playhead).toBe('')
  })
})

describe('VVideoControls', () => {
  function pills () {
    return screen.queryAllByCSS('.v-video-control__pill')
      .map(el => [...el.children].map(child => child.classList[0]).join(' '))
  }

  it('should group actions into pills and render action slots', () => {
    render(() => (
      <VVideoControls pills actions="play elapsed progress remaining (volume custom fullscreen)">
        {{
          'action.custom': () => <span class="custom" />,
          'action.fullscreen': () => <span class="my-fullscreen" />,
        }}
      </VVideoControls>
    ))

    expect(pills()).toEqual(['v-icon-btn', 'v-video__time', 'v-video__time', 'v-media-volume custom my-fullscreen'])
    expect(screen.queryByCSS('.v-video-controls > .v-video__track')).not.toBeNull()
  })

  it('should group pills with parentheses, split by spacers', async () => {
    const actions = ref<string | string[][] | (string | string[])[]>('(play progress - volume) ((fullscreen) time')
    render(() => <VVideoControls pills actions={ actions.value } />)

    expect(pills()).toEqual(['v-icon-btn v-media-progress-bar', 'v-media-volume', 'v-icon-btn v-video__time'])
    expect(screen.queryByCSS('.v-video-controls > .v-spacer')).not.toBeNull()

    actions.value = ['play', ['volume', 'fullscreen']]
    await nextTick()
    expect(pills()).toEqual(['v-icon-btn', 'v-media-volume v-icon-btn'])

    actions.value = 'play ) volume'
    await nextTick()
    expect(pills()).toEqual(['v-icon-btn', 'v-media-volume'])
  })

  it('should render prepend and append at the edges unless listed', async () => {
    const actions = ref('play')
    render(() => (
      <VVideoControls actions={ actions.value }>
        {{ prepend: () => <span class="prepend" />, append: () => <span class="append" /> }}
      </VVideoControls>
    ))

    expect(pills()).toEqual(['prepend', 'v-icon-btn', 'append'])
    expect(screen.getByCSS('.v-video-controls')).toHaveClass('v-video-controls--stacked')

    actions.value = 'append play prepend'
    await nextTick()
    expect(pills()).toEqual(['append', 'v-icon-btn', 'prepend'])
  })

  it('should map deprecated variants to actions', async () => {
    const variant = ref<'default' | 'tube' | 'mini'>('default')
    render(() => <VVideoControls variant={ variant.value } hideFullscreen />)

    const controls = screen.getByCSS('.v-video-controls')
    expect(pills()).toEqual(['v-icon-btn', 'v-media-volume'])
    expect(controls).not.toHaveClass('v-video-controls--stacked')

    variant.value = 'tube'
    await nextTick()
    expect(pills()).toEqual(['v-icon-btn', 'v-video__time', 'v-media-volume'])
    expect(controls).toHaveClass('v-video-controls--stacked')

    variant.value = 'mini'
    await nextTick()
    expect(screen.queryByRole('slider')).toBeNull()
  })

  it('should pass the volume slider color as a default users can override', async () => {
    const surface = () => screen.getByCSS('.v-media-volume .v-slider-thumb__surface')
    const defaults = ref({})
    render(() => (
      <VDefaultsProvider defaults={ defaults.value }>
        <VVideoControls actions="volume" color="red" volumeProps={{ inline: true }} />
      </VDefaultsProvider>
    ))

    expect(surface()).toHaveClass('text-red')

    defaults.value = { VMediaVolume: { VSlider: { color: 'blue' } } }
    await nextTick()
    expect(surface()).toHaveClass('text-blue')
  })
})
