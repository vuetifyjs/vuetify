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

    await expect.element(screen.getByCSS('.v-app-bar')).toHaveStyle({ height: '64px' })

    height.value = 128
    await expect.element(screen.getByCSS('.v-app-bar')).toHaveStyle({ height: '128px' })
  })

  it('supports density', async () => {
    const density = ref<any>('default')
    render(() => (
      <VLayout>
        <VAppBar density={ density.value } />
      </VLayout>
    ))

    await expect.element(screen.getByCSS('.v-app-bar')).toHaveStyle({ height: '64px' })

    density.value = 'prominent'
    await expect.element(screen.getByCSS('.v-app-bar')).toHaveStyle({ height: '128px' })

    density.value = 'comfortable'
    await expect.element(screen.getByCSS('.v-app-bar')).toHaveStyle({ height: '56px' })

    density.value = 'compact'
    await expect.element(screen.getByCSS('.v-app-bar')).toHaveStyle({ height: '48px' })
  })

  describe('scroll behavior', () => {
    it('hides on scroll', async () => {
      const scrollBehavior = ref('hide')
      render(() => (
        <VLayout>
          <VAppBar scrollBehavior={ scrollBehavior.value } />
          <VMain style="min-height: 200vh;" />
        </VLayout>
      ))

      await expect.element(screen.getByCSS('.v-app-bar')).toBeOnScreen()

      await scroll({ top: 500 })
      await expect.element(screen.getByCSS('.v-app-bar')).not.toBeOnScreen()

      await scroll({ top: 250 })
      await expect.element(screen.getByCSS('.v-app-bar')).toBeOnScreen()

      await scroll({ top: 0 })
      await expect.element(screen.getByCSS('.v-app-bar')).toBeOnScreen()

      scrollBehavior.value = 'hide inverted'
      await expect.element(screen.getByCSS('.v-app-bar')).not.toBeOnScreen()

      await scroll({ top: 500 })
      await expect.element(screen.getByCSS('.v-app-bar')).toBeOnScreen()

      await scroll({ top: 250 })
      await expect.element(screen.getByCSS('.v-app-bar')).not.toBeOnScreen()

      await scroll({ top: 0 })
      await expect.element(screen.getByCSS('.v-app-bar')).not.toBeOnScreen()
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

      await expect.element(screen.getByCSS('.v-app-bar')).toBeOnScreen()

      await scroll({ top: 1000 })
      await expect.element(screen.getByCSS('.v-app-bar')).not.toBeOnScreen()
    })

    it('collapses', async () => {
      render(() => (
        <VLayout>
          <VAppBar scrollBehavior="scroll" />
          <VMain style="min-height: 200vh;" />
        </VLayout>
      ))

      await expect.element(screen.getByCSS('.v-app-bar')).toBeOnScreen()

      await scroll({ top: 500 })
      await scroll({ top: 0 })
      await expect.element(screen.getByCSS('.v-app-bar')).not.toHaveClass('v-toolbar--collapse')
    })
  })
})
