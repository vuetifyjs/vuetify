// Components
import { VAutocomplete } from '../VAutocomplete'
import { VForm } from '@/components/VForm'

// Utilities
import { generate, render, screen, userEvent, waitAnimationFrame, waitIdle } from '@test'
import { findAllByRole, queryAllByRole, within } from '@testing-library/vue'
import { cloneVNode, ref } from 'vue'

const variants = ['underlined', 'outlined', 'filled', 'solo', 'plain'] as const
const densities = ['default', 'comfortable', 'compact'] as const
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'] as const

const stories = Object.fromEntries(Object.entries({
  'Default input': <VAutocomplete />,
  Disabled: <VAutocomplete items={ items } disabled />,
  Affixes: <VAutocomplete items={ items } prefix="prefix" suffix="suffix" />,
  'Prepend/append': <VAutocomplete items={ items } prependIcon="$vuetify" appendIcon="$vuetify" />,
  'Prepend/append inner': <VAutocomplete items={ items } prependInnerIcon="$vuetify" appendInnerIcon="$vuetify" />,
  Placeholder: <VAutocomplete items={ items } placeholder="placeholder" persistentPlaceholder />,
}).map(([k, v]) => [k, (
  <div class="d-flex flex-column flex-grow-1">
    { variants.map(variant => (
      densities.map(density => (
        <div class="d-flex align-start" style="gap: 0.4rem; height: 100px;">
          { cloneVNode(v, { variant, density, label: `${variant} ${density}` }) }
          { cloneVNode(v, { variant, density, label: `with value`, modelValue: ['California'] }) }
          { cloneVNode(v, { variant, density, label: `chips`, chips: true, modelValue: ['California'] }) }
          <VAutocomplete
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
          </VAutocomplete>
        </div>
      ))
    )).flat()}
  </div>
)]))

