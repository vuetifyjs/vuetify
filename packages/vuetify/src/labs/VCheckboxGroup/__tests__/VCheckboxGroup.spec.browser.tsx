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

  it('should emit one model update when selecting an option', async () => {
    const model = shallowRef<string[]>([])
    const onGroup = vi.fn()

    render(() => (
      <VCheckboxGroup v-model={ model.value } onUpdate:modelValue={ onGroup }>
        <VCheckbox label="A" value="a" />
        <VCheckbox label="B" value="b" />
      </VCheckboxGroup>
    ))

    await userEvent.click(screen.getByRole('checkbox', { name: 'A' }))

    expect(onGroup).toHaveBeenCalledExactlyOnceWith(['a'])
  })

  it('should forward the indeterminate icon prop to a checkbox', () => {
    const path = 'M1,1H3V3H1Z'

    render(() => (
      <VCheckboxGroup indeterminateIcon={ `svg:${path}` }>
        <VCheckbox label="A" value="a" indeterminate />
      </VCheckboxGroup>
    ))

    const icon = screen.getByRole('checkbox', { name: 'A' }).closest('.v-selection-control')?.querySelector('svg path')

    expect(icon).toHaveAttribute('d', path)
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

    await userEvent.click(second)
    await userEvent.click(first)

    expect(firstModel.value).toEqual([])
    expect(secondModel.value).toEqual(['a'])
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

    expect(screen.queryByText('Hidden details')).toBeNull()
    expect(screen.getByText('Visible details')).toBeVisible()
  })

  it('should preserve checkbox details configured through checkbox group defaults', () => {
    render(() => (
      <VCheckboxGroup>
        <VCheckbox label="A" value="a" messages="Details from group defaults" />
      </VCheckboxGroup>
    ), null, {
      defaults: {
        VCheckboxGroup: {
          VCheckbox: { hideDetails: false },
        },
      },
    })

    expect(screen.getByText('Details from group defaults')).toBeVisible()
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

  it('should retain group registration and validation after removing a checkbox', async () => {
    const form = shallowRef<VForm>()
    const model = shallowRef<string[]>([])
    const showFirst = shallowRef(true)

    render(() => (
      <VForm ref={ form }>
        <VCheckboxGroup
          v-model={ model.value }
          name="options"
          rules={[value => value?.length > 0 || 'Choose an option']}
        >
          { showFirst.value && <VCheckbox key="a" label="A" value="a" /> }
          <VCheckbox key="b" label="B" value="b" />
        </VCheckboxGroup>
      </VForm>
    ))
    await waitIdle()

    showFirst.value = false
    await waitIdle()

    expect(form.value!.items.map(item => item.id)).toEqual(['options'])
    await expect(form.value!.validate()).resolves.toEqual({
      valid: false,
      errors: [{ id: 'options', errorMessages: ['Choose an option'] }],
    })
    await waitIdle()

    expect(form.value!.items[0].errorMessages).toEqual(['Choose an option'])

    await userEvent.click(screen.getByRole('checkbox', { name: 'B' }))

    await expect(form.value!.validate()).resolves.toEqual({ valid: true, errors: [] })
  })

  it('should register and validate a standalone checkbox alongside a group', async () => {
    const form = shallowRef<VForm>()
    const agreement = shallowRef(false)

    render(() => (
      <VForm ref={ form }>
        <VCheckboxGroup name="options">
          <VCheckbox label="Grouped option" value="a" />
        </VCheckboxGroup>
        <VCheckbox
          v-model={ agreement.value }
          label="Agreement"
          name="agreement"
          rules={[value => value === true || 'Agreement required']}
        />
      </VForm>
    ))
    await waitIdle()

    expect(form.value!.items.map(item => item.id)).toEqual(['options', 'agreement'])
    await expect(form.value!.validate()).resolves.toEqual({
      valid: false,
      errors: [{ id: 'agreement', errorMessages: ['Agreement required'] }],
    })

    await userEvent.click(screen.getByRole('checkbox', { name: 'Agreement' }))

    await expect(form.value!.validate()).resolves.toEqual({ valid: true, errors: [] })
  })

  it('should respect group disabled and inherit disabled from a form', async () => {
    const disabled = shallowRef(true)
    const formDisabled = shallowRef(true)
    const directModel = shallowRef<string[]>([])
    const inheritedModel = shallowRef<string[]>([])

    render(() => (
      <VForm disabled={ formDisabled.value }>
        <VCheckboxGroup v-model={ directModel.value } disabled={ disabled.value }>
          <VCheckbox label="Direct option" value="a" />
        </VCheckboxGroup>
        <VCheckboxGroup v-model={ inheritedModel.value }>
          <VCheckbox label="Inherited option" value="a" />
        </VCheckboxGroup>
      </VForm>
    ))

    const direct = screen.getByRole('checkbox', { name: 'Direct option' })
    const inherited = screen.getByRole('checkbox', { name: 'Inherited option' })

    expect(direct).toBeDisabled()
    expect(inherited).toBeDisabled()

    formDisabled.value = false
    await waitIdle()

    expect(direct).toBeDisabled()
    expect(inherited).not.toBeDisabled()

    await userEvent.click(inherited)

    expect(inheritedModel.value).toEqual(['a'])

    disabled.value = false
    await waitIdle()
    await userEvent.click(direct)

    expect(directModel.value).toEqual(['a'])
  })

  it('should respect group readonly and inherit readonly from a form', async () => {
    const readonly = shallowRef(true)
    const formReadonly = shallowRef(true)
    const directModel = shallowRef<string[]>([])
    const inheritedModel = shallowRef<string[]>([])

    render(() => (
      <VForm readonly={ formReadonly.value }>
        <VCheckboxGroup v-model={ directModel.value } readonly={ readonly.value }>
          <VCheckbox label="Direct option" value="a" />
        </VCheckboxGroup>
        <VCheckboxGroup v-model={ inheritedModel.value }>
          <VCheckbox label="Inherited option" value="a" />
        </VCheckboxGroup>
      </VForm>
    ))

    const direct = screen.getByRole('checkbox', { name: 'Direct option' })
    const inherited = screen.getByRole('checkbox', { name: 'Inherited option' })

    await userEvent.click(inherited)

    expect(inheritedModel.value).toEqual([])

    formReadonly.value = false
    await waitIdle()
    await userEvent.click(direct)
    await userEvent.click(inherited)

    expect(directModel.value).toEqual([])
    expect(inheritedModel.value).toEqual(['a'])

    readonly.value = false
    await waitIdle()
    await userEvent.click(direct)

    expect(directModel.value).toEqual(['a'])
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
