// Components
import { VFooter } from '..'
import { VLayout } from '@/components/VLayout'
import { VMain } from '@/components/VMain'

// Utilities
import { commands, render, screen } from '@test'

describe('VFooter', () => {
  it('should reserve layout space equal to its rendered height', async () => {
    render(() => (
      <VLayout style="height: 400px">
        <VMain>Content</VMain>
        <VFooter app>Footer</VFooter>
      </VLayout>
    ))

    const footer = screen.getByCSS('.v-footer')
    const main = screen.getByCSS('.v-main')

    await commands.waitStable('.v-footer')

    const rendered = footer.getBoundingClientRect().height
    expect(rendered).toBeGreaterThan(0)
    expect(parseFloat(getComputedStyle(main).paddingBottom)).toBe(rendered)
  })
})
