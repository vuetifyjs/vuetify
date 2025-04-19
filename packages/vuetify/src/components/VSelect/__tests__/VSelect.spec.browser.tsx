// Components
import { VSelect } from '../VSelect'
import { VForm } from '@/components/VForm'
import { VListItem } from '@/components/VList'

// Utilities
import { commands, generate, render, screen, userEvent } from '@test'
import { getAllByRole } from '@testing-library/vue'
import { cloneVNode, ref } from 'vue'

const variants = ['underlined', 'outlined', 'filled', 'solo', 'plain'] as const
const densities = ['default', 'comfortable', 'compact'] as const
const items = ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'] as const

const stories = Object.fromEntries(Object.entries({
  'Default input': <VSelect items={ items } />,
  Disabled: <VSelect items={ items } disabled />,
  Affixes: <VSelect items={ items } prefix="prefix" suffix="suffix" />,
  'Prepend/append': <VSelect items={ items } prependIcon="$vuetify" appendIcon="$vuetify" />,
  'Prepend/append inner': <VSelect items={ items } prependInnerIcon="$vuetify" appendInnerIcon="$vuetify" />,
  Placeholder: <VSelect items={ items } placeholder="placeholder" persistentPlaceholder />,
}).map(([k, v]) => [k, (
  <div class="d-flex flex-column flex-grow-1">
    { variants.map(variant => (
      densities.map(density => (
        <div class="d-flex align-start" style="gap: 0.4rem; height: 100px;">
          { cloneVNode(v, { variant, density, label: `${variant} ${density}` }) }
          { cloneVNode(v, { variant, density, label: `with value`, modelValue: ['California'] }) }
          { cloneVNode(v, { variant, density, label: `chips`, chips: true, modelValue: ['California'] }) }
          <VSelect
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
          </VSelect>
        </div>
      ))
    )).flat()}
  </div>
)]))

