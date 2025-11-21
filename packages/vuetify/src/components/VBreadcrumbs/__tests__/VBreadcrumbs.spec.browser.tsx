// Components
import { VBreadcrumbs } from '../VBreadcrumbs'
import { VBreadcrumbsDivider } from '../VBreadcrumbsDivider'
import { VBreadcrumbsItem } from '../VBreadcrumbsItem'

// Utilities
import { render, screen, userEvent } from '@test'

describe('VBreadcrumbs', () => {
  it('should use item slot', async () => {
    render(() => (
      <VBreadcrumbs items={['hello', 'world']}>
        {{
          title: ({ item }: any) => `${item.title}!`,
        }}
      </VBreadcrumbs>
    ))

    const items = screen.getAllByText(/hello!|world!/i)
    expect(items).toHaveLength(2)
    await expect.element(items[0]).toHaveTextContent('hello!')
  })

  it('should use divider slot', () => {
    render(() => (
      <VBreadcrumbs items={['hello', 'world']}>
        {{
          divider: () => '-',
        }}
      </VBreadcrumbs>
    ))

    expect(screen.getByText('-')).toBeVisible()
  })

  it('should use bg-color', () => {
    render(() => (
      <VBreadcrumbs items={['hello', 'world']} bgColor="primary"></VBreadcrumbs>
    ))
    expect(screen.getByCSS('.v-breadcrumbs')).toHaveClass('bg-primary')
  })

  it('should use color', () => {
    render(() => (
      <VBreadcrumbs items={['hello', 'world']} color="primary"></VBreadcrumbs>
    ))

    const items = screen.getAllByCSS('.v-breadcrumbs-item')
    items.forEach(item => expect(item).toHaveClass('text-primary'))
  })

  it('should render link if href is set', () => {
    render(() => (
      <VBreadcrumbs
        items={[
          { title: 'hello', href: '/hello' },
          { title: 'world', href: '/world' },
        ]}
      ></VBreadcrumbs>
    ))

    const links = screen.getAllByCSS('a.v-breadcrumbs-item--link')
    links.forEach(link => expect(link).toHaveAttribute('href'))
  })

  it('should apply active color', async () => {
    render(() => (
      <VBreadcrumbs activeColor="primary">
        <VBreadcrumbsItem active title="hello"></VBreadcrumbsItem>
        <VBreadcrumbsItem title="world" to="/world"></VBreadcrumbsItem>
      </VBreadcrumbs>
    ))
    // Initial check for the active color class
    expect(screen.getByCSS('.v-breadcrumbs-item.text-primary')).toBeVisible()

    const items = screen.getAllByCSS('.v-breadcrumbs-item')
    await expect.element(items[0]).toHaveClass('text-primary')
  })
  it('should disable last item by default if using items prop', async () => {
    render(() => (
      <VBreadcrumbs items={['foo', 'bar']}></VBreadcrumbs>
    ))

    const lastItem = screen.getByCSS('.v-breadcrumbs-item:last-child')
    await expect.element(lastItem).toHaveClass('v-breadcrumbs-item--disabled')
  })

  it('should override last item disabled by default', async () => {
    render(() => (
      <VBreadcrumbs
        items={['foo', { title: 'bar', disabled: false }]}
      ></VBreadcrumbs>
    ))

    const lastItem = screen.getByCSS('.v-breadcrumbs-item:last-child')
    await expect.element(lastItem).not.toHaveClass('v-breadcrumbs-item--disabled')
  })

  it('should provide default divider', () => {
    render(() => (
      <VBreadcrumbs>
        <VBreadcrumbsItem title="foo"></VBreadcrumbsItem>
        <VBreadcrumbsDivider></VBreadcrumbsDivider>
        <VBreadcrumbsItem title="bar"></VBreadcrumbsItem>
        <VBreadcrumbsDivider divider="-"></VBreadcrumbsDivider>
        <VBreadcrumbsItem title="fizz"></VBreadcrumbsItem>
      </VBreadcrumbs>
    ))

    expect(screen.getByText('/')).toBeVisible()
    expect(screen.getByText('-')).toBeVisible()
  })

  it('should collapse into ellipsis when items exceed totalVisible', async () => {
    render(() => (
      <VBreadcrumbs
        items={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']}
        totalVisible={ 5 }
      />
    ))

    const ellipsis = screen.getByText('...')
    expect(ellipsis).toBeVisible()
    expect(ellipsis).toHaveClass('v-breadcrumbs-item--ellipsis')
  })

  it('should expand all items when ellipsis is clicked and collapseInMenu = false', async () => {
    render(() => (
      <VBreadcrumbs
        items={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']}
        totalVisible={ 5 }
        collapseInMenu={ false }
      />
    ))

    const ellipsis = screen.getByText('...')
    expect(ellipsis).toBeVisible()

    await userEvent.click(ellipsis)

    const items = screen.getAllByCSS('.v-breadcrumbs-item')
    expect(items).toHaveLength(8)
  })

  it('should show a VMenu when collapseInMenu = true', async () => {
    render(() => (
      <VBreadcrumbs
        items={[
          { title: 'a' },
          { title: 'b', href: '/b' },
          { title: 'c', href: '/c' },
          { title: 'd' },
        ]}
        totalVisible={ 3 }
        collapseInMenu
      />
    ))

    const ellipsis = screen.getByText('...')
    expect(ellipsis).toBeVisible()

    await userEvent.click(ellipsis)

    // Le menu doit maintenant être rendu
    const listItems = screen.getAllByText(/b|c/)
    expect(listItems).toHaveLength(2)
  })

  it('should not use VMenu when collapseInMenu = false', () => {
    render(() => (
      <VBreadcrumbs
        items={['a', 'b', 'c', 'd']}
        totalVisible={ 3 }
        collapseInMenu={ false }
      />
    ))

    const ellipsis = screen.getByText('...')
    expect(ellipsis).toBeVisible()

    const menu = screen.queryByCSS('.v-menu')
    expect(menu).toBeNull()
  })
})
