// Types
import type { Ref } from 'vue'
import type { useLink as _useLink, RouteLocation, RouteLocationRaw } from 'vue-router'

export interface LinkProps {
  href: string | undefined
  replace: boolean | undefined
  to: RouteLocationRaw | undefined
  exact: boolean | undefined
  disabled: boolean | undefined
}

export interface UseLink extends Omit<Partial<ReturnType<typeof _useLink>>, 'href' | 'route' | 'navigate'> {
  isLink: Readonly<Ref<boolean>>
  isRouterLink: Readonly<Ref<boolean>>
  isClickable: Readonly<Ref<boolean>>
  href: Ref<string | undefined>
  linkProps: Record<string, string | undefined>
  route: Readonly<Ref<RouteLocation & { href: string } | undefined>>
  navigate: Readonly<Ref<ReturnType<typeof _useLink>['navigate'] | undefined>>
}

export {}
