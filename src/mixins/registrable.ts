// import Vue from 'vue'
import { Vue, VueConstructor } from 'vue/types/vue'
import { consoleWarn } from '../util/console'

function generateWarning (child: string, parent: string) {
  return () => consoleWarn(`The ${child} component must be used inside a ${parent}`)
}

type RegistrableInject<N extends string, T extends VueConstructor> = VueConstructor<Vue & { [K in N]: T }>

interface Inject<T extends VueConstructor> {
  <N extends string>(namespace: N, child?: string, parent?: string): RegistrableInject<N, InstanceType<T>>
}

export function inject<T extends VueConstructor> (): Inject<T>
export function inject<T extends string> (namespace: T, child?: string, parent?: string): RegistrableInject<T, VueConstructor>
export function inject (namespace?: string, child?: string, parent?: string): any {
  if (!namespace) return inject

  const defaultImpl = child && parent ? generateWarning(child, parent) : null

  return Vue.extend({
    name: 'registrable-inject',

    inject: {
      [namespace]: {
        default: defaultImpl
      }
    }
  })
}

export function provide (namespace: string): VueConstructor {
  return Vue.extend({
    name: 'registrable-provide',

    provide () {
      return {
        [namespace]: this
      }
    }
  })
}
