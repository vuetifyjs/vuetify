// Components
import { VCombobox } from '../VCombobox'
import { VForm } from '@/components/VForm'

// Utilities
import { generate, render, screen, userEvent, waitAnimationFrame, waitIdle } from '@test'
import { cloneVNode, ref } from 'vue'

const variants = ['underlined', 'outlined', 'filled', 'solo', 'plain'] as const
const densities = ['default', 'comfortable', 'compact'] as const
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'] as const

const stories = Object.fromEntries(Object.entries({
  'Default input': <VCombobox />,
  Disabled: <VCombobox items={ items } disabled />,
  Affixes: <VCombobox items={ items } prefix="prefix" suffix="suffix" />,
  'Prepend/append': <VCombobox items={ items } prependIcon="$vuetify" appendIcon="$vuetify" />,
  'Prepend/append inner': <VCombobox items={ items } prependInnerIcon="$vuetify" appendInnerIcon="$vuetify" />,
  Placeholder: <VCombobox items={ items } placeholder="placeholder" persistentPlaceholder />,
}).map(([k, v]) => [k, (
  <div class="d-flex flex-column flex-grow-1">
    { variants.map(variant => (
      densities.map(density => (
        <div class="d-flex align-start" style="gap: 0.4rem; height: 100px;">
          { cloneVNode(v, { variant, density, label: `${variant} ${density}` }) }
          { cloneVNode(v, { variant, density, label: `with value`, modelValue: ['California'] }) }
          { cloneVNode(v, { variant, density, label: `chips`, chips: true, modelValue: ['California'] }) }
          <VCombobox
            variant={ variant }
            density={ density }
            modelValue={['California']}
            label="selection slot"
            { ...v.props }
          >{{
            selection: ({ item }) => {
              return item.title
            },
          }}
          </VCombobox>
        </div>
      ))
    )).flat()}
  </div>
)]))

