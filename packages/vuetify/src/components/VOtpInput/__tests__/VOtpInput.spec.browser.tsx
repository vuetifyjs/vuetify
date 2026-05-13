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
  it('enters value and moves to next input', async () => {
    render(() => (<VOtpInput />))
    const inputs = screen.getAllByCSS('.v-otp-input input')

    await userEvent.click(inputs[0])
    await userEvent.keyboard('1')
    expect(inputs[1]).toHaveFocus()

    await userEvent.keyboard('2')
    expect(inputs[2]).toHaveFocus()

    await userEvent.keyboard('3')
    expect(inputs[3]).toHaveFocus()

    await userEvent.keyboard('4')
    expect(inputs[4]).toHaveFocus()

    await userEvent.keyboard('5')
    expect(inputs[5]).toHaveFocus()

    await userEvent.keyboard('6')
    expect(inputs[5]).toHaveFocus()
  })

  it('enters value and moves to next input when focused index is not next', async () => {
    render(() => (<VOtpInput />))
    const inputs = screen.getAllByCSS('.v-otp-input input')

    await userEvent.click(inputs[0])
    await userEvent.keyboard('1')
    expect(inputs[1]).toHaveFocus()

    await userEvent.click(inputs[3])
    await userEvent.keyboard('2')
    expect(inputs[2]).toHaveFocus()
  })

  it('removes value and stays on current input when using delete', async () => {
    render(() => (<VOtpInput />))
    const inputs = screen.getAllByCSS('.v-otp-input input')

    await userEvent.click(inputs[0])
    await userEvent.keyboard('1234')
    expect(inputs[4]).toHaveFocus()

    await userEvent.keyboard('{ArrowLeft}{ArrowLeft}')
    expect(inputs[2]).toHaveFocus()
    expect(inputs[2]).toHaveValue('3')

    await userEvent.keyboard('{Delete}')
    expect(inputs[2]).toHaveValue('4')
    expect(inputs[2]).toHaveFocus()
  })

  it('removes value and goes back when using backspace', async () => {
    render(() => (<VOtpInput />))
    const inputs = screen.getAllByCSS('.v-otp-input input')

    await userEvent.click(inputs[0])
    await userEvent.keyboard('1234')
    expect(inputs[4]).toHaveFocus()

    await userEvent.keyboard('{Backspace}')
    expect(inputs[3]).toHaveFocus()
    expect(inputs[3]).toHaveValue('')

    await userEvent.keyboard('{Backspace}')
    expect(inputs[2]).toHaveFocus()
    expect(inputs[2]).toHaveValue('')
  })

  it('removes value and stays on current input when using backspace on last filled field', async () => {
    render(() => (<VOtpInput />))
    const inputs = screen.getAllByCSS('.v-otp-input input')

    await userEvent.click(inputs[0])
    await userEvent.keyboard('12345')
    await userEvent.click(inputs[4])

    expect(inputs[4]).toHaveFocus()
    expect(inputs[4]).toHaveValue('5')

    await userEvent.keyboard('{Backspace}')
    expect(inputs[4]).toHaveFocus()
    expect(inputs[4]).toHaveValue('')
  })

  it('shifts values left and goes back when using backspace on a non-last filled field', async () => {
    render(() => (<VOtpInput />))
    const inputs = screen.getAllByCSS('.v-otp-input input')

    await userEvent.click(inputs[0])
    await userEvent.keyboard('12345')
    await userEvent.click(inputs[2])
    expect(inputs[2]).toHaveFocus()
    expect(inputs[2]).toHaveValue('3')

    await userEvent.keyboard('{Backspace}')
    expect(inputs[1]).toHaveFocus()
    expect(inputs[2]).toHaveValue('4')
    expect(inputs[3]).toHaveValue('5')
    expect(inputs[4]).toHaveValue('')
  })

  it('shifts values left when using backspace on the first field', async () => {
    render(() => (<VOtpInput />))
    const inputs = screen.getAllByCSS('.v-otp-input input')

    await userEvent.click(inputs[0])
    await userEvent.keyboard('12345')
    await userEvent.click(inputs[0])
    expect(inputs[0]).toHaveFocus()
    expect(inputs[0]).toHaveValue('1')

    await userEvent.keyboard('{Backspace}')
    expect(inputs[0]).toHaveFocus()
    expect(inputs[0]).toHaveValue('2')
    expect(inputs[1]).toHaveValue('3')
    expect(inputs[4]).toHaveValue('')
  })

  it.each(['deleteWordBackward', 'deleteSoftLineBackward', 'deleteHardLineBackward'])(
    'removes value and goes back on %s',
    async inputType => {
      render(() => (<VOtpInput />))
      const inputs = screen.getAllByCSS('.v-otp-input input:not([type="hidden"])')

      await userEvent.click(inputs[0])
      await userEvent.keyboard('1234')
      expect(inputs[4]).toHaveFocus()

      inputs[4].dispatchEvent(new InputEvent('beforeinput', { inputType, cancelable: true, bubbles: true }))
      await waitAnimationFrame()
      expect(inputs[3]).toHaveFocus()
      expect(inputs[3]).toHaveValue('')
    }
  )

  it.each(['deleteWordForward', 'deleteSoftLineForward', 'deleteHardLineForward'])(
    'shifts values left and stays on %s',
    async inputType => {
      render(() => (<VOtpInput />))
      const inputs = screen.getAllByCSS('.v-otp-input input:not([type="hidden"])')

      await userEvent.click(inputs[0])
      await userEvent.keyboard('1234')
      await userEvent.keyboard('{ArrowLeft}{ArrowLeft}')
      expect(inputs[2]).toHaveFocus()

      inputs[2].dispatchEvent(new InputEvent('beforeinput', { inputType, cancelable: true, bubbles: true }))
      await waitAnimationFrame()
      expect(inputs[2]).toHaveFocus()
      expect(inputs[2]).toHaveValue('4')
      expect(inputs[3]).toHaveValue('')
    }
  )

  it('emits finish event when all inputs are filled', async () => {
    const onFinish = vi.fn()
    render(() => (<VOtpInput onFinish={ onFinish } />))
    const inputs = screen.getAllByCSS('.v-otp-input input')

    await userEvent.click(inputs[0])
    await userEvent.keyboard('123456')

    expect(onFinish).toHaveBeenCalledWith('123456')
  })

  it('respects custom length prop', async () => {
    render(() => (<VOtpInput length={ 4 } />))
    const inputs = screen.getAllByCSS('.v-otp-input input:not([type="hidden"])')

    expect(inputs).toHaveLength(4)
  })

  it('handles model value updates', async () => {
    const modelValue = ref('')
    render(() => (
      <VOtpInput
        modelValue={ modelValue.value }
        onUpdate:modelValue={ val => { modelValue.value = val } }
      />
    ))
    const inputs = screen.getAllByCSS('.v-otp-input input')

    await userEvent.click(inputs[0])
    await userEvent.keyboard('123')

    expect(modelValue.value).toBe('123')
  })

  it('handles paste event', async () => {
    render(() => (<VOtpInput />))
    const inputs = screen.getAllByCSS('.v-otp-input input')
    await userEvent.click(inputs[0])
    const lock = await commands.getLock()
    await navigator.clipboard.writeText('123456')
    await userEvent.paste()
    await commands.releaseLock(lock)

    expect(inputs[0]).toHaveValue('1')
    expect(inputs[1]).toHaveValue('2')
    expect(inputs[2]).toHaveValue('3')
    expect(inputs[3]).toHaveValue('4')
    expect(inputs[4]).toHaveValue('5')
    expect(inputs[5]).toHaveValue('6')
    expect(inputs[5]).toHaveFocus()
  })

  it('trim paste event content', async () => {
    render(() => (<VOtpInput />))
    const inputs = screen.getAllByCSS('.v-otp-input input')
    await userEvent.click(inputs[0])
    const lock = await commands.getLock()
    await navigator.clipboard.writeText('  123456     ')
    await userEvent.paste()
    await commands.releaseLock(lock)

    expect(inputs[0]).toHaveValue('1')
    expect(inputs[1]).toHaveValue('2')
    expect(inputs[2]).toHaveValue('3')
    expect(inputs[3]).toHaveValue('4')
    expect(inputs[4]).toHaveValue('5')
    expect(inputs[5]).toHaveValue('6')
    expect(inputs[5]).toHaveFocus()
  })

  it('handles mobile OTP autofill', async () => {
    render(() => (<VOtpInput />))
    const inputs = screen.getAllByCSS('.v-otp-input input')

    await userEvent.type(inputs[0], '123456')

    expect(inputs[0]).toHaveValue('1')
    expect(inputs[1]).toHaveValue('2')
    expect(inputs[2]).toHaveValue('3')
    expect(inputs[3]).toHaveValue('4')
    expect(inputs[4]).toHaveValue('5')
    expect(inputs[5]).toHaveValue('6')
    expect(inputs[5]).toHaveFocus()
  })

  showcase({ stories })
})
