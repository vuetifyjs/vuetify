// Components
import { VMenu } from '..'
import { VList, VListItem } from '@/components/VList'

// Utilities
import { render, screen, userEvent, wait } from '@test'

describe('VMenu', () => {
  it('returns focus to activator on Escape', async () => {
    render(() => (
      <div>
        <button data-testid="activator">Open menu</button>
        <VMenu activator="[data-testid='activator']">
          <VList>
            <VListItem title="Item 1" />
            <VListItem title="Item 2" />
          </VList>
        </VMenu>
      </div>
    ))

    const activator = screen.getByTestId('activator')
    await userEvent.click(activator)
    // Wait for globalTop setTimeout in useStack to fire
    await wait()

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
