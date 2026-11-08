// Composables
import { useHotkey } from '../hotkey'
import { useHotkeyRecorder } from '../hotkey-recorder'

// Utilities

describe('hotkey-recorder', () => {
  it.each([
    ['key', 1, [{ shiftKey: true, key: '+', code: 'Equal' }, { key: 'Enter', code: 'Enter' }], 'shift+plus'],
    ['code', 1, [{ shiftKey: true, key: '+', code: 'Equal' }, { key: 'Enter', code: 'Enter' }], 'shift+[Equal]'],
    ['key', 2, [
      { key: 'g', code: 'KeyG' },
      { key: 'h', code: 'KeyH' },
      { key: 'x', code: 'KeyX' },
      { key: 'Enter', code: 'Enter' },
    ], 'x'],
    ['key', 3, [
      { key: 'g', code: 'KeyG' },
      { key: 'Shift', code: 'ShiftLeft' },
      { shiftKey: true, key: 'H', code: 'KeyH' },
      { key: 'Enter', code: 'Enter' },
    ], 'g-shift+h'],
    ['key', 3, [
      { key: 'g', code: 'KeyG' },
      { key: 'Backspace', code: 'Backspace' },
      { key: 'x', code: 'KeyX' },
      { key: 'Enter', code: 'Enter' },
    ], 'x'],
  ] as const)('records by %s, %s step(s)', (recordBy, maxSteps, events, expected) => {
    const onRecord = vi.fn()
    const recorder = useHotkeyRecorder({ recordBy, maxSteps, onRecord })
    recorder.start()

    for (const props of events) recorder.onKeydown(new KeyboardEvent('keydown', props))

    expect(onRecord).toHaveBeenCalledWith(expected)
  })

  it('replays the recording and keeps it from reaching hotkeys', () => {
    const onRecord = vi.fn()
    const recorder = useHotkeyRecorder({ onRecord })
    const field = document.createElement('div')
    document.body.appendChild(field)
    field.addEventListener('keydown', recorder.onKeydown)
    const press = { ctrlKey: true, key: 'ы', code: 'KeyS', bubbles: true }

    recorder.start()
    field.dispatchEvent(new KeyboardEvent('keydown', press))
    expect(onRecord).not.toHaveBeenCalled()
    field.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }))

    const callback = vi.fn()
    const stop = useHotkey(onRecord.mock.calls[0][0], callback)
    window.dispatchEvent(new KeyboardEvent('keydown', press))

    expect(onRecord).toHaveBeenCalledWith('ctrl+[KeyS]')
    expect(callback).toHaveBeenCalledTimes(1)

    stop()
    field.remove()
  })

  it('commits a sequence after the idle timeout', () => {
    vi.useFakeTimers()
    const onRecord = vi.fn()
    const recorder = useHotkeyRecorder({ recordBy: 'key', maxSteps: 3, idleTimeout: 1000, onRecord })
    recorder.start()

    recorder.onKeydown(new KeyboardEvent('keydown', { key: 'g', code: 'KeyG' }))
    vi.advanceTimersByTime(500)
    recorder.onKeydown(new KeyboardEvent('keydown', { key: 'h', code: 'KeyH' }))
    vi.advanceTimersByTime(999)
    expect(onRecord).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(onRecord).toHaveBeenCalledWith('g-h')

    vi.useRealTimers()
  })

  it('cancels on Escape', () => {
    const onRecord = vi.fn()
    const onCancel = vi.fn()
    const recorder = useHotkeyRecorder({ onRecord, onCancel })
    recorder.start()

    recorder.onKeydown(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape' }))

    expect(onCancel).toHaveBeenCalledTimes(1)
    expect(onRecord).not.toHaveBeenCalled()
    expect(recorder.recording.value).toBe(false)
  })
})
