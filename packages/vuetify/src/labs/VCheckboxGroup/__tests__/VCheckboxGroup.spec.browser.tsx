// Components
import { VCheckboxGroup } from '../VCheckboxGroup'
import { VCheckbox } from '@/components/VCheckbox'
import { VForm } from '@/components/VForm'

// Utilities
import { render, screen, userEvent, waitIdle } from '@test'
import { shallowRef } from 'vue'

describe('VCheckboxGroup', () => {
  it('should update the array model when selecting and clearing options', async () => {
    const model = shallowRef(['a'])

    render(() => (
      <VCheckboxGroup v-model={ model.value } inline>
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
      <VCheckboxGroup label="Options" hint="Choose any options" persistentHint>
        <VCheckbox label="A" value="a" />
        <VCheckbox label="B" value="b" />
      </VCheckboxGroup>
    ))

    const group = screen.getByRole('group', { name: 'Options' })

    expect(group).toHaveAccessibleName('Options')
    expect(group).toHaveAccessibleDescription('Choose any options')
    expect(document.getElementById(group.getAttribute('aria-labelledby')!)).toHaveTextContent('Options')
    expect(document.getElementById(group.getAttribute('aria-describedby')!)).toHaveTextContent('Choose any options')
  })

  it('should accept an empty selection when there are no rules', async () => {
    const form = shallowRef<VForm>()

    render(() => (
      <VForm ref={ form }>
        <VCheckboxGroup label="Options">
          <VCheckbox label="A" value="a" />
          <VCheckbox label="B" value="b" />
        </VCheckboxGroup>
      </VForm>
    ))
    await waitIdle()

    await expect(form.value!.validate()).resolves.toEqual({ valid: true, errors: [] })
    expect(screen.getByRole('checkbox', { name: 'A' })).not.toBeChecked()
    expect(screen.getByRole('checkbox', { name: 'B' })).not.toBeChecked()
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

    await userEvent.click(screen.getByRole('checkbox', { name: 'B' }))

    await expect(form.value!.validate()).resolves.toEqual({ valid: true, errors: [] })
    await expect.poll(() => screen.queryByText('Select at least one option')).toBeNull()
  })

  it('should prevent changes while the group is disabled', async () => {
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

    expect(model.value).toEqual(['a'])
    expect(first).toBeChecked()
    expect(second).not.toBeChecked()

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

    expect(first).toBeDisabled()
    expect(second).toBeDisabled()

    expect(model.value).toEqual(['a'])
    expect(first).toBeChecked()
    expect(second).not.toBeChecked()

    disabled.value = false
    await waitIdle()
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
})
