// Components
import { VCheckboxGroup } from '../VCheckboxGroup'
import { VCheckbox } from '@/components/VCheckbox'
import { VForm } from '@/components/VForm'

// Utilities
import { commands, render, screen, userEvent, waitIdle } from '@test'
import { shallowRef } from 'vue'

describe('VCheckboxGroup', () => {
  it('should update the array model when selecting and clearing options', async () => {
    const model = shallowRef(['a'])

    render(() => (
      <VCheckboxGroup v-model={ model.value }>
        <VCheckbox label="A" value="a" />
        <VCheckbox label="B" value="b" />
      </VCheckboxGroup>
    ))

    const first = screen.getByRole('checkbox', { name: 'A' })
    const second = screen.getByRole('checkbox', { name: 'B' })

    expect(first).toBeChecked()
    expect(second).not.toBeChecked()

    await userEvent.click(second)

    expect(model.value).toEqual(['a', 'b'])
    expect(first).toBeChecked()
    expect(second).toBeChecked()

    await userEvent.click(first)

    expect(model.value).toEqual(['b'])
    expect(first).not.toBeChecked()
    expect(second).toBeChecked()

    await userEvent.click(second)

    expect(model.value).toEqual([])
    expect(second).not.toBeChecked()
  })

  it('should update the inline layout', async () => {
    const inline = shallowRef(false)

    render(() => (
      <VCheckboxGroup inline={ inline.value }>
        <VCheckbox label="A" value="a" />
      </VCheckboxGroup>
    ))

    const group = screen.getByRole('group')

    expect(group).not.toHaveClass('v-selection-control-group--inline')

    inline.value = true

    await expect.poll(() => group).toHaveClass('v-selection-control-group--inline')
  })

  it('should allow multiple selections without a model', async () => {
    render(() => (
      <VCheckboxGroup>
        <VCheckbox label="A" value="a" />
        <VCheckbox label="B" value="b" />
      </VCheckboxGroup>
    ))

    const first = screen.getByRole('checkbox', { name: 'A' })
    const second = screen.getByRole('checkbox', { name: 'B' })

    await userEvent.click(first)
    await userEvent.click(second)

    expect(first).toBeChecked()
    expect(second).toBeChecked()

    await userEvent.click(first)

    expect(first).not.toBeChecked()
    expect(second).toBeChecked()
  })

  it('should emit one model update from the group and the selected checkbox', async () => {
    const model = shallowRef<string[]>([])
    const onGroup = vi.fn()
    const onFirst = vi.fn()
    const onSecond = vi.fn()

    render(() => (
      <VCheckboxGroup v-model={ model.value } onUpdate:modelValue={ onGroup }>
        <VCheckbox label="A" value="a" onUpdate:modelValue={ onFirst } />
        <VCheckbox label="B" value="b" onUpdate:modelValue={ onSecond } />
      </VCheckboxGroup>
    ))

    await userEvent.click(screen.getByRole('checkbox', { name: 'A' }))

    expect(model.value).toEqual(['a'])
    expect(onGroup).toHaveBeenCalledExactlyOnceWith(['a'])
    expect(onFirst).toHaveBeenCalledExactlyOnceWith(['a'])
    expect(onSecond).not.toHaveBeenCalled()
  })

  it('should clear an uncontrolled indeterminate state when selected', async () => {
    const model = shallowRef<string[]>([])

    render(() => (
      <VCheckboxGroup v-model={ model.value }>
        <VCheckbox label="A" value="a" indeterminate />
      </VCheckboxGroup>
    ))

    const input = screen.getByRole('checkbox', { name: 'A' })
    const control = input.closest('.v-selection-control')

    expect(control).toHaveClass('v-selection-control--indeterminate')

    await userEvent.click(input)

    expect(model.value).toEqual(['a'])
    expect(input).toBeChecked()
    expect(control).not.toHaveClass('v-selection-control--indeterminate')
  })

  it('should update a controlled indeterminate state when selected', async () => {
    const indeterminate = shallowRef(true)
    const onIndeterminate = vi.fn()

    render(() => (
      <VCheckboxGroup>
        <VCheckbox
          v-model:indeterminate={ indeterminate.value }
          label="A"
          value="a"
          onUpdate:indeterminate={ onIndeterminate }
        />
      </VCheckboxGroup>
    ))

    const input = screen.getByRole('checkbox', { name: 'A' })
    const control = input.closest('.v-selection-control')

    expect(control).toHaveClass('v-selection-control--indeterminate')

    await userEvent.click(input)

    expect(indeterminate.value).toBe(false)
    expect(onIndeterminate).toHaveBeenCalledExactlyOnceWith(false)
    expect(input).toBeChecked()
    expect(control).not.toHaveClass('v-selection-control--indeterminate')
  })

  it('should inherit indeterminate icons while preserving a checkbox override', async () => {
    const groupIcon = shallowRef('M1,1H3V3H1Z')
    const checkboxIcon = 'M5,5H7V7H5Z'

    render(() => (
      <VCheckboxGroup indeterminateIcon={ `svg:${groupIcon.value}` }>
        <VCheckbox label="A" value="a" indeterminate />
        <VCheckbox label="B" value="b" indeterminate indeterminateIcon={ `svg:${checkboxIcon}` } />
      </VCheckboxGroup>
    ))

    const inherited = screen.getByRole('checkbox', { name: 'A' }).closest('.v-selection-control')?.querySelector('svg path')
    const overridden = screen.getByRole('checkbox', { name: 'B' }).closest('.v-selection-control')?.querySelector('svg path')

    expect(overridden).toHaveAttribute('d', checkboxIcon)
    expect(inherited).toHaveAttribute('d', groupIcon.value)

    groupIcon.value = 'M9,9H11V11H9Z'

    await expect.poll(() => inherited?.getAttribute('d')).toBe(groupIcon.value)
    expect(overridden).toHaveAttribute('d', checkboxIcon)
  })

  it('should not emit an indeterminate update while readonly', async () => {
    const indeterminate = shallowRef(true)
    const onIndeterminate = vi.fn()

    render(() => (
      <VCheckboxGroup readonly>
        <VCheckbox
          v-model:indeterminate={ indeterminate.value }
          label="A"
          value="a"
          onUpdate:indeterminate={ onIndeterminate }
        />
      </VCheckboxGroup>
    ))

    const input = screen.getByRole('checkbox', { name: 'A' })

    await userEvent.click(input)

    expect(onIndeterminate).not.toHaveBeenCalled()
  })

  it('should select one value and clear it when multiple is false', async () => {
    const model = shallowRef<string | boolean>('a')

    render(() => (
      <VCheckboxGroup v-model={ model.value } multiple={ false }>
        <VCheckbox label="A" value="a" />
        <VCheckbox label="B" value="b" />
      </VCheckboxGroup>
    ))

    const first = screen.getByRole('checkbox', { name: 'A' })
    const second = screen.getByRole('checkbox', { name: 'B' })

    expect(first).toBeChecked()
    expect(second).not.toBeChecked()

    await userEvent.click(second)

    expect(model.value).toBe('b')
    expect(first).not.toBeChecked()
    expect(second).toBeChecked()

    await userEvent.click(second)

    expect(model.value).toBe(false)
    expect(first).not.toBeChecked()
    expect(second).not.toBeChecked()
  })

  it('should keep selections independent between groups', async () => {
    const firstModel = shallowRef<string[]>([])
    const secondModel = shallowRef<string[]>([])

    render(() => (
      <>
        <VCheckboxGroup v-model={ firstModel.value } label="First group">
          <VCheckbox label="First A" value="a" />
        </VCheckboxGroup>
        <VCheckboxGroup v-model={ secondModel.value } label="Second group">
          <VCheckbox label="Second A" value="a" />
        </VCheckboxGroup>
      </>
    ))

    const first = screen.getByRole('checkbox', { name: 'First A' })
    const second = screen.getByRole('checkbox', { name: 'Second A' })

    expect(first).toHaveAttribute('name')
    expect(second).toHaveAttribute('name')
    expect(first.getAttribute('name')).not.toBe(second.getAttribute('name'))

    await userEvent.click(first)

    expect(firstModel.value).toEqual(['a'])
    expect(secondModel.value).toEqual([])
    expect(first).toBeChecked()
    expect(second).not.toBeChecked()

    await userEvent.click(second)
    await userEvent.click(first)

    expect(firstModel.value).toEqual([])
    expect(secondModel.value).toEqual(['a'])
    expect(first).not.toBeChecked()
    expect(second).toBeChecked()
  })

  it('should associate the group with its label and hint', () => {
    render(() => (
      <VCheckboxGroup id="options" label="Options" hint="Choose any options" persistentHint>
        <VCheckbox label="A" value="a" />
        <VCheckbox label="B" value="b" />
      </VCheckboxGroup>
    ))

    const group = screen.getByRole('group', { name: 'Options' })

    expect(document.getElementById('options')).toHaveTextContent('Options')
    expect(group).toHaveAccessibleDescription('Choose any options')
  })

  it('should hide checkbox details by default and preserve a checkbox override', () => {
    render(() => (
      <VCheckboxGroup>
        <VCheckbox label="A" value="a" messages="Hidden details" />
        <VCheckbox label="B" value="b" messages="Visible details" hideDetails={ false } />
      </VCheckboxGroup>
    ))

    const checkbox = screen.getByRole('checkbox', { name: 'A' }).closest('.v-checkbox')

    expect(checkbox?.querySelector('.v-input__details')).toBeNull()
    expect(screen.getByText('Visible details')).toBeVisible()
  })

  it('should accept an empty selection when there are no rules', async () => {
    const form = shallowRef<VForm>()
    const model = shallowRef<string[]>([])

    render(() => (
      <VForm ref={ form }>
        <VCheckboxGroup v-model={ model.value } label="Options">
          <VCheckbox label="A" value="a" />
          <VCheckbox label="B" value="b" />
        </VCheckboxGroup>
      </VForm>
    ))
    await waitIdle()

    await expect(form.value!.validate()).resolves.toEqual({ valid: true, errors: [] })
  })

  it('should validate the selection and describe the group with one shared error', async () => {
    const form = shallowRef<VForm>()
    const model = shallowRef<string[]>([])

    render(() => (
      <VForm ref={ form }>
        <VCheckboxGroup
          v-model={ model.value }
          label="Options"
          name="options"
          rules={[value => value?.length > 0 || 'Select at least one option']}
        >
          <VCheckbox label="A" value="a" />
          <VCheckbox label="B" value="b" />
        </VCheckboxGroup>
      </VForm>
    ))
    await waitIdle()

    expect(form.value!.items).toHaveLength(1)

    const result = await form.value!.validate()
    const group = screen.getByRole('group', { name: 'Options' })

    expect(result.valid).toBe(false)
    expect(result.errors).toEqual([
      { id: 'options', errorMessages: ['Select at least one option'] },
    ])
    expect(screen.getAllByText('Select at least one option')).toHaveLength(1)
    expect(group).toHaveAccessibleDescription('Select at least one option')
    expect(screen.getByRole('checkbox', { name: 'A' }).closest('.v-selection-control')).toHaveClass('v-selection-control--error')
    expect(screen.getByRole('checkbox', { name: 'B' }).closest('.v-selection-control')).toHaveClass('v-selection-control--error')

    await userEvent.click(screen.getByRole('checkbox', { name: 'B' }))

    await expect(form.value!.validate()).resolves.toEqual({ valid: true, errors: [] })
    await expect.poll(() => screen.queryByText('Select at least one option')).toBeNull()
    expect(screen.getByRole('checkbox', { name: 'A' }).closest('.v-selection-control')).not.toHaveClass('v-selection-control--error')
    expect(screen.getByRole('checkbox', { name: 'B' }).closest('.v-selection-control')).not.toHaveClass('v-selection-control--error')
  })

  it('should disable checkboxes and allow changes after being enabled', async () => {
    const model = shallowRef(['a'])
    const disabled = shallowRef(true)

    render(() => (
      <VCheckboxGroup v-model={ model.value } disabled={ disabled.value }>
        <VCheckbox label="A" value="a" />
        <VCheckbox label="B" value="b" />
      </VCheckboxGroup>
    ))

    const first = screen.getByRole('checkbox', { name: 'A' })
    const second = screen.getByRole('checkbox', { name: 'B' })

    expect(first).toBeDisabled()
    expect(second).toBeDisabled()

    disabled.value = false
    await waitIdle()
    await userEvent.click(second)

    expect(model.value).toEqual(['a', 'b'])
    expect(second).toBeChecked()
  })

  it('should prevent changes while the group is readonly', async () => {
    const model = shallowRef(['a'])
    const readonly = shallowRef(true)

    render(() => (
      <VCheckboxGroup v-model={ model.value } readonly={ readonly.value }>
        <VCheckbox label="A" value="a" />
        <VCheckbox label="B" value="b" />
      </VCheckboxGroup>
    ))

    const first = screen.getByRole('checkbox', { name: 'A' })
    const second = screen.getByRole('checkbox', { name: 'B' })

    await userEvent.click(first)
    await userEvent.click(second)

    expect(model.value).toEqual(['a'])
    expect(first).toBeChecked()
    expect(second).not.toBeChecked()

    readonly.value = false
    await waitIdle()
    await userEvent.click(second)

    expect(model.value).toEqual(['a', 'b'])
    expect(second).toBeChecked()
  })

  it('should inherit disabled from a form', async () => {
    const model = shallowRef(['a'])
    const disabled = shallowRef(true)

    render(() => (
      <VForm disabled={ disabled.value }>
        <VCheckboxGroup v-model={ model.value }>
          <VCheckbox label="A" value="a" />
          <VCheckbox label="B" value="b" />
        </VCheckboxGroup>
      </VForm>
    ))

    const first = screen.getByRole('checkbox', { name: 'A' })
    const second = screen.getByRole('checkbox', { name: 'B' })
    const group = screen.getByCSS('.v-checkbox-group')

    expect(group).toHaveClass('v-input--disabled')
    expect(first).toBeDisabled()
    expect(second).toBeDisabled()

    disabled.value = false
    await waitIdle()

    expect(group).not.toHaveClass('v-input--disabled')

    await userEvent.click(second)

    expect(model.value).toEqual(['a', 'b'])
    expect(second).toBeChecked()
  })

  it('should inherit readonly from a form', async () => {
    const model = shallowRef(['a'])
    const readonly = shallowRef(true)

    render(() => (
      <VForm readonly={ readonly.value }>
        <VCheckboxGroup v-model={ model.value }>
          <VCheckbox label="A" value="a" />
          <VCheckbox label="B" value="b" />
        </VCheckboxGroup>
      </VForm>
    ))

    const first = screen.getByRole('checkbox', { name: 'A' })
    const second = screen.getByRole('checkbox', { name: 'B' })
    const group = screen.getByCSS('.v-checkbox-group')

    expect(group).toHaveClass('v-input--readonly')

    await userEvent.click(first)
    await userEvent.click(second)

    expect(model.value).toEqual(['a'])
    expect(first).toBeChecked()
    expect(second).not.toBeChecked()

    readonly.value = false
    await waitIdle()

    expect(group).not.toHaveClass('v-input--readonly')

    await userEvent.click(second)

    expect(model.value).toEqual(['a', 'b'])
    expect(second).toBeChecked()
  })

  it('should focus and blur through a ref without notifying when focus moves within the group', async () => {
    const group = shallowRef<VCheckboxGroup>()
    const onFocused = vi.fn()

    render(() => (
      <VCheckboxGroup ref={ group } modelValue={['b']} onUpdate:focused={ onFocused }>
        <VCheckbox label="A" value="a" />
        <VCheckbox label="B" value="b" />
      </VCheckboxGroup>
    ))
    await waitIdle()

    const first = screen.getByRole('checkbox', { name: 'A' })
    const second = screen.getByRole('checkbox', { name: 'B' })
    const lock = await commands.getLock()

    try {
      group.value!.focus()
      expect(document.activeElement).toBe(second)

      first.focus()
      await waitIdle()

      expect(onFocused).toHaveBeenCalledExactlyOnceWith(true)

      group.value!.blur()
      await waitIdle()

      expect(document.activeElement).not.toBe(first)
      expect(onFocused.mock.calls).toEqual([[true], [false]])
    } finally {
      await commands.releaseLock(lock)
    }
  })

  it('should expose validation and reset methods through a ref', async () => {
    const group = shallowRef<VCheckboxGroup>()
    const model = shallowRef<string[] | null>(['a'])

    render(() => (
      <VCheckboxGroup
        ref={ group }
        v-model={ model.value }
        rules={[value => value?.length > 1 || 'Select at least two options']}
      >
        <VCheckbox label="A" value="a" />
        <VCheckbox label="B" value="b" />
      </VCheckboxGroup>
    ))
    await waitIdle()

    await expect(group.value!.validate()).resolves.toEqual(['Select at least two options'])
    expect(group.value!.isValid).toBe(false)
    expect(screen.getByText('Select at least two options')).toBeVisible()

    await group.value!.resetValidation()

    await expect.poll(() => screen.queryByText('Select at least two options')).toBeNull()
    expect(model.value).toEqual(['a'])

    await group.value!.reset()

    expect(model.value).toBeNull()
    expect(screen.getByRole('checkbox', { name: 'A' })).not.toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'B' })).not.toBeChecked()
  })
})
