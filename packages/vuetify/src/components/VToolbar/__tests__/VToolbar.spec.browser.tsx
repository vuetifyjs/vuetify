// Components
import { VToolbar } from '..'
import { VBtn } from '@/components/VBtn'

// Utilities
import { render } from '@test'
import { Fragment } from 'vue'

describe('VToolbar', () => {
  const colors = ['success', 'info', 'warning', 'error', 'invalid']

  it('supports the title prop', () => {
    const { container } = render(() => (
      <VToolbar title="foo" />
    ))

    expect(container.querySelector('.v-toolbar-title')).toHaveTextContent('foo')
  })

  it('supports default color props', () => {
    const { container } = render(() => (
      <>
        { colors.map(color => (
          <VToolbar color={ color } title={ color } />
        ))}
      </>
    ))

    const toolbars = container.querySelectorAll('.v-toolbar')
    expect(toolbars).toHaveLength(colors.length)

    Array.from(toolbars).forEach((toolbar, idx) => {
      expect(toolbar).toHaveTextContent(colors[idx])
    })
  })

  it('aligns prepend / append slot content center', () => {
    const { container } = render(() => (
      <VToolbar>
        {{
          prepend: () => <VBtn>Prepend</VBtn>,
          append: () => <VBtn>Append</VBtn>,
        }}
      </VToolbar>
    ))

    const prependBtn = container.querySelector('.v-toolbar__prepend .v-btn')
    const appendBtn = container.querySelector('.v-toolbar__append .v-btn')

    expect(prependBtn).toHaveTextContent('Prepend')
    expect(appendBtn).toHaveTextContent('Append')
  })
})
