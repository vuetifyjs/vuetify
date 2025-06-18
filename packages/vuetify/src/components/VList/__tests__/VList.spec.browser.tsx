// Components
import { VList, VListItem } from '..'

// Utilities
import { render, userEvent } from '@test'
import { ref } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'

describe('VList', () => {
  it('supports the density property', () => {
    const densities = ['default', 'comfortable', 'compact'] as const
    const { container } = render(() => (
      <div>
        { densities.map(density => (
          <VList density={ density }>
            <VListItem>density { density }</VListItem>
          </VList>
        ))}
      </div>
    ))

    expect(container.querySelector('.v-list--density-default')).toBeInTheDocument()
    expect(container.querySelector('.v-list--density-comfortable')).toBeInTheDocument()
    expect(container.querySelector('.v-list--density-compact')).toBeInTheDocument()
  })

  it('supports the lines property', () => {
    const lines = ['one', 'two', 'three'] as const
    const { container } = render(() => (
      <div>
        { lines.map(number => (
          <VList lines={ number }>
            <VListItem>lines { number }</VListItem>
          </VList>
        ))}
      </div>
    ))

    expect(container.querySelector('.v-list--one-line')).toBeInTheDocument()
    expect(container.querySelector('.v-list--two-line')).toBeInTheDocument()
    expect(container.querySelector('.v-list--three-line')).toBeInTheDocument()
  })

  it('supports items prop', () => {
    const items = [
      { title: 'Foo', subtitle: 'Bar', value: 'foo' },
      {
        title: 'Group',
        value: 'group',
        children: [
          { title: 'Child', subtitle: 'Subtitle', value: 'child' },
        ],
      },
    ]
    const { container } = render(() => (
      <VList items={ items } opened={['group']} />
    ))

    expect(container.querySelectorAll('.v-list-item')).toHaveLength(3)
  })

  it('supports item slot', () => {
    const items = [
      { title: 'Foo', subtitle: 'Bar', value: 'foo' },
      {
        title: 'Group',
        value: 'group',
        children: [
          { title: 'Child', subtitle: 'Subtitle', value: 'child' },
        ],
      },
    ]
    const { container } = render(() => (
      <VList items={ items } opened={['group']}>
        {{
          item: ({ props: itemProps }) => <VListItem { ...itemProps } prependIcon="mdi-home" />,
        }}
      </VList>
    ))

    // Since group headers don't have icons, we expect 2 (Foo and Child)
    expect(container.querySelectorAll('.v-icon.mdi-home')).toHaveLength(2)
  })

  it('should set active item on route change', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: 'Home' } },
        { path: '/about', component: { template: 'About' } },
      ],
    })

    const { container } = render(() => (
      <VList>
        <VListItem to="/" title="Home" />
        <VListItem to="/about" title="About" />
      </VList>
    ), { global: { plugins: [router] } })

    await router.push('/about')
    await router.isReady() // Ensure router has processed the navigation

    const activeItem = container.querySelector('.v-list-item--active')
    expect(activeItem).toBeInTheDocument()
    expect(activeItem).toHaveTextContent('About')
  })

  it('should change route when clicking item with to prop', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: 'Home' } },
        { path: '/about', component: { template: 'About' } },
      ],
    })

    const { container } = render(() => (
      <VList>
        <VListItem to="/" title="Home" />
        <VListItem to="/about" title="About" />
      </VList>
    ), { global: { plugins: [router] } })

    const aboutLink = container.querySelectorAll('.v-list-item')[1]
    await userEvent.click(aboutLink)
    await router.isReady()

    expect(router.currentRoute.value.path).toBe('/about')
  })

  it('should deselect v-list-item if route changes externally', async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [
        { path: '/', component: { template: 'Home' } },
        { path: '/about', component: { template: 'About' } },
        { path: '/other', component: { template: 'Other' } },
      ],
    })

    const { container } = render(() => (
      <VList>
        <VListItem to="/" title="Home" />
        <VListItem to="/about" title="About" />
      </VList>
    ), { global: { plugins: [router] } })

    const aboutLink = container.querySelectorAll('.v-list-item')[1]
    await userEvent.click(aboutLink)
    await router.isReady()
    expect(aboutLink).toHaveClass('v-list-item--active')
    expect(router.currentRoute.value.path).toBe('/about')

    await router.push('/other')
    await router.isReady()

    expect(aboutLink).not.toHaveClass('v-list-item--active')
  })

  it('should support return-object', async () => {
    const selectedItem = ref([])
    const items = [
      { id: '1', title: 'Events' },
      { id: '2', title: 'Labour' },
      { id: '3', title: 'Equipment' },
    ]

    const { container } = render(() => (
      <VList
        items={ items }
        returnObject
        onUpdate:selected={ (val: any) => selectedItem.value = val }
        itemValue="id"
        itemTitle="title"
      />
    ))

    const itemToSelect = container.querySelectorAll('.v-list-item')[1]
    await userEvent.click(itemToSelect)

    expect(selectedItem.value).toEqual([items[1]])
  })
})
