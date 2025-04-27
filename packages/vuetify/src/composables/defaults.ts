// Utilities
import { computed, inject, provide, ref, shallowRef, unref, watchEffect } from 'vue'
import { getCurrentInstance } from '@/util/getCurrentInstance'
import { mergeDeep, toKebabCase } from '@/util/helpers'
import { injectSelf } from '@/util/injectSelf'

// Types
import type { ComputedRef, InjectionKey, Ref, VNode } from 'vue'
import type { MaybeRef } from '@/util'

export type DefaultsInstance = undefined | {
  [key: string]: undefined | Record<string, unknown>
  global?: Record<string, unknown>
}

export type DefaultsOptions = Partial<DefaultsInstance>

export const DefaultsSymbol: InjectionKey<Ref<DefaultsInstance>> = Symbol.for('vuetify:defaults')

export function createDefaults (options?: DefaultsInstance): Ref<DefaultsInstance> {
  return ref(options)
}

export function injectDefaults () {
  const defaults = inject(DefaultsSymbol)

  if (!defaults) throw new Error('[Vuetify] Could not find defaults instance')

  return defaults
}

export function provideDefaults (
  defaults?: MaybeRef<DefaultsInstance | undefined>,
  options?: {
    disabled?: MaybeRef<boolean | undefined>
    reset?: MaybeRef<number | string | undefined>
    root?: MaybeRef<boolean | string | undefined>
    scoped?: MaybeRef<boolean | undefined>
  }
) {
  const injectedDefaults = injectDefaults()
  const providedDefaults = ref(defaults)

  const newDefaults = computed(() => {
    const disabled = unref(options?.disabled)

    if (disabled) return injectedDefaults.value

    const scoped = unref(options?.scoped)
    const reset = unref(options?.reset)
    const root = unref(options?.root)

    if (providedDefaults.value == null && !(scoped || reset || root)) return injectedDefaults.value

    let properties = mergeDeep(providedDefaults.value, { prev: injectedDefaults.value })

    if (scoped) return properties

    if (reset || root) {
      const len = Number(reset || Infinity)

      for (let i = 0; i <= len; i++) {
        if (!properties || !('prev' in properties)) {
          break
        }

        properties = properties.prev
      }

      if (properties && typeof root === 'string' && root in properties) {
        properties = mergeDeep(mergeDeep(properties, { prev: properties }), properties[root])
      }

      return properties
    }

    return properties.prev
      ? mergeDeep(properties.prev, properties)
      : properties
  }) as ComputedRef<DefaultsInstance>

  provide(DefaultsSymbol, newDefaults)

  return newDefaults
}

function propIsDefined (vnode: VNode, prop: string) {
  return typeof vnode.props?.[prop] !== 'undefined' ||
    typeof vnode.props?.[toKebabCase(prop)] !== 'undefined'
}

export function internalUseDefaults (
  props: Record<string, any> = {},
  name?: string,
  defaults = injectDefaults()
) {
  const vm = getCurrentInstance('useDefaults')

  name = name ?? vm.type.name ?? vm.type.__name
  if (!name) {
    throw new Error('[Vuetify] Could not determine component name')
  }

  const componentDefaults = computed(() => defaults.value?.[props._as ?? name])
  const _props = new Proxy(props, {
    get (target, prop) {
      const propValue = Reflect.get(target, prop)
      if (prop === 'class' || prop === 'style') {
        return [componentDefaults.value?.[prop], propValue].filter(v => v != null)
      } else if (typeof prop === 'string' && !propIsDefined(vm.vnode, prop)) {
        const kebabProp = toKebabCase(prop)
        const fromComponentDefaults = componentDefaults.value?.[prop] ?? componentDefaults.value?.[kebabProp]
        const fromGlobalDefaults = defaults.value?.global?.[prop] ?? defaults.value?.global?.[kebabProp]
        return fromComponentDefaults !== undefined
          ? fromComponentDefaults
          : fromGlobalDefaults !== undefined
            ? fromGlobalDefaults
            : propValue
      }
      return propValue
    },
  })

  const _subcomponentDefaults = shallowRef()
  watchEffect(() => {
    if (componentDefaults.value) {
      const subComponents = Object.entries(componentDefaults.value).filter(([key]) => key.startsWith(key[0].toUpperCase()))
      _subcomponentDefaults.value = subComponents.length ? Object.fromEntries(subComponents) : undefined
    } else {
      _subcomponentDefaults.value = undefined
    }
  })

  function provideSubDefaults () {
    const injected = injectSelf(DefaultsSymbol, vm)
    provide(DefaultsSymbol, computed(() => {
      return _subcomponentDefaults.value ? mergeDeep(
        injected?.value ?? {},
        _subcomponentDefaults.value
      ) : injected?.value
    }))
  }

  return { props: _props, provideSubDefaults }
}

export function useDefaults<T extends Record<string, any>> (props: T, name?: string): T
export function useDefaults (props?: undefined, name?: string): Record<string, any>
export function useDefaults (
  props: Record<string, any> = {},
  name?: string,
) {
  const { props: _props, provideSubDefaults } = internalUseDefaults(props, name)
  provideSubDefaults()
  return _props
}
