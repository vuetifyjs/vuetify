// Utilities
import { computed, inject, ref, watchEffect } from 'vue'
import { getOrCreateStyleElement, mergeDeep, toKebabCase } from '@/util'
import { IN_BROWSER } from '@/util/globals'

// Types
import type { App, ComputedRef, CSSProperties, InjectionKey, Ref } from 'vue'
import type { DisplayThresholds } from './display'

export type TypographyVariant = `${string}-${string}`
export type TypographyStyle = CSSProperties

function genDefaults (merge = true): TypographyOptions {
  return {
    prefix: 'v-',
    scoped: false,
    resetStyles: merge ? { textTransform: 'none' } : {},
    responsive: true,
    propertiesForVariables: ['font-size', 'font-weight', 'letter-spacing', 'line-height'],
    variants: merge ? {
      'display-large': { fontFamily: 'var:font-brand', fontSize: '57px', lineHeight: '64px', fontWeight: 400, letterSpacing: '-0.25px' },
      'display-medium': { fontFamily: 'var:font-brand', fontSize: '45px', lineHeight: '52px', fontWeight: 400, letterSpacing: '0px' },
      'display-small': { fontFamily: 'var:font-brand', fontSize: '36px', lineHeight: '44px', fontWeight: 400, letterSpacing: '0px' },
      'headline-large': { fontFamily: 'var:font-brand', fontSize: '32px', lineHeight: '40px', fontWeight: 400, letterSpacing: '0px' },
      'headline-medium': { fontFamily: 'var:font-brand', fontSize: '28px', lineHeight: '36px', fontWeight: 400, letterSpacing: '0px' },
      'headline-small': { fontFamily: 'var:font-brand', fontSize: '24px', lineHeight: '32px', fontWeight: 400, letterSpacing: '0px' },
      'title-large': { fontFamily: 'var:font-brand', fontSize: '22px', lineHeight: '28px', fontWeight: 400, letterSpacing: '0px' },
      'title-medium': { fontFamily: 'var:font-plain', fontSize: '16px', lineHeight: '24px', fontWeight: 500, letterSpacing: '0.15px' },
      'title-small': { fontFamily: 'var:font-plain', fontSize: '14px', lineHeight: '20px', fontWeight: 500, letterSpacing: '0.1px' },
      'body-large': { fontFamily: 'var:font-plain', fontSize: '16px', lineHeight: '24px', fontWeight: 400, letterSpacing: '0.5px' },
      'body-medium': { fontFamily: 'var:font-plain', fontSize: '14px', lineHeight: '20px', fontWeight: 400, letterSpacing: '0.25px' },
      'body-small': { fontFamily: 'var:font-plain', fontSize: '12px', lineHeight: '16px', fontWeight: 400, letterSpacing: '0.4px' },
      'label-large': { fontFamily: 'var:font-plain', fontSize: '14px', lineHeight: '20px', fontWeight: 500, letterSpacing: '0.1px' },
      'label-medium': { fontFamily: 'var:font-plain', fontSize: '12px', lineHeight: '16px', fontWeight: 500, letterSpacing: '0.5px' },
      'label-small': { fontFamily: 'var:font-plain', fontSize: '11px', lineHeight: '16px', fontWeight: 500, letterSpacing: '0.5px' },
    } : {},
    variables: merge ? {
      'font-brand': '"Roboto", sans-serif',
      'font-plain': '"Roboto", sans-serif',
    } : {},
    stylesheetId: 'vuetify-typography-stylesheet',
  }
}

function parseTypographyOptions (options: TypographyOptions = genDefaults()): InternalTypographyOptions {
  const merged = mergeDeep(genDefaults(options?.merge ?? true), options)
  for (const name in merged.variants) {
    if (!merged.variants[name]) {
      delete merged.variants[name]
    }
  }
  return merged as InternalTypographyOptions
}

export interface TypographyOptions {
  cspNonce?: string
  prefix?: string
  scoped?: boolean
  merge?: boolean
  resetStyles?: CSSProperties
  responsive?: boolean
  propertiesForVariables?: string[]
  stylesheetId?: string
  variants?: Record<TypographyVariant, TypographyStyle | null>
  variables?: Record<string, string>
}

export interface InternalTypographyOptions {
  cspNonce?: string
  prefix: string
  scoped: boolean
  merge: boolean
  resetStyles: CSSProperties
  responsive: boolean
  propertiesForVariables: string[]
  stylesheetId: string
  variants: Record<TypographyVariant, TypographyStyle>
  variables?: Record<string, string>
}