describe('VCombobox', () => {
  describe('closableChips', () => {
    it('should close only first chip', async () => {
      const items = [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ]

      const selectedItems = [
        'Item 1',
        'Item 2',
        'Item 3',
      ]

      render(() => (
        <VCombobox items={ items } modelValue={ selectedItems } multiple closableChips chips />
      ))

      await userEvent.click(screen.getAllByTestId('close-chip')[0])
      await expect.poll(() => screen.getAllByCSS('.v-chip')).toHaveLength(2)
    })
  })

  describe('complex objects', () => {
    it('single', async () => {
      const items = [
        { title: 'Item 1', value: 'item1' },
        { title: 'Item 2', value: 'item2' },
        { title: 'Item 3', value: 'item3' },
        { title: 'Item 4', value: 'item4' },
      ]
      const model = ref()
      const search = ref()
      const updateModel = vi.fn(val => model.value = val)
      const updateSearch = vi.fn(val => search.value = val)

      const { element } = render(() => (
        <VCombobox
          modelValue={ model.value }
          search={ search.value }
          onUpdate:modelValue={ updateModel }
          onUpdate:search={ updateSearch }
          items={ items }
        />
      ))

      await userEvent.click(element)
      await userEvent.click((await screen.findAllByRole('option'))[0])
      expect(model.value).toStrictEqual(items[0])
      expect(search.value).toBe(items[0].title)
      expect(screen.getByRole('textbox')).toHaveValue(items[0].title)
      expect(screen.getByCSS('.v-combobox__selection')).toHaveTextContent(items[0].title)

      await userEvent.click(element)
      await userEvent.keyboard('{Control>}a{/Ctrl}{Backspace}')
      await userEvent.keyboard('Item 2')
      expect(model.value).toBe('Item 2')
      expect(search.value).toBe('Item 2')
      expect(screen.getByRole('textbox')).toHaveValue('Item 2')
      expect(screen.getByCSS('.v-combobox__selection')).toHaveTextContent('Item 2')

      await userEvent.click(element)
      await userEvent.keyboard('{Control>}a{/Ctrl}{Backspace}')
      await userEvent.keyboard('item3')
      expect(model.value).toBe('item3')
      expect(search.value).toBe('item3')
      expect(screen.getByRole('textbox')).toHaveValue('item3')
      expect(screen.getByCSS('.v-combobox__selection')).toHaveTextContent('item3')
    })

    it('multiple', async () => {
      const items = [
        { title: 'Item 1', value: 'item1' },
        { title: 'Item 2', value: 'item2' },
        { title: 'Item 3', value: 'item3' },
        { title: 'Item 4', value: 'item4' },
      ]
      const model = ref<(string | typeof items[number])[]>([])
      const search = ref()
      const updateModel = vi.fn(val => model.value = val)
      const updateSearch = vi.fn(val => search.value = val)

      const { element } = render(() => (
        <VCombobox
          modelValue={ model.value }
          search={ search.value }
          onUpdate:modelValue={ updateModel }
          onUpdate:search={ updateSearch }
          multiple
          items={ items }
        />
      ))

      await userEvent.click(element)
      await userEvent.click(screen.getAllByRole('option')[0])
      expect(model.value).toStrictEqual([items[0]])
      expect(search.value).toBeUndefined()
      expect(screen.getByRole('textbox')).toHaveValue('')
      expect(screen.getByCSS('.v-combobox__selection')).toHaveTextContent(items[0].title)

      await userEvent.click(element)
      await userEvent.keyboard('Item 2{tab}')
      expect(model.value).toStrictEqual([items[0], 'Item 2'])
      expect(search.value).toBe('')
      expect(screen.getByRole('textbox')).toHaveValue('')
      expect(screen.getAllByCSS('.v-combobox__selection').at(-1)).toHaveTextContent('Item 2')

      await userEvent.click(element)
      await userEvent.keyboard('item3{tab}')
      expect(model.value).toStrictEqual([items[0], 'Item 2', 'item3'])
      expect(search.value).toBe('')
      expect(screen.getByRole('textbox')).toHaveValue('')
      expect(screen.getAllByCSS('.v-combobox__selection').at(-1)).toHaveTextContent('item3')
    })
  })

  describe('search', () => {
    it('should filter items', async () => {
      const items = [
        'Item 1',
        'Item 1a',
        'Item 2',
        'Item 2a',
      ]

      const { element } = render(() => (
        <VCombobox items={ items } />
      ))

      await userEvent.click(element)
      await userEvent.keyboard('Item')
      await expect(screen.findAllByRole('option')).resolves.toHaveLength(4)
      await userEvent.keyboard('{Control>}a{/Ctrl}{Backspace}')
      await userEvent.keyboard('Item 1')
      await expect(screen.findAllByRole('option')).resolves.toHaveLength(2)
      await userEvent.keyboard('{Control>}a{/Ctrl}{Backspace}')
      await userEvent.keyboard('Item 3')
      expect(screen.queryAllByRole('option')).toHaveLength(0)
    })

    it('should filter items when using multiple', async () => {
      const items = [
        'Item 1',
        'Item 1a',
        'Item 2',
        'Item 2a',
      ]

      const { element } = render(() => (
        <VCombobox items={ items } multiple />
      ))

      await userEvent.click(element)
      await userEvent.keyboard('Item')
      await expect(screen.findAllByRole('option')).resolves.toHaveLength(4)
      await userEvent.keyboard('{Control>}a{/Ctrl}{Backspace}')
      await userEvent.keyboard('Item 1')
      await expect(screen.findAllByRole('option')).resolves.toHaveLength(2)
      await userEvent.keyboard('{Control>}a{/Ctrl}{Backspace}')
      await userEvent.keyboard('Item 3')
      expect(screen.queryAllByRole('option')).toHaveLength(0)
    })

    it('should filter with custom item shape', async () => {
      const items = [
        {
          id: 1,
          name: 'Test1',
        },
        {
          id: 2,
          name: 'Antonsen PK',
        },
      ]

      const { element } = render(() => (
        <VCombobox
          items={ items }
          item-value="id"
          item-title="name"
        />
      ))

      await userEvent.click(element)
      await userEvent.keyboard('test')
      await expect(screen.findByRole('option')).resolves.toHaveTextContent('Test1')

      await userEvent.keyboard('{Control>}a{/Ctrl}{Backspace}')
      await userEvent.keyboard('antonsen')
      await expect(screen.findByRole('option')).resolves.toHaveTextContent('Antonsen PK')
    })
  })

  describe('prefilled data', () => {
    it('should work with array of strings when using multiple', async () => {
      const items = ref(['California', 'Colorado', 'Florida'])

      const selectedItems = ref(['California', 'Colorado'])

      const { element } = render(() => (
        <VCombobox
          v-model={ selectedItems.value }
          items={ items.value }
          multiple
          chips
          closableChips
        />
      ))

      await userEvent.click(element)

      await expect(screen.findAllByRole('option', { selected: true })).resolves.toHaveLength(2)
      expect(screen.getAllByCSS('.v-chip')).toHaveLength(2)

      await userEvent.click(screen.getAllByTestId('close-chip')[0])
      await expect(screen.findByRole('textbox')).resolves.toBeVisible()
      expect(screen.getAllByCSS('.v-chip')).toHaveLength(1)
      expect(selectedItems.value).toStrictEqual(['Colorado'])
    })

    it('should work with objects when using multiple', async () => {
      const items = ref([
        {
          title: 'Item 1',
          value: 'item1',
        },
        {
          title: 'Item 2',
          value: 'item2',
        },
        {
          title: 'Item 3',
          value: 'item3',
        },
      ])

      const selectedItems = ref(
        [
          {
            title: 'Item 1',
            value: 'item1',
          },
          {
            title: 'Item 2',
            value: 'item2',
          },
        ]
      )

      const { element } = render(() => (
        <VCombobox
          v-model={ selectedItems.value }
          items={ items.value }
          multiple
          chips
          closableChips
          returnObject
        />
      ))

      await userEvent.click(element)

      await expect(screen.findAllByRole('option', { selected: true })).resolves.toHaveLength(2)
      expect(screen.getAllByCSS('.v-chip')).toHaveLength(2)

      await userEvent.click(screen.getAllByTestId('close-chip')[0])
      await expect(screen.findByRole('textbox')).resolves.toBeVisible()
      expect(screen.getAllByCSS('.v-chip')).toHaveLength(1)
      expect(selectedItems.value).toStrictEqual([{
        title: 'Item 2',
        value: 'item2',
      }])
    })

    it('should work with objects when using multiple and item-value', async () => {
      const items = ref([
        {
          text: 'Item 1',
          id: 'item1',
        },
        {
          text: 'Item 2',
          id: 'item2',
        },
        {
          text: 'Item 3',
          id: 'item3',
        },
      ])

      const selectedItems = ref(
        [
          {
            text: 'Item 1',
            id: 'item1',
          },
          {
            text: 'Item 2',
            id: 'item2',
          },
        ]
      )

      const { element } = render(() => (
        <VCombobox
          v-model={ selectedItems.value }
          items={ items.value }
          multiple
          item-title="text"
          item-value="value"
          return-object
        />
      ))

      await userEvent.click(element)

      const options = await screen.findAllByRole('option', { selected: true })
      expect(options).toHaveLength(2)
      const input = await screen.findByRole('combobox')
      expect(input).toHaveTextContent('Item 1')
      expect(input).toHaveTextContent('Item 2')

      await userEvent.click(options[0])

      expect(selectedItems.value).toStrictEqual([{
        text: 'Item 2',
        id: 'item2',
      }])
    })
  })

  describe('readonly', () => {
    it('should not be clickable when in readonly', async () => {
      const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

      const selectedItems = 'Item 1'

      const { element } = render(() => (
        <VCombobox
          items={ items }
          modelValue={ selectedItems }
          readonly
        />
      ))

      await userEvent.click(element)

      expect(screen.queryAllByRole('option')).toHaveLength(0)
      expect(screen.queryAllByRole('listbox')).toHaveLength(0)

      await userEvent.keyboard('{ArrowDown}')
      expect(screen.queryAllByRole('option')).toHaveLength(0)
      expect(screen.queryAllByRole('listbox')).toHaveLength(0)
    })

    it('should not be clickable when in readonly form', async () => {
      const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

      const selectedItems = 'Item 1'

      const { element } = render(() => (
        <VForm readonly>
          <VCombobox
            items={ items }
            modelValue={ selectedItems }
            readonly
          />
        </VForm>
      ))

      await userEvent.click(element)

      expect(screen.queryAllByRole('option')).toHaveLength(0)
      expect(screen.queryAllByRole('listbox')).toHaveLength(0)

      await userEvent.keyboard('{ArrowDown}')
      expect(screen.queryAllByRole('option')).toHaveLength(0)
      expect(screen.queryAllByRole('listbox')).toHaveLength(0)
    })
  })

  describe('hide-selected', () => {
    it('should hide selected item(s)', async () => {
      const items = [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ]

      const selectedItems = [
        'Item 1',
        'Item 2',
      ]

      const { element } = render(() => (
        <VCombobox items={ items } modelValue={ selectedItems } multiple hideSelected />
      ))

      await userEvent.click(element)

      const listItems = await screen.findAllByRole('option')
      expect(listItems).toHaveLength(2)
      expect(listItems[0]).toHaveTextContent('Item 3')
      expect(listItems[1]).toHaveTextContent('Item 4')
    })
  })

  // https://github.com/vuetifyjs/vuetify/issues/17120
  it('should display 0 when selected', async () => {
    const items = [0, 1, 2, 3, 4]

    const selectedItems = ref(undefined)

    const { element } = render(() => (
      <VCombobox
        items={ items }
        v-model={ selectedItems.value }
      />
    ))

    await userEvent.click(element)

    await userEvent.click(screen.getAllByRole('option')[0])

    expect(screen.getByRole('textbox')).toHaveValue('0')
  })

  it('should conditionally show placeholder', async () => {
    const { rerender } = render(VCombobox, {
      props: { placeholder: 'Placeholder' },
    })

    const input = screen.getByRole('textbox')
    await expect.element(input).toHaveAttribute('placeholder', 'Placeholder')

    await rerender({ label: 'Label' })
    await expect.element(input).not.toBeVisible()

    await userEvent.click(input)
    await expect.element(input).toHaveAttribute('placeholder', 'Placeholder')
    expect(input).toBeVisible()

    await userEvent.tab()
    await rerender({ persistentPlaceholder: true })
    await expect.element(input).toHaveAttribute('placeholder', 'Placeholder')
    expect(input).toBeVisible()

    await rerender({ modelValue: 'Foobar' })
    await expect.element(input).not.toHaveAttribute('placeholder')

    await rerender({ multiple: true, modelValue: ['Foobar'] })
    await expect.element(input).not.toHaveAttribute('placeholder')
  })

  it('should keep TextField focused while selecting items from open menu', async () => {
    const { element } = render(() => (
      <VCombobox
        multiple
        items={['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']}
      />
    ))

    await userEvent.click(element)

    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{ArrowDown}')

    expect(screen.getByCSS('.v-field')).toHaveClass('v-field--focused')
  })

  it('should not open menu when closing a chip', async () => {
    const { element } = render(() => (
      <VCombobox
        chips
        closable-chips
        items={['foo', 'bar']}
        label="Select"
        modelValue={['foo', 'bar']}
        multiple
      />
    ))

    expect(screen.queryAllByRole('listbox')).toHaveLength(0)

    await userEvent.click(screen.getAllByTestId('close-chip')[1])
    expect(screen.queryAllByRole('listbox')).toHaveLength(0)

    await userEvent.click(screen.getByTestId('close-chip'))
    expect(screen.queryAllByRole('listbox')).toHaveLength(0)

    await userEvent.click(element)
    expect(screen.queryAllByRole('listbox')).toHaveLength(1)
    await userEvent.keyboard('{Escape}')
    await expect.poll(() => screen.queryAllByRole('listbox')).toHaveLength(0)
  })

  describe('auto-select-first', () => {
    it('should auto-select-first item when pressing enter', async () => {
      const selectedItems = ref([])

      const { element } = render(() => (
        <VCombobox
          v-model={ selectedItems.value }
          items={['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']}
          multiple
          autoSelectFirst
        />
      ))

      await userEvent.click(element)
      expect(screen.getAllByRole('option')).toHaveLength(6)

      await userEvent.keyboard('Cal')
      await expect(screen.findByRole('option')).resolves.toHaveClass('v-list-item--active')
      await userEvent.keyboard('{Enter}')
      await expect.poll(() => screen.queryAllByRole('option')).toHaveLength(6)
      expect(selectedItems.value).toStrictEqual(['California'])
    })

    it('should auto-select-first item when pressing tab', async () => {
      const selectedItems = ref([])

      const { element } = render(() => (
        <VCombobox
          v-model={ selectedItems.value }
          items={['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']}
          multiple
          autoSelectFirst
        />
      ))

      await userEvent.click(element)
      expect(screen.getAllByRole('option')).toHaveLength(6)

      await userEvent.keyboard('Cal')
      await expect(screen.findByRole('option')).resolves.toHaveClass('v-list-item--active')
      await userEvent.keyboard('{Tab}')
      await expect.poll(() => screen.queryAllByRole('option')).toHaveLength(0)
      expect(selectedItems.value).toStrictEqual(['California'])
    })

    it('should not auto-select-first item when blur', async () => {
      const selectedItems = ref([])

      const { element } = render(() => (
        <VCombobox
          v-model={ selectedItems.value }
          items={['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']}
          multiple
          autoSelectFirst
        />
      ))

      await userEvent.click(element)
      expect(screen.getAllByRole('option')).toHaveLength(6)

      await userEvent.keyboard('Cal')
      await expect(screen.findByRole('option')).resolves.toHaveClass('v-list-item--active')
      await userEvent.click(document.body)
      await expect.poll(() => screen.queryAllByRole('option')).toHaveLength(0)
      expect(selectedItems.value).toStrictEqual(['Cal'])
    })
  })

  it(`doesn't add duplicate values`, async () => {
    const selection = ref([])
    const { element } = render(() => (
      <VCombobox v-model={ selection.value } multiple />
    ))

    await userEvent.click(element)
    await userEvent.keyboard('foo{Enter}')
    await userEvent.keyboard('bar{Enter}')
    expect(selection.value).toHaveLength(2)

    await userEvent.keyboard('foo{Enter}')
    expect(selection.value).toHaveLength(2)
  })

  // https://github.com/vuetifyjs/vuetify/issues/18796
  it('should allow deleting selection via closable-chips', async () => {
    const selectedItem = ref('California')

    render(() => (
      <VCombobox
        chips
        v-model={ selectedItem.value }
        closable-chips
        items={['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']}
      />
    ))

    await userEvent.click(screen.getByTestId('close-chip'))
    expect(selectedItem.value).toBeNull()
  })

  // https://github.com/vuetifyjs/vuetify/issues/18556
  it('should show menu if focused and items are added', async () => {
    const { rerender } = render(VCombobox)

    await userEvent.keyboard('{Tab}')
    await waitAnimationFrame()
    expect(screen.queryByRole('listbox')).toBeNull()

    await rerender({ items: ['Foo', 'Bar'] })
    await expect(screen.findByRole('listbox')).resolves.toBeVisible()
  })

  // https://github.com/vuetifyjs/vuetify/issues/19346
  it('should not show menu when focused and existing non-empty items are changed', async () => {
    const { element, rerender } = render(VCombobox, {
      props: { items: ['Foo', 'Bar'] },
    })

    await userEvent.click(element)
    await expect(screen.findByRole('listbox')).resolves.toBeVisible()

    await userEvent.click(screen.getAllByRole('option')[0])
    await rerender({ items: ['Foo', 'Bar', 'test'] })
    await waitIdle()
    await expect.poll(() => screen.queryByRole('listbox')).toBeNull()
  })

  // https://github.com/vuetifyjs/vuetify/issues/17573
  // When using selection slot or chips, input displayed next to chip/selection slot should be always empty
  it('should always have empty input value when it is unfocused and when using selection slot or chips', async () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
    const selectedItem = ref('Item 1')

    const { element, getByCSS } = render(() => (
      <VCombobox
        items={ items }
        chips
        v-model={ selectedItem.value }
      />
    ))

    await userEvent.click(element)
    const input = getByCSS('input')
    expect(input).toHaveValue('')

    // Blur input with a custom search input value
    await userEvent.keyboard('test')
    input.blur()
    await expect.poll(() => selectedItem.value).toBe('test')
    expect(input).toHaveValue('')

    // Press enter key with a custom search input value
    await userEvent.click(element)
    await userEvent.keyboard('test 2{Enter}')
    await expect.poll(() => selectedItem.value).toBe('test 2')
    expect(input).toHaveValue('')

    // Search existing item and click to select
    await userEvent.click(element)
    expect(input).toHaveValue('')
    await userEvent.keyboard('Item 1')
    await userEvent.click(await screen.findByRole('option'))
    await expect.poll(() => selectedItem.value).toBe('Item 1')
  })

  // https://github.com/vuetifyjs/vuetify/issues/19319
  it('should respect return-object when blurring', async () => {
    const items = [
      { title: 'Item 1', value: 'item1' },
      { title: 'Item 2', value: 'item2' },
      { title: 'Item 3', value: 'item3' },
      { title: 'Item 4', value: 'item4' },
    ]
    const model = ref()
    const search = ref()

    const { element } = render(() => (
      <VCombobox
        search={ search.value }
        v-model={ model.value }
        items={ items }
      />
    ))

    await userEvent.click(element)
    await userEvent.click(screen.getAllByRole('option')[0])
    expect(model.value).toStrictEqual({ title: 'Item 1', value: 'item1' })

    await userEvent.click(document.body)
    expect(model.value).toStrictEqual({ title: 'Item 1', value: 'item1' })
  })

  it.only('should not fire @update:focus twice when clicking bottom of input', async () => {
    const onFocus = vi.fn()
    const { element } = render(() => (
      <VCombobox  onUpdate:focused={ onFocus } />
    ))

    // Simulate click at bottom of input
    await userEvent.click(element, { y: 1 })

    expect(onFocus).toHaveBeenCalledTimes(1)
  })

  describe('Showcase', () => {
    generate({ stories })
  })
})
