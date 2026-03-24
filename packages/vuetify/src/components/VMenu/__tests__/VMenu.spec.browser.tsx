// Components
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '..'

// Utilities
import { render, screen, userEvent } from '@test'

describe('VMenu', () => {
  it('returns focus to activator on Escape', async () => {
    render(() => (
      <div>
        <button data-test="activator">Open menu</button>
        <VMenu activator="[data-test='activator']">
          <VList>
            <VListItem title="Item 1" />
            <VListItem title="Item 2" />
          </VList>
        </VMenu>
      </div>
    ))

    const activator = screen.getByTestId('activator')
    await userEvent.click(activator)

    // Menu should be open
    const item1 = screen.getByText('Item 1')
    expect(item1).toBeVisible()

    // Press Escape to close
    await userEvent.keyboard('{Escape}')

    // Menu should be closed
    expect(item1).not.toBeVisible()

    // Focus should have returned to the activator button
    expect(document.activeElement).toBe(activator)
  })
})
