// Utilities
import { computed, inject, toRef } from 'vue'

// Types
import type { InjectionKey, Ref } from 'vue'
import type { LocaleInstance } from '@/composables/locale'
import type { ValidationProps, ValidationRule } from '@/composables/validation'

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

type ValidationRuleParams = [any, string?]
export type ValidationAlias = string | [string, ...ValidationRuleParams]

export type RulesInstance = {
  resolve: (fn: () => ValidationProps['rules']) => Readonly<Ref<any[]>>
  aliases: RuleAliases
}

export function createRules (options: RulesOptions | undefined, locale: LocaleInstance) {
  const { t } = locale

  const aliases: RuleAliases = {
    required: (err?: string) => {
      return (v: any) => {
        // If the modifier .number is used, the 0 will be a number and it's a falsy value so we need to check for it
        return v === 0 || !!v || t(err || '$vuetify.rules.required')
      }
    },
    email: (err?: string) => {
      return (v: any) => (!v || (typeof v === 'string' && /^.+@\S+\.\S+$/.test(v))) || t(err || '$vuetify.rules.email')
    },
    number: (err?: string) => {
      return (v: string) => !!Number(v) || t(err || '$vuetify.rules.number')
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

    ...options?.aliases,
  }

  function resolve (fn: () => ValidationProps['rules']) {
    return computed(() => fn().map(rule => {
      let ruleName: string | null = null
      let ruleParams: ValidationRuleParams = [undefined]
      if (Array.isArray(rule)) {
        ruleName = rule[0]
        ruleParams = rule.slice(1) as ValidationRuleParams
      } else if (typeof rule === 'string') {
        ruleName = rule
      }

      if (ruleName !== null) {
        if (ruleName.startsWith('$')) {
          ruleName = ruleName.slice(1)
        }

        return aliases[ruleName]?.(...ruleParams)
      } else {
        return rule
      }
    }))
  }

  return {
    resolve,
    aliases,
  }
}

export const RulesSymbol: InjectionKey<RulesInstance> = Symbol.for('vuetify:rules')

export function useRules (): RuleAliases
export function useRules (fn: () => ValidationProps['rules']): Readonly<Ref<ValidationProps['rules']>> | Readonly<Ref<ValidationRule[]>>

export function useRules (fn?: () => ValidationProps['rules']) {
  const rules = inject(RulesSymbol, null)

  if (!fn) {
    if (!rules) {
      throw new Error('Could not find Vuetify rules injection')
    }
    return rules.aliases
  }

  return rules?.resolve(fn) ?? toRef(fn)
}
