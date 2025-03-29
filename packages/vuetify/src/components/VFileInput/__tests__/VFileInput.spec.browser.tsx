// Components
import { VFileInput } from '../VFileInput'

// Utilities
import { CenteredGrid, generate, render, screen, userEvent } from '@test'
import { cloneVNode, defineComponent, ref } from 'vue'

const oneMBFile = new File([new ArrayBuffer(1021576)], '1MB file')
const twoMBFile = new File([new ArrayBuffer(2021152)], '2MB file')

const variants = ['underlined', 'outlined', 'filled', 'solo', 'plain'] as const
const densities = ['default', 'comfortable', 'compact'] as const
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'] as const

const stories = Object.fromEntries(Object.entries({
  'Default input': <VFileInput />,
  Disabled: <VFileInput items={ items } disabled />,
  'Prepend/append': <VFileInput items={ items } prependIcon="$vuetify" appendIcon="$vuetify" />,
  'Prepend/append inner': <VFileInput items={ items } prependInnerIcon="$vuetify" appendInnerIcon="$vuetify" />,
  Placeholder: <VFileInput items={ items } placeholder="placeholder" persistentPlaceholder />,
}).map(([k, v]) => [k, (
  <div class="d-flex flex-column flex-grow-1">
    { variants.map(variant => (
      densities.map(density => (
        <div class="d-flex align-start" style="gap: 0.4rem; height: 100px;">
          { cloneVNode(v, { variant, density, label: `${variant} ${density}` }) }
          { cloneVNode(v, { variant, density, label: `with value`, modelValue: [oneMBFile, twoMBFile] }) }
          { cloneVNode(v, { variant, density, label: `chips`, chips: true, modelValue: [oneMBFile, twoMBFile] }) }
          <VFileInput
            variant={ variant }
            density={ density }
            modelValue={[oneMBFile, twoMBFile]}
            label="selection slot"
            { ...v.props }
          >{{
            selection: ({ fileNames }) => {
              return fileNames.map(f => f)
            },
          }}
          </VFileInput>
        </div>
      ))
    )).flat()}
  </div>
)]))

describe('VFileInput', () => {
  it('should add file', async () => {
    const model = ref()
    const { element } = render(() => (
      <VFileInput v-model={ model.value } accept="text/plain" />
    ))

    const input = screen.getByCSS('input')

    await userEvent.upload(input, 'text.txt')
    expect(element).toHaveTextContent('text.txt')
    expect(model.value).toEqual(expect.objectContaining({ name: 'text.txt' }))
  })

  it('should show number of files', async () => {
    const { element } = render(() => (
      <VFileInput modelValue={[oneMBFile, twoMBFile]} multiple counter />
    ))

    expect(element).toHaveTextContent('2 files')
  })

  it('should show size of files', async () => {
    const { element } = render(() => (
      <VFileInput modelValue={[oneMBFile, twoMBFile]} multiple show-size />
    ))

    expect(element).toHaveTextContent('1MB file (1.0 MB), 2MB file (2.0 MB)')
  })

  it('should show total size of files in counter', async () => {
    const { element } = render(() => (
      <VFileInput modelValue={[oneMBFile, twoMBFile]} multiple counter show-size />
    ))

    expect(element).toHaveTextContent('2 files (3.0 MB in total)')
  })

  it('should clear input', async () => {
    const model = ref([oneMBFile, twoMBFile])
    const { element } = render(() => (
      <VFileInput v-model={ model.value } multiple />
    ))

    await userEvent.click(screen.getByLabelText(/clear/i))

    expect(element).not.toHaveTextContent('1MB file, 2MB file')
    expect(model.value).toHaveLength(0)
    expect(screen.getByCSS('input')).toHaveValue('')
  })

  it('should support removing clearable icon', async () => {
    render(() => (
      <VFileInput modelValue={[oneMBFile, twoMBFile]} clearable={ false } />
    ))

    expect(screen.queryAllByLabelText(/clear/i)).toHaveLength(0)
  })

  it('should be disabled', async () => {
    render(() => (
      <VFileInput modelValue={[oneMBFile, twoMBFile]} disabled />
    ))
    expect(screen.getByCSS('input')).toBeDisabled()
  })

  it('should support no prepend icon', async () => {
    render(() => (
      <VFileInput modelValue={[oneMBFile, twoMBFile]} prependIcon="" />
    ))
    expect(screen.queryAllByCSS('.v-file-input .v-input__prepend')).toHaveLength(0)
  })

  it('should support chips', () => {
    render(() => (
      <VFileInput modelValue={[oneMBFile, twoMBFile]} chips />
    ))
    expect(screen.getAllByCSS('.v-file-input .v-chip')).toHaveLength(2)
  })

  // https://github.com/vuetifyjs/vuetify/issues/8167
  it('should not emit change event when input is blurred', async () => {
    const change = vi.fn()
    const update = vi.fn()
    render(() => (
      <VFileInput onChange={ change } onUpdate:modelValue={ update } />
    ))

    const input = screen.getByCSS('input')
    input.focus()
    await userEvent.upload(input, 'text.txt')
    await userEvent.tab()

    expect(change).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledTimes(1)
  })

  it('should put extra attributes on input', () => {
    render(() => (
      <VFileInput label="foo" accept="image/*" />
    ))
    expect(screen.getByCSS('input')).toHaveAttribute('accept', 'image/*')
  })

  // https://github.com/vuetifyjs/vuetify/issues/16486
  it('should reset the underlying HTMLInput when model is controlled input', async () => {
    render(defineComponent({
      setup () {
        const files = ref<File[]>([])
        const onReset = () => {
          files.value = []
        }
        return () => (
          <CenteredGrid width="400px">
            <VFileInput modelValue={ files.value } />
            <button type="button" onClick={ onReset }>Reset Model Value</button>
          </CenteredGrid>
        )
      },
    }))

    const input = screen.getByCSS('input') as HTMLInputElement
    expect(input.files).toHaveLength(0)

    // add file
    await userEvent.upload(input, 'text.txt')
    expect(input.files).toHaveLength(1)

    // reset input from wrapper/parent component
    await userEvent.click(screen.getByText(/reset/i))
    expect(input.files).toHaveLength(0)

    // add same file again
    await userEvent.upload(input, 'text.txt')
    expect(input.files).toHaveLength(1)

    // reset input from wrapper/parent component
    await userEvent.click(screen.getByText(/reset/i))
    expect(input.files).toHaveLength(0)
  })

  describe('Showcase', () => {
    generate({ stories })
  })
})
