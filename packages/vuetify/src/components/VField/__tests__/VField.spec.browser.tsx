// Components
import { VField } from '../VField'
import { VFileInput } from '@/components/VFileInput'
import { VLocaleProvider } from '@/components/VLocaleProvider'
import { VTextarea } from '@/components/VTextarea'
import { VTextField } from '@/components/VTextField'

// Utilities
import { render, screen, userEvent } from '@test'
import { ref } from 'vue'

const fieldVariants = ['filled', 'outlined', 'underlined', 'solo', 'plain'] as const

describe('VField labelVariant', () => {
  function boxes (label: string) {
    const labelEl = screen.getByText(label)
    const input = screen.getByRole('textbox', { name: label })
    const field = labelEl.closest('.v-field') as HTMLElement
    return {
      labelEl,
      input,
      field,
      labelBox: labelEl.getBoundingClientRect(),
      inputBox: input.getBoundingClientRect(),
      fieldBox: field.getBoundingClientRect(),
    }
  }

  it('floats the label while the field is empty', () => {
    render(() => <VTextField label="Name" labelVariant="float" />)

    const labels = screen.getAllByText('Name')
    const floating = labels.find(el => el.classList.contains('v-field-label--floating'))
    const resting = labels.find(el => !el.classList.contains('v-field-label--floating'))

    expect(screen.getByCSS('.v-field')).toHaveClass('v-field--label-float')
    expect(screen.getByRole('textbox')).not.toBeRequired()
    expect(floating).toHaveAttribute('aria-hidden', 'true')
    expect(resting).not.toHaveAttribute('aria-hidden', 'true')
    expect(getComputedStyle(floating!).visibility).toBe('hidden')
  })

  it('hides the resting label when the field has a value', () => {
    render(() => <VTextField label="Name" modelValue="Ada" />)

    const resting = screen.getAllByText('Name').find(el => !el.classList.contains('v-field-label--floating'))
    const floating = screen.getAllByText('Name').find(el => el.classList.contains('v-field-label--floating'))

    expect(getComputedStyle(resting!).visibility).toBe('hidden')
    expect(getComputedStyle(floating!).visibility).not.toBe('hidden')
  })

  it('keeps a fixed label floated while the field is empty', () => {
    render(() => <VTextField label="Name" labelVariant="fixed" variant="outlined" />)

    const { labelEl, field } = boxes('Name')
    expect(field).toHaveClass('v-field--label-fixed')
    expect(labelEl).toHaveClass('v-field-label--floating')
    expect(labelEl).not.toHaveAttribute('aria-hidden', 'true')
    expect(getComputedStyle(labelEl).visibility).not.toBe('hidden')
    expect(getComputedStyle(field.querySelector('.v-field__outline__notch')!, '::before').opacity).toBe('0')
  })

  it.each(['adjacent', 'above'] as const)('places the %s label above the field', variant => {
    render(() => (
      <div>
        { fieldVariants.map(fieldVariant => (
          <VTextField label={ `${fieldVariant} name` } labelVariant={ variant } variant={ fieldVariant } />
        ))}
        <VTextField label="compact name" labelVariant={ variant } density="compact" />
      </div>
    ))

    for (const fieldVariant of fieldVariants) {
      const { labelEl, fieldBox, labelBox, inputBox } = boxes(`${fieldVariant} name`)
      expect(labelEl).toHaveClass('v-field-label--adjacent')
      expect(labelEl.closest('.v-field')).toHaveClass('v-field--label-adjacent')
      expect(labelBox.bottom).toBeLessThanOrEqual(inputBox.top + 1)
      expect(labelBox.bottom).toBeLessThanOrEqual(fieldBox.top + 1)
      expect(Math.abs(labelBox.left - fieldBox.left)).toBeLessThanOrEqual(1)
    }

    const compact = boxes('compact name')
    expect(compact.labelBox.bottom).toBeLessThanOrEqual(compact.fieldBox.top + 1)
  })

  it('keeps an adjacent label visible with a value and in an error state', () => {
    const model = ref('Ada')
    render(() => (
      <VTextField
        v-model={ model.value }
        label="Name"
        labelVariant="adjacent"
        error
      />
    ))

    const { labelEl } = boxes('Name')
    expect(getComputedStyle(labelEl).visibility).not.toBe('hidden')
    expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue('Ada')
  })

  it('focuses the input from an adjacent label', async () => {
    render(() => <VTextField label="Name" labelVariant="adjacent" color="primary" />)

    const { labelEl, input } = boxes('Name')
    await userEvent.click(labelEl)
    expect(input).toHaveFocus()
    expect(labelEl.className).toMatch(/text-primary/)
  })

  it('aligns an outer icon with the field when the label is adjacent', () => {
    render(() => (
      <VTextField label="Name" labelVariant="adjacent" prependIcon="$vuetify" />
    ))

    const { fieldBox } = boxes('Name')
    const icon = screen.getByCSS('.v-input__prepend .v-icon')
    const iconBox = icon.getBoundingClientRect()
    const iconMid = iconBox.top + iconBox.height / 2

    expect(iconMid).toBeGreaterThanOrEqual(fieldBox.top - 1)
    expect(iconMid).toBeLessThanOrEqual(fieldBox.bottom + 1)
  })

  it('aligns an adjacent label with the field in rtl', () => {
    render(() => (
      <VLocaleProvider rtl>
        <VTextField label="Name" labelVariant="adjacent" />
      </VLocaleProvider>
    ))

    const { labelBox, fieldBox } = boxes('Name')
    expect(Math.abs(labelBox.right - fieldBox.right)).toBeLessThanOrEqual(1)
  })

  it.each(['single-line', 'inline'] as const)('keeps a %s label inside the field', variant => {
    render(() => <VTextField label="Name" labelVariant={ variant } />)

    const field = screen.getByCSS('.v-field')
    expect(field).toHaveClass('v-field--single-line')
    expect(field.querySelector('.v-field-label--floating')).toBeNull()
    expect(screen.getByText('Name')).toBeVisible()
  })

  it('warns that single-line is deprecated', () => {
    render(() => <VTextField label="Name" singleLine />)

    expect(screen.getByCSS('.v-field')).toHaveClass('v-field--single-line')
    expect("'single-line' is deprecated, use 'label-variant=\"single-line\"' instead.").toHaveBeenTipped()
  })

  it('appends an asterisk and sets the native required attribute', () => {
    render(() => (
      <div>
        <VTextField label="Name" required />
        <VTextarea label="Notes" required />
        <VFileInput label="File" required />
      </div>
    ))

    for (const input of screen.getAllByRole('textbox')) {
      expect(input).toBeRequired()
    }
    expect(screen.getAllByCSS('.v-field-label__asterisk').length).toBeGreaterThan(0)
    expect(screen.getByRole('textbox', { name: 'Notes' })).toBeRequired()
    expect(screen.getByCSS('input[type="file"]')).toBeRequired()
  })

  it('lets the label slot render its own required indicator', () => {
    render(() => (
      <VTextField label="Name" required>
        {{
          label: ({ required }: { required: boolean }) => (
            <span data-testid="custom-label">{ required ? 'Name *' : 'Name' }</span>
          ),
        }}
      </VTextField>
    ))

    expect(screen.getAllByTestId('custom-label').every(el => el.textContent === 'Name *')).toBe(true)
    expect(screen.queryByCSS('.v-field-label__asterisk')).toBeNull()
  })

  it('shows the placeholder for an empty adjacent field', () => {
    render(() => (
      <VTextField label="Name" labelVariant="adjacent" placeholder="First" />
    ))

    const input = screen.getByRole('textbox', { name: 'Name' })
    expect(getComputedStyle(input, '::placeholder').opacity).not.toBe('0')
  })

  it('exposes labelVariant on VField', () => {
    render(() => <VField label="Name" labelVariant="adjacent" id="field" />)

    const label = screen.getByText('Name')
    expect(label).toHaveClass('v-field-label--adjacent')
    expect(label).toHaveAttribute('for', 'field')
  })
})
