// Components
import { VAppBar } from '..'
import { VLayout } from '@/components/VLayout'
import { VMain } from '@/components/VMain'

// Utilities
import { render, screen, scroll } from '@test'
import { ref } from 'vue'

describe('VAppBar', () => {
  it('allows custom height', async () => {
    const height = ref(64)
    render(() => (
      <VLayout>
        <VAppBar height={ height.value } />
      </VLayout>
    ))

    expect.element(screen.getByCSS('.v-app-bar')).toHaveStyle({ height: '64px' })

    height.value = 128
    expect.element(screen.getByCSS('.v-app-bar')).toHaveStyle({ height: '128px' })
  })

  it('supports density', async () => {
    const density = ref<any>('default')
    render(() => (
      <VLayout>
        <VAppBar density={ density.value } />
      </VLayout>
    ))

    expect.element(screen.getByCSS('.v-app-bar')).toHaveStyle({ height: '64px' })

    density.value = 'prominent'
    expect.element(screen.getByCSS('.v-app-bar')).toHaveStyle({ height: '128px' })

    density.value = 'comfortable'
    expect.element(screen.getByCSS('.v-app-bar')).toHaveStyle({ height: '56px' })

    density.value = 'compact'
    expect.element(screen.getByCSS('.v-app-bar')).toHaveStyle({ height: '48px' })
  })

  describe('scroll behavior', () => {
    it('hides on scroll', async () => {
      const scrollBehavior = ref()
      render(() => (
        <VLayout>
          <VAppBar scrollBehavior={ scrollBehavior.value } />
          <VMain style="min-height: 200vh;" />
        </VLayout>
      ))

      expect.element(screen.getByCSS('.v-app-bar')).toBeVisible()

      await scroll({ top: 500 })
      await scroll({ top: 250 })
      expect.element(screen.getByCSS('.v-app-bar')).toBeVisible()

      await scroll({ top: 0 })
      expect.element(screen.getByCSS('.v-app-bar')).toBeVisible()
    })

    it('should hide correctly when scroll to the bottom', async () => {
      render(() => (
        <VLayout>
          <VAppBar scrollBehavior="hide" />
          <VMain style="min-height: 300px">
            { Array.from({ length: 7 }, () => (
              <div class="pa-16 ma-2 w-50 bg-green text-center">box</div>
            ))}
          </VMain>
        </VLayout>
      ))

      expect.element(screen.getByCSS('.v-app-bar')).toBeVisible()

      await scroll({ top: 1000 })
      expect.element(screen.getByCSS('.v-app-bar')).not.toBeVisible()
    })

    it('collapses', async () => {
      render(() => (
        <VLayout>
          <VAppBar scrollBehavior="scroll" />
          <VMain style="min-height: 200vh;" />
        </VLayout>
      ))

      expect.element(screen.getByCSS('.v-app-bar')).toBeVisible()

      await scroll({ top: 500 })
      await scroll({ top: 0 })
      expect.element(screen.getByCSS('.v-app-bar')).not.toHaveClass('v-toolbar--collapse')
    })
  })
})
