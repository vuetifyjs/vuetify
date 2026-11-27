// Components
import { VRadio } from '../VRadio'
import { VRadioGroup } from '@/components/VRadioGroup'

// Utilities
import { page, render, screen, userEvent, waitIdle } from '@test'
import { ref } from 'vue'

describe('VRadio', () => {
  it('should support v-model without a group', async () => {
    const model = ref<string>()

    render(() => (
      <>
        <VRadio v-model={ model.value } value="one" label="one" />
        <VRadio v-model={ model.value } value="two" label="two" />
      </>
    ))

    await userEvent.click(screen.getByLabelText('one'))
    expect(model.value).toBe('one')

    await userEvent.click(screen.getByLabelText('two'))
    expect(model.value).toBe('two')
    expect(screen.getByLabelText('one')).not.toBeChecked()
  })

  it('should defer to the group model', async () => {
    const model = ref<string>()

    render(() => (
      <VRadioGroup v-model={ model.value }>
        <VRadio value="one" label="one" />
        <VRadio value="two" label="two" />
      </VRadioGroup>
    ))

    await userEvent.click(screen.getByLabelText('two'))
    expect(model.value).toBe('two')
    expect(screen.getByLabelText('two')).toBeChecked()
  })

  it('should work standalone, outside a group', async () => {
    const model = ref()

    const { element } = render(() => (
      <VRadio id="test" label="Standalone" value="a" v-model={ model.value } />
    ))

    expect(element).toBeInTheDocument()

    await page.getByRole('radio').click()
    await waitIdle()

    expect(model.value).toBe('a')
  })

  it('should expose VSelectionControl API', async () => {
    const cmp = ref<any>()

    render(() => <VRadio ref={ cmp } label="Standalone" value="a" />)
    await waitIdle()

    expect(cmp.value.focus).toBeTypeOf('function')
    expect(cmp.value.blur).toBeTypeOf('function')
    expect('isFocused' in cmp.value).toBe(true)
    expect('input' in cmp.value).toBe(true)

    cmp.value.focus()
    expect(document.activeElement).toBe(screen.getByCSS('input[type="radio"]'))

    cmp.value.blur()
    expect(document.activeElement).not.toBe(screen.getByCSS('input[type="radio"]'))
  })

  describe('theme', () => {
    const inheritedColor = 'rgb(255, 0, 0)'

    function getColors (label: string) {
      const labelEl = screen.getByText(label)
      const iconEl = labelEl.closest('.v-selection-control')!.querySelector('.v-icon')!

      return {
        label: getComputedStyle(labelEl).color,
        icon: getComputedStyle(iconEl).color,
      }
    }

    it('should inherit text color when theme is not set', async () => {
      render(() => (
        <div style={{ color: inheritedColor }}>
          <VRadio label="Inherit" value="a" />
        </div>
      ))

      expect(getColors('Inherit')).toEqual({ label: inheritedColor, icon: inheritedColor })
    })

    it('should use colors of the theme set on the radio', async () => {
      render(() => (
        <div style={{ color: inheritedColor }}>
          <VRadio label="Light" value="a" theme="light" />
          <VRadio label="Dark" value="b" theme="dark" />
        </div>
      ))

      const light = getColors('Light')
      const dark = getColors('Dark')

      expect(light.label).not.toBe(inheritedColor)
      expect(light.icon).not.toBe(inheritedColor)
      expect(dark.label).not.toBe(inheritedColor)
      expect(dark.icon).not.toBe(inheritedColor)
      expect(dark.label).not.toBe(light.label)
    })

    it('should use colors of the theme set on VRadioGroup', async () => {
      render(() => (
        <div style={{ color: inheritedColor }}>
          <VRadioGroup theme="dark">
            <VRadio label="Grouped" value="a" />
          </VRadioGroup>
          <VRadio label="Standalone" value="b" theme="dark" />
        </div>
      ))

      expect(getColors('Grouped').label).not.toBe(inheritedColor)
      expect(getColors('Grouped')).toEqual(getColors('Standalone'))
    })

    it('should keep the color prop on the selected icon', async () => {
      render(() => (
        <VRadio label="Dark" value="a" modelValue="a" theme="dark" color="#008000" />
      ))

      expect(getColors('Dark').icon).toBe('rgb(0, 128, 0)')
    })
  })
})
