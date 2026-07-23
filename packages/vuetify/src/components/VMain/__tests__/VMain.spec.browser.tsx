// Components
import { VMain } from '../VMain'
import { VLayout } from '@/components/VLayout'

// Utilities
import { render, screen, wait } from '@test'

describe('VMain', () => {
  it('should be true if transition if transition is set to true', () => {
    render(() => (
      <VLayout>
        <VMain transition />
      </VLayout>
    ))

    expect(screen.getByCSS('.v-main').style.transition).toBe('none')
  })

  it('should be true if transition is not set', async () => {
    render(() => (
      <VLayout>
        <VMain />
      </VLayout>
    ))

    await wait(100)

    expect(screen.getByCSS('.v-main').style.transition).not.toBe('none')
  })

  it('should be none if transition is set to false', async () => {
    render(() => (
      <VLayout>
        <VMain transition={ false } />
      </VLayout>
    ))

    expect(screen.getByCSS('.v-main').style.transition).toBe('none')
  })
})
