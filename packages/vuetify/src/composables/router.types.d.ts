// Types
import type { RouteLocationRaw } from 'vue-router'

export interface LinkProps {
  href: string | undefined
  replace: boolean | undefined
  to: RouteLocationRaw | undefined
  exact: boolean | undefined
  disabled: boolean | undefined
}
