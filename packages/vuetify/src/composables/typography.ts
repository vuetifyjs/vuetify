// composables/typography.ts
import { inject, ref } from 'vue'
import type { App, InjectionKey, Ref } from 'vue'
import { mergeDeep } from '@/util'

export const defaultTypography = {
  'display-large': {
    fontSize: '57px',
    lineHeight: '64px',
    fontWeight: 400,
    letterSpacing: '-0.25px',
  },

  'display-medium': {
    fontSize: '45px',
    lineHeight: '52px',
    fontWeight: 400,
    letterSpacing: '0px',
  },

  'display-small': {
    fontSize: '36px',
    lineHeight: '44px',
    fontWeight: 400,
    letterSpacing: '0px',
  },

  'headline-large': {
    fontSize: '32px',
    lineHeight: '40px',
    fontWeight: 400,
    letterSpacing: '0px',
  },

  'headline-medium': {
    fontSize: '28px',
    lineHeight: '36px',
    fontWeight: 400,
    letterSpacing: '0px',
  },

  'headline-small': {
    fontSize: '24px',
    lineHeight: '32px',
    fontWeight: 400,
    letterSpacing: '0px',
  },

  'body-large': {
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 400,
    letterSpacing: '0.5px',
  },

  'body-medium': {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 400,
    letterSpacing: '0.25px',
  },
  'body-small': {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 400,
    letterSpacing: '0.4px',
  },
  'label-large': {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 500,
    letterSpacing: '0.1px',
  },
  'label-medium': {
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 500,
    letterSpacing: '0.5px',
  },
  'label-small': {
    fontSize: '11px',
    lineHeight: '16px',
    fontWeight: 500,
    letterSpacing: '0.5px',
  },
  'custom-variant': {
    fontSize: '99px',
    lineHeight: '100px',
    fontWeight: 900,
    letterSpacing: '1px',
  },
} as const

export type TypographyVariant = keyof typeof defaultTypography
export type TypographyStyle = typeof defaultTypography[TypographyVariant]
export type TypographyConfig = Partial<Record<TypographyVariant, Partial<TypographyStyle>>>

export interface TypographyInstance {
  styles: Ref<Record<TypographyVariant, TypographyStyle>>
  getStyle: (variant: TypographyVariant) => TypographyStyle
}

export const TypographySymbol: InjectionKey<TypographyInstance> = Symbol.for('vuetify:typography')

export function createTypography (config?: TypographyConfig): TypographyInstance & { install: (app: App) => void } {
  const styles = ref(
    mergeDeep({ ...defaultTypography }, config ?? {}) as Record<TypographyVariant, TypographyStyle>
  )

  const instance: TypographyInstance = {
    styles,
    getStyle: variant => styles.value[variant],
  }

  function install (app: App) {
    app.provide(TypographySymbol, instance)
  }

  return { ...instance, install }
}

export function useTypography (): TypographyInstance {
  const typography = inject(TypographySymbol, null)
  if (!typography) {
    throw new Error('[Vuetify] useTypography() must be used after createTypography() has been called')
  }

  return typography
}
