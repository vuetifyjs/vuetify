// Utilities
import { inject } from 'vue'
import { mergeDeep } from '@/util'

// Types
import type { InjectionKey } from 'vue'
import type { LocaleInstance } from '@/composables'
import type { ValidationRule } from '@/composables/validation'

export type ValidationRuleBuilderWithoutOptions = (err?: string) => ValidationRule
export type ValidationRuleBuilderWithOptions<T> = (options: T, err?: string) => ValidationRule
export type ValidationRuleBuilder =
  | ValidationRuleBuilderWithoutOptions
  | ValidationRuleBuilderWithOptions<any>

export interface RuleAliases {
  [name: string]: ValidationRuleBuilder
  required: ValidationRuleBuilderWithoutOptions
  email: ValidationRuleBuilderWithoutOptions
  number: ValidationRuleBuilderWithoutOptions
  integer: ValidationRuleBuilderWithoutOptions
  capital: ValidationRuleBuilderWithoutOptions
  maxLength: ValidationRuleBuilderWithOptions<number>
  minLength: ValidationRuleBuilderWithOptions<number>
  strictLength: ValidationRuleBuilderWithOptions<number>
  exclude: ValidationRuleBuilderWithOptions<string[]>
  notEmpty: ValidationRuleBuilderWithoutOptions
  pattern: ValidationRuleBuilderWithOptions<RegExp>
}

export type RulesOptions = {
  aliases?: Partial<RuleAliases>
}

export function createRules (options: RulesOptions | undefined, locale: LocaleInstance) {
  const { t } = locale

  return mergeDeep({
    aliases: {
      required: (err?: string) => {
        return (v: any) => !!v || t(err || '$vuetify.rules.required')
      },
      email: (err?: string) => {
        return (v: any) => (!v || (typeof v === 'string' && /^.+@\S+\.\S+$/.test(v))) || t(err || '$vuetify.rules.email')
      },
      number: (err?: string) => {
        return (v: string) => !!+v || t(err || '$vuetify.rules.number')
      },
      integer: (err?: string) => {
        return (v: string) => (/^[\d]*$/.test(v)) || t(err || '$vuetify.rules.integer')
      },
      capital: (err?: string) => {
        return (v: string) => (/^[A-Z]*$/.test(v)) || t(err || '$vuetify.rules.capital')
      },
      maxLength: (len: number, err?: string) => {
        return (v: any) => (!v || v.length <= len) || t(err || '$vuetify.rules.maxLength', [len])
      },
      minLength: (len: number, err?: string) => {
        return (v: any) => (!v || v.length >= len) || t(err || '$vuetify.rules.minLength', [len])
      },
      strictLength: (len: number, err?: string) => {
        return (v: any) => (!v || v.length === len) || t(err || '$vuetify.rules.strictLength', [len])
      },
      exclude: (forbiddenCharacters: string[], err?: string) => {
        return (v: string) => {
          let error: string | true = true
          for (const character of forbiddenCharacters) {
            if (v.includes(character)) error = err || t('$vuetify.rules.exclude', character)
          }
          return error
        }
      },
      notEmpty: (err?: string) => {
        return (v: any) => (v && v.length > 0) || t(err || '$vuetify.rules.notEmpty')
      },
      pattern: (pattern: RegExp, err?: string) => {
        return (v: any) => (!v || pattern.test(v) || t(err || '$vuetify.rules.pattern'))
      },
    },
  }, options)
}

export const RulesSymbol: InjectionKey<RulesOptions> = Symbol.for('vuetify:rules')

export function useRules () {
  const ruleOptions = inject(RulesSymbol)

  if (!ruleOptions) throw new Error('Could not find Vuetify rules injection')

  return ruleOptions.aliases
}