function genTypographyVariables (prefix: string, variables: Record<string, string>): string[] {
  const lines: string[] = []
  for (const [key, value] of Object.entries(variables)) {
    lines.push(`  --${prefix}text--${key}:${value};`)
  }
  return [':root {', ...lines, '}']
}

function genVariantVariables (
  prefix: string,
  variants: Record<TypographyVariant, TypographyStyle | null>,
  propertiesForVariables: string[]
): string[] {
  const lines: string[] = []
  const allowedProps = new Set(propertiesForVariables)
  for (const [variant, style] of Object.entries(variants)) {
    if (!style) continue
    for (const [prop, value] of Object.entries(style)) {
      const cssProperty = toKebabCase(prop)
      if (!allowedProps.has(cssProperty)) continue
      lines.push(`  --${prefix}text--${variant}-${cssProperty}:${value};`)
    }
  }
  return [':root {', ...lines, '}']
}

function stringifyStyle (prefix: string, style: TypographyStyle): string {
  function toValue (val: string) {
    return String(val).startsWith('var:')
      ? val.replace('var:', `var(--${prefix}text--`) + ')'
      : val
  }

  return Object.entries(style)
    .map(([key, val]) => `${toKebabCase(key)}:${toValue(val)}`)
    .join('; ')
}

function genTypographyCss (
  prefix: string,
  scoped: boolean,
  resetStyles: CSSProperties,
  variants: Record<TypographyVariant, TypographyStyle | null>,
  propertiesForVariables: string[],
  variables?: Record<string, string>,
  responsive = false,
  thresholds?: DisplayThresholds,
): string {
  const content: string[] = []

  content.push(...genVariantVariables(prefix, variants, propertiesForVariables))

  if (variables && Object.keys(variables).length > 0) {
    content.push(...genTypographyVariables(prefix, variables))
  }

  content.push(`.${prefix}typography{${stringifyStyle(prefix, resetStyles)}}`)
  const scopedPrefix = scoped ? `.${prefix}typography` : ''

  for (const [variant, style] of Object.entries(variants)) {
    if (!style) continue
    content.push(`${scopedPrefix}.text-${variant}{${stringifyStyle(prefix, style)}}`)
  }

  if (responsive && thresholds) {
    for (const [breakpoint, width] of Object.entries(thresholds)) {
      if (!width) continue // skip xs
      content.push(`@media (min-width: ${width}px){`)
      for (const [variant, style] of Object.entries(variants)) {
        if (!style) continue
        const responsiveClass = `text-${breakpoint}-${variant}`
        content.push(`${scopedPrefix}.${responsiveClass}{${stringifyStyle(prefix, style)}}`)
      }
      content.push('}')
    }
  }

  return [
    '@layer vuetify-utilities.typography {',
    ...content.map(v => `  ${v}`),
    '}',
  ].join('\n')
}

function upsertStyles (id: string, cspNonce: string | undefined, styles: string) {
  if (!IN_BROWSER) return

  const styleEl = getOrCreateStyleElement(id, cspNonce)

  if (!styleEl) return

  styleEl.innerHTML = styles
}

export interface TypographyInstance {
  variants: Ref<Record<TypographyVariant, TypographyStyle>>
}

export const TypographySymbol: InjectionKey<TypographyInstance> = Symbol.for('vuetify:typography')

export function createTypography (
  options?: TypographyOptions | false,
  thresholds?: Readonly<Ref<DisplayThresholds>>,
): TypographyInstance & { install: (app: App) => void, _css: ComputedRef<string> } | null {
  if (options === false) {
    return null
  }

  const parsedOptions = parseTypographyOptions(options)

  const variants = ref(parsedOptions.variants)

  const styles = computed(() =>
    genTypographyCss(
      parsedOptions.prefix,
      parsedOptions.scoped,
      parsedOptions.resetStyles,
      variants.value,
      parsedOptions.propertiesForVariables,
      parsedOptions.variables,
      parsedOptions.responsive,
      thresholds?.value
    )
  )

  watchEffect(() => {
    upsertStyles(parsedOptions.stylesheetId, parsedOptions.cspNonce, styles.value)
  })

  const instance: TypographyInstance = {
    variants,
  }

  function install (app: App) {
    // TODO: align with theme.ts
    app.provide(TypographySymbol, instance)
  }

  return { ...instance, _css: styles, install }
}

export function useTypography (): TypographyInstance {
  const typography = inject(TypographySymbol, null)
  if (!typography) {
    throw new Error(
      '[Vuetify] useTypography() must be used after createTypography() has been called',
    )
  }

  return typography
}
