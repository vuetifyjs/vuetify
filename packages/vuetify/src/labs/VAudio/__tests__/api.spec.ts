import { makeVAudioProps } from '../VAudio'
import { makeVAudioControlsProps } from '../VAudioControls'
import { makeVAudioWaveformProps } from '../VAudioWaveform'

// Utilities
import fs from 'node:fs'
import path from 'node:path'

describe('public API surface', () => {
  it('VAudio inherits peaks and waveformProps from the controls factory', () => {
    const keys = Object.keys(makeVAudioProps())
    const inherited = ['peaks', 'waveformProps', 'bars', 'mirror', 'variant', 'timeDisplay', 'splitTime', 'playbackRates']

    expect(inherited.filter(k => !keys.includes(k))).toEqual([])
  })

  it('declares duration on controls but not on VAudio', () => {
    expect(Object.keys(makeVAudioControlsProps())).toContain('duration')
    expect(Object.keys(makeVAudioProps())).not.toContain('duration')
  })

  it('omits waveform modelValue/color/height/disabled/duration from controls', () => {
    const controls = Object.keys(makeVAudioControlsProps())
    expect(controls).not.toContain('modelValue')
    // color/height/disabled exist on controls in their own right, not the waveform's
    expect(Object.keys(makeVAudioWaveformProps())).toContain('modelValue')
  })

  it('has no download prop — a link in the append slot covers it', () => {
    expect(Object.keys(makeVAudioControlsProps())).not.toContain('download')
    expect(Object.keys(makeVAudioControlsProps())).not.toContain('downloadIcon')
    expect(Object.keys(makeVAudioProps())).not.toContain('download')
  })

  it('takes peaks from the consumer rather than decoding them', () => {
    expect(makeVAudioProps().peaks).toBeDefined()
  })
})

describe('no dead props', () => {
  it('reads or forwards every prop VAudio declares', () => {
    const source = fs.readFileSync(path.resolve(__dirname, '..', 'VAudio.tsx'), 'utf8')

    // Props inherited from the controls factory are forwarded wholesale by `filterProps`,
    // so only VAudio's own declarations have to be read in this file.
    const layout = ['class', 'style', 'theme', 'density', 'height', 'width', 'maxWidth', 'maxHeight', 'minWidth', 'minHeight']
    const own = Object.keys(makeVAudioProps())
      .filter(k => !(k in makeVAudioControlsProps()) && !layout.includes(k))

    // A prop counts as read either directly or by name through a model composable.
    const dead = own.filter(k => !source.includes(`props.${k}`) && !source.includes(`, '${k}'`))

    expect(dead, `declared but never read: ${dead.join(', ')}`).toEqual([])
  })
})
