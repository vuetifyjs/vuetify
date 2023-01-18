// Composables
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { computed, inject, provide, ref, shallowReactive, shallowRef, toRaw, unref, watchEffect } from 'vue'
import { getCurrentInstance, injectSelf, mergeDeep, toKebabCase } from '@/util'

// Types
import type { ComputedRef, InjectionKey, Ref, VNode } from 'vue'
import type { MaybeRef } from '@/util'

export interface DefaultsInstance {
  [key: string]: undefined | Record<string, unknown>
  global?: Record<string, unknown>
}

export type DefaultsOptions = Partial<DefaultsInstance>

export const DefaultsSymbol: InjectionKey<Ref<DefaultsInstance>> = Symbol.for('vuetify:defaults')

export function createDefaults (options?: DefaultsInstance): Ref<DefaultsInstance> {
  return ref(options ?? {})
}

export function injectDefaults () {
  const defaults = inject(DefaultsSymbol)

  if (!defaults) throw new Error('[Vuetify] Could not find defaults instance')

  return defaults
}

export function provideDefaults (
  defaults?: MaybeRef<DefaultsInstance | undefined>,
  options?: {
    reset?: MaybeRef<number | string | undefined>
    root?: MaybeRef<boolean | undefined>
    scoped?: MaybeRef<boolean | undefined>
  }
) {
  const injectedDefaults = injectDefaults()
  const providedDefaults = ref(defaults)

  const newDefaults = computed(() => {
    const scoped = unref(options?.scoped)
    const reset = unref(options?.reset)
    const root = unref(options?.root)

    let properties = mergeDeep(providedDefaults.value, { prev: injectedDefaults.value })

    if (scoped) return properties

    if (reset || root) {
      const len = Number(reset || Infinity)

      for (let i = 0; i <= len; i++) {
        if (!properties.prev) break

        properties = properties.prev
      }

      return properties
    }

    return mergeDeep(properties.prev, properties)
  }) as ComputedRef<DefaultsInstance>

  provide(DefaultsSymbol, newDefaults)

  return newDefaults
}

function propIsDefined (vnode: VNode, prop: string) {
  return typeof vnode.props?.[prop] !== 'undefined' ||
    typeof vnode.props?.[toKebabCase(prop)] !== 'undefined'
}

export function useDefaults (props: Record<string, any>, name?: string) {
  const vm = getCurrentInstance('useDefaults')
  const defaults = injectDefaults()

  name = name ?? vm.type.name ?? vm.type.__name
  if (!name) {
    throw new Error('[Vuetify] Could not determine component name')
  }

  const _subcomponentDefaults = shallowRef()
  const _props = shallowReactive({ ...toRaw(props) })
  watchEffect(() => {
    const globalDefaults = defaults.value.global
    const componentDefaults = defaults.value[name!]

    if (componentDefaults) {
      const subComponents = Object.entries(componentDefaults).filter(([key]) => key.startsWith(key[0].toUpperCase()))
      if (subComponents.length) _subcomponentDefaults.value = Object.fromEntries(subComponents)
    }

    for (const prop of Object.keys(props)) {
      let newVal = props[prop]
      if (!propIsDefined(vm.vnode, prop)) {
        newVal = componentDefaults?.[prop] ?? globalDefaults?.[prop] ?? props[prop]
      }
      if (_props[prop] !== newVal) {
        _props[prop] = newVal
      }
    }
  })

  function provideSubDefaults () {
    useToggleScope(_subcomponentDefaults, () => {
      provideDefaults(mergeDeep(injectSelf(DefaultsSymbol)?.value ?? {}, _subcomponentDefaults.value))
    })
  }

  return { props: _props, provideSubDefaults }
}
