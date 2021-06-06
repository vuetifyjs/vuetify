// Utilities
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, resolveDynamicComponent, watchEffect } from 'vue'
import { IN_BROWSER, IS_PROD, propsFactory } from '@/util'

// Types
import type { PropType, Ref } from 'vue'
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

export function useLink (props: Partial<UseLinkOptions>): ReturnType<typeof _useLink> | undefined {
  const RouterLink = resolveDynamicComponent('RouterLink') as typeof _RouterLink | string

  if (typeof RouterLink === 'string') return

  const link = RouterLink.useLink(props as UseLinkOptions)

  if (!IS_PROD && IN_BROWSER) {
    const instance = getCurrentInstance()
    watchEffect(() => {
      if (instance) (instance as any).__vrl_route = link.route
    }, { flush: 'post' })

    watchEffect(() => {
      if (instance) {
        (instance as any).__vrl_active = link.isActive
        ;(instance as any).__vrl_exactActive = link.isExactActive
      }
    }, { flush: 'post' })
  }

  return props.to
    ? link
    : undefined
}

export const makeRouterProps = propsFactory({
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
