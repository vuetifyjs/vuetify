// Components
import { VDefaultsProvider } from '../VDefaultsProvider'
import { VCard } from '@/components/VCard'

// Utilities
import { render, screen } from '@test'

describe('VDefaultsProvider', () => {
  it('should apply new defaults', () => {
    render(() => (
      <VDefaultsProvider defaults={{ global: { elevation: 10 }, VCard: { color: 'primary' } }}>
        <VCard title="foo" subtitle="bar" />
      </VDefaultsProvider>
    ))

    const card = screen.getByCSS('.v-card')
    expect(card.classList).toContain('elevation-10')
    expect(card.classList).toContain('bg-primary')
  })
})
