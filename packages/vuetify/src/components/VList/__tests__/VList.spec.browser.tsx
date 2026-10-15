// Components
import { VList, VListItem, VListItemAction, VListSubheader } from '..'
import { VCheckboxBtn } from '../../VCheckbox'
import { VLocaleProvider } from '../../VLocaleProvider'

// Utilities
import { render, screen, showcase, userEvent } from '@test'
import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const FAKE_ROUTES = [
  { path: '/', component: { template: 'Home' } },
  { path: '/about', component: { template: 'About' } },
  { path: '/other', component: { template: 'Other' } },
  { path: '/__vitest_test__/:path(.*)', component: { template: 'Test' } },
]

const NESTED_ITEMS = [
  { title: 'Foo', subtitle: 'Bar', value: 'foo' },
  {
    title: 'Group',
    value: 'group',
    children: [
      { title: 'Child', subtitle: 'Subtitle', value: 'child' },
    ],
  },
]

const stories = {
  'With nested items': <VList items={ NESTED_ITEMS } />,
  'With opened group': <VList items={ NESTED_ITEMS } opened={['group']} />,
  'With item slot': (
    <VList items={ NESTED_ITEMS } opened={['group']}>
      {{
        item: item => <VListItem { ...item } prependIcon="mdi-home" />,
      }}
    </VList>
  ),
  'With lines': (
    <>
      { (['one', 'two', 'three'] as const).map(v => (
        <VList lines={ v }>
          <VListItem>lines { v }</VListItem>
        </VList>
      ))}
    </>
  ),
  'With density': (
    <>
      { (['default', 'comfortable', 'compact'] as const).map(v => (
        <VList density={ v }>
          <VListItem>density { v }</VListItem>
        </VList>
      ))}
    </>
  ),
}