describe('VSelect', () => {
  it('should render selection slot', () => {
    const items = [
      { title: 'a' },
      { title: 'b' },
      { title: 'c' },
    ]
    let model: { title: string }[] = [{ title: 'b' }]

    render(() => (
      <VSelect
        multiple
        returnObject
        items={ items }
        modelValue={ model }
        onUpdate:modelValue={ val => model = val }
      >
        {{
          selection: ({ item, index }) => {
            return item.raw.title.toUpperCase()
          },
        }}
      </VSelect>
    ))

    expect(screen.getByCSS('.v-select__selection')).toHaveTextContent('B')
  })

  it('should render prepend-item slot', () => {
    render(() => (
      <VSelect menu items={['Item #1', 'Item #2']}>
        {{
          'prepend-item': () => (
            <VListItem title="Foo"></VListItem>
          ),
        }}
      </VSelect>
    ))

    expect(screen.getAllByCSS('.v-list-item')[0]).toHaveTextContent('Foo')
  })

  it('should render append-item slot', () => {
    render(() => (
      <VSelect menu items={['Item #1', 'Item #2']}>
        {{
          'append-item': () => (
            <VListItem title="Foo"></VListItem>
          ),
        }}
      </VSelect>
    ))
    expect(screen.getAllByCSS('.v-list-item').at(-1)).toHaveTextContent('Foo')
  })

  it('should close only first chip', async () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

    const selectedItems = ['Item 1', 'Item 2', 'Item 3']

    render(() => (
      <VSelect
        items={ items }
        modelValue={ selectedItems }
        chips
        closableChips
        multiple
      />
    ))

    await userEvent.click(screen.getAllByTestId('close-chip')[0])
    await expect.poll(() => screen.getAllByCSS('.v-chip')).toHaveLength(2)
  })

  describe('prefilled data', () => {
    it('should work with array of strings when using multiple', async () => {
      const items = ['California', 'Colorado', 'Florida']

      const selectedItems = ref(['California', 'Colorado'])

      const { element } = render(() => (
        <VSelect v-model={ selectedItems.value } items={ items } multiple chips closableChips />
      ))

      await userEvent.click(element)
      await expect(screen.findAllByRole('option', { selected: true })).resolves.toHaveLength(2)

      const option = screen.getAllByRole('option')[2]
      await commands.waitStable('.v-list')
      await userEvent.click(option)
      expect(selectedItems.value).toStrictEqual(['California', 'Colorado', 'Florida'])

      await userEvent.click(screen.getAllByTestId('close-chip')[0])
      expect(screen.getAllByCSS('.v-chip')).toHaveLength(2)
      expect(selectedItems.value).toStrictEqual(['Colorado', 'Florida'])
    })

    it('should work with objects when using multiple', async () => {
      const items = [
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
      ]

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
        <VSelect
          v-model={ selectedItems.value }
          items={ items }
          multiple
          chips
          closableChips
          returnObject
        />
      ))

      await userEvent.click(element)
      await expect(screen.findAllByRole('option', { selected: true })).resolves.toHaveLength(2)
      await commands.waitStable('.v-list')
      await userEvent.click(screen.getAllByRole('option')[2])
      expect(selectedItems.value).toStrictEqual([
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

      await userEvent.click(screen.getAllByTestId('close-chip')[0])
      expect(screen.getAllByCSS('.v-chip')).toHaveLength(2)
      expect(selectedItems.value).toStrictEqual([
        {
          title: 'Item 2',
          value: 'item2',
        },
        {
          title: 'Item 3',
          value: 'item3',
        },
      ])
    })

    it('should work with objects when using multiple and item-value', async () => {
      const items = [
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
      ]

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

      const { element } = render(() => (
        <VSelect
          v-model={ selectedItems.value }
          items={ items }
          multiple
          returnObject
          item-title="text"
          item-value="id"
        />
      ))

      await userEvent.click(element)
      await commands.waitStable('.v-list')
      const options = screen.getAllByRole('option', { selected: true })
      expect(options).toHaveLength(2)
      expect(element).toHaveTextContent('Item 1')
      expect(element).toHaveTextContent('Item 2')

      await userEvent.click(options[0])
      expect(selectedItems.value).toStrictEqual([{
        text: 'Item 2',
        id: 'item2',
      }])
    })
  })

  it('should not be clickable when in readonly', async () => {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

    const selectedItems = 'Item 1'

    const { element } = render(() => (
      <VSelect
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
        <VSelect
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
        <VSelect
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
        <VSelect
          label="Language"
          items={ items }
          modelValue={ null }
          itemTitle="name"
          itemValue="code"
        />
      ))
      expect(screen.queryAllByCSS('.v-field--dirty')).toHaveLength(0)
    })
  })

  it('should conditionally show placeholder', async () => {
    const { rerender } = render(VSelect, {
      props: { placeholder: 'Placeholder' },
    })

    const input = screen.getByCSS('input')
    await expect.element(input).toHaveAttribute('placeholder', 'Placeholder')

    await rerender({ label: 'Label' })
    await expect.element(input).not.toHaveAttribute('placeholder')
    input.focus()
    await expect.element(input).toHaveAttribute('placeholder', 'Placeholder')
    input.blur()
    await expect.element(input).not.toHaveAttribute('placeholder')

    await rerender({ persistentPlaceholder: true })
    await expect.element(input).toHaveAttribute('placeholder', 'Placeholder')

    await rerender({ modelValue: 'Foobar' })
    await expect.element(input).not.toHaveAttribute('placeholder')

    await rerender({ multiple: true, modelValue: ['Foobar'] })
    await expect.element(input).not.toHaveAttribute('placeholder')
  })

  // https://github.com/vuetifyjs/vuetify/issues/16210
  it('should return item object as the argument of item-title function', async () => {
    const items = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ]

    const selectedItems = ref(null)

    const itemTitleFunc = vi.fn((item: any) => (
      'Item: ' + JSON.stringify(item)
    ))

    const { element } = render(() => (
      <VSelect
        items={ items }
        modelValue={ selectedItems }
        item-title={ itemTitleFunc }
        item-value="id"
      />
    ))

    await userEvent.click(element)
    await commands.waitStable('.v-list')
    await userEvent.click(screen.getAllByRole('option')[0])
    expect(selectedItems.value).toBe(1)
    expect(itemTitleFunc).toHaveBeenCalledWith({ id: 1, name: 'a' }, expect.anything())
    expect(element).toHaveTextContent(`Item: {"id":1,"name":"a"}`)
  })

  describe('hide-selected', () => {
    it('should hide selected item(s)', async () => {
      const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4']

      const selectedItems = ref(['Item 1', 'Item 2'])

      const { element } = render(() => (
        <VSelect v-model={ selectedItems.value } items={ items } multiple hideSelected />
      ))

      await userEvent.click(element)
      await commands.waitStable('.v-list')
      const options = screen.getAllByRole('option')
      expect(options).toHaveLength(2)
      expect(options[0]).toHaveTextContent('Item 3')
      expect(options[1]).toHaveTextContent('Item 4')
    })

    // https://github.com/vuetifyjs/vuetify/issues/19806
    it('should hide selected item(s) with return-object', async () => {
      const selectedItem = ref({ text: 'Item 1', id: 'item1' })
      const items = [
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
      ]
      const { element } = render(() => (
        <VSelect
          v-model={ selectedItem.value }
          hideSelected
          items={ items }
          item-title="text"
          item-value="id"
          returnObject
        />
      ))

      await userEvent.click(element)
      await commands.waitStable('.v-list')
      expect(screen.queryAllByRole('option', { selected: true })).toHaveLength(0)
      let options = screen.getAllByRole('option')
      expect(options).toHaveLength(2)
      expect(options[0]).toHaveTextContent('Item 2')

      await userEvent.click(options[0])
      expect(selectedItem.value).toStrictEqual({ text: 'Item 2', id: 'item2' })
      expect(screen.queryAllByRole('option', { selected: true })).toHaveLength(0)
      options = screen.getAllByRole('option')
      expect(options).toHaveLength(2)
      expect(options[0]).toHaveTextContent('Item 1')
    })
  })

  // https://github.com/vuetifyjs/vuetify/issues/16055
  it('should select item after typing its first few letters', async () => {
    const items = ['aaa', 'foo', 'faa']
    const selectedItems = ref()

    const { element } = render(() => (
      <VSelect
        v-model={ selectedItems.value }
        items={ items }
      />
    ))

    await userEvent.click(element)
    await commands.waitStable('.v-list')
    await userEvent.keyboard('f')
    expect(screen.getAllByRole('option')).toHaveLength(3)
    expect(selectedItems.value).toBe('foo')
  })

  it('should keep TextField focused while selecting items from open menu', async () => {
    const { element } = render(() => (
      <VSelect
        items={['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']}
      />
    ))

    await userEvent.click(element)
    await commands.waitStable('.v-list')
    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{ArrowDown}')
    expect(screen.getByCSS('.v-field')).toHaveClass('v-field--focused')
  })

  it('should not open menu when closing a chip', async () => {
    const { element } = render(() => (
      <VSelect
        chips
        closable-chips
        items={['foo', 'bar']}
        label="Select"
        modelValue={['foo', 'bar']}
        multiple
      />
    ))

    await expect.poll(() => screen.queryByRole('listbox')).toBeNull()
    await userEvent.click(screen.getAllByTestId('close-chip')[1])
    await expect.poll(() => screen.queryByRole('listbox')).toBeNull()
    await userEvent.click(screen.getByTestId('close-chip'))
    await expect.poll(() => screen.queryByRole('listbox')).toBeNull()
    await userEvent.click(element)
    await expect.poll(() => screen.queryByRole('listbox')).toBeVisible()
    await userEvent.keyboard('{Escape}')
    await expect.poll(() => screen.queryByRole('listbox')).toBeNull()
  })

  // https://github.com/vuetifyjs/vuetify/issues/19235
  it('should update v-model when click closable chip', async () => {
    const selectedItem = ref('abc')

    render(() => (
      <VSelect
        v-model={ selectedItem.value }
        chips
        closable-chips
        items={['abc', 'def']}
      />
    ))

    await userEvent.click(screen.getByTestId('close-chip'))
    expect(selectedItem.value).toBeNull()
  })

  // https://github.com/vuetifyjs/vuetify/issues/19261
  it('should not toggle v-model to null when clicking already selected item in single selection mode', async () => {
    const selectedItem = ref('abc')

    const { element } = render(() => (
      <VSelect
        v-model={ selectedItem.value }
        items={['abc', 'def']}
      />
    ))

    await userEvent.click(element)
    await commands.waitStable('.v-list')
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(2)
    await userEvent.click(options[0])
    expect(selectedItem.value).toBe('abc')
  })

  // https://github.com/vuetifyjs/vuetify/issues/18556
  it('should show menu if focused and items are added', async () => {
    const { rerender } = render(VSelect)

    await userEvent.keyboard('{Tab}')
    expect(screen.queryByRole('listbox')).toBeNull()

    await rerender({ items: ['Foo', 'Bar'] })
    await expect.poll(() => screen.queryByRole('listbox')).toBeVisible()
  })

  // https://github.com/vuetifyjs/vuetify/issues/19346
  it('should not show menu when focused and existing non-empty items are changed', async () => {
    const { element, rerender } = render(VSelect, {
      props: { items: ['Foo', 'Bar'] },
    })

    await userEvent.click(element)
    await expect.poll(() => screen.queryByRole('listbox')).toBeVisible()
    await userEvent.click(screen.getAllByRole('option')[0])

    await rerender({ items: ['Foo', 'Bar', 'test', 'test 2'] })
    await expect.poll(() => screen.queryByRole('listbox')).toBeNull()
  })

  describe('reactivity', () => {
    it('adds a new item', async () => {
      const items = ref(['Foo'])
      const { element } = render(() => (
        <VSelect items={ items.value } />
      ))

      await userEvent.click(element)
      await expect.poll(() => screen.queryByRole('listbox')).toBeVisible()

      items.value.push('Bar')
      await expect.poll(() => screen.getByText('Bar')).toBeVisible()
    })

    it('removes an item', async () => {
      const items = ref(['Foo', 'Bar'])
      const { element } = render(() => (
        <VSelect items={ items.value } />
      ))

      await userEvent.click(element)
      await expect.poll(() => screen.queryByRole('listbox')).toBeVisible()

      items.value.splice(1, 1)
      await expect.element(screen.getByText('Bar')).not.toBeVisible()
    })

    it('updates an item title', async () => {
      const items = ref([{ title: 'Foo' }])
      const { element } = render(() => (
        <VSelect items={ items.value } />
      ))

      await userEvent.click(element)
      await expect.poll(() => screen.queryByRole('listbox')).toBeVisible()

      items.value[0].title = 'Bar'
      await expect.poll(() => screen.getByText('Bar')).toBeVisible()
    })

    it('adds a selection externally', async () => {
      const items = ref(['Foo', 'Bar'])
      const selection = ref(['Foo'])
      const { element } = render(() => (
        <VSelect v-model={ selection.value } items={ items.value } multiple />
      ))

      await userEvent.click(element)
      const menu = await screen.findByRole('listbox')
      await expect.element(menu).toBeVisible()

      selection.value.push('Bar')
      await expect.poll(() => screen.getAllByText('Bar')).toHaveLength(2)
      expect(getAllByRole(menu, 'option', { selected: true })).toHaveLength(2)
    })

    it('removes a selection externally', async () => {
      const items = ref(['Foo', 'Bar'])
      const selection = ref(['Foo', 'Bar'])
      const { element } = render(() => (
        <VSelect v-model={ selection.value } items={ items.value } multiple />
      ))

      await userEvent.click(element)
      const menu = await screen.findByRole('listbox')
      await expect.element(menu).toBeVisible()

      selection.value.splice(1, 1)
      await expect.poll(() => screen.getAllByText('Bar')).toHaveLength(1)
      expect(getAllByRole(menu, 'option', { selected: true })).toHaveLength(1)
    })

    it('adds a selected item', async () => {
      const items = ref(['Foo'])
      const selection = ref(['Foo'])
      const { element } = render(() => (
        <VSelect v-model={ selection.value } items={ items.value } multiple />
      ))

      await userEvent.click(element)
      const menu = await screen.findByRole('listbox')
      await expect.element(menu).toBeVisible()

      items.value.push('Bar')
      selection.value.push('Bar')
      await expect.poll(() => screen.getAllByText('Bar')).toHaveLength(2)
      expect(getAllByRole(menu, 'option', { selected: true })).toHaveLength(2)
    })

    it.only('should not fire @update:focus twice when clicking bottom of input', async () => {
      const onFocus = vi.fn()
      const { element } = render(() => (
        <VSelect  onUpdate:focused={ onFocus } />
      ))

      // Simulate click at bottom of input
      await userEvent.click(element, { y: 1 })

      expect(onFocus).toHaveBeenCalledTimes(1)
    })
  })

  describe('Showcase', () => {
    generate({ stories })
  })
})
