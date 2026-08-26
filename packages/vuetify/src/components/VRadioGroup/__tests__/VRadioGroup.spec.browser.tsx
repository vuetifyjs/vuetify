// Components
import { VRadio } from '@/components/VRadio'
import { VRadioGroup } from '@/components/VRadioGroup'

// Utilities
import { render, screen, userEvent, waitIdle } from '@test'
import { ref, shallowRef } from 'vue'

describe('VRadioGroup', () => {
  it('should focus the checked radio, not the first', async () => {
    const cmp = ref<any>()
    const model = shallowRef('c')

    render(() => (
      <VRadioGroup ref={ cmp } modelValue={ model.value }>
        <VRadio label="A" value="a" />
        <VRadio label="B" value="b" />
        <VRadio label="C" value="c" />
      </VRadioGroup>
    ))
    await waitIdle()

    cmp.value.focus()

    const radios = screen.getAllByCSS('input[type="radio"]')
    expect(document.activeElement).toBe(radios[2])
  })

  it('should fall back to the first enabled radio when none is checked', async () => {
    const cmp = ref<any>()

    render(() => (
      <VRadioGroup ref={ cmp }>
        <VRadio label="A" value="a" disabled />
        <VRadio label="B" value="b" />
        <VRadio label="C" value="c" />
      </VRadioGroup>
    ))
    await waitIdle()

    cmp.value.focus()

    const radios = screen.getAllByCSS('input[type="radio"]')
    expect(document.activeElement).toBe(radios[1])
  })

  it('should fall back in DOM order, not registration order', async () => {
    const cmp = ref<any>()
    const showFirst = shallowRef(false)

    render(() => (
      <VRadioGroup ref={ cmp }>
        { showFirst.value && <VRadio key="radio-a" label="A" value="a" /> }
        <VRadio key="radio-b" label="B" value="b" />
        <VRadio key="radio-c" label="C" value="c" />
      </VRadioGroup>
    ))
    await waitIdle()

    // mounts last but sits first in the DOM
    showFirst.value = true
    await waitIdle()

    cmp.value.focus()

    const radios = screen.getAllByCSS('input[type="radio"]')
    expect(radios).toHaveLength(3)
    expect(document.activeElement).toBe(radios[0])
  })

  it('should expose blur()', async () => {
    const cmp = ref<any>()

    render(() => (
      <VRadioGroup ref={ cmp } modelValue="a">
        <VRadio label="A" value="a" />
        <VRadio label="B" value="b" />
      </VRadioGroup>
    ))
    await waitIdle()

    cmp.value.focus()
    expect(document.activeElement).toBe(screen.getAllByCSS('input[type="radio"]')[0])

    cmp.value.blur()
    expect(document.activeElement).not.toBe(screen.getAllByCSS('input[type="radio"]')[0])
  })

  it('should not emit update:focused while moving between radios', async () => {
    const onFocused = vi.fn()

    render(() => (
      <VRadioGroup modelValue="a" onUpdate:focused={ onFocused }>
        <VRadio label="A" value="a" />
        <VRadio label="B" value="b" />
        <VRadio label="C" value="c" />
      </VRadioGroup>
    ))
    await waitIdle()

    const radios = screen.getAllByCSS('input[type="radio"]')
    radios[0].focus()
    await waitIdle()

    expect(onFocused).toHaveBeenCalledTimes(1)
    expect(onFocused).toHaveBeenLastCalledWith(true)

    // arrowing within the group must not read as a blur
    await userEvent.keyboard('{ArrowDown}')
    await waitIdle()

    expect(onFocused).toHaveBeenCalledTimes(1)
  })

  it('should expose the VInput api it wraps and not shadow it', async () => {
    const cmp = ref<any>()

    render(() => (
      <VRadioGroup ref={ cmp }>
        <VRadio label="A" value="a" />
      </VRadioGroup>
    ))
    await waitIdle()

    interface Entry {
      method: string
      missing: boolean
    }
    const missingMethods = [
      'focus',
      'blur',
      'reset',
      'resetValidation',
      'validate',
    ].map(k => ({ method: k, missing: typeof cmp.value[k] !== 'function' } as Entry))
      .filter(({ missing }) => missing).map(({ method }) => method)

    expect(missingMethods).toEqual([])

    expect('isValid' in cmp.value).toBe(true)
    expect(cmp.value.validate()).toBeInstanceOf(Promise)
  })
})
