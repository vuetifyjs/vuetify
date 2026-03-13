// Components
import { VList, VListItem } from '..'

// Utilities
import { render, screen, userEvent } from '@test'

describe('VListItem', () => {
  // https://github.com/vuetifyjs/vuetify/issues/22172
  it('should not navigate when disabled item with href is clicked', async () => {
    render(() => (
      <VList>
        <VListItem href="/about" disabled title="Link">
          {{
            append: () => <span class="append-content">append</span>,
          }}
        </VListItem>
      </VList>
    ))

    const item = screen.getByCSS('.v-list-item')
    const event = new MouseEvent('click', { bubbles: true, cancelable: true })
    item.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)
  })
})
