// Utilities
import { computed, getCurrentInstance, resolveDynamicComponent } from 'vue'
import { propsFactory } from '@/util'

// Types
import type { PropType, Ref } from 'vue'
import type {
  RouterLink as _RouterLink,
  useLink as _useLink,
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
  const Link = resolveDynamicComponent('RouterLink') as typeof _RouterLink | string

  return typeof Link === 'string'
    ? undefined
    : Link.useLink(props as UseLinkOptions)
}

export const makeRouterProps = propsFactory({
  to: [String, Object] as PropType<RouteLocationRaw>,
  replace: Boolean,
}, 'router')
