// Utilities
import { propsFactory } from '@/util'
import {
  effectScope,
  getCurrentInstance,
  nextTick,
  onScopeDispose,
  ref,
  watch,
} from 'vue'

// Types
import type {
  ComponentPublicInstance,
  EffectScope,
  PropType,
  Ref,
} from 'vue'

interface ActivatorProps {
  activator?: 'parent' | string | Element | ComponentPublicInstance
  activatorProps: Dictionary<any>
}

export const makeActivatorProps = propsFactory({
  activator: [String, Object] as PropType<ActivatorProps['activator']>,
  activatorProps: {
    type: Object as PropType<ActivatorProps['activatorProps']>,
    default: () => ({}),
  },
})

export function useActivator (
  props: ActivatorProps,
  isActive: Ref<boolean>
) {
  const activatorElement = ref<HTMLElement>()
  function onActivatorClick (e: MouseEvent) {
    e.stopPropagation()
    activatorElement.value = (e.currentTarget || e.target) as HTMLElement
    isActive.value = !isActive.value
  }

  let scope: EffectScope
  watch(() => !!props.activator, val => {
    if (val) {
      scope = effectScope()
      scope.run(() => {
        _useActivator(props, { activatorElement, onActivatorClick })
      })
    } else if (scope) {
      scope.stop()
    }
  }, { flush: 'post', immediate: true })

  return { activatorElement, onActivatorClick }
}

function _useActivator (props: ActivatorProps, { activatorElement, onActivatorClick }: ReturnType<typeof useActivator>) {
  watch(() => props.activator, (val, oldVal) => {
    if (oldVal && val !== oldVal) {
      const activator = getActivator(oldVal)
      activator && unbindActivatorProps(activator)
    }
    if (val) {
      nextTick(() => bindActivatorProps())
    }
  }, { immediate: true })

  watch(() => props.activatorProps, () => {
    bindActivatorProps()
  })

  onScopeDispose(() => {
    unbindActivatorProps()
  })

  function bindActivatorProps (el = getActivator(), _props = props.activatorProps) {
    if (!el) return

    el.addEventListener('click', onActivatorClick)

    Object.keys(_props).forEach(k => {
      if (_props[k] == null) {
        el.removeAttribute(k)
      } else {
        el.setAttribute(k, _props[k])
      }
    })
  }

  function unbindActivatorProps (el = getActivator(), _props = props.activatorProps) {
    if (!el) return

    el.removeEventListener('click', onActivatorClick)

    Object.keys(_props).forEach(k => {
      el.removeAttribute(k)
    })
  }

  const vm = getCurrentInstance()
  function getActivator (selector = props.activator): HTMLElement | undefined {
    let activator
    if (selector) {
      if (selector === 'parent') {
        activator = vm?.proxy?.$el?.parentNode
      } else if (typeof selector === 'string') {
        // Selector
        activator = document.querySelector(selector)
      } else if ('$el' in selector) {
        // Component (ref)
        activator = selector.$el
      } else {
        // HTMLElement | Element
        activator = selector
      }
    }

    // The activator should only be a valid element (Ignore comments and text nodes)
    activatorElement.value = activator?.nodeType === Node.ELEMENT_NODE ? activator : null

    return activatorElement.value
  }
}
