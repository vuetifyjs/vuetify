// Components
import { VExpansionPanel, VExpansionPanels, VExpansionPanelText, VExpansionPanelTitle } from '../'

// Utilities
import { render, userEvent } from '@test'
import { ref } from 'vue'

describe('VExpansionPanels', () => {
  it('renders using props', () => {
    const titles = ['Header 1', 'Header 2']
    const { getAllByRole } = render(() => (
      <VExpansionPanels>
        { titles.map(title => (
          <VExpansionPanel title={ title } text="Content" />
        ))}
      </VExpansionPanels>
    ))

    const panelTitles = getAllByRole('button') // Expansion panel titles are buttons
    panelTitles.forEach((item, index) => {
      expect(item).toHaveTextContent(titles[index])
    })
  })

  it('renders using slots', () => {
    const titles = ['Header 1', 'Header 2']
    const { getAllByRole } = render(() => (
      <VExpansionPanels>
        { titles.map(title => (
          <VExpansionPanel>
            {{
              title: () => title,
              text: () => 'Content',
            }}
          </VExpansionPanel>
        ))}
      </VExpansionPanels>
    ))

    const panelTitles = getAllByRole('button')
    panelTitles.forEach((item, index) => {
      expect(item).toHaveTextContent(titles[index])
    })
  })

  it('renders default slot', () => {
    const titles = ['Header 1', 'Header 2']
    const { getAllByRole } = render(() => (
      <VExpansionPanels>
        { titles.map(title => (
          <VExpansionPanel>
            <VExpansionPanelTitle>{ title }</VExpansionPanelTitle>
            <VExpansionPanelText>Content</VExpansionPanelText>
          </VExpansionPanel>
        ))}
      </VExpansionPanels>
    ))

    const panelTitles = getAllByRole('button')
    panelTitles.forEach((item, index) => {
      expect(item).toHaveTextContent(titles[index])
    })
  })

  it('responds to clicking title', async () => {
    const { container } = render(() => (
      <VExpansionPanels>
        <VExpansionPanel title="Header" text="Content" />
      </VExpansionPanels>
    ))

    const title = container.querySelector('.v-expansion-panel-title')
    expect(title).not.toHaveClass('v-expansion-panel-title--active')
    expect(container.querySelector('.v-expansion-panel-text__wrapper')).toBeNull() // Content initially hidden

    if (title) await userEvent.click(title)

    expect(title).toHaveClass('v-expansion-panel-title--active')
    expect(container.querySelector('.v-expansion-panel-text__wrapper')).not.toBeNull() // Content now visible
  })

  it('supports hide-actions prop', () => {
    const { container } = render(() => (
      <VExpansionPanels>
        <VExpansionPanel hideActions title="Header" text="Content" />
      </VExpansionPanels>
    ))
    expect(container.querySelector('.v-expansion-panel-title__icon')).toBeNull()
  })

  it('supports color props', async () => {
    const { container } = render(() => (
      <VExpansionPanels>
        <VExpansionPanel value="foo" title="Header" text="Content" color="primary" bgColor="secondary" />
      </VExpansionPanels>
    ))
    // Need to open the panel to check bg color of the panel itself
    const title = container.querySelector('.v-expansion-panel-title')
    if (title) await userEvent.click(title)

    expect(container.querySelector('.v-expansion-panel-title')).toHaveClass('bg-primary')
    expect(container.querySelector('.v-expansion-panel--active')).toHaveClass('bg-secondary')
  })

  it('supports rounded prop', () => {
    const { container } = render(() => (
      <VExpansionPanels>
        <VExpansionPanel value="foo" title="Header" text="Content" rounded="xl" />
      </VExpansionPanels>
    ))
    expect(container.querySelector('.v-expansion-panel')).toHaveClass('rounded-xl')
  })

  it('supports model-value', () => {
    const { container } = render(() => (
      <VExpansionPanels modelValue="foo">
        <VExpansionPanel value="bar" title="Header Bar" text="Content Bar" />
        <VExpansionPanel value="foo" title="Header Foo" text="Content Foo" />
      </VExpansionPanels>
    ))
    expect(container.querySelector('.v-expansion-panel--active .v-expansion-panel-title')).toHaveTextContent('Header Foo')
  })

  it('supports v-model', async () => {
    const foo = ref<string | undefined>()
    const { container } = render(() => (
      <VExpansionPanels modelValue={ foo.value } onUpdate:modelValue={ v => foo.value = v as string }>
        <VExpansionPanel value="bar" title="Header Bar" text="Content Bar" />
        <VExpansionPanel value="foo" title="Header Foo" text="Content Foo" />
        <div class="value">{ foo.value }</div>
      </VExpansionPanels>
    ))

    const titleToClick = container.querySelectorAll('.v-expansion-panel-title')[1]
    await userEvent.click(titleToClick)

    expect(titleToClick).toHaveClass('v-expansion-panel-title--active')
    expect(container.querySelector('.value')).toHaveTextContent('foo')
  })
})
