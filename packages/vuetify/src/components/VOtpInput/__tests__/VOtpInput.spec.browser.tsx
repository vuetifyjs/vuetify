import { VOtpInput } from '../VOtpInput'

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
}

describe('VOtpInput', () => {
  function getInput () {
    return screen.getByCSS('.v-otp-input__input') as HTMLInputElement
  }

  function getActiveSlotIndex () {
    const vfields = screen.getAllByCSS('.v-otp-input__content .v-field')
    return vfields.findIndex(f => f.classList.contains('v-field--focused'))
  }

  async function clickSlot (input: HTMLInputElement, index: number) {
    if (document.activeElement !== input) {
      await userEvent.click(input)
    }
    input.setSelectionRange(index, Math.min(index + 1, input.value.length))
    await waitAnimationFrame()
  }

  it('enters value and moves to next input', async () => {
    render(() => (<VOtpInput />))
    const input = getInput()

    await userEvent.click(input)
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

    await userEvent.click(input)
    await userEvent.keyboard('1')
    expect(getActiveSlotIndex()).toBe(1)

    await userEvent.click(input)
    await userEvent.keyboard('2')
    expect(getActiveSlotIndex()).toBe(2)
  })

  it('removes value and stays on current input when using delete', async () => {
    render(() => (<VOtpInput />))
    const input = getInput()

    await userEvent.click(input)
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

    await userEvent.click(input)
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

    await userEvent.click(input)
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

    await userEvent.click(input)
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

    await userEvent.click(input)
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

      await userEvent.click(input)
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

      await userEvent.click(input)
      await userEvent.keyboard('1234')
      await userEvent.keyboard('{ArrowLeft}{ArrowLeft}')
      expect(getActiveSlotIndex()).toBe(2)

      input.dispatchEvent(new InputEvent('beforeinput', { inputType, cancelable: true, bubbles: true }))
      await waitAnimationFrame()
      expect(input.value).toBe('12')
      expect(getActiveSlotIndex()).toBe(1)
    }
  )

  it('emits finish event when all inputs are filled', async () => {
    const onFinish = vi.fn()
    render(() => (<VOtpInput onFinish={ onFinish } />))
    const input = getInput()

    await userEvent.click(input)
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
    const input = getInput()

    await userEvent.click(input)
    await userEvent.keyboard('123')

    expect(modelValue.value).toBe('123')
  })

  it('handles paste event', async () => {
    render(() => (<VOtpInput />))
    const input = getInput()
    await userEvent.click(input)
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
    await userEvent.click(input)
    const lock = await commands.getLock()
    await navigator.clipboard.writeText('  123456     ')
    await userEvent.paste()
    await commands.releaseLock(lock)

    expect(input.value).toBe('123456')
    expect(getActiveSlotIndex()).toBe(5)
  })

  it('handles mobile OTP autofill', async () => {
    render(() => (<VOtpInput />))
    const input = getInput()

    await userEvent.type(input, '123456')

    expect(input.value).toBe('123456')
    expect(getActiveSlotIndex()).toBe(5)
  })

  showcase({ stories })
})
