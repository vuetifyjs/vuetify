import { IUtils } from '@date-io/core/IUtils'
import { computed, inject, provide, InjectionKey, Ref, toRef } from 'vue'
import { LocaleInstance, useLocale } from './locale'

export const DateSymbol: InjectionKey<{ adapter: IUtils<any> }> = Symbol.for('vuetify:date')
export const DateAdapterSymbol: InjectionKey<any> = Symbol.for('vuetify:date-adapter')

export function createDate (options: { adapter: IUtils<any> }) {
  return options
}

export function useDate (props: { locale?: any }) {
  const adapter = inject(DateAdapterSymbol)

  adapter.createScope(toRef(props, 'locale'))
}

export interface DateAdapter {

}


function isDateAdapter (x: any): x is DateAdapter {
  return true
}

export function createDateAdapter (options: any) {
  return isDateAdapter(options) ? options : createDefaultDateAdapter(options)
}

function createDefaultDateAdapter (options: any) {
  return {
    createScope
  }
}
