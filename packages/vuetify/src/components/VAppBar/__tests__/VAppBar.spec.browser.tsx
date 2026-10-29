// Components
import { VAppBar } from '..'
import { VLayout } from '@/components/VLayout'
import { VMain } from '@/components/VMain'

// Utilities
import { render, screen, scroll } from '@test'
import { defineComponent, ref, shallowRef, Suspense } from 'vue'

describe('VAppBar', () => {
  it('should not shift the layout while a replacement app bar is pending inside Suspense', async () => {
    let release!: () => void
    let suspended = false
    const AsyncPage = defineComponent({
      name: 'AsyncPage',
      async setup () {
        suspended = true
        await new Promise<void>(resolve => release = resolve)
        return () => <div />
      },
    })
    const Shell = defineComponent({
      name: 'Shell',
      props: { name: String },
      setup (props) {
        return () => (
          <>
            <VAppBar height={ props.name === 'a' ? 64 : 128 } />
            <VMain>{ props.name === 'b' ? <AsyncPage /> : undefined }</VMain>
          </>
        )
      },
    })
    const layout = shallowRef('a')
    render(() => (
      <VLayout>
        <Suspense>
          <Shell key={ layout.value } name={ layout.value } />
        </Suspense>
      </VLayout>
    ))

    await expect.element(screen.getByCSS('.v-app-bar')).toHaveStyle({ top: '0px', height: '64px' })
    await expect.element(screen.getByCSS('.v-main')).toHaveStyle({ paddingTop: '64px' })

    layout.value = 'b'
    await expect.poll(() => suspended).toBe(true)

    await expect.element(screen.getByCSS('.v-app-bar')).toHaveStyle({ top: '0px' })
    await expect.element(screen.getByCSS('.v-main')).toHaveStyle({ paddingTop: '64px' })

    release()

    await expect.poll(() => document.querySelector('.v-app-bar')?.getBoundingClientRect().height).toBe(128)
    await expect.element(screen.getByCSS('.v-app-bar')).toHaveStyle({ top: '0px' })
    await expect.element(screen.getByCSS('.v-main')).toHaveStyle({ paddingTop: '128px' })
  })

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

      await expect.element(screen.getByCSS('.v-app-bar')).toBeInViewport()

      await scroll({ top: 500 })
      await expect.element(screen.getByCSS('.v-app-bar')).not.toBeInViewport()

      await scroll({ top: 250 })
      await expect.element(screen.getByCSS('.v-app-bar')).toBeInViewport()

      await scroll({ top: 0 })
      await expect.element(screen.getByCSS('.v-app-bar')).toBeInViewport()

      scrollBehavior.value = 'hide inverted'
      await expect.element(screen.getByCSS('.v-app-bar')).not.toBeInViewport()

      await scroll({ top: 500 })
      await expect.element(screen.getByCSS('.v-app-bar')).toBeInViewport()

      await scroll({ top: 250 })
      await expect.element(screen.getByCSS('.v-app-bar')).not.toBeInViewport()

      await scroll({ top: 0 })
      await expect.element(screen.getByCSS('.v-app-bar')).not.toBeInViewport()
    })

    it('hides when scroll-target scrolls', async () => {
      render(() => (
        <VLayout>
          <VAppBar scrollBehavior="hide" scrollTarget="#scroller" />
          <VMain>
            <div id="scroller" style="height: 300px; overflow: auto">
              <div style="height: 2000px" />
            </div>
          </VMain>
        </VLayout>
      ))

      await expect.element(screen.getByCSS('.v-app-bar')).toBeInViewport()

      await scroll({ top: 500 }, document.querySelector('#scroller')!)
      await expect.element(screen.getByCSS('.v-app-bar')).not.toBeInViewport()
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

      await expect.element(screen.getByCSS('.v-app-bar')).toBeInViewport()

      await scroll({ top: 1000 })
      await expect.element(screen.getByCSS('.v-app-bar')).not.toBeInViewport()
    })

    it('collapses', async () => {
      render(() => (
        <VLayout>
          <VAppBar scrollBehavior="scroll" />
          <VMain style="min-height: 200vh;" />
        </VLayout>
      ))

      await expect.element(screen.getByCSS('.v-app-bar')).toBeInViewport()

      await scroll({ top: 500 })
      await scroll({ top: 0 })
      await expect.element(screen.getByCSS('.v-app-bar')).not.toHaveClass('v-toolbar--collapse')
    })
  })
})
