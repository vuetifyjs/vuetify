// Utilities
import { render, screen, userEvent, wait } from '@test'
import { defineComponent, h, nextTick, ref, shallowRef } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useLink } from '../router'

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
