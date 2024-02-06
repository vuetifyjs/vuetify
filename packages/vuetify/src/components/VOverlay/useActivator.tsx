// Components
import { VMenuSymbol } from '@/components/VMenu/shared'

// Composables
import { makeDelayProps, useDelay } from '@/composables/delay'

// Utilities
import {
  computed,
  effectScope,
  inject,
  mergeProps,
  nextTick,
  onScopeDispose,
  ref,
  watch,
  watchEffect,
} from 'vue'
import {
  bindProps,
  getCurrentInstance,
  IN_BROWSER,
  matchesSelector,
  propsFactory,
  refElement,
  unbindProps,
} from '@/util'

// Types
import type {
  ComponentInternalInstance,
  ComponentPublicInstance,
  EffectScope,
  PropType,
  Ref,
} from 'vue'
import type { DelayProps } from '@/composables/delay'

interface ActivatorProps extends DelayProps {
  target: 'parent' | 'cursor' | (string & {}) | Element | ComponentPublicInstance | [x: number, y: number] | undefined
  activator: 'parent' | (string & {}) | Element | ComponentPublicInstance | undefined
  activatorProps: Record<string, any>

  openOnClick: boolean | undefined
  openOnHover: boolean
  openOnFocus: boolean | undefined

  closeOnContentClick: boolean
}

export const makeActivatorProps = propsFactory({
  target: [String, Object] as PropType<ActivatorProps['target']>,
  activator: [String, Object] as PropType<ActivatorProps['activator']>,
  activatorProps: {
    type: Object as PropType<ActivatorProps['activatorProps']>,
    default: () => ({}),
  },

  openOnClick: {
    type: Boolean,
    default: undefined,
  },
  openOnHover: Boolean,
  openOnFocus: {
    type: Boolean,
    default: undefined,
  },

  closeOnContentClick: Boolean,

  ...makeDelayProps(),
}, 'VOverlay-activator')

