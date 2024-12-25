// Components
import { VAppBar } from '..'
import { VLayout } from '@/components/VLayout'
import { VMain } from '@/components/VMain'
import { createVuetify } from '@/framework'

// Utilities
import { render } from '@testing-library/vue'
import { nextTick } from 'vue'

const vuetify = createVuetify()

describe('VAppBar', () => {
  it('allows custom height', async () => {
    const { container, rerender } = render(
      ({ height }: { height: number }) => (
        <VLayout>
          <VAppBar height={ height } />
        </VLayout>
      ), {
        global: {
          plugins: [vuetify],
        },
        props: { height: 64 },
      }
    )

    await nextTick()
    expect(container.querySelector('.v-app-bar')).toHaveStyle({ height: '64px' })

    await rerender({
      height: 128,
    })
    await nextTick()

    expect(container.querySelector('.v-app-bar')).toHaveStyle({ height: '128px' })
  })

  it('supports density', async () => {
    const { container, rerender } = render(
      ({ density }: { density: any }) => (
        <VLayout>
          <VAppBar density={ density } />
        </VLayout>
      ), {
        global: {
          plugins: [vuetify],
        },
        props: { density: 'default' },
      }
    )

    await nextTick()

    expect(container.querySelector('.v-app-bar')).toHaveStyle({ height: '64px' })

    await rerender({ density: 'prominent' })
    await nextTick()

    expect(container.querySelector('.v-app-bar')).toHaveStyle({ height: '128px' })

    await rerender({ density: 'comfortable' })
    await nextTick()

    expect(container.querySelector('.v-app-bar')).toHaveStyle({ height: '56px' })

    await rerender({ density: 'compact' })
    await nextTick()

    expect(container.querySelector('.v-app-bar')).toHaveStyle({ height: '48px' })
  })

  describe('scroll behavior', () => {
    it('hides on scroll', async () => {
      const { container } = render(
        ({ scrollBehavior }: any) => (
          <VLayout>
            <VAppBar scrollBehavior={ scrollBehavior } />
            <VMain style="min-height: 200vh;" />
          </VLayout>
        ), {
          global: {
            plugins: [vuetify],
          },
        }
      )

      await nextTick()

      expect(container.querySelector('.v-app-bar')).toBeVisible()

      window.scrollTo(0, 500)
      await nextTick()

      window.scrollTo(0, 250)
      await nextTick()

      expect(container.querySelector('.v-app-bar')).toBeVisible()

      window.scrollTo(0, 0)
      await nextTick()

      expect(container.querySelector('.v-app-bar')).toBeVisible()
    })

    it('should hide correctly when scroll to the bottom', async () => {
      const { container } = render(
        ({ scrollBehavior }: any) => (
          <VLayout>
            <VAppBar scrollBehavior={ scrollBehavior } />
            <VMain style="min-height: 300px">
              { Array.from({ length: 7 }, () => (
                <div class="pa-16 ma-2 w-50 bg-green text-center">box</div>
              ))}
            </VMain>
          </VLayout>
        ), {
          global: {
            plugins: [vuetify],
          },
        }
      )
      await nextTick()
      expect(container.querySelector('.v-app-bar')).toBeVisible()
    })

    it('collapses', async () => {
      const { container } = render(
        ({ scrollBehavior }: any) => (
          <VLayout>
            <VAppBar scrollBehavior={ scrollBehavior } />
            <VMain style="min-height: 200vh;" />
          </VLayout>
        ),
        {
          global: {
            plugins: [vuetify],
          },
          props: { scrollBehavior: 'scroll' },
        }
      )

      await nextTick()

      expect(container.querySelector('.v-app-bar')).toBeVisible()

      window.scrollTo(0, 500)
      await nextTick()

      window.scrollTo(0, 0)
      await nextTick()
      expect(container.querySelector('.v-app-bar')?.classList.contains('v-toolbar--collapse')).toBe(false)
    })
  })
})
