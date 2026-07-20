// Components
import { VMain } from '../VMain'
import { VLayout } from '@/components/VLayout'

// Utilities
import { render, screen, wait } from '@test'

describe('VMain', () => {
  it('should suppress transition immediately after mount when transition is true (default)', () => {
    render(() => (
      <VLayout>
        <VMain />
      </VLayout>
    ))

    expect(screen.getByCSS('.v-main').style.transition).toBe('none')
  })

  it('should stop suppressing transition once booted', async () => {
    render(() => (
      <VLayout>
        <VMain />
      </VLayout>
    ))

    await wait(100)

    expect(screen.getByCSS('.v-main').style.transition).not.toBe('none')
  })

  it('should never suppress transition when transition is explicitly false', async () => {
    render(() => (
      <VLayout>
        <VMain transition={ false } />
      </VLayout>
    ))

    expect(screen.getByCSS('.v-main').style.transition).not.toBe('none')
  })
})
