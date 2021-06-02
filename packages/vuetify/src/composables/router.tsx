// Utilities
import { computed, defineComponent, getCurrentInstance, resolveDynamicComponent } from 'vue'

// Types
import type { PropType, Ref, SetupContext, VNode } from 'vue'
import type { RouterLink as _RouterLink, RouteLocationNormalizedLoaded, RouteLocationRaw, Router, RouterLinkProps } from 'vue-router'
import { propsFactory } from '@/util'

export function useRoute (): Ref<RouteLocationNormalizedLoaded | undefined> {
  const vm = getCurrentInstance()

  return computed(() => vm?.proxy?.$route)
}

export function useRouter (): Router | undefined {
  return getCurrentInstance()?.proxy?.$router
}

export const makeRouterProps = propsFactory({
  to: [String, Object] as PropType<RouteLocationRaw>,
  replace: Boolean,
}, 'router')

export const RouterLink = defineComponent({
  props: makeRouterProps(),

  setup (props, { slots }) {
    const Link = resolveDynamicComponent('RouterLink') as typeof _RouterLink | string

    return () => props.to && typeof Link !== 'string'
      ? <Link custom v-slots={{ default: slots.default }} {...props as any} />
      : slots.default?.()
  },
})
