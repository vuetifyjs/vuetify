// Utilities
import {
  computed,
  nextTick,
  onScopeDispose,
  resolveDynamicComponent,
  toRef,
} from 'vue'
import { deepEqual, getCurrentInstance, hasEvent, IN_BROWSER, propsFactory } from '@/util'

// Types
import type { ComputedRef, PropType, Ref, SetupContext } from 'vue'
import type {
  RouterLink as _RouterLink,
  useLink as _useLink,
  NavigationGuardNext,
  RouteLocationNormalizedLoaded,
  RouteLocationRaw,
  Router,
  UseLinkOptions,
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
}

export interface LinkListeners {
  onClick?: EventProp | undefined
  onClickOnce?: EventProp | undefined
}

export interface UseLink extends Omit<Partial<ReturnType<typeof _useLink>>, 'href'> {
  isLink: ComputedRef<boolean>
  isClickable: ComputedRef<boolean>
  href: Ref<string | undefined>
}

export function useLink (props: LinkProps & LinkListeners, attrs: SetupContext['attrs']): UseLink {
  const RouterLink = resolveDynamicComponent('RouterLink') as typeof _RouterLink | string

  const isLink = computed(() => !!(props.href || props.to))
  const isClickable = computed(() => {
    return isLink?.value || hasEvent(attrs, 'click') || hasEvent(props, 'click')
  })

  if (typeof RouterLink === 'string' || !('useLink' in RouterLink)) {
    return {
      isLink,
      isClickable,
      href: toRef(props, 'href'),
    }
  }
  // vue-router useLink `to` prop needs to be reactive and useLink will crash if undefined
  const linkProps = computed(() => ({ ...props, to: props.to ? props.to : {} }))

  const routerLink = RouterLink.useLink(linkProps.value as UseLinkOptions)
  // Actual link needs to be undefined when to prop is not used
  const link = computed(() => props.to ? routerLink : undefined)
  const route = useRoute()

  return {
    isLink,
    isClickable,
    route: link.value?.route,
    navigate: link.value?.navigate,
    isActive: computed(() => {
      if (!link.value) return false
      if (!props.exact) return link.value.isActive?.value ?? false
      if (!route.value) return link.value.isExactActive?.value ?? false

      return link.value.isExactActive?.value && deepEqual(link.value.route.value.query, route.value.query)
    }),
    href: computed(() => props.to ? link.value?.route.value.href : props.href),
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

  if (IN_BROWSER) {
    nextTick(() => {
      window.addEventListener('popstate', onPopstate)
      removeBefore = router?.beforeEach((to, from, next) => {
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
