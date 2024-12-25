// Components
import { VBottomNavigation } from '..'
import { VLayout } from '@/components/VLayout'
import { createVuetify } from '@/framework'

// Utilities
import { render } from '@testing-library/vue'
import { nextTick } from 'vue'

const vuetify = createVuetify()

describe('VBottomNavigation', () => {
  it('allows custom height', async () => {
    const { container, rerender } = render(
      ({ height }: { height: number }) => (
        <VLayout>
          <VBottomNavigation height={ height } />
        </VLayout>
      ), {
        global: {
          plugins: [vuetify],
        },
        props: { height: 200 },
      }
    )

    await nextTick()
    expect(container.querySelector('.v-bottom-navigation')).toHaveStyle({ height: '200px' })

    await rerender({
      height: 150,
    })
    await nextTick()

    expect(container.querySelector('.v-bottom-navigation')).toHaveStyle({ height: '150px' })
  })

  it('supports density', async () => {
    const { container, rerender } = render(
      ({ density }: { density: any }) => (
        <VLayout>
          <VBottomNavigation density={ density } />
        </VLayout>
      ), {
        global: {
          plugins: [vuetify],
        },
        props: { density: 'default' },
      }
    )

    await nextTick()

    expect(container.querySelector('.v-bottom-navigation')).toHaveStyle({ height: '56px' })

    await rerender({ density: 'comfortable' })
    await nextTick()

    expect(container.querySelector('.v-bottom-navigation')).toHaveStyle({ height: '48px' })

    await rerender({ density: 'compact' })
    await nextTick()

    expect(container.querySelector('.v-bottom-navigation')).toHaveStyle({ height: '40px' })
  })

  it('is not visible when inactive', async () => {
    const { container, rerender } = render(
      ({ active }: { active: boolean }) => (
        <VLayout>
          <VBottomNavigation active={ active } />
        </VLayout>
      ), {
        global: {
          plugins: [vuetify],
        },
        props: { active: true },
      }
    )

    await nextTick()
    expect(container.querySelector('.v-bottom-navigation')).toBeVisible()
    expect(container.querySelector('.v-bottom-navigation')?.classList.contains('v-bottom-navigation--active')).toBe(true)

    await rerender({ active: false })
    await nextTick()
    expect(container.querySelector('.v-bottom-navigation')?.classList.contains('v-bottom-navigation--active')).toBe(false)
  })
})
