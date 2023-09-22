import { useLocale } from '@/composables'
import { mergeDeep } from '@/util'
import { inject } from 'vue'
import type { InjectionKey } from 'vue'
import type { ValidationRule } from '@/composables/validation'

export type ValidationRuleBuilderWithOptions<T> = (options: T, err?: string) => ValidationRule
export type ValidationRuleBuilder = (err?: string) => ValidationRule

export interface RulesInstance {
  required: ValidationRuleBuilder
  email: ValidationRuleBuilder
  number: ValidationRuleBuilder
  integer: ValidationRuleBuilder
  capital: ValidationRuleBuilder
  maxLength: ValidationRuleBuilderWithOptions<number>
  minLength: ValidationRuleBuilderWithOptions<number>
  strictLength: ValidationRuleBuilderWithOptions<number>
  exclude: ValidationRuleBuilderWithOptions<string[]>
  notEmpty: ValidationRuleBuilder
  pattern: ValidationRuleBuilderWithOptions<RegExp>
}

export type InternalRulesOptions = {
  // No options for now
}

export type RulesOptions = Partial<InternalRulesOptions>

const parseRulesOptions = (options?: RulesOptions) => {
  return mergeDeep({
  }, options)
}

export function createRules (options?: RulesOptions) {
  const _options = parseRulesOptions(options)
  const { t } = useLocale()

  const state: RulesInstance = {
    required: (err?: string) => {
      return (v: any) => !!v || t(err || 'rules.required')
    },
    email: (err?: string) => {
      return (v: any) => (!v || (typeof v === 'string' && /^.+@\S+\.\S+$/.test(v))) || t(err || 'rules.email')
    },
    number: (err?: string) => {
      return (v: string) => !!+v || t(err || 'rules.number')
    },
    integer: (err?: string) => {
      return (v: string) => (/^[\d]*$/.test(v)) || t(err || 'rules.integer')
    },
    capital: (err?: string) => {
      return (v: string) => (/^[A-Z]*$/.test(v)) || t(err || 'rules.capital')
    },
    maxLength: (len: number, err?: string) => {
      return (v: any) => (!v || v.length <= len) || t(err || 'rules.maxLength', [len])
    },
    minLength: (len: number, err?: string) => {
      return (v: any) => (!v || v.length >= len) || t(err || 'rules.minLength', [len])
    },
    strictLength: (len: number, err?: string) => {
      return (v: any) => (!v || v.length === len) || t(err || 'rules.strictLength', [len])
    },
    exclude: (forbiddenCharacters: string[], err?: string) => {
      return (v: string) => {
        let error: string | true = true
        for (const character of forbiddenCharacters) {
          if (v.includes(character)) error = err || t('rules.exclude', character)
        }
        return error
      }
    },
    notEmpty: (err?: string) => {
      return (v: any) => (v && v.length > 0) || t(err || 'rules.notEmpty')
    },
    pattern: (pattern: RegExp, err?: string) => {
      return (v: any) => (!v || pattern.test(v) || t(err || 'rules.pattern'))
    },
  }

  return state
}

export const RulesSymbol: InjectionKey<RulesInstance> = Symbol.for('vuetify:rules')

export function useRules () {
  const rules = inject(RulesSymbol)

  if (!rules) throw new Error('Could not find Vuetify rules injection')

  return rules
}
