// Components
import { VBreadcrumbs } from '../VBreadcrumbs'
import { VBreadcrumbsDivider } from '../VBreadcrumbsDivider'
import { VBreadcrumbsItem } from '../VBreadcrumbsItem'
import { createVuetify } from '@/framework'

// Utilities
import { render } from '@testing-library/vue'

const vuetify = createVuetify()

describe('VBreadcrumbs', () => {
  it('should use item slot', () => {
    const { getAllByText } = render(
      <VBreadcrumbs items={['hello', 'world']}>
        {{
          title: ({ item }: any) => `${item.title}!`,
        }}
      </VBreadcrumbs>,
      {
        global: {
          plugins: [vuetify],
        },
      },
    )

    const items = getAllByText(/hello!|world!/i)
    expect(items).toHaveLength(2)
    expect(items[0]).toHaveTextContent('hello!')
  })

  it('should use divider slot', () => {
    const { getByText } = render(
      <VBreadcrumbs items={['hello', 'world']}>
        {{
          divider: () => '-',
        }}
      </VBreadcrumbs>,
      {
        global: {
          plugins: [vuetify],
        },
      },
    )

    expect(getByText('-')).toBeTruthy()
  })

  it('should use bg-color', () => {
    const { container } = render(
      <VBreadcrumbs
        items={['hello', 'world']}
        bgColor="primary"
      ></VBreadcrumbs>,

      {
        global: {
          plugins: [vuetify],
        },
      },
    )
    expect(container.querySelector('.v-breadcrumbs')).toHaveClass('bg-primary')
  })

  it('should use color', () => {
    const { container } = render(
      <VBreadcrumbs items={['hello', 'world']} color="primary"></VBreadcrumbs>,

      {
        global: {
          plugins: [vuetify],
        },
      },
    )
    const items = container.querySelectorAll('.v-breadcrumbs-item')
    items.forEach(item => expect(item).toHaveClass('text-primary'))
  })

  it('should render link if href is set', () => {
    const { container } = render(
      <VBreadcrumbs
        items={[
          { title: 'hello', href: '/hello' },
          { title: 'world', href: '/world' },
        ]}
      ></VBreadcrumbs>,

      {
        global: {
          plugins: [vuetify],
        },
      },
    )
    const links = container.querySelectorAll('a.v-breadcrumbs-item--link')
    links.forEach(link => expect(link).toHaveAttribute('href'))
  })

  it('should apply active color', async () => {
    const { container } = render(
      {
        components: {
          VBreadcrumbs,
          VBreadcrumbsItem,
        },
        template: `
          <VBreadcrumbs active-color="primary">
            <VBreadcrumbsItem active text="hello"></VBreadcrumbsItem>
            <VBreadcrumbsItem text="world" to="/world"></VBreadcrumbsItem>
          </VBreadcrumbs>
        `,
      },
      {
        global: { plugins: [vuetify] },
      },
    )

    // Initial check for the active color class
    expect(
      container.querySelector('.v-breadcrumbs-item.text-primary'),
    ).toBeTruthy()

    const items = container.querySelectorAll('.v-breadcrumbs-item')
    expect(items[0]).toHaveClass('text-primary')
  })
  it('should disable last item by default if using items prop', () => {
    const { container } = render(
      <VBreadcrumbs items={['foo', 'bar']}></VBreadcrumbs>,

      {
        global: {
          plugins: [vuetify],
        },
      },
    )
    const lastItem = container.querySelector('.v-breadcrumbs-item:last-child')
    expect(lastItem).toHaveClass('v-breadcrumbs-item--disabled')
  })

  it('should override last item disabled by default', () => {
    const { container } = render(
      <VBreadcrumbs
        items={['foo', { title: 'bar', disabled: false }]}
      ></VBreadcrumbs>,

      {
        global: {
          plugins: [vuetify],
        },
      },
    )
    const lastItem = container.querySelector('.v-breadcrumbs-item:last-child')
    expect(lastItem).not.toHaveClass('v-breadcrumbs-item--disabled')
  })

  it('should provide default divider', () => {
    const { getByText } = render(
      <VBreadcrumbs>
        <VBreadcrumbsItem title="foo"></VBreadcrumbsItem>
        <VBreadcrumbsDivider></VBreadcrumbsDivider>
        <VBreadcrumbsItem title="bar"></VBreadcrumbsItem>
        <VBreadcrumbsDivider divider="-"></VBreadcrumbsDivider>
        <VBreadcrumbsItem title="fizz"></VBreadcrumbsItem>
      </VBreadcrumbs>,
      {
        global: {
          plugins: [vuetify],
        },
      },
    )
    expect(getByText('/')).toBeTruthy()
    expect(getByText('-')).toBeTruthy()
  })
})
