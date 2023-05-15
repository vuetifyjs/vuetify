// Composables
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { computed, inject, provide, ref, shallowRef, unref, watchEffect } from 'vue'
import { getCurrentInstance, injectSelf, mergeDeep, toKebabCase } from '@/util'

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
    root?: MaybeRef<boolean | undefined>
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
        return componentDefaults.value?.[prop] ?? defaults.value?.global?.[prop] ?? propValue
      }
      return propValue
    },
  })

  const _subcomponentDefaults = shallowRef()
  watchEffect(() => {
    if (componentDefaults.value) {
      const subComponents = Object.entries(componentDefaults.value).filter(([key]) => key.startsWith(key[0].toUpperCase()))
      if (subComponents.length) _subcomponentDefaults.value = Object.fromEntries(subComponents)
    }
  })

  function provideSubDefaults () {
    // If subcomponent defaults are provided, override any
    // subcomponents provided by the component's setup function.
    // This uses injectSelf so must be done after the original setup to work.
    useToggleScope(_subcomponentDefaults, () => {
      provideDefaults(mergeDeep(
        injectSelf(DefaultsSymbol)?.value ?? {},
        _subcomponentDefaults.value
      ))
    })
  }

  return { props: _props, provideSubDefaults }
}

export function useDefaults (
  props: Record<string, any> = {},
  name?: string,
) {
  const { props: _props, provideSubDefaults } = internalUseDefaults(props, name)
  provideSubDefaults()
  return _props
}
