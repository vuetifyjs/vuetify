// Components
import { VAudio } from '../VAudio'
import { VAudioWaveform } from '../VAudioWaveform'
import { VLocaleProvider } from '@/components/VLocaleProvider'
import { VSlider } from '@/components/VSlider'

// Utilities
import { render, screen, showcase, userEvent } from '@test'
import { nextTick, ref } from 'vue'
import { makeSilentWav } from './wav'

const peaks = [0.2, 0.9, 0.35, 0.7, 0.15, 0.6, 0.85, 0.4]

const SILENT_WAV = makeSilentWav(4)

async function whenLoaded () {
  await vi.waitUntil(() => {
    const el = document.querySelector('audio')
    return !!el && Number.isFinite(el.duration) && el.duration > 0
  }, { timeout: 4000 })
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
    render(() => <VAudio src={ SILENT_WAV } actions="play volume" />)

    // `t()` echoes the key back when it is missing, which only shows in aria-labels.
    const labels = [...document.querySelectorAll('.v-audio [aria-label]')].map(el => el.getAttribute('aria-label'))

    expect(labels).toEqual(expect.arrayContaining(['Play', 'Seek', 'Mute', 'Volume']))
    expect(labels.filter(l => l?.includes('$vuetify'))).toEqual([])
    expect(document.querySelector('[role="slider"][aria-label="Seek"]')).toBeTruthy()
  })

  it('should keep its own slider LTR but leave slot content RTL', () => {
    render(() => (
      <VLocaleProvider rtl>
        <VAudio src={ SILENT_WAV } actions="custom">
          {{ custom: () => <VSlider class="test-custom" /> }}
        </VAudio>
      </VLocaleProvider>
    ))

    expect(getComputedStyle(document.querySelector('.v-media-progress-bar')!).direction).toBe('ltr')
    expect(document.querySelector('.test-custom')).toHaveClass('v-locale--is-rtl')
  })

  it('should lock seeking but not playback when readonly', async () => {
    const playing = ref(false)
    render(() => <VAudio src={ SILENT_WAV } v-model:playing={ playing.value } readonly />)

    expect(document.querySelector('.v-media-progress-bar')).toHaveAttribute('aria-readonly', 'true')

    await userEvent.click(screen.getByCSS('.v-audio__action-play'))
    expect(playing.value).toBe(true)

    document.body.innerHTML = ''
    render(() => (
      <VAudio src={ SILENT_WAV } readonly>
        {{ progress: ({ props }: { props: Record<string, unknown> }) => <VAudioWaveform { ...props } peaks={ peaks } /> }}
      </VAudio>
    ))
    expect(document.querySelector('.v-audio-waveform')).toHaveAttribute('aria-readonly', 'true')
  })

  it('should apply startAt only to the first source', async () => {
    const src = ref(SILENT_WAV)
    render(() => <VAudio src={ src.value } startAt={ 2 } />)
    await whenLoaded()
    expect(document.querySelector('audio')!.currentTime).toBe(2)

    src.value = makeSilentWav(3)
    await vi.waitUntil(() => document.querySelector('audio')!.duration === 3, { timeout: 4000 })

    expect(document.querySelector('audio')!.currentTime).toBe(0)
  })

  it('should keep the playback rate across a source change', async () => {
    const src = ref(SILENT_WAV)
    render(() => <VAudio src={ src.value } playbackRate={ 1.5 } />)
    await whenLoaded()

    src.value = makeSilentWav(2)
    await vi.waitUntil(() => document.querySelector('audio')!.duration === 2, { timeout: 4000 })

    expect(document.querySelector('audio')!.playbackRate).toBe(1.5)
  })

  it('should follow srcObject changes after mount', async () => {
    const audioContext = new AudioContext()
    const stream = audioContext.createMediaStreamDestination().stream
    const srcObject = ref<MediaStream | null>(null)
    render(() => <VAudio src={ SILENT_WAV } srcObject={ srcObject.value } />)
    const el = document.querySelector('audio')!

    srcObject.value = stream
    await nextTick()
    expect(el.srcObject).toBe(stream)

    srcObject.value = null
    await nextTick()
    expect(el.srcObject).toBeNull()
    await whenLoaded()
    expect(el.currentSrc).toBe(SILENT_WAV)

    await audioContext.close()
  })

  showcase({ stories })
})
