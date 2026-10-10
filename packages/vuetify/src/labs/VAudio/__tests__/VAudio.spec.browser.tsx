// Components
import { VAudio } from '../VAudio'
import { VAudioWaveform } from '../VAudioWaveform'
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VLocaleProvider } from '@/components/VLocaleProvider'
import { VSlider } from '@/components/VSlider'

// Utilities
import { render, screen, showcase, userEvent } from '@test'
import { nextTick, ref } from 'vue'
import { makeSilentWav } from '@/labs/composables/__tests__/wav'

const peaks = [0.2, 0.9, 0.35, 0.7, 0.15, 0.6, 0.85, 0.4]

const SILENT_WAV = makeSilentWav(4)

function audio () {
  return screen.getByCSS('audio') as HTMLAudioElement
}

async function whenLoaded () {
  await expect.poll(() => audio().duration, { timeout: 4000 }).toBeGreaterThan(0)
}

const stories = {
  Default: <VAudio src={ SILENT_WAV } />,
  Inline: <VAudio src={ SILENT_WAV } actions="play progress time" />,
  Waveform: (
    <VAudio src={ SILENT_WAV }>
      {{ progress: ({ props }: { props: Record<string, unknown> }) => <VAudioWaveform { ...props } peaks={ peaks } /> }}
    </VAudio>
  ),
}

describe('VAudio', () => {
  it('should label every control through the locale', () => {
    render(() => <VAudio src={ SILENT_WAV } actions="play progress volume" />)

    // `t()` echoes the key back when it is missing, which only shows in aria-labels
    const labels = screen.queryAllByCSS('.v-audio [aria-label]').map(el => el.getAttribute('aria-label'))

    expect(labels).toEqual(expect.arrayContaining(['Play', 'Seek', 'Mute', 'Volume']))
    expect(labels.filter(label => label?.includes('$vuetify'))).toEqual([])
  })

  it('should keep its own seek bar LTR but leave slot content RTL', () => {
    render(() => (
      <VLocaleProvider rtl>
        <VAudio src={ SILENT_WAV } actions="custom">
          {{ 'action.custom': () => <VSlider class="test-custom" /> }}
        </VAudio>
      </VLocaleProvider>
    ))

    expect(screen.getByRole('slider', { name: 'Seek' })).toHaveStyle({ direction: 'ltr' })
    expect(screen.getByCSS('.test-custom')).toHaveClass('v-locale--is-rtl')
  })

  it('should lock seeking but not playback when readonly', async () => {
    const playing = ref(false)
    render(() => <VAudio src={ SILENT_WAV } v-model:playing={ playing.value } readonly />)

    expect(screen.getByRole('slider', { name: 'Seek' })).toHaveAttribute('aria-readonly', 'true')

    await userEvent.click(screen.getByRole('button', { name: 'Play' }))
    expect(playing.value).toBe(true)
  })

  it('should lock the volume when muted', () => {
    render(() => <VAudio src={ SILENT_WAV } actions="play progress volume" muted />)

    expect(screen.getByRole('button', { name: 'Unmute' })).toHaveClass('v-icon-btn--disabled')
    expect(screen.getByCSS('.v-media-volume .v-slider')).toHaveClass('v-input--disabled')
  })

  it('should restore the volume when unmuted without a volume action', async () => {
    const vm = ref<VAudio>()
    const volume = ref(30)
    render(() => <VAudio ref={ vm } src={ SILENT_WAV } v-model:volume={ volume.value } />)

    vm.value!.toggleMuted()
    await nextTick()
    expect(volume.value).toBe(0)

    vm.value!.toggleMuted()
    await nextTick()
    expect(volume.value).toBe(30)
  })

  it('should let a custom volume slot change the volume', async () => {
    const volume = ref(100)
    render(() => (
      <VAudio src={ SILENT_WAV } actions="custom-volume" v-model:volume={ volume.value }>
        {{ 'action.custom-volume': ({ volume }) => <button onClick={ () => volume.value = 50 }>Half</button> }}
      </VAudio>
    ))

    await userEvent.click(screen.getByRole('button', { name: 'Half' }))
    expect(volume.value).toBe(50)
  })

  it('should pass volume slider values as defaults users can override', async () => {
    const thumbSize = () => screen.getByCSS('.v-media-volume .v-slider-thumb').style.getPropertyValue('--v-slider-thumb-size')
    const defaults = ref({})
    render(() => (
      <VDefaultsProvider defaults={ defaults.value }>
        <VAudio src={ SILENT_WAV } actions="play progress volume" color="red" />
      </VDefaultsProvider>
    ))

    expect(thumbSize()).toBe('12px')
    expect(screen.getByCSS('.v-media-volume .v-slider-thumb__surface')).toHaveClass('text-red')

    defaults.value = { VMediaVolume: { VSlider: { thumbSize: 6 } } }
    await nextTick()
    expect(thumbSize()).toBe('6px')
  })

  it('should render the time actions', async () => {
    render(() => <VAudio src={ SILENT_WAV } actions="elapsed progress remaining time" />)
    await whenLoaded()

    const times = () => screen.queryAllByCSS('.v-audio-controls__time').map(el => el.textContent)
    await expect.poll(times).toEqual(['0:00', '-0:04', '0:00 / 0:04'])
  })

  it('should apply startAt only to the first source', async () => {
    const src = ref(SILENT_WAV)
    render(() => <VAudio src={ src.value } startAt={ 2 } />)
    await whenLoaded()
    expect(audio().currentTime).toBe(2)

    src.value = makeSilentWav(3)
    await expect.poll(() => audio().duration, { timeout: 4000 }).toBe(3)

    expect(audio().currentTime).toBe(0)
  })

  it('should keep the playback rate across a source change', async () => {
    const src = ref(SILENT_WAV)
    render(() => <VAudio src={ src.value } playbackRate={ 1.5 } />)
    await whenLoaded()

    src.value = makeSilentWav(2)
    await expect.poll(() => audio().duration, { timeout: 4000 }).toBe(2)

    expect(audio()).toHaveProperty('playbackRate', 1.5)
  })

  it('should follow srcObject changes after mount', async () => {
    const audioContext = new AudioContext()
    const stream = audioContext.createMediaStreamDestination().stream
    const srcObject = ref<MediaStream | null>(null)
    render(() => <VAudio src={ SILENT_WAV } srcObject={ srcObject.value } />)

    srcObject.value = stream
    await nextTick()
    expect(audio()).toHaveProperty('srcObject', stream)

    srcObject.value = null
    await nextTick()
    expect(audio()).toHaveProperty('srcObject', null)
    await whenLoaded()
    expect(audio()).toHaveProperty('currentSrc', SILENT_WAV)

    await audioContext.close()
  })

  showcase({ stories })
})