export function useActivator (
  props: ActivatorProps,
  { isActive, isTop }: { isActive: Ref<boolean>, isTop: Ref<boolean> }
) {
  const vm = getCurrentInstance('useActivator')
  const activatorEl = ref<HTMLElement>()

  let isHovered = false
  let isFocused = false
  let firstEnter = true

  const openOnFocus = computed(() => props.openOnFocus || (props.openOnFocus == null && props.openOnHover))
  const openOnClick = computed(() => props.openOnClick || (props.openOnClick == null && !props.openOnHover && !openOnFocus.value))

  const { runOpenDelay, runCloseDelay } = useDelay(props, value => {
    if (
      value === (
        (props.openOnHover && isHovered) ||
        (openOnFocus.value && isFocused)
      ) && !(props.openOnHover && isActive.value && !isTop.value)
    ) {
      if (isActive.value !== value) {
        firstEnter = true
      }
      isActive.value = value
    }
  })

  const cursorTarget = ref<[x: number, y: number]>()
  const availableEvents = {
    onClick: (e: MouseEvent) => {
      e.stopPropagation()
      activatorEl.value = (e.currentTarget || e.target) as HTMLElement
      if (!isActive.value) {
        cursorTarget.value = [e.clientX, e.clientY]
      }
      isActive.value = !isActive.value
    },
    onMouseenter: (e: MouseEvent) => {
      if (e.sourceCapabilities?.firesTouchEvents) return

      isHovered = true
      activatorEl.value = (e.currentTarget || e.target) as HTMLElement
      runOpenDelay()
    },
    onMouseleave: (e: MouseEvent) => {
      isHovered = false
      runCloseDelay()
    },
    onFocus: (e: FocusEvent) => {
      if (matchesSelector(e.target as HTMLElement, ':focus-visible') === false) return

      isFocused = true
      e.stopPropagation()
      activatorEl.value = (e.currentTarget || e.target) as HTMLElement

      runOpenDelay()
    },
    onBlur: (e: FocusEvent) => {
      isFocused = false
      e.stopPropagation()

      runCloseDelay()
    },
  }

  const activatorEvents = computed(() => {
    const events: Partial<typeof availableEvents> = {}

    if (openOnClick.value) {
      events.onClick = availableEvents.onClick
    }
    if (props.openOnHover) {
      events.onMouseenter = availableEvents.onMouseenter
      events.onMouseleave = availableEvents.onMouseleave
    }
    if (openOnFocus.value) {
      events.onFocus = availableEvents.onFocus
      events.onBlur = availableEvents.onBlur
    }

    return events
  })

  const contentEvents = computed(() => {
    const events: Record<string, EventListener> = {}

    if (props.openOnHover) {
      events.onMouseenter = () => {
        isHovered = true
        runOpenDelay()
      }
      events.onMouseleave = () => {
        isHovered = false
        runCloseDelay()
      }
    }

    if (openOnFocus.value) {
      events.onFocusin = () => {
        isFocused = true
        runOpenDelay()
      }
      events.onFocusout = () => {
        isFocused = false
        runCloseDelay()
      }
    }

    if (props.closeOnContentClick) {
      const menu = inject(VMenuSymbol, null)
      events.onClick = () => {
        isActive.value = false
        menu?.closeParents()
      }
    }

    return events
  })

  const scrimEvents = computed(() => {
    const events: Record<string, EventListener> = {}

    if (props.openOnHover) {
      events.onMouseenter = () => {
        if (firstEnter) {
          isHovered = true
          firstEnter = false
          runOpenDelay()
        }
      }
      events.onMouseleave = () => {
        isHovered = false
        runCloseDelay()
      }
    }

    return events
  })

  watch(isTop, val => {
    if (val && (
      (props.openOnHover && !isHovered && (!openOnFocus.value || !isFocused)) ||
      (openOnFocus.value && !isFocused && (!props.openOnHover || !isHovered))
    )) {
      isActive.value = false
    }
  })

  watch(isActive, val => {
    if (!val) {
      setTimeout(() => {
        cursorTarget.value = undefined
      })
    }
  }, { flush: 'post' })

  const activatorRef = ref<HTMLElement>()
  watchEffect(() => {
    if (!activatorRef.value) return

    nextTick(() => {
      activatorEl.value = refElement(activatorRef.value)
    })
  })

  const targetRef = ref<HTMLElement>()
  const target = computed(() => {
    if (props.target === 'cursor' && cursorTarget.value) return cursorTarget.value
    if (targetRef.value) return refElement(targetRef.value)
    return getTarget(props.target, vm) || activatorEl.value
  })
  const targetEl = computed(() => {
    return Array.isArray(target.value)
      ? undefined
      : target.value
  })

  let scope: EffectScope
  watch(() => !!props.activator, val => {
    if (val && IN_BROWSER) {
      scope = effectScope()
      scope.run(() => {
        _useActivator(props, vm, { activatorEl, activatorEvents })
      })
    } else if (scope) {
      scope.stop()
    }
  }, { flush: 'post', immediate: true })

  onScopeDispose(() => {
    scope?.stop()
  })

  return { activatorEl, activatorRef, target, targetEl, targetRef, activatorEvents, contentEvents, scrimEvents }
}

function _useActivator (
  props: ActivatorProps,
  vm: ComponentInternalInstance,
  { activatorEl, activatorEvents }: Pick<ReturnType<typeof useActivator>, 'activatorEl' | 'activatorEvents'>
) {
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

    bindProps(el, mergeProps(activatorEvents.value, _props))
  }

  function unbindActivatorProps (el = getActivator(), _props = props.activatorProps) {
    if (!el) return

    unbindProps(el, mergeProps(activatorEvents.value, _props))
  }

  function getActivator (selector = props.activator): HTMLElement | undefined {
    const activator = getTarget(selector, vm)

    // The activator should only be a valid element (Ignore comments and text nodes)
    activatorEl.value = activator?.nodeType === Node.ELEMENT_NODE ? activator : undefined

    return activatorEl.value
  }
}

function getTarget<T extends 'parent' | string | Element | ComponentPublicInstance | [x: number, y: number] | undefined> (
  selector: T,
  vm: ComponentInternalInstance
): HTMLElement | undefined | (T extends any[] ? [x: number, y: number] : never) {
  if (!selector) return

  let target
  if (selector === 'parent') {
    let el = vm?.proxy?.$el?.parentNode
    while (el?.hasAttribute('data-no-activator')) {
      el = el.parentNode
    }
    target = el
  } else if (typeof selector === 'string') {
    // Selector
    target = document.querySelector(selector)
  } else if ('$el' in selector) {
    // Component (ref)
    target = selector.$el
  } else {
    // HTMLElement | Element | [x, y]
    target = selector
  }

  return target
}
