// Components
import { VExpansionPanel, VExpansionPanels, VExpansionPanelText, VExpansionPanelTitle } from '..'

// Utilities
import { render, screen, showcase, userEvent } from '@test'
import { ref } from 'vue'

const stories = {
  'With rounded': (
    <VExpansionPanels>
      <VExpansionPanel value="foo" title="Header" text="Content" rounded="xl" />
    </VExpansionPanels>
  ),
  'Single panel expanded': (
    <VExpansionPanels modelValue="foo">
      <VExpansionPanel value="bar" title="Header" text="Content" />
      <VExpansionPanel value="foo" title="Header" text="Content" />
    </VExpansionPanels>
  ),
  'With colors': (
    <VExpansionPanels>
      <VExpansionPanel value="foo" title="Header" text="Content" color="primary" bgColor="secondary" />
    </VExpansionPanels>
  ),
  'Without action icons': (
    <VExpansionPanels>
      <VExpansionPanel hideActions title="Header" text="Content" />
    </VExpansionPanels>
  ),
  'With title & text props': (
    <VExpansionPanels>
      {['Header 1', 'Header 2'].map((title, i) => (
        <VExpansionPanel title={ title } text={ `${i}. Content` } />
      ))}
    </VExpansionPanels>
  ),
  'With title & text elements': (
    <VExpansionPanels>
      {['Header 1', 'Header 2'].map(title => (
        <VExpansionPanel>
          <VExpansionPanelTitle>{ title }</VExpansionPanelTitle>
          <VExpansionPanelText>Content</VExpansionPanelText>
        </VExpansionPanel>
      ))}
    </VExpansionPanels>
  ),
}

describe('VExpansionPanels', () => {
  it('responds to title click', async () => {
    render(() => (
      <VExpansionPanels>
        <VExpansionPanel title="Header" text="Content" />
      </VExpansionPanels>
    ))

    const title = screen.getByCSS('.v-expansion-panel-title')

    await userEvent.click(title)

    expect(title).toHaveClass('v-expansion-panel-title--active')
  })

  it('supports v-model', async () => {
    const model = ref()
    render(() => (
      <>
        <VExpansionPanels v-model={ model.value }>
          <VExpansionPanel value="bar" title="Header" text="Content" />
          <VExpansionPanel value="foo" title="Header" text="Content" />
        </VExpansionPanels>
        <div class="value">{ model.value }</div>
      </>
    ))

    await userEvent.click(screen.getAllByCSS('.v-expansion-panel-title')[1])

    expect(screen.getAllByCSS('.v-expansion-panel-title')[1]).toHaveClass('v-expansion-panel-title--active')
    expect(model.value).toBe('foo')
  })

  showcase({ stories })
})
