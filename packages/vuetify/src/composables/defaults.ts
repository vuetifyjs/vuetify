// Composables
import { useToggleScope } from '@/composables/toggleScope'

// Utilities
import { computed, inject, provide, ref, shallowRef, unref, watchEffect } from 'vue'
import { getCurrentInstance, injectSelf, mergeDeep, removeDuplicate, toKebabCase } from '@/util'

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

export function useDefaults (props: Record<string, any>, name?: string, attrs?: any, defaults = injectDefaults()) {
  const vm = getCurrentInstance('useDefaults')

  name = name ?? vm.type.name ?? vm.type.__name
  if (!name) {
    throw new Error('[Vuetify] Could not determine component name')
  }

  const componentDefaults = computed(() => defaults.value![props._as ?? name])
  const _props = new Proxy(props, {
    get (target, prop: string) {
      if (!propIsDefined(vm.vnode, prop) && prop !== 'class') {
        return componentDefaults.value?.[prop] ?? defaults.value!.global?.[prop] ?? target[prop]
      }
      return Reflect.get(target, prop)
    },
  })

  const _attrs = new Proxy(attrs, {
    get (target, attr: string) {
      if (attr === 'class') {
        const classStr = `${componentDefaults.value?.[attr] ?? defaults.value!.global?.[attr]} ${target[attr]}`
        return removeDuplicate(classStr.replace('undefined', ''))
      }
      return Reflect.get(target, attr)
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

  return { props: _props, attrs: _attrs, provideSubDefaults }
}
