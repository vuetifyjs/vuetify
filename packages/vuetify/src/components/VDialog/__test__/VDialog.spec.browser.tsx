// Components
import { VDialog } from '../VDialog'

// Utilities
import { commands, render, screen, userEvent, wait } from '@test'
import { h, nextTick, ref } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'

// Tests
describe('VDialog', () => {
  it('should render correctly', async () => {
    const model = ref(false)
    render(() => (
      <div>
        <VDialog v-model={ model.value } data-testid="dialog">
          <div data-testid="content">Content</div>
        </VDialog>
      </div>
    ))

    expect(screen.queryByTestId('dialog')).toBeNull()

    model.value = true
    await nextTick()
    await expect(screen.findByTestId('dialog')).resolves.toBeVisible()
    await expect.element(await screen.findByTestId('content')).toBeVisible()

    await commands.click(0, 0)
    await expect.poll(() => model.value).toBeFalsy()
    await expect.poll(() => screen.queryByTestId('dialog')).toBeNull()
    await expect.poll(() => screen.queryByTestId('content')).toBeNull()
  })

  it('should emit afterLeave', async () => {
    const model = ref(true)
    const onAfterLeave = vi.fn()
    render(() => (
      <div>
        <VDialog v-model={ model.value } onAfterLeave={ onAfterLeave }>
          <div data-test="content">Content</div>
        </VDialog>
      </div>
    ))

    await commands.click(0, 0)
    await expect.poll(() => onAfterLeave).toHaveBeenCalledTimes(1)
  })

  it('should focus on the last element when shift + tab key is pressed on the first element', async () => {
    const model = ref(true)
    render(() => (
      <div>
        <VDialog v-model={ model.value } persistent>
          <div>
            <button data-testid="first">First</button>
            <button data-testid="last">Last</button>
          </div>
        </VDialog>
      </div>
    ))
    const first = screen.getByCSS('button[data-testid="first"]')
    const last = screen.getByCSS('button[data-testid="last"]')

    first.focus()
    await expect.poll(() => document.activeElement).toBe(first)

    await userEvent.tab({ shift: true })
    await expect.poll(() => document.activeElement).toBe(last)
  })

  it('should focus on the first element when Tab key is pressed on the last element', async () => {
    const model = ref(true)
    render(() => (
      <div>
        <VDialog v-model={ model.value }>
          <div>
            <button data-testid="first">First</button>
            <button data-testid="last">Last</button>
          </div>
        </VDialog>
      </div>
    ))
    const first = screen.getByCSS('button[data-testid="first"]')
    const last = screen.getByCSS('button[data-testid="last"]')

    last.focus()
    await expect.poll(() => document.activeElement).toBe(last)

    await userEvent.tab()
    await expect.poll(() => document.activeElement).toBe(first)
  })

  describe('routing back', () => {
    function createTestRouter () {
      return createRouter({
        history: createMemoryHistory(),
        routes: [
          { path: '/', component: { setup: () => () => h('h1', 'home') } },
          { path: '/page1', component: { setup: () => () => h('h1', 'page1') } },
          { path: '/page2', component: { setup: () => () => h('h1', 'page2') } },
          { path: '/page3', component: { setup: () => () => h('h1', 'page3') } },
        ],
      })
    }

    async function simulateBackNavigation (router: ReturnType<typeof createTestRouter>) {
      router.back()
      for (let i = 0; i < 10; i++) await nextTick() // flush microtasks
      window.dispatchEvent(new PopStateEvent('popstate', { state: {} }))
      await wait()
    }

    it('should block back with persistent dialog, allow after close, and block again when reopened', async () => {
      const router = createTestRouter()
      await router.push('/page1')
      await router.push('/page2')
      await router.push('/page3')

      const model = ref(true)
      render(() => (
        <VDialog v-model={ model.value } persistent data-testid="dialog">
          <div data-testid="content">Content</div>
        </VDialog>
      ), { global: { plugins: [router] } })

      await expect(screen.findByTestId('dialog')).resolves.toBeVisible()
      await wait()

      // 1st back: persistent dialog blocks navigation
      await simulateBackNavigation(router)
      expect(model.value).toBe(true)
      expect(router.currentRoute.value.path).toBe('/page3')

      // close the dialog
      model.value = false
      await nextTick()

      // 2nd back: no dialog blocking, navigation proceeds
      await simulateBackNavigation(router)
      expect(router.currentRoute.value.path).toBe('/page2')

      // reopen
      model.value = true
      await nextTick()
      await expect(screen.findByTestId('dialog')).resolves.toBeVisible()
      await wait()

      // 3rd back: persistent dialog blocks again
      await simulateBackNavigation(router)
      expect(model.value).toBe(true)
      expect(router.currentRoute.value.path).toBe('/page2')
    })

    it('should close non-persistent dialog on back and block navigation', async () => {
      const router = createTestRouter()
      await router.push('/page1')
      await router.push('/page2')
      await router.push('/page3')

      const model = ref(false)
      render(() => (
        <VDialog v-model={ model.value } data-testid="dialog">
          <div data-testid="content">Content</div>
        </VDialog>
      ), { global: { plugins: [router] } })

      // Open dialog
      model.value = true
      await nextTick()
      await expect(screen.findByTestId('dialog')).resolves.toBeVisible()
      await wait()

      // 1st back: dialog closes but route stays (navigation blocked)
      await simulateBackNavigation(router)
      await expect.poll(() => model.value).toBeFalsy()
      expect(router.currentRoute.value.path).toBe('/page3')

      // 2nd back: no dialog, navigation proceeds
      await simulateBackNavigation(router)
      expect(router.currentRoute.value.path).toBe('/page2')

      // reopen
      model.value = true
      await nextTick()
      await expect(screen.findByTestId('dialog')).resolves.toBeVisible()
      await wait()

      // 3rd back: dialog closes again, route stays
      await simulateBackNavigation(router)
      await expect.poll(() => model.value).toBeFalsy()
      expect(router.currentRoute.value.path).toBe('/page2')
    })
  })
})
