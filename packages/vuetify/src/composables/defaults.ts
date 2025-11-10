// Utilities
import { computed, inject, provide, ref, shallowRef, unref, watchEffect } from 'vue'
import { getCurrentInstance } from '@/util/getCurrentInstance'
import { mergeDeep, toKebabCase } from '@/util/helpers'
import { injectSelf } from '@/util/injectSelf'

// Types
import type { ComputedRef, InjectionKey, Ref, VNode } from 'vue'
import type { MaybeRef } from '@/util'

export type SlotDefaults = {
  [slotName: string]: Record<string, unknown>
}

export type ComponentDefaults = Record<string, unknown> & {
  [slotKey: `#${string}`]: Record<string, unknown>
}

export type DefaultsInstance = undefined | {
  [key: string]: undefined | ComponentDefaults
  global?: ComponentDefaults
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
  return vnode.props && (typeof vnode.props[prop] !== 'undefined' ||
    typeof vnode.props[toKebabCase(prop)] !== 'undefined')
}

function extractSlotDefaults (componentDefaults: ComponentDefaults | undefined): {
  componentDefaults: Record<string, unknown>
  slotDefaults: SlotDefaults
} {
  if (!componentDefaults) {
    return { componentDefaults: {}, slotDefaults: {} }
  }

  const slotDefaults: SlotDefaults = {}
  const filteredComponentDefaults: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(componentDefaults)) {
    if (key.startsWith('#')) {
      const slotName = key.slice(1) // Remove the '#' prefix
      slotDefaults[slotName] = value as Record<string, unknown>
    } else {
      filteredComponentDefaults[key] = value
    }
  }

  return { componentDefaults: filteredComponentDefaults, slotDefaults }
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

  const rawComponentDefaults = computed(() => defaults.value?.[props._as ?? name] as ComponentDefaults | undefined)
  const extractedDefaults = computed(() => 
    extractSlotDefaults(rawComponentDefaults.value)
  )
  const componentDefaults = computed(() => extractedDefaults.value.componentDefaults)

  const _props = new Proxy(props, {
    get (target, prop: string) {
      const propValue = Reflect.get(target, prop)
      if (prop === 'class' || prop === 'style') {
        return [componentDefaults.value?.[prop], propValue].filter(v => v != null)
      }
      if (propIsDefined(vm.vnode, prop)) return propValue
      const _componentDefault = componentDefaults.value?.[prop]
      if (_componentDefault !== undefined) return _componentDefault
      const _globalDefault = defaults.value?.global?.[prop]
      if (_globalDefault !== undefined) return _globalDefault
      return propValue
    },
  })

  const _subcomponentDefaults = shallowRef()
  const _slotDefaults = shallowRef<SlotDefaults>()
  
  watchEffect(() => {
    const extracted = extractedDefaults.value
    
    if (extracted.componentDefaults) {
      const subComponents = Object.entries(extracted.componentDefaults)
        .filter(([key]) => key.startsWith(key[0].toUpperCase()))
      _subcomponentDefaults.value = subComponents.length ? Object.fromEntries(subComponents) : undefined
    } else {
      _subcomponentDefaults.value = undefined
    }
    
    _slotDefaults.value = extracted.slotDefaults
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

  function getSlotDefaults (slotName: string): Record<string, unknown> | undefined {
    return _slotDefaults.value?.[slotName]
  }

  return { props: _props, provideSubDefaults, getSlotDefaults }
}

export function useDefaults<T extends Record<string, any>> (props: T, name?: string): T & { getSlotDefaults: (slotName: string) => Record<string, unknown> | undefined }
export function useDefaults (props?: undefined, name?: string): Record<string, any> & { getSlotDefaults: (slotName: string) => Record<string, unknown> | undefined }
export function useDefaults (
  props: Record<string, any> = {},
  name?: string,
) {
  const { props: _props, provideSubDefaults, getSlotDefaults } = internalUseDefaults(props, name)
  provideSubDefaults()
  
  // Create a new proxy that includes getSlotDefaults
  return new Proxy(_props, {
    get(target, prop) {
      if (prop === 'getSlotDefaults') {
        return getSlotDefaults
      }
      return Reflect.get(target, prop)
    },
    has(target, prop) {
      if (prop === 'getSlotDefaults') {
        return true
      }
      return Reflect.has(target, prop)
    },
    ownKeys(target) {
      return [...Reflect.ownKeys(target), 'getSlotDefaults']
    }
  })
}

export function createSlotDefaults (slotDefaults: Record<string, unknown> | undefined) {
  if (!slotDefaults) return {}

  const componentDefaults: Record<string, unknown> = {}
  const directProps: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(slotDefaults)) {
    if (key[0] === key[0].toUpperCase()) {
      // Component defaults (e.g., VBtn: { size: 'md' })
      componentDefaults[key] = value
    } else {
      // Direct props (e.g., class: 'pa-0')
      directProps[key] = value
    }
  }

  return { componentDefaults, directProps }
}

// Helper function to get slot defaults info without rendering
export function useSlotDefaults() {
  const defaults = injectDefaults()
  const vm = getCurrentInstance('useSlotDefaults')
  
  function getSlotDefaultsInfo(slotName: string) {
    const componentName = vm?.type.name ?? vm?.type.__name
    if (!componentName) return null
    
    const componentDefaults = defaults.value?.[componentName] as ComponentDefaults | undefined
    const { slotDefaults } = extractSlotDefaults(componentDefaults)
    const slotDefaultsForSlot = slotDefaults[slotName]
    
    if (!slotDefaultsForSlot) return null
    
    return createSlotDefaults(slotDefaultsForSlot)
  }
  
  return { getSlotDefaultsInfo }
}
