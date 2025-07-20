// Components
import { VList, VListItem } from '..'

// Utilities
import { generate, render, screen, userEvent } from '@test'
import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const FAKE_ROUTES = [
  { path: '/', component: { template: 'Home' } },
  { path: '/about', component: { template: 'About' } },
  { path: '/other', component: { template: 'Other' } },
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
  it.skip('should set active item on route change', () => {
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

    router.push('/about')

    expect(screen.getAllByCSS('.v-list-item')[1]).toHaveClass('v-list-item--active')
  })

  it.skip('should change route when clicking item with to prop', async () => {
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

    expect(router.currentRoute.value.path).to.equal('/about')
  })

  it.skip('should deselect v-list-item if route changes externally', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: FAKE_ROUTES,
    })

    // eslint-disable-next-line sonarjs/no-identical-functions
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

    expect(screen.getAllByCSS('.v-list-item')[1]).toHaveClass('v-list-item--active')

    expect(router.currentRoute.value.path).toBe('/about')

    router.push('/other')

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

  describe('Showcase', () => {
    generate({ stories })
  })
})
