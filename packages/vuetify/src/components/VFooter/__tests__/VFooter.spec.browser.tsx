// Components
import { VFooter } from '..'
import { VLayout } from '@/components/VLayout'
import { VMain } from '@/components/VMain'

// Utilities
import { commands, render, screen } from '@test'

describe('VFooter', () => {
  it('should reserve layout space equal to its rendered height', async () => {
    render(() => (
      <VLayout>
        <VMain>Content</VMain>
        <VFooter app>Footer</VFooter>
      </VLayout>
    ))

    const footer = screen.getByCSS('.v-footer')
    const main = screen.getByCSS('.v-main')

    await commands.waitStable('.v-footer')

    // Default $footer-padding is 8px 16px, so the content box is 16px shorter
    // than the box the footer actually occupies. The layout must reserve the
    // latter or the last 16px of VMain content renders underneath the footer.
    const rendered = footer.getBoundingClientRect().height
    const reserved = parseFloat(getComputedStyle(main).paddingBottom)

    expect(rendered).toBeGreaterThan(0)
    expect(reserved).toBe(rendered)
  })

  it('should reserve layout space including custom vertical padding', async () => {
    render(() => (
      <VLayout>
        <VMain>Content</VMain>
        <VFooter app style="padding-top: 40px; padding-bottom: 40px">Footer</VFooter>
      </VLayout>
    ))

    const footer = screen.getByCSS('.v-footer')
    const main = screen.getByCSS('.v-main')

    await commands.waitStable('.v-footer')

    const rendered = footer.getBoundingClientRect().height
    const reserved = parseFloat(getComputedStyle(main).paddingBottom)

    expect(rendered).toBeGreaterThan(80)
    expect(reserved).toBe(rendered)
  })
})
