// Components
import { VCheckboxGroup } from '../VCheckboxGroup'
import { VCheckbox } from '@/components/VCheckbox'
import { VForm } from '@/components/VForm'
import { VRadio } from '@/components/VRadio'
import { VRadioGroup } from '@/components/VRadioGroup'
import { VSelectionControlGroup } from '@/components/VSelectionControlGroup'
import { VTextField } from '@/components/VTextField'

// Utilities
import { commands, render, screen, userEvent, waitIdle } from '@test'
import { resolveComponent, shallowRef } from 'vue'

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

    expect(model.value).toEqual(['a'])
    expect(onGroup).toHaveBeenCalledExactlyOnceWith(['a'])
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

  it('should preserve checkbox details configured through selection group defaults', () => {
    render(() => (
      <VCheckboxGroup>
        <VCheckbox label="A" value="a" messages="Details from defaults" />
      </VCheckboxGroup>
    ), null, {
      defaults: {
        VSelectionControlGroup: {
          VCheckbox: { hideDetails: false },
        },
      },
    })

    expect(screen.getByText('Details from defaults')).toBeVisible()
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

  it('should hide checkbox details when the nested default is undefined', () => {
    render(() => (
      <VCheckboxGroup>
        <VCheckbox label="A" value="a" messages="Hidden details" />
      </VCheckboxGroup>
    ), null, {
      defaults: {
        VCheckboxGroup: {
          VCheckbox: { hideDetails: undefined },
        },
      },
    })

    expect(screen.queryByText('Hidden details')).toBeNull()
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

  it('should register and unregister other inputs without registering checkbox items', async () => {
    const form = shallowRef<VForm>()
    const showFirst = shallowRef(true)
    const showDetails = shallowRef(true)

    render(() => (
      <VForm ref={ form }>
        <VCheckboxGroup name="options">
          { showFirst.value && <VCheckbox key="a" label="A" value="a" name="options" /> }
          <VCheckbox key="b" label="B" value="b" name="options" />
          { showDetails.value && (
            <VTextField label="Details" name="details" rules={[value => !!value || 'Details required']} />
          )}
        </VCheckboxGroup>
      </VForm>
    ))
    await waitIdle()

    expect(form.value!.items.map(item => item.id)).toEqual(['options', 'details'])
    await expect(form.value!.validate()).resolves.toEqual({
      valid: false,
      errors: [{ id: 'details', errorMessages: ['Details required'] }],
    })
    await expect.poll(() => form.value!.items.find(item => item.id === 'details')?.isValid).toBe(false)

    await userEvent.fill(screen.getByRole('textbox', { name: 'Details' }), 'Provided details')

    await expect.poll(() => form.value!.items.find(item => item.id === 'details')?.isValid).toBe(true)

    showFirst.value = false
    await waitIdle()

    expect(form.value!.items.map(item => item.id)).toEqual(['options', 'details'])

    showDetails.value = false
    await waitIdle()

    expect(form.value!.items.map(item => item.id)).toEqual(['options'])
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

  it.each(['prepend', 'append', 'details', 'message'] as const)('should register an independent checkbox in the %s slot', async slot => {
    const form = shallowRef<VForm>()
    const selected = shallowRef<string[]>([])
    const agreement = shallowRef(false)
    const name = `${slot}-agreement`

    render(() => (
      <VForm ref={ form }>
        <VCheckboxGroup
          v-model={ selected.value }
          name="options"
          messages="Group message"
          v-slots={{
            default: () => <VCheckbox label="Grouped option" value="a" />,
            [slot]: () => (
              <VCheckbox
                v-model={ agreement.value }
                name={ name }
                label="Agreement"
                messages="Slot details"
                rules={[value => value === true || 'Agreement required']}
              />
            ),
          }}
        />
      </VForm>
    ))
    await waitIdle()

    expect(form.value!.items.map(item => item.id)).toEqual(['options', name])
    expect(screen.getByText('Slot details')).toBeVisible()
    await expect(form.value!.validate()).resolves.toEqual({
      valid: false,
      errors: [{ id: name, errorMessages: ['Agreement required'] }],
    })

    await userEvent.click(screen.getByRole('checkbox', { name: 'Agreement' }))

    expect(agreement.value).toBe(true)
    expect(selected.value).toEqual([])
    await expect(form.value!.validate()).resolves.toEqual({ valid: true, errors: [] })
  })

  it('should register an append checkbox when an outer radio group provides selection context', async () => {
    const form = shallowRef<VForm>()

    render(() => (
      <VForm ref={ form }>
        <VRadioGroup name="radios">
          <VRadio label="Radio option" value="radio" />
          <VCheckboxGroup
            name="options"
            v-slots={{
              default: () => <VCheckbox label="Grouped option" value="a" />,
              append: () => (
                <VCheckbox label="Agreement" name="agreement" rules={[value => !!value || 'Agreement required']} />
              ),
            }}
          />
        </VRadioGroup>
      </VForm>
    ))
    await waitIdle()

    expect(form.value!.items.map(item => item.id)).toEqual(['radios', 'options', 'agreement'])
    await expect(form.value!.validate()).resolves.toEqual({
      valid: false,
      errors: [{ id: 'agreement', errorMessages: ['Agreement required'] }],
    })
  })

  it('should register checkboxes in another selection group in an append slot', async () => {
    const form = shallowRef<VForm>()
    const selection = shallowRef<string[]>([])

    render(() => (
      <VForm ref={ form }>
        <VCheckboxGroup name="options">
          {{
            default: () => <VCheckbox label="Grouped option" value="a" />,
            append: () => (
              <VSelectionControlGroup v-model={ selection.value } defaultsTarget="VCheckbox" multiple>
                <VCheckbox
                  label="Other option"
                  value="other"
                  name="other"
                  messages="Other details"
                  rules={[value => !!value?.length || 'Other option required']}
                />
              </VSelectionControlGroup>
            ),
          }}
        </VCheckboxGroup>
      </VForm>
    ))
    await waitIdle()

    expect(form.value!.items.map(item => item.id)).toEqual(['options', 'other'])
    expect(screen.getByText('Other details')).toBeVisible()
    await expect(form.value!.validate()).resolves.toEqual({
      valid: false,
      errors: [{ id: 'other', errorMessages: ['Other option required'] }],
    })

    await userEvent.click(screen.getByRole('checkbox', { name: 'Other option' }))

    await expect(form.value!.validate()).resolves.toEqual({ valid: true, errors: [] })
  })

  it('should remain interactive when a checkbox incorrectly binds its own model', async () => {
    const selected = shallowRef<string[]>([])
    const separate = shallowRef(false)

    render(() => (
      <VCheckboxGroup v-model={ selected.value }>
        <VCheckbox v-model={ separate.value } label="A" value="a" />
      </VCheckboxGroup>
    ))

    const input = screen.getByRole('checkbox', { name: 'A' })

    await userEvent.click(input)
    expect(input).toBeChecked()

    await userEvent.click(input)
    expect(input).not.toBeChecked()
  })

  it('should register nested groups separately from their checkbox items', async () => {
    const form = shallowRef<VForm>()
    const outer = shallowRef<string[]>([])
    const inner = shallowRef<string[]>([])
    const showInner = shallowRef(true)

    render(() => (
      <VForm ref={ form }>
        <VCheckboxGroup v-model={ outer.value } name="outer">
          <VCheckbox label="Outer A" value="a" />
          { showInner.value && (
            <VCheckboxGroup
              v-model={ inner.value }
              name="inner"
              rules={[value => value?.length > 0 || 'Choose an inner option']}
            >
              <VCheckbox label="Inner A" value="a" />
              <VCheckbox label="Inner B" value="b" />
            </VCheckboxGroup>
          )}
        </VCheckboxGroup>
      </VForm>
    ))
    await waitIdle()

    expect(form.value!.items.map(item => item.id)).toEqual(['outer', 'inner'])
    await expect(form.value!.validate()).resolves.toEqual({
      valid: false,
      errors: [{ id: 'inner', errorMessages: ['Choose an inner option'] }],
    })

    await userEvent.click(screen.getByRole('checkbox', { name: 'Inner A' }))

    expect(outer.value).toEqual([])
    await expect(form.value!.validate()).resolves.toEqual({ valid: true, errors: [] })

    showInner.value = false
    await waitIdle()

    expect(form.value!.items.map(item => item.id)).toEqual(['outer'])
    await expect(form.value!.validate()).resolves.toEqual({ valid: true, errors: [] })
  })

  it('should retain outer group registration when removing a nested append checkbox', async () => {
    const form = shallowRef<VForm>()
    const outer = shallowRef<string[]>([])
    const showAppend = shallowRef(true)

    render(() => (
      <VForm ref={ form }>
        <VCheckboxGroup v-model={ outer.value } name="outer" rules={[value => !!value?.length || 'Choose an outer option']}>
          <VCheckbox label="Outer option" value="outer" />
          <VCheckboxGroup name="inner">
            {{
              default: () => <VCheckbox label="Inner option" value="inner" />,
              append: () => showAppend.value && <VCheckbox label="Inherited option" value="inherited" />,
            }}
          </VCheckboxGroup>
        </VCheckboxGroup>
      </VForm>
    ))
    await waitIdle()

    expect(form.value!.items.map(item => item.id)).toEqual(['outer', 'inner'])

    await userEvent.click(screen.getByRole('checkbox', { name: 'Inherited option' }))

    expect(outer.value).toEqual(['inherited'])
    showAppend.value = false
    outer.value = []
    await waitIdle()

    expect(form.value!.items.map(item => item.id)).toEqual(['outer', 'inner'])
    await expect(form.value!.validate()).resolves.toEqual({
      valid: false,
      errors: [{ id: 'outer', errorMessages: ['Choose an outer option'] }],
    })
  })

  it('should exclude checkbox aliases from form registration', async () => {
    const form = shallowRef<VForm>()

    render(() => {
      const CustomCheckbox = resolveComponent('VCustomCheckbox') as typeof VCheckbox

      return (
        <VForm ref={ form }>
          <VCheckboxGroup name="options">
            <CustomCheckbox label="A" value="a" name="options" />
          </VCheckboxGroup>
        </VForm>
      )
    }, null, { aliases: { VCustomCheckbox: VCheckbox } })
    await waitIdle()

    expect(form.value!.items.map(item => item.id)).toEqual(['options'])
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
