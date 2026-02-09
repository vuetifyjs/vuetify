import { VOtpInput } from '../VOtpInput'

// Utilities
import { commands, render, screen, showcase, userEvent } from '@test'
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
    expect(inputs[3]).toHaveValue('4')

    await userEvent.keyboard('{Backspace}')
    expect(inputs[2]).toHaveFocus()
    expect(inputs[2]).toHaveValue('3')
  })

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
