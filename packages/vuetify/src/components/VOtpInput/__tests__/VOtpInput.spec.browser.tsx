import { VOtpInput } from '../VOtpInput'
import { VOtpField } from '../VOtpField'
import { VOtpGroup } from '../VOtpGroup'
import { VOtpSeparator } from '../VOtpSeparator'

// Utilities
import { commands, render, screen, showcase, userEvent, waitAnimationFrame } from '@test'
import { ref } from 'vue'

const stories = {
  'Default OTP input': <VOtpInput />,
  'With custom length': <VOtpInput length={ 4 } />,
  'With divider': <VOtpInput divider="-" />,
  'Password type': <VOtpInput type="password" />,
  Disabled: <VOtpInput disabled />,
  Loading: <VOtpInput loading />,
  'Error state': <VOtpInput error />,
  'With placeholder': <VOtpInput placeholder="0" />,
  'With focus all': <VOtpInput focusAll />,
  Merged: <VOtpInput merged />,
  'Merged with divider': <VOtpInput merged divider="-" />,
}

describe('VOtpInput', () => {
  function getInput () {
    return screen.getByCSS('.v-otp-input__input') as HTMLInputElement
  }

  function getSlots () {
    return screen.getAllByCSS('.v-otp-input__content .v-field')
  }

  function getActiveSlotIndex () {
    return getSlots().findIndex(f => f.classList.contains('v-field--focused'))
  }

  async function focusInput () {
    await userEvent.click(getSlots()[0])
  }

  async function clickSlot (input: HTMLInputElement, index: number) {
    if (document.activeElement !== input) {
      await focusInput()
    }
    const clampedIndex = Math.min(index, input.value.length)
    const end = Math.min(clampedIndex + 1, input.value.length)
    input.setSelectionRange(clampedIndex, end)
    input.dispatchEvent(new Event('selectionchange'))
    await waitAnimationFrame()
  }

  it('enters value and moves to next input', async () => {
    render(() => (<VOtpInput />))

    await focusInput()
    await userEvent.keyboard('1')
    expect(getActiveSlotIndex()).toBe(1)

    await userEvent.keyboard('2')
    expect(getActiveSlotIndex()).toBe(2)

    await userEvent.keyboard('3')
    expect(getActiveSlotIndex()).toBe(3)

    await userEvent.keyboard('4')
    expect(getActiveSlotIndex()).toBe(4)

    await userEvent.keyboard('5')
    expect(getActiveSlotIndex()).toBe(5)

    await userEvent.keyboard('6')
    expect(getActiveSlotIndex()).toBe(5)
  })

  it('enters value and moves to next input when focused index is not next', async () => {
    render(() => (<VOtpInput />))
    const input = getInput()

    await focusInput()
    await userEvent.keyboard('1')
    expect(getActiveSlotIndex()).toBe(1)

    await clickSlot(input, 1)
    await userEvent.keyboard('2')
    expect(getActiveSlotIndex()).toBe(2)
  })

  it('removes value and stays on current input when using delete', async () => {
    render(() => (<VOtpInput />))
    const input = getInput()

    await focusInput()
    await userEvent.keyboard('1234')
    expect(getActiveSlotIndex()).toBe(4)

    await userEvent.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(getActiveSlotIndex()).toBe(2)
    expect(input.value[2]).toBe('3')

    await userEvent.keyboard('{Delete}')
    expect(input.value[2]).toBe('4')
    expect(getActiveSlotIndex()).toBe(2)
  })

  it('removes value and goes back when using backspace', async () => {
    render(() => (<VOtpInput />))
    const input = getInput()

    await focusInput()
    await userEvent.keyboard('1234')
    expect(getActiveSlotIndex()).toBe(4)

    await userEvent.keyboard('{Backspace}')
    expect(getActiveSlotIndex()).toBe(3)
    expect(input.value[3] ?? '').toBe('')

    await userEvent.keyboard('{Backspace}')
    expect(getActiveSlotIndex()).toBe(2)
    expect(input.value[2] ?? '').toBe('')
  })

  it('removes value and stays on current input when using backspace on last filled field', async () => {
    render(() => (<VOtpInput />))
    const input = getInput()

    await focusInput()
    await userEvent.keyboard('12345')
    await clickSlot(input, 4)

    expect(getActiveSlotIndex()).toBe(4)
    expect(input.value[4]).toBe('5')

    await userEvent.keyboard('{Backspace}')
    expect(getActiveSlotIndex()).toBe(4)
    expect(input.value[4] ?? '').toBe('')
  })

  it('shifts values left and goes back when using backspace on a non-last filled field', async () => {
    render(() => (<VOtpInput />))
    const input = getInput()

    await focusInput()
    await userEvent.keyboard('12345')
    await clickSlot(input, 2)

    expect(getActiveSlotIndex()).toBe(2)
    expect(input.value[2]).toBe('3')

    await userEvent.keyboard('{Backspace}')
    expect(getActiveSlotIndex()).toBe(1)
    expect(input.value[2]).toBe('4')
    expect(input.value[3]).toBe('5')
    expect(input.value[4] ?? '').toBe('')
  })

  it('shifts values left when using backspace on the first field', async () => {
    render(() => (<VOtpInput />))
    const input = getInput()

    await focusInput()
    await userEvent.keyboard('12345')
    await clickSlot(input, 0)

    expect(getActiveSlotIndex()).toBe(0)
    expect(input.value[0]).toBe('1')

    await userEvent.keyboard('{Backspace}')
    expect(getActiveSlotIndex()).toBe(0)
    expect(input.value[0]).toBe('2')
    expect(input.value[1]).toBe('3')
    expect(input.value[4] ?? '').toBe('')
  })

  it.each(['deleteWordBackward', 'deleteSoftLineBackward', 'deleteHardLineBackward'])(
    'clears all preceding characters on %s',
    async inputType => {
      render(() => (<VOtpInput />))
      const input = getInput()

      await focusInput()
      await userEvent.keyboard('1234')
      expect(getActiveSlotIndex()).toBe(4)

      input.dispatchEvent(new InputEvent('beforeinput', { inputType, cancelable: true, bubbles: true }))
      await waitAnimationFrame()
      expect(input.value).toBe('')
      expect(getActiveSlotIndex()).toBe(0)
    }
  )

  it.each(['deleteWordForward', 'deleteSoftLineForward', 'deleteHardLineForward'])(
    'clears all following characters on %s',
    async inputType => {
      render(() => (<VOtpInput />))
      const input = getInput()

      await focusInput()
      await userEvent.keyboard('1234')
      await userEvent.keyboard('{ArrowLeft}{ArrowLeft}')
      expect(getActiveSlotIndex()).toBe(2)

      input.dispatchEvent(new InputEvent('beforeinput', { inputType, cancelable: true, bubbles: true }))
      await waitAnimationFrame()
      expect(input.value).toBe('12')
      expect(getActiveSlotIndex()).toBe(2)
    }
  )

  it('emits finish event when all inputs are filled', async () => {
    const onFinish = vi.fn()
    render(() => (<VOtpInput onFinish={ onFinish } />))

    await focusInput()
    await userEvent.keyboard('123456')

    expect(onFinish).toHaveBeenCalledWith('123456')
  })

  it('respects custom length prop', async () => {
    render(() => (<VOtpInput length={ 4 } />))
    const vfields = screen.getAllByCSS('.v-otp-input__content .v-field')
    expect(vfields).toHaveLength(4)
  })

  it('handles model value updates', async () => {
    const modelValue = ref('')
    render(() => (
      <VOtpInput
        modelValue={ modelValue.value }
        onUpdate:modelValue={ val => { modelValue.value = val } }
      />
    ))

    await focusInput()
    await userEvent.keyboard('123')

    expect(modelValue.value).toBe('123')
  })

  it('handles paste event', async () => {
    render(() => (<VOtpInput />))
    const input = getInput()
    await focusInput()
    const lock = await commands.getLock()
    await navigator.clipboard.writeText('123456')
    await userEvent.paste()
    await commands.releaseLock(lock)

    expect(input.value).toBe('123456')
    expect(getActiveSlotIndex()).toBe(5)
  })

  it('trim paste event content', async () => {
    render(() => (<VOtpInput />))
    const input = getInput()
    await focusInput()
    const lock = await commands.getLock()
    await navigator.clipboard.writeText('  123456     ')
    await userEvent.paste()
    await commands.releaseLock(lock)

    expect(input.value).toBe('123456')
    expect(getActiveSlotIndex()).toBe(5)
  })

  it('inserts paste content at current slot position', async () => {
    render(() => (<VOtpInput />))
    const input = getInput()

    await focusInput()
    await userEvent.keyboard('1234')
    await clickSlot(input, 1)
    expect(getActiveSlotIndex()).toBe(1)

    const lock = await commands.getLock()
    await navigator.clipboard.writeText('9B*  8')
    await userEvent.paste()
    await commands.releaseLock(lock)

    expect(input.value).toBe('19834')
    expect(getActiveSlotIndex()).toBe(3)
  })

  it('handles mobile OTP autofill', async () => {
    render(() => (<VOtpInput />))
    const input = getInput()

    await focusInput()
    await userEvent.keyboard('123456')

    expect(input.value).toBe('123456')
    expect(getActiveSlotIndex()).toBe(5)
  })

  it('selects correct slot when clicking a filled slot', async () => {
    render(() => (<VOtpInput />))
    const input = getInput()

    await focusInput()
    await userEvent.keyboard('12345')
    expect(getActiveSlotIndex()).toBe(5)

    await clickSlot(input, 2)
    expect(getActiveSlotIndex()).toBe(2)

    await clickSlot(input, 0)
    expect(getActiveSlotIndex()).toBe(0)

    await clickSlot(input, 4)
    expect(getActiveSlotIndex()).toBe(4)
  })

  it('redirects to caret position when clicking an empty slot', async () => {
    render(() => (<VOtpInput />))
    const input = getInput()

    await focusInput()
    await userEvent.keyboard('12')
    expect(getActiveSlotIndex()).toBe(2)

    await clickSlot(input, 5)
    expect(getActiveSlotIndex()).toBe(2)

    await clickSlot(input, 3)
    expect(getActiveSlotIndex()).toBe(2)
  })

  it('renders merged layout with single group', async () => {
    render(() => (<VOtpInput merged />))
    const group = screen.getByCSS('.v-otp-group--merged')
    expect(group).toBeTruthy()

    const fields = screen.getAllByCSS('.v-otp-group--merged .v-field')
    expect(fields).toHaveLength(6)
  })

  it('renders custom layout with sub-components', async () => {
    render(() => (
      <VOtpInput>
        <VOtpGroup merged>
          <VOtpField index={ 0 } />
          <VOtpField index={ 1 } />
          <VOtpField index={ 2 } />
        </VOtpGroup>
        <VOtpSeparator />
        <VOtpGroup merged>
          <VOtpField index={ 3 } />
          <VOtpField index={ 4 } />
          <VOtpField index={ 5 } />
        </VOtpGroup>
      </VOtpInput>
    ))

    const groups = screen.getAllByCSS('.v-otp-group--merged')
    expect(groups).toHaveLength(2)

    const separators = screen.getAllByCSS('.v-otp-separator')
    expect(separators).toHaveLength(1)

    const fields = screen.getAllByCSS('.v-field')
    expect(fields).toHaveLength(6)
  })

  it('supports click-to-select in custom layout', async () => {
    render(() => (
      <VOtpInput>
        <VOtpGroup merged>
          <VOtpField index={ 0 } />
          <VOtpField index={ 1 } />
          <VOtpField index={ 2 } />
        </VOtpGroup>
        <VOtpSeparator />
        <VOtpGroup merged>
          <VOtpField index={ 3 } />
          <VOtpField index={ 4 } />
          <VOtpField index={ 5 } />
        </VOtpGroup>
      </VOtpInput>
    ))
    const input = getInput()

    await focusInput()
    await userEvent.keyboard('123456')
    expect(getActiveSlotIndex()).toBe(5)

    await clickSlot(input, 3)
    expect(getActiveSlotIndex()).toBe(3)
  })

  it('blocks non-numeric characters with numeric pattern', async () => {
    render(() => (<VOtpInput pattern="numeric" />))
    const input = getInput()

    await focusInput()
    await userEvent.keyboard('1a2b3c')

    expect(input.value).toBe('123')
    expect(getActiveSlotIndex()).toBe(3)
  })

  it('filters characters with custom RegExp pattern', async () => {
    render(() => (<VOtpInput pattern={ /[A-F0-9]/ } />))
    const input = getInput()

    await focusInput()
    await userEvent.keyboard('A1GZ3F')

    expect(input.value).toBe('A13F')
    expect(getActiveSlotIndex()).toBe(4)
  })

  it('filters pasted content with pattern', async () => {
    render(() => (<VOtpInput pattern="alpha" />))
    const input = getInput()

    await focusInput()
    const lock = await commands.getLock()
    await navigator.clipboard.writeText('a1b2c3')
    await userEvent.paste()
    await commands.releaseLock(lock)

    expect(input.value).toBe('abc')
    expect(getActiveSlotIndex()).toBe(3)
  })

  showcase({ stories })
})
