// Components
import { VTooltip } from '../VTooltip'
import { VBtn } from '@/components/VBtn'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'

// Utilities
import { render, screen, userEvent, wait } from '@test'

describe('VTooltip', () => {
  it('should not focus the activator after closing on mouseleave', async () => {
    render(() => (
      <VList>
        <VListItem data-testid="item" link title="Item">
          <VTooltip activator="parent" openDelay={ 0 } closeDelay={ 0 }>Tooltip</VTooltip>
        </VListItem>
        <VListItem link title="Other" data-testid="other" />
      </VList>
    ))

    const item = screen.getByTestId('item')
    await userEvent.hover(item)
    await expect.poll(() => screen.queryByCSS('.v-tooltip .v-overlay__content')).toBeVisible()

    await userEvent.unhover(item)
    await wait(100)

    expect(screen.queryByCSS('.v-tooltip .v-overlay__content')).not.toBeVisible()
    expect(document.activeElement).not.toBe(item)
  })

  it('should not focus the activator after closing on mouseleave while another menu is open', async () => {
    render(() => (
      <div>
        <VBtn data-testid="tooltip-btn">
          Hover me
          <VTooltip activator="parent" openDelay={ 0 } closeDelay={ 0 }>Tooltip</VTooltip>
        </VBtn>
        <VBtn data-testid="menu-btn">
          Open menu
          <VMenu activator="parent">
            <VList>
              <VListItem link title="Item" />
            </VList>
          </VMenu>
        </VBtn>
      </div>
    ))

    await userEvent.click(screen.getByTestId('menu-btn'))
    await expect.poll(() => screen.queryByCSS('.v-menu .v-overlay__content')).toBeVisible()

    const tooltipBtn = screen.getByTestId('tooltip-btn')
    await userEvent.hover(tooltipBtn)
    await expect.poll(() => screen.queryByCSS('.v-tooltip .v-overlay__content')).toBeVisible()

    await userEvent.unhover(tooltipBtn)
    await wait(100)

    expect(screen.queryByCSS('.v-tooltip .v-overlay__content')).not.toBeVisible()
    expect(document.activeElement).not.toBe(tooltipBtn)
    // the menu should remain open
    expect(screen.queryByCSS('.v-menu .v-overlay__content')).toBeVisible()
  })
})
