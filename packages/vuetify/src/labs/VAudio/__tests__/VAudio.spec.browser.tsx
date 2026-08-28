// Components
import { VAudio } from '../VAudio'
import { VLocaleProvider } from '@/components/VLocaleProvider'

// Utilities
import { commands, render, screen, showcase, userEvent } from '@test'
import { ref } from 'vue'

const peaks = [0.2, 0.9, 0.35, 0.7, 0.15, 0.6, 0.85, 0.4]

/**
 * A silent WAV of a known length, as a blob URL. Anything that seeks needs a finite
 * `duration`, and a one-sample fixture reports ~0 — every position then clamps to 0.
 */
function makeSilentWav (seconds: number) {
  const rate = 8000
  const frames = rate * seconds
  const buffer = new ArrayBuffer(44 + frames)
  const view = new DataView(buffer)
  const ascii = (offset: number, text: string) => {
    for (let i = 0; i < text.length; i++) {
      view.setUint8(offset + i, text.codePointAt(i)!)
    }
  }

  ascii(0, 'RIFF')
  view.setUint32(4, 36 + frames, true)
  ascii(8, 'WAVEfmt ')
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, rate, true)
  view.setUint32(28, rate, true)
  view.setUint16(32, 1, true)
  view.setUint16(34, 8, true)
  ascii(36, 'data')
  view.setUint32(40, frames, true)
  for (let i = 0; i < frames; i++) {
    view.setUint8(44 + i, 128)
  }

  return URL.createObjectURL(new Blob([buffer], { type: 'audio/wav' }))
}

const SILENT_WAV = makeSilentWav(4)

/** Resolves once the element has metadata — nothing can seek before that. */
async function whenLoaded () {
  await vi.waitUntil(() => {
    const el = document.querySelector('audio')
    return !!el && Number.isFinite(el.duration) && el.duration > 0
  }, { timeout: 4000 })
}

const stories = {
  Default: <VAudio src={ SILENT_WAV } peaks={ peaks } />,
  Mini: <VAudio src={ SILENT_WAV } peaks={ peaks } variant="mini" />,
  Pills: <VAudio src={ SILENT_WAV } peaks={ peaks } pills />,
  'No waveform': <VAudio src={ SILENT_WAV } hideWaveform />,
}

