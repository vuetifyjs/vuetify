// Composables
import { createRules, RulesSymbol } from './rules'

// Types
import type { App } from 'vue'
import type { RulesOptions } from './rules'
import type { LocaleInstance } from '@/composables'

export interface RulesPlugin {
  install: (app: App) => void
}

export function createRulesPlugin (rules: RulesOptions, locale: LocaleInstance): RulesPlugin {
  return {
    install (app: App) {
      app.provide(RulesSymbol, createRules(rules, locale))
    },
  }
}