describe('VList', () => {
  it.each([
    { name: 'default LTR', density: 'default', rtl: false },
    { name: 'comfortable LTR', density: 'comfortable', rtl: false },
    { name: 'compact LTR', density: 'compact', rtl: false },
    { name: 'compact RTL', density: 'compact', rtl: true },
    { name: 'overridden control density', density: 'compact', controlDensity: 'default', rtl: false },
  ] as const)('should align selection controls with subheaders ($name)', ({ density, controlDensity, rtl }) => {
    render(() => (
      <VLocaleProvider rtl={ rtl }>
        <VList density={ density }>
          <VListSubheader>Heading</VListSubheader>
          <VListItem title="Item">
            {{
              prepend: () => (
                <VListItemAction start>
                  <VCheckboxBtn density={ controlDensity } modelValue />
                </VListItemAction>
              ),
              append: () => (
                <VListItemAction end>
                  <VCheckboxBtn density={ controlDensity } modelValue />
                </VListItemAction>
              ),
            }}
          </VListItem>
        </VList>
      </VLocaleProvider>
    ))

    const subheader = screen.getByText('Heading').closest('.v-list-subheader')!
    const subheaderStyles = getComputedStyle(subheader)
    const subheaderRect = subheader.getBoundingClientRect()
    const [startIcon, endIcon] = screen.getAllByCSS('.v-selection-control .v-icon')
      .map(element => element.getBoundingClientRect())
    const startEdge = rtl
      ? subheaderRect.right - parseFloat(subheaderStyles.paddingRight)
      : subheaderRect.left + parseFloat(subheaderStyles.paddingLeft)
    const endEdge = rtl
      ? subheaderRect.left + parseFloat(subheaderStyles.paddingLeft)
      : subheaderRect.right - parseFloat(subheaderStyles.paddingRight)

    expect(rtl ? startIcon.right : startIcon.left).toBeCloseTo(startEdge, 0)
    expect(rtl ? endIcon.left : endIcon.right).toBeCloseTo(endEdge, 0)
  })

  it('should set active item on route change', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: FAKE_ROUTES,
    })

    render(() => (
      <VList>
        <VListItem to="/" title="Home" />
        <VListItem to="/about" title="About" />
      </VList>
    ), {
      global: {
        plugins: [router],
      },
    })

    await router.push('/about')

    expect(screen.getAllByCSS('.v-list-item')[1]).toHaveClass('v-list-item--active')
  })

  it('should change route when clicking item with to prop', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: FAKE_ROUTES,
    })

    render(() => (
      <VList>
        <VListItem to="/" title="Home" />
        <VListItem to="/about" title="About" />
      </VList>
    ), {
      global: {
        plugins: [router],
      },
    })

    await userEvent.click(screen.getAllByCSS('.v-list-item')[1])

    expect(router.currentRoute.value.path).toBe('/about')
  })

  it('should deselect v-list-item if route changes externally', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: FAKE_ROUTES,
    })

    render(() => (
      <VList>
        <VListItem to="/" title="Home" />
        <VListItem to="/about" title="About" />
      </VList>
    ), {
      global: {
        plugins: [router],
      },
    })

    await userEvent.click(screen.getAllByCSS('.v-list-item')[1])

    await router.isReady()

    expect(screen.getAllByCSS('.v-list-item')[1]).toHaveClass('v-list-item--active')

    expect(router.currentRoute.value.path).toBe('/about')

    await router.push('/other')

    expect(screen.getAllByCSS('.v-list-item')[1]).not.toHaveClass('v-list-item--active')
  })

  // https://github.com/vuetifyjs/vuetify/issues/18304
  it('should support return-object', async () => {
    const selectedItem = ref([])
    const items = [
      { id: '1', title: 'Events' },
      { id: '2', title: 'Labour' },
      { id: '3', title: 'Equipment' },
    ]

    render(() => (
      <VList
        items={ items }
        onUpdate:selected={ (val: any) => selectedItem.value = val }
        itemValue="id"
        itemTitle="title"
        returnObject
      />
    ))

    await userEvent.click(screen.getAllByCSS('.v-list-item')[1])

    expect(selectedItem.value).toEqual([items[1]])
  })

  describe('value-comparator', () => {
    it('should apply to initial selected', async () => {
      const caseItems = [
        {
          title: 'Group A',
          value: 'GROUP_A',
          children: [
            { title: 'Alpha', value: 'ALPHA' },
            { title: 'Beta', value: 'BETA' },
          ],
        },
        {
          title: 'Group B',
          value: 'GROUP_B',
          children: [
            { title: 'Gamma', value: 'GAMMA' },
            { title: 'Delta', value: 'DELTA' },
          ],
        },
      ]
      const selected = ref<string[]>(['beta', 'delta'])

      render(() => (
        <VList
          v-model:selected={ selected.value }
          items={ caseItems }
          opened={['GROUP_A', 'GROUP_B']}
          selectStrategy="independent"
          valueComparator={ (a: string, b: string) => a.toLowerCase() === b.toLowerCase() }
        />
      ))

      expect(screen.getByText('Beta').closest('.v-list-item')).toHaveClass('v-list-item--active')
      expect(screen.getByText('Delta').closest('.v-list-item')).toHaveClass('v-list-item--active')
      expect(screen.getByText('Alpha').closest('.v-list-item')).not.toHaveClass('v-list-item--active')
      expect(screen.getByText('Gamma').closest('.v-list-item')).not.toHaveClass('v-list-item--active')
    })

    it('should apply to initial activated', async () => {
      const caseItems = [
        { title: 'Alpha', value: 'ALPHA' },
        { title: 'Beta', value: 'BETA' },
        { title: 'Gamma', value: 'GAMMA' },
      ]
      const activated = ref<string[]>(['beta'])

      render(() => (
        <VList
          v-model:activated={ activated.value }
          items={ caseItems }
          activatable
          activeStrategy="independent"
          valueComparator={ (a: string, b: string) => a.toLowerCase() === b.toLowerCase() }
        />
      ))

      expect(screen.getByText('Beta').closest('.v-list-item')).toHaveClass('v-list-item--active')
      expect(screen.getByText('Alpha').closest('.v-list-item')).not.toHaveClass('v-list-item--active')
      expect(screen.getByText('Gamma').closest('.v-list-item')).not.toHaveClass('v-list-item--active')
    })
  })

  showcase({ stories })
})