describe('VAudio', () => {
  it('should toggle playing when the play button is pressed', async () => {
    const playing = ref(false)
    render(() => <VAudio src={ SILENT_WAV } peaks={ peaks } v-model:playing={ playing.value } />)

    await userEvent.click(screen.getByCSS('.v-audio__action-play'))

    expect(playing.value).toBe(true)
  })

  it('should render a waveform by default and hide it on request', () => {
    render(() => <VAudio src={ SILENT_WAV } peaks={ peaks } />)
    expect(document.querySelector('.v-audio-waveform')).toBeTruthy()

    render(() => <VAudio src={ SILENT_WAV } peaks={ peaks } hideWaveform />)
    expect(document.querySelectorAll('.v-audio-waveform')).toHaveLength(1)
  })

  it('should expose the transport through its own labelled controls, not the element', () => {
    render(() => <VAudio src={ SILENT_WAV } peaks={ peaks } />)

    // The element itself is unreachable by assistive tech and cannot be made reachable:
    // chromium forces `display: none` on `audio:not([controls])` with a UA `!important`.
    // See docs/VERIFIED.md — the accessible surface is the component's own controls.
    expect(document.querySelector('audio')).toBeTruthy()

    const labels = [...document.querySelectorAll('[aria-label]')].map(el => el.getAttribute('aria-label'))
    expect(labels).toContain('Play')
    expect(labels).toContain('Seek')
    expect(document.querySelector('[role="slider"][aria-label="Seek"]')).toBeTruthy()
  })

  it('should not seek from the container while a waveform is visible', async () => {
    const progress = ref(0)
    render(() => (
      <VAudio
        src={ SILENT_WAV }
        peaks={ peaks }
        v-model:progress={ progress.value }
        seekTarget="container"
      />
    ))

    // The waveform is the seek surface whenever it is visible, so the container must not
    // also become one — asserted structurally, since any coordinate inside the component
    // may legitimately land on the waveform.
    const root = document.querySelector('.v-audio')!

    expect(root.getAttribute('role')).toBeNull()
    expect(root.classList.contains('v-audio--seekable-container')).toBe(false)
    expect(document.querySelector('.v-audio-waveform[role="slider"]')).toBeTruthy()
  })

  it('should seek from the container once the waveform is hidden', async () => {
    const progress = ref(0)
    render(() => (
      <VAudio
        src={ SILENT_WAV }
        v-model:progress={ progress.value }
        seekTarget="container"
        hideWaveform
      />
    ))

    await whenLoaded()

    const root = document.querySelector('.v-audio')!
    expect(root.getAttribute('role')).toBe('slider')

    // Above the controls row: the container's own padding band. A point at mid-height
    // lands on a button or the volume slider, which the guard excludes by design.
    const rect = root.getBoundingClientRect()
    const x = Math.round(rect.left + rect.width * 0.75)
    const y = Math.round(rect.top + 4)
    await commands.drag([x, y], [x, y])

    expect(progress.value).toBeGreaterThan(0)
  })

  it('should invert the container seek in RTL', async () => {
    const progress = ref(0)
    render(() => (
      <VLocaleProvider rtl>
        <VAudio
          src={ SILENT_WAV }
          v-model:progress={ progress.value }
          seekTarget="container"
          hideWaveform
        />
      </VLocaleProvider>
    ))

    await whenLoaded()

    const rect = document.querySelector('.v-audio')!.getBoundingClientRect()
    const x = Math.round(rect.left + rect.width * 0.25)
    const y = Math.round(rect.top + 4)
    await commands.drag([x, y], [x, y])

    expect(progress.value).toBeGreaterThan(50)
  })

  it('should expose exactly one seek slider in every seekTarget mode', () => {
    const modes = [
      { seekTarget: 'waveform' as const },
      { seekTarget: 'container' as const, hideWaveform: true },
      { seekTarget: 'none' as const },
    ]

    const counts = modes.map(props => {
      document.body.innerHTML = ''
      render(() => <VAudio src={ SILENT_WAV } peaks={ peaks } { ...props } />)

      return [...document.querySelectorAll('[role="slider"]')]
        .filter(el => el.getAttribute('aria-label') === 'Seek')
        .length
    })

    expect(counts).toEqual([1, 1, 0])
  })

  it('should render the error slot when the source fails', async () => {
    render(() => (
      <VAudio src="/definitely-not-a-real-file.mp3" error>
        {{ error: () => <span class="test-error">could not load</span> }}
      </VAudio>
    ))

    expect(document.querySelector('.test-error')?.textContent).toBe('could not load')
  })

  it('should render skip buttons only when an interval is set', () => {
    render(() => <VAudio src={ SILENT_WAV } peaks={ peaks } />)
    const withoutSkip = document.querySelectorAll('.v-audio-controls .v-icon-btn').length

    document.body.innerHTML = ''
    render(() => <VAudio src={ SILENT_WAV } peaks={ peaks } skipInterval={ 15 } />)
    const withSkip = document.querySelectorAll('.v-audio-controls .v-icon-btn').length

    expect(withSkip).toBe(withoutSkip + 2)
  })

  it('should label the skip buttons with the configured interval', () => {
    render(() => <VAudio src={ SILENT_WAV } peaks={ peaks } skipInterval={ 15 } />)

    const labels = [...document.querySelectorAll('[aria-label]')].map(el => el.getAttribute('aria-label'))
    expect(labels).toContain('Skip forward 15 seconds')
    expect(labels).toContain('Skip back 15 seconds')
  })

  showcase({ stories })
})
