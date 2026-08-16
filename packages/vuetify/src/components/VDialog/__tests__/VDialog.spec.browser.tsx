// Components
import { VDialog } from '../VDialog'
import { VBtn } from '@/components/VBtn'
import { VTextField } from '@/components/VTextField'

// Utilities
import { commands, page, render, screen, userEvent, wait } from '@test'
import { h, nextTick, ref } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'

// Tests
describe('VDialog', () => {
  it('should autofocus text field inside dialog', async () => {
    render(() => (
      <VBtn>
        Open
        <VDialog activator="parent">
          <div>
            <VTextField label="before" />
            <VTextField label="autofocus" autofocus data-testid="field" />
            <VTextField label="after" />
          </div>
        </VDialog>
      </VBtn>
    ))

    await userEvent.click(screen.getByCSS('button'))
    await expect.poll(() => screen.getByTestId('field').querySelector('input')).toHaveFocus()
  })

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

  it('should react to max-width changes', async () => {
    const model = ref(true)
    const maxWidth = ref(300)
    render(() => (
      <VDialog v-model={ model.value } maxWidth={ maxWidth.value }>
        <div data-testid="content">Content</div>
      </VDialog>
    ))

    expect(screen.getByCSS('.v-overlay__content')).toHaveStyle({ maxWidth: '300px' })

    maxWidth.value = 500
    await expect.poll(() => screen.getByCSS('.v-overlay__content')).toHaveStyle({ maxWidth: '500px' })
  })

  it('should respect a CSS function max-width', async () => {
    await page.viewport(1280, 800) // 50vw resolves to 640px

    const model = ref(true)
    const maxWidth = ref('min(50vw, 200px)')
    render(() => (
      <VDialog v-model={ model.value } maxWidth={ maxWidth.value }>
        <div>Content</div>
      </VDialog>
    ))

    await expect.poll(() => document.querySelector('.v-overlay__content')).not.toBeNull()
    expect(screen.getByCSS('.v-overlay__content').getBoundingClientRect()).toMatchObject({ width: 200 })

    maxWidth.value = 'min(50vw, 1000px)'
    await expect.poll(() => screen.getByCSS('.v-overlay__content').getBoundingClientRect()).toMatchObject({ width: 640 })
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

  // https://github.com/vuetifyjs/vuetify/issues/22322
  it('should wrap focus to the last element when Shift+Tab from the initial content wrapper', async () => {
    const model = ref(true)
    render(() => (
      <div>
        <button data-testid="outside">Outside</button>
        <VDialog v-model={ model.value } persistent>
          <div>
            <button data-testid="first">First</button>
            <button data-testid="last">Last</button>
          </div>
        </VDialog>
      </div>
    ))
    const last = screen.getByCSS('button[data-testid="last"]')
    const dialogContent = document.querySelector('.v-dialog .v-overlay__content') as HTMLElement

    await expect.poll(() => document.activeElement).toBe(dialogContent)

    await userEvent.tab({ shift: true })
    await expect.poll(() => document.activeElement).toBe(last)
  })

  // https://github.com/vuetifyjs/vuetify/issues/22322
  it('should pull focus back into the dialog when Tab is pressed from outside', async () => {
    const model = ref(true)
    render(() => (
      <div>
        <button data-testid="outside">Outside</button>
        <VDialog v-model={ model.value } persistent>
          <div>
            <button data-testid="first">First</button>
            <button data-testid="last">Last</button>
          </div>
        </VDialog>
      </div>
    ))
    const outside = screen.getByCSS('button[data-testid="outside"]')
    const first = screen.getByCSS('button[data-testid="first"]')
    const last = screen.getByCSS('button[data-testid="last"]')

    last.focus() // Consume the one-shot initial capture listener
    await expect.poll(() => document.activeElement).toBe(last)

    outside.focus() // simulating focus landing back on <body> after closing dialog
    await expect.poll(() => document.activeElement).toBe(outside)

    await userEvent.tab() // should be pulled back
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
