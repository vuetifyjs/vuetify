import Vue from 'vue'
import { ExtendedVue } from 'vue/types/vue'
import { consoleWarn } from '../util/console'

function generateWarning (child: string, parent: string) {
  return () => consoleWarn(`The ${child} component must be used inside a ${parent}`)
}

export type Registrable<T extends string> = ExtendedVue<Vue, {
  [K in T]: {
    register (...props: any[]): void
    unregister (self: any): void
  }
}, {}, {}, {}>

export function inject<T extends string> (namespace: T, child?: string, parent?: string): Registrable<T> {
  const defaultImpl = child && parent ? {
    register: generateWarning(child, parent),
    unregister: generateWarning(child, parent)
  } : null

  return Vue.extend({
    name: 'registrable-inject',

    inject: {
      [namespace]: {
        default: defaultImpl
      }
    }
  })
}

export function provide (namespace: string) {
  return Vue.extend({
    name: 'registrable-provide',

    methods: {
      register: null,
      unregister: null
    },
    provide () {
      return {
        [namespace]: {
          register: this.register,
          unregister: this.unregister
        }
      }
    }
  })
}
