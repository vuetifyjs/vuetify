// Utilities
import { getCurrentInstance, propsFactory } from '@/util'
import {
  computed,
  onBeforeUnmount,
  onMounted,
  resolveDynamicComponent,
  toRef,
} from 'vue'

// Types
import type { ComputedRef, PropType, Ref, SetupContext } from 'vue'
import type {
  RouterLink as _RouterLink,
  useLink as _useLink,
  NavigationGuardNext,
  RouteLocationNormalizedLoaded,
  RouteLocationRaw,
  Router,
  RouterLinkOptions,
} from 'vue-router'

export function useRoute (): Ref<RouteLocationNormalizedLoaded | undefined> {
  const vm = getCurrentInstance('useRoute')

  return computed(() => vm?.proxy?.$route)
}

export function useRouter (): Router | undefined {
  return getCurrentInstance('useRouter')?.proxy?.$router
}

export interface LinkProps extends Partial<RouterLinkOptions> {
  href?: string
}

interface UseLink extends Omit<Partial<ReturnType<typeof _useLink>>, 'href'> {
  isLink: ComputedRef<boolean>
  isClickable: ComputedRef<boolean>
  href: Ref<string | undefined>
}

export function useLink (props: LinkProps, attrs: SetupContext['attrs']): UseLink {
  const RouterLink = resolveDynamicComponent('RouterLink') as typeof _RouterLink | string

  const isLink = computed(() => !!(props.href || props.to))
  const isClickable = computed(() => {
    return isLink?.value || !!(attrs.onClick || attrs.onClickOnce)
  })

  if (typeof RouterLink === 'string') {
    return {
      isLink,
      isClickable,
      href: toRef(props, 'href'),
    }
  }

  const link = props.to ? RouterLink.useLink(props as RouterLinkOptions) : undefined

  return {
    ...link,
    isLink,
    isClickable,
    href: computed(() => props.to ? link?.route.value.href : props.href),
  }
}

export const makeRouterProps = propsFactory({
  href: String,
  replace: Boolean,
  to: [String, Object] as PropType<RouteLocationRaw>,
}, 'router')

export function useBackButton (cb: (next: NavigationGuardNext) => void) {
  const router = useRouter()
  let popped = false
  let removeGuard: (() => void) | undefined

  onMounted(() => {
    window.addEventListener('popstate', onPopstate)
    removeGuard = router?.beforeEach((to, from, next) => {
      setTimeout(() => popped ? cb(next) : next())
    })
  })
  onBeforeUnmount(() => {
    window.removeEventListener('popstate', onPopstate)
    removeGuard?.()
  })

  function onPopstate (e: PopStateEvent) {
    if (e.state.replaced) return

    popped = true
    setTimeout(() => (popped = false))
  }
}