describe('VAutocomplete', () => {
  it('should close only first chip', async () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

    const selectedItems = ref(['Item 1', 'Item 2', 'Item 3'])

    render(() => (
      <VAutocomplete
        items={ items }
        v-model={ selectedItems.value }
        chips
        closableChips
        multiple
      />
    ))

    const closeButtons = await screen.findAllByTestId('close-chip')
    await userEvent.click(closeButtons[0])

    expect(selectedItems.value).toEqual(['Item 2', 'Item 3'])
  })

  it('should have selected chip with array of strings', async () => {
    const items = ref(['California', 'Colorado', 'Florida'])

    const selectedItems = ref(['California', 'Colorado'])

    const { container } = render(() => (
      <VAutocomplete
        v-model={ selectedItems.value }
        items={ items.value }
        chips
        multiple
        closableChips
      />
    ))

    await userEvent.click(container)

    const menu = await screen.findByRole('listbox')

    let activeItems = await findAllByRole(menu, 'option', { selected: true })
    expect(activeItems).toHaveLength(2)

    await userEvent.click(activeItems[0])
    activeItems = await findAllByRole(menu, 'option', { selected: true })
    expect(activeItems).toHaveLength(1)
    expect(selectedItems.value).toEqual(['Colorado'])

    await userEvent.click(await screen.findByTestId('close-chip'))
    expect(screen.queryAllByTestId('close-chip')).toHaveLength(0)
    expect(selectedItems.value).toEqual([])
  })

  it('should have selected chip with return-object', async () => {
    const items = ref([
      {
        title: 'Item 1',
        value: 'item1',
      },
      {
        title: 'Item 2',
        value: 'item2',
      },
    ])

    const selectedItems = ref([
      {
        title: 'Item 1',
        value: 'item1',
      },
    ])

    const { container } = render(() => (
      <VAutocomplete
        v-model={ selectedItems.value }
        items={ items.value }
        returnObject
        chips
        multiple
      />
    ))

    await userEvent.click(container)

    const menu = await screen.findByRole('listbox')

    let activeItems = await findAllByRole(menu, 'option', { selected: true })
    expect(activeItems).toHaveLength(1)

    await userEvent.click(activeItems[0])
    expect(selectedItems.value).toHaveLength(0)
    activeItems = queryAllByRole(menu, 'option', { selected: true })
    expect(activeItems).toHaveLength(0)
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

    const selectedItems = ref([
      {
        text: 'Item 1',
        id: 'item1',
      },
      {
        text: 'Item 2',
        id: 'item2',
      },
    ])

    const { container } = render(() => (
      <VAutocomplete
        v-model={ selectedItems.value }
        items={ items.value }
        multiple
        returnObject
        item-title="text"
        item-value="id"
      />
    ))

    await userEvent.click(container)

    const menu = await screen.findByRole('listbox')

    const activeItems = await findAllByRole(menu, 'option', { selected: true })
    expect(activeItems).toHaveLength(2)

    const input = await screen.findByRole('combobox')
    expect(input).toHaveTextContent('Item 1')
    expect(input).toHaveTextContent('Item 2')

    await userEvent.click(activeItems[0])

    expect(input).not.toHaveTextContent('Item 1')
    expect(input).toHaveTextContent('Item 2')
    expect(selectedItems.value).toEqual([{
      text: 'Item 2',
      id: 'item2',
    }])
  })

  it('should clear input on blur when using multiple', async () => {
    const items = ref([
      {
        text: '21',
        id: 'item1',
      },
      {
        text: '22',
        id: 'item2',
      },
      {
        text: '23',
        id: 'item3',
      },
    ])

    const selectedItems = ref([
      {
        text: '21',
        id: 'item1',
      },
      {
        text: '22',
        id: 'item2',
      },
    ])

    const { container } = render(() => (
      <VAutocomplete
        v-model={ selectedItems.value }
        items={ items.value }
        multiple
        item-title="text"
        item-value="text"
      />
    ))

    await userEvent.click(container)

    const menu = await screen.findByRole('listbox')

    const activeItems = await findAllByRole(menu, 'option', { selected: true })
    expect(activeItems).toHaveLength(2)

    expect(document.activeElement).toBe(within(container).getByCSS('input'))

    const input = within(container).getByCSS('input')
    expect(input).toHaveValue('')
  })

  it('should not be clickable when in readonly', async () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

    const selectedItems = 'Item 1'

    const { element } = render(() => (
      <VAutocomplete
        items={ items }
        modelValue={ selectedItems }
        readonly
      />
    ))

    await userEvent.click(element)

    expect(screen.queryAllByRole('listbox')).toHaveLength(0)
    expect(element).not.toHaveClass('v-select--active-menu')

    screen.getByCSS('input').focus()
    await userEvent.keyboard('{ArrowDown}')

    expect(screen.queryAllByRole('listbox')).toHaveLength(0)
    expect(element).not.toHaveClass('v-select--active-menu')
  })

  it('should not be clickable when in readonly form', async () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

    const selectedItems = 'Item 1'

    render(() => (
      <VForm readonly>
        <VAutocomplete
          items={ items }
          modelValue={ selectedItems }
          readonly
        />
      </VForm>
    ))

    const element = screen.getByCSS('.v-autocomplete')

    await userEvent.click(element)
    expect(screen.queryAllByRole('listbox')).toHaveLength(0)
    expect(element).not.toHaveClass('v-select--active-menu')

    screen.getByCSS('input').focus()
    await userEvent.keyboard('{ArrowDown}')

    expect(screen.queryAllByRole('listbox')).toHaveLength(0)
    expect(element).not.toHaveClass('v-select--active-menu')
  })

  it('should remove selection if search is cleared', async () => {
    const items = ref([
      { title: 'Item 1', value: 'Item 1' },
      { title: 'Item 2', value: 'Item 2' },
    ])

    const selectedItems = ref(null)

    const { element } = render(() => (
      <VAutocomplete
        v-model={ selectedItems.value }
        items={ items.value }
        returnObject
      />
    ))

    await userEvent.click(element)
    const options = await screen.findAllByRole('option')
    expect(options).toHaveLength(2)

    await userEvent.click(options[0])

    await userEvent.click(element)
    await userEvent.keyboard('{Control>}a{/Ctrl}{Backspace}')
    await userEvent.click(document.body)

    expect(element).not.toHaveTextContent('Item 1')
  })

  // https://github.com/vuetifyjs/vuetify/issues/16210
  it('should return item object as the argument of item-title function', async () => {
    const items = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ]

    const selectedItems = ref(null)

    const itemTitle = vi.fn((item: any) => {
      return 'Item: ' + JSON.stringify(item)
    })

    const { element } = render(() => (
      <VAutocomplete
        items={ items }
        v-model={ selectedItems.value }
        item-title={ itemTitle }
        item-value="id"
      />
    ))

    await userEvent.click(element)

    await userEvent.click(screen.getAllByRole('option')[0])
    expect(selectedItems.value).toBe(1)

    expect(itemTitle).toHaveBeenCalledWith({ id: 1, name: 'a' }, expect.anything())

    expect(element).toHaveTextContent('Item: {"id":1,"name":"a"}')
  })

  // https://github.com/vuetifyjs/vuetify/issues/16442
  describe('null value', () => {
    it('should allow null as legit itemValue', async () => {
      const items = [
        { name: 'Default Language', code: null },
        { code: 'en-US', name: 'English' },
        { code: 'de-DE', name: 'German' },
      ]

      const selectedItems = null

      const { element } = render(() => (
        <VAutocomplete
          items={ items }
          modelValue={ selectedItems }
          itemTitle="name"
          itemValue="code"
        />
      ))

      expect(element).toHaveTextContent('Default Language')
    })

    it('should mark input as "not dirty" when the v-model is null, but null is not present in the items', async () => {
      const items = [
        { code: 'en-US', name: 'English' },
        { code: 'de-DE', name: 'German' },
      ]

      render(() => (
        <VAutocomplete
          label="Language"
          items={ items }
          modelValue={ null }
          itemTitle="name"
          itemValue="code"
        />
      ))

      expect(screen.getByCSS('.v-field')).not.toHaveClass('v-field--dirty')
    })
  })

  describe('hide-selected', () => {
    it('should hide selected item(s)', async () => {
      const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
      const selectedItems = ['Item 1', 'Item 2']

      render(() => (
        <VAutocomplete
          items={ items }
          modelValue={ selectedItems }
          hideSelected
          multiple
        />
      ))

      const menuIcon = screen.getByRole('button', { name: /open/i })
      await userEvent.click(menuIcon)

      const listItems = screen.getAllByRole('option')
      expect(listItems).toHaveLength(2)
      expect(listItems[0]).toHaveTextContent('Item 3')
      expect(listItems[1]).toHaveTextContent('Item 4')
    })
  })

  // https://github.com/vuetifyjs/vuetify/issues/16055
  it('should not replicate html select hotkeys in v-autocomplete', async () => {
    const items = ref(['aaa', 'foo', 'faa'])

    const selectedItems = ref(undefined)

    const { element } = render(() => (
      <VAutocomplete
        v-model={ selectedItems.value }
        items={ items.value }
      />
    ))

    await userEvent.type(element, 'f')
    const listItems = screen.getAllByRole('option')
    expect(listItems).toHaveLength(2)
    expect(selectedItems.value).toBeUndefined()
  })

  it('should conditionally show placeholder', async () => {
    const { rerender, getByCSS } = render(VAutocomplete, {
      props: { placeholder: 'Placeholder' },
    })

    const input = getByCSS('input')
    expect(input).toHaveAttribute('placeholder', 'Placeholder')

    await rerender({ label: 'Label' })
    await expect.element(input).not.toBeDisplayed()

    input.focus()
    await waitAnimationFrame()
    expect(input).toHaveAttribute('placeholder', 'Placeholder')
    await expect.element(input).toBeDisplayed()

    input.blur()
    await rerender({ persistentPlaceholder: true })
    expect(input).toHaveAttribute('placeholder', 'Placeholder')
    await expect.element(input).toBeDisplayed()

    await rerender({ modelValue: 'Foobar' })
    expect(input).not.toHaveAttribute('placeholder')

    await rerender({ multiple: true, modelValue: ['Foobar'] })
    expect(input).not.toHaveAttribute('placeholder')
  })

  it('should keep TextField focused while selecting items from open menu', async () => {
    const { element } = render(() => (
      <VAutocomplete
        multiple
        items={['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']}
      />
    ))

    await userEvent.click(element)

    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}c')

    expect(document.activeElement).toBe(within(element).getByCSS('input'))
  })

  it('should not open menu when closing a chip', async () => {
    const { element } = render(() => (
        <VAutocomplete
          chips
          closable-chips
          items={['foo', 'bar']}
          label="Autocomplete"
          modelValue={['foo', 'bar']}
          multiple
        />
    ))

    expect(screen.queryByRole('listbox')).toBeNull()

    await userEvent.click(screen.getAllByTestId('close-chip')[0])
    await waitAnimationFrame()
    expect(screen.queryByRole('listbox')).toBeNull()

    await userEvent.click(screen.getAllByTestId('close-chip')[0])
    await waitAnimationFrame()
    expect(screen.queryByRole('listbox')).toBeNull()

    await userEvent.click(element)
    await screen.findByRole('listbox')

    await userEvent.keyboard('{Escape}')
    await expect.poll(() => screen.queryByRole('listbox')).toBeNull()
  })

  describe('auto-select-first', () => {
    async function setup () {
      const selectedItems = ref()
      const { element } = render(() => (
        <VAutocomplete
          v-model={ selectedItems.value }
          items={['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']}
          multiple
          autoSelectFirst
        />
      ))
      const getItems = () => screen.queryAllByRole('option')

      await userEvent.click(element)
      await expect.poll(getItems).toHaveLength(6)

      await userEvent.keyboard('Cal')
      await expect.poll(() => getItems()[0]).toHaveClass('v-list-item--active')

      return { selectedItems, element, getItems }
    }

    it('should auto-select-first item when pressing enter', async () => {
      const { selectedItems, getItems } = await setup()

      await userEvent.keyboard('{Enter}')
      await expect.poll(getItems).toHaveLength(1)
      expect(selectedItems.value).toStrictEqual(['California'])
    })

    it('should auto-select-first item when pressing tab', async () => {
      const { selectedItems, getItems } = await setup()

      await userEvent.keyboard('{Tab}')
      await expect.poll(getItems).toHaveLength(0)
      expect(selectedItems.value).toStrictEqual(['California'])
    })

    it('should not auto-select-first item when blur', async () => {
      const { selectedItems, getItems } = await setup()

      await userEvent.click(document.body)
      await expect.poll(getItems).toHaveLength(0)
      expect(selectedItems.value).toBeUndefined()
    })
  })

  // https://github.com/vuetifyjs/vuetify/issues/18796
  // https://github.com/vuetifyjs/vuetify/issues/19235
  it('should allow deleting single selection via closable-chips', async () => {
    const selectedItem = ref('California')

    const { getByTestId } = render(() => (
      <VAutocomplete
        v-model={ selectedItem.value }
        chips
        closable-chips
        items={['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']}
      />
    ))

    await userEvent.click(getByTestId('close-chip'))
    expect(selectedItem.value).toBeNull()
  })

  it('should allow deleting multiple selection via closable-chips', async () => {
    const selectedItem = ref(['California'])

    const { getByTestId } = render(() => (
      <VAutocomplete
        v-model={ selectedItem.value }
        chips
        closable-chips
        multiple
        items={['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']}
      />
    ))

    await userEvent.click(getByTestId('close-chip'))
    expect(selectedItem.value).toHaveLength(0)
  })

  // https://github.com/vuetifyjs/vuetify/issues/19261
  it('should not remove single selection on list item click', async () => {
    const selectedItem = ref('abc')

    const { element } = render(() => (
      <VAutocomplete
        v-model={ selectedItem.value }
        items={['abc', 'def']}
      />
    ))

    await userEvent.click(element)

    const items = await screen.findAllByRole('option')
    expect(items).toHaveLength(2)

    await userEvent.click(items[0])
    await waitAnimationFrame()
    expect(selectedItem.value).toBe('abc')
  })

  // https://github.com/vuetifyjs/vuetify/issues/18556
  it('should show menu if focused and items are added', async () => {
    const { rerender } = render(VAutocomplete)

    await userEvent.keyboard('{Tab}')
    await waitAnimationFrame()
    expect(screen.queryByRole('listbox')).toBeNull()

    await rerender({ items: ['Foo', 'Bar'] })
    await expect(screen.findByRole('listbox')).resolves.toBeDisplayed()
  })

  // https://github.com/vuetifyjs/vuetify/issues/19346
  it('should not show menu when focused and existing non-empty items are changed', async () => {
    const { element, rerender } = render(VAutocomplete, {
      props: { items: ['Foo', 'Bar'] },
    })

    await userEvent.click(element)
    await expect(screen.findByRole('listbox')).resolves.toBeDisplayed()

    await userEvent.click(screen.getAllByRole('option')[0])
    await rerender({ items: ['Foo', 'Bar', 'test', 'test 2'] })
    await waitIdle()
    await expect.poll(() => screen.queryByRole('listbox')).toBeNull()
  })

  // https://github.com/vuetifyjs/vuetify/issues/17573
  // When using selection slot or chips, input displayed next to chip/selection slot should be always empty
  it('should always have empty input value when it is unfocused and when using selection slot or chips', async () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']
    const selectedItem = ref('Item 1')

    const { element, getByCSS } = render(() => (
      <VAutocomplete
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
    await expect.poll(() => selectedItem.value).toBe('Item 1')
    expect(input).toHaveValue('')

    // Search existing item and click to select
    await userEvent.click(element)
    expect(input).toHaveValue('')
    await userEvent.keyboard('Item 1')
    await userEvent.click(await screen.findByRole('option'))
    await expect.poll(() => selectedItem.value).toBe('Item 1')
  })

  describe('Showcase', () => {
    generate({ stories })
  })
})
