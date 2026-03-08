// Components
import { VCard, VCardItem } from '..'

// Utilities
import { render, screen } from '@test'

describe('VCard', () => {
  it('allows long titles to wrap', async () => {
    render(() => (
      <div style={{ width: '200px' }}>
        <VCard>
          <VCardItem title="This is a long card title that should wrap onto multiple lines by default" />
        </VCard>
      </div>
    ))

    const title = screen.getByCSS('.v-card-title') as HTMLElement
    const styles = window.getComputedStyle(title)

    expect(styles.whiteSpace).toBe('normal')
    expect(title.getBoundingClientRect().height).toBeGreaterThan(parseFloat(styles.lineHeight))
  })
})
