// Utilities
import {
  computed,
  nextTick,
  onScopeDispose,
  resolveDynamicComponent,
  toRef,
} from 'vue'
import { getCurrentInstance, hasEvent, IN_BROWSER, propsFactory } from '@/util'

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

  if (typeof RouterLink === 'string') {
    return {
      isLink,
      isClickable,
      href: toRef(props, 'href'),
    }
  }

  const link = props.to ? RouterLink.useLink(props as UseLinkOptions) : undefined

  return {
    isLink,
    isClickable,
    route: link?.route,
    navigate: link?.navigate,
    isActive: link && computed(() => props.exact ? link.isExactActive?.value : link.isActive?.value),
    href: computed(() => props.to ? link?.route.value.href : props.href),
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
