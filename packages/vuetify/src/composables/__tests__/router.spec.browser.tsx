// Utilities
import { render, screen, userEvent, wait } from '@test'
import { defineComponent, h, nextTick, ref, shallowRef } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useBackButton, useLink } from '../router'

describe('useLink', () => {
  const TestComponent = defineComponent({
    props: {
      href: String,
      replace: Boolean,
      to: [String, Object],
      exact: Boolean,
      disabled: Boolean,
    },
    setup (props, { attrs }) {
      const link = useLink(props, attrs)

      return { link }
    },
    render () {
      return h('a', {
        ...this.link.linkProps,
        onClick: this.link.navigate.value,
      }, 'Test link')
    },
  })

  let pageReloadAttempted = false
  const preventPageReload = (e: MouseEvent) => {
    if ((e.target as Element).closest('a[href]') && !e.defaultPrevented) {
      e.preventDefault()
      pageReloadAttempted = true
    }
  }

  beforeEach(() => {
    pageReloadAttempted = false
    document.addEventListener('click', preventPageReload)
  })

  afterEach(() => {
    document.removeEventListener('click', preventPageReload)
  })

  function createTestRouter () {
    return createRouter({
      history: createWebHistory(),
      routes: [
        { path: '/', name: 'home', component: { setup: () => () => h('div', 'home') } },
        { path: '/page1', name: 'page1', component: { setup: () => () => h('div', 'page1') } },
        { path: '/page2', name: 'page2', component: { setup: () => () => h('div', 'page2') } },
      ],
    })
  }

  it('should navigate to correct route', async () => {
    const router = createTestRouter()
    expect(router.currentRoute.value.fullPath).toBe('/')

    render(() => (
      <TestComponent to={{ name: 'page1' }} exact />
    ), { global: { plugins: [router] } })

    await userEvent.click(screen.getByCSS('a[href]'))
    await nextTick()

    expect(pageReloadAttempted).toBeFalsy()
    expect(router.currentRoute.value.fullPath).toBe('/page1')
  })

  it('should adapt when props change', async () => {
    const router = createTestRouter()
    expect(router.currentRoute.value.fullPath).toBe('/')

    const to = ref<{ name: string }>({ name: 'page1' })
    const linkRef = shallowRef<InstanceType<typeof TestComponent>>()

    render(() => (
      <TestComponent ref={ linkRef } to={ to.value } exact />
    ), { global: { plugins: [router] } })

    const { link } = linkRef.value!

    expect(link.route?.value?.fullPath).toBe('/page1')
    await userEvent.click(screen.getByCSS('a[href]'))
    await nextTick()

    expect(pageReloadAttempted).toBeFalsy()
    pageReloadAttempted = false
    expect(router.currentRoute.value.fullPath).toBe('/page1')

    to.value = { name: 'page2' }
    await nextTick()
    expect(link.route?.value?.fullPath).toBe('/page2')
    await userEvent.click(screen.getByCSS('a[href]'))
    await nextTick()

    expect(pageReloadAttempted).toBeFalsy()
    expect(router.currentRoute.value.fullPath).toBe('/page2')
  })

  it('should navigate without page reload when props are initialized with delay', async () => {
    const router = createTestRouter()
    expect(router.currentRoute.value.fullPath).toBe('/')

    const to = ref<{ name: string } | undefined>(undefined)
    const linkRef = shallowRef<InstanceType<typeof TestComponent>>()

    render(() => (
      <TestComponent ref={ linkRef } to={ to.value } exact />
    ), { global: { plugins: [router] } })

    expect(linkRef.value!.link.route.value).toBeUndefined()
    await nextTick()

    to.value = { name: 'page1' }
    await nextTick()

    const anchor = screen.getByCSS('a[href]')
    expect(anchor.getAttribute('href')).toBe('/page1')

    await userEvent.click(anchor)

    expect(pageReloadAttempted).toBeFalsy()
    expect(router.currentRoute.value.fullPath).toBe('/page1')
  })

  it('should correctly set active state', async () => {
    const router = createTestRouter()
    expect(router.currentRoute.value.fullPath).toBe('/')

    const to = ref<{ name: string }>({ name: 'page1' })
    const linkRef = shallowRef<InstanceType<typeof TestComponent>>()

    render(() => (
      <TestComponent ref={ linkRef } to={ to.value } exact />
    ), { global: { plugins: [router] } })

    const { link } = linkRef.value!

    await userEvent.click(screen.getByCSS('a[href]'))
    await nextTick()
    expect(pageReloadAttempted).toBeFalsy()
    expect(link.isActive?.value).toBe(true)

    to.value = { name: 'page2' }
    await wait()
    expect(link.isActive?.value).toBe(false)
  })
})

describe('useBackButton', () => {
  // Counts guards through the router contract only: every guard that gets registered must be
  // removed again once its overlay is gone, however the composable schedules the registration.
  function createFakeRouter () {
    const removers: ReturnType<typeof vi.fn>[] = []
    const router = {
      beforeEach: vi.fn(() => { const rm = vi.fn(); removers.push(rm); return rm }),
      afterEach: vi.fn(() => vi.fn()),
    }
    const registered = () => router.beforeEach.mock.calls.length
    const removed = () => removers.filter(rm => rm.mock.calls.length > 0).length
    return { router: router as any, registered, removed }
  }

  // Stand-in for VOverlay: the only thing it does is call useBackButton in setup
  function createOverlay (router: any) {
    return defineComponent({
      setup () {
        useBackButton(router, () => undefined)
        return () => h('div', 'overlay')
      },
    })
  }

  it('should register the guard while the overlay lives and remove it on unmount', async () => {
    const { router, registered, removed } = createFakeRouter()
    const Overlay = createOverlay(router)
    const show = ref(false)
    render(defineComponent({ render: () => (show.value ? h(Overlay) : null) }))

    show.value = true
    await nextTick()
    await nextTick()
    expect(registered()).toBe(1)
    expect(removed()).toBe(0)

    show.value = false
    await nextTick()
    await nextTick()
    expect(registered()).toBe(1)
    expect(removed()).toBe(1)
  })

  it('should not leave a guard behind when the overlay is unmounted in the same flush it was mounted in', async () => {
    // e.g. rows with a menu rendered from cached data, replaced by a skeleton when a refetch starts
    // in onMounted: the overlay mounts and unmounts within one scheduler flush
    const { router, registered, removed } = createFakeRouter()
    const Overlay = createOverlay(router)
    const show = ref(false)
    render(defineComponent({
      render: () => (show.value ? h(Overlay, { onVnodeMounted: () => { show.value = false } }) : null),
    }))

    for (let i = 0; i < 5; i++) {
      show.value = true
      await nextTick()
      await nextTick()
    }
    expect(removed()).toBe(registered())
  })
})
