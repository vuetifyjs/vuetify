// Components
import { VFooter } from '../VFooter'
import { VLayout } from '@/components/VLayout'
import { VMain } from '@/components/VMain'

// Utilities
import { render, screen } from '@test'
import { ref } from 'vue'

describe('VFooter', () => {
  it('reserves the padded height of an automatic app footer', async () => {
    const contentHeight = ref(24)
    render(() => (
      <VLayout height="300">
        <VMain />
        <VFooter app>
          <div style={{ height: `${contentHeight.value}px` }} />
        </VFooter>
      </VLayout>
    ))

    const main = screen.getByCSS('.v-main')
    await expect.poll(() => getComputedStyle(main).paddingBottom).toBe('40px')

    contentHeight.value = 48
    await expect.poll(() => getComputedStyle(main).paddingBottom).toBe('64px')
  })
})
