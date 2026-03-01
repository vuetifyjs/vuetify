// Utilities
import {
  computed,
  nextTick,
  onScopeDispose, reactive,
  resolveDynamicComponent,
  toRef,
} from 'vue'
import { deepEqual, getCurrentInstance, hasEvent, IN_BROWSER, propsFactory } from '@/util'

// Types
import type { PropType, Ref, SetupContext } from 'vue'
import type {
  RouterLink as _RouterLink,
  useLink as _useLink,
  NavigationGuardNext,
  RouteLocation,
  RouteLocationNormalizedLoaded,
  RouteLocationRaw,
  Router,
} from 'vue-router'
import type { EventProp } from '@/util'

export function useRoute (): Ref<RouteLocationNormalizedLoaded | undefined> {
  const vm = getCurrentInstance('useRoute')

  return computed(() => vm?.proxy?.$route)
}

export function useRouter (): Router | undefined {
  return getCurrentInstance('useRouter')?.proxy?.$router
}

export interface LinkProps {
  href: string | undefined
  replace: boolean | undefined
  to: RouteLocationRaw | undefined
  exact: boolean | undefined
  disabled: boolean | undefined
}

export interface LinkListeners {
  onClick?: EventProp | undefined
  onClickOnce?: EventProp | undefined
}

export interface UseLink extends Omit<Partial<ReturnType<typeof _useLink>>, 'href'|'route'|'navigate'> {
  isLink: Readonly<Ref<boolean>>
  isRouterLink: Readonly<Ref<boolean>>
  isClickable: Readonly<Ref<boolean>>
  href: Ref<string | undefined>
  linkProps: Record<string, string | undefined>
  route: Readonly<Ref<RouteLocation & { href: string} | undefined>>
  navigate: Readonly<Ref<ReturnType<typeof _useLink>['navigate'] | undefined>>
}

export function useLink (props: LinkProps & LinkListeners, attrs: SetupContext['attrs']): UseLink {
  // NuxtLink component name can be changed in nuxt config file, but we cannot access to that name
  // NuxtLink is not registered globally, and so we cannot use resolveDynamicComponent, the user
  // must register it globally (vuetify-nuxt-module will add an option to enable global registration)
  let RouterLink = resolveDynamicComponent('NuxtLink') as typeof _RouterLink | string
  if (typeof RouterLink === 'string' || !('useLink' in RouterLink)) {
    RouterLink = resolveDynamicComponent('RouterLink') as typeof _RouterLink | string
  }

  const isLink = toRef(() => !!(props.href || props.to))
  const isClickable = computed(() => {
    return isLink?.value || hasEvent(attrs, 'click') || hasEvent(props, 'click')
  })

  if (typeof RouterLink === 'string' || !('useLink' in RouterLink)) {
    const href = toRef(() => props.href)
    return {
      isLink,
      isRouterLink: toRef(() => false),
      isClickable,
      href,
      linkProps: reactive({ href }),
      route: toRef(() => undefined),
      navigate: toRef(() => undefined),
    }
  }

  // vue-router useLink `to` prop needs to be reactive and useLink will crash if undefined
  const routerLink = RouterLink.useLink({
    to: toRef(() => props.to || ''),
    replace: toRef(() => props.replace),
  })
  // Actual link needs to be undefined when to prop is not used
  const link = computed(() => props.to ? routerLink : undefined)
  const route = useRoute()
  const isActive = computed(() => {
    if (!link.value) return false
    if (!props.exact) return link.value.isActive?.value ?? false
    if (!route.value) return link.value.isExactActive?.value ?? false

    return link.value.isExactActive?.value && deepEqual(link.value.route.value.query, route.value.query)
  })
  const href = computed(() => props.to ? link.value?.route.value.href : props.href)
  const isRouterLink = toRef(() => !!props.to)

  return {
    isLink,
    isRouterLink,
    isClickable,
    isActive,
    route: toRef(() => link.value?.route.value),
    navigate: toRef(() => link.value?.navigate),
    href,
    linkProps: reactive({
      href,
      'aria-current': toRef(() => isActive.value ? 'page' : undefined),
      'aria-disabled': toRef(() => props.disabled && isLink.value ? 'true' : undefined),
      tabindex: toRef(() => props.disabled && isLink.value ? '-1' : undefined),
    }),
  }
}

export const makeRouterProps = propsFactory({
  href: String,
  replace: Boolean,
  to: [String, Object] as PropType<RouteLocationRaw>,
  exact: Boolean,
}, 'router')

let inTransition = false
export function useBackButton (router: Router | undefined, cb: (next: NavigationGuardNext) => void) {
  let popped = false
  let removeBefore: (() => void) | undefined
  let removeAfter: (() => void) | undefined

  if (IN_BROWSER && router?.beforeEach) {
    nextTick(() => {
      window.addEventListener('popstate', onPopstate)
      removeBefore = router.beforeEach((to, from, next) => {
        if (!inTransition) {
          setTimeout(() => popped ? cb(next) : next())
        } else {
          popped ? cb(next) : next()
        }
        inTransition = true
      })
      removeAfter = router?.afterEach(() => {
        inTransition = false
      })
    })
    onScopeDispose(() => {
      window.removeEventListener('popstate', onPopstate)
      removeBefore?.()
      removeAfter?.()
    })
  }

  function onPopstate (e: PopStateEvent) {
    if (e.state?.replaced) return

    popped = true
    setTimeout(() => (popped = false))
  }
}
