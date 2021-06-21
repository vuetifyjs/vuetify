// Utilities
import {
  computed,
  getCurrentInstance,
  onBeforeUnmount,
  onMounted,
  resolveDynamicComponent,
} from 'vue'
import { propsFactory } from '@/util'

// Types
import type {
  ComputedRef, PropType,
  Ref,
} from 'vue'
import type {
  RouterLink as _RouterLink,
  useLink as _useLink,
  NavigationGuardNext,
  RouteLocationNormalizedLoaded,
  RouteLocationRaw,
  Router,
  UseLinkOptions,
} from 'vue-router'

export function useRoute (): Ref<RouteLocationNormalizedLoaded | undefined> {
  const vm = getCurrentInstance()

  return computed(() => vm?.proxy?.$route)
}

export function useRouter (): Router | undefined {
  return getCurrentInstance()?.proxy?.$router
}

interface LinkProps extends Partial<UseLinkOptions> {
 href?: string
}
interface UseLink extends Omit<Partial<ReturnType<typeof _useLink>>, 'href'> {
  isLink: ComputedRef<boolean>
  href?: ComputedRef<string | undefined>
}

export function useLink (props: LinkProps): UseLink {
  const RouterLink = resolveDynamicComponent('RouterLink') as typeof _RouterLink | string

  const isLink = { isLink: computed(() => !!props.href) }

  if (typeof RouterLink === 'string') return isLink

  const link = props.to ? RouterLink.useLink(props as UseLinkOptions) : undefined

  const href = computed(() => {
    return props.to ? link?.route.value.href : props.href
  })

  return props.to
    ? { ...link, isLink: computed(() => true), href }
    : isLink
}

export const makeRouterProps = propsFactory({
  href: String,
  to: [String, Object] as PropType<RouteLocationRaw>,
  replace: Boolean,
}, 'router')

export function useBackButton (cb: (next: NavigationGuardNext) => void) {
  const router = useRouter()
  let popped = false
  let removeGuard: (() => void) | undefined

  onMounted(() => {
    window.addEventListener('popstate', onPopstate)
    removeGuard = router?.beforeEach((to, from, next) => {
      setTimeout(() => {
        if (popped) {
          cb(next)
        } else {
          next()
        }
      })
    })
  })
  onBeforeUnmount(() => {
    window.removeEventListener('popstate', onPopstate)
    removeGuard?.()
  })

  function onPopstate (e: PopStateEvent) {
    if (!e.state.replaced) {
      popped = true
      setTimeout(() => popped = false)
    }
  }
}
