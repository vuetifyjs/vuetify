// Components
import { VMenuSymbol } from '@/components/VMenu/shared'

// Composables
import { makeDelayProps, useDelay } from '@/composables/delay'

// Utilities
import {
  computed,
  effectScope,
  inject,
  nextTick,
  onScopeDispose,
  ref,
  watch,
  watchEffect,
} from 'vue'
import {
  getCurrentInstance,
  IN_BROWSER,
  propsFactory,
  refElement,
  SUPPORTS_FOCUS_VISIBLE,
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
  activator?: 'parent' | string | Element | ComponentPublicInstance
  activatorProps: Record<string, any>

  openOnClick: boolean | undefined
  openOnHover: boolean
  openOnFocus: boolean | undefined

  closeOnContentClick: boolean
}

export const makeActivatorProps = propsFactory({
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
}, 'v-overlay-activator')

export function useActivator (
  props: ActivatorProps,
  { isActive, isTop }: { isActive: Ref<boolean>, isTop: Ref<boolean> }
) {
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

  const availableEvents = {
    click: (e: MouseEvent) => {
      e.stopPropagation()
      activatorEl.value = (e.currentTarget || e.target) as HTMLElement
      isActive.value = !isActive.value
    },
    mouseenter: (e: MouseEvent) => {
      if (e.sourceCapabilities?.firesTouchEvents) return

      isHovered = true
      activatorEl.value = (e.currentTarget || e.target) as HTMLElement
      runOpenDelay()
    },
    mouseleave: (e: MouseEvent) => {
      isHovered = false
      runCloseDelay()
    },
    focus: (e: FocusEvent) => {
      if (
        SUPPORTS_FOCUS_VISIBLE &&
        !(e.target as HTMLElement).matches(':focus-visible')
      ) return

      isFocused = true
      e.stopPropagation()
      activatorEl.value = (e.currentTarget || e.target) as HTMLElement

      runOpenDelay()
    },
    blur: (e: FocusEvent) => {
      isFocused = false
      e.stopPropagation()

      runCloseDelay()
    },
  }

  const activatorEvents = computed(() => {
    const events: Partial<typeof availableEvents> = {}

    if (openOnClick.value) {
      events.click = availableEvents.click
    }
    if (props.openOnHover) {
      events.mouseenter = availableEvents.mouseenter
      events.mouseleave = availableEvents.mouseleave
    }
    if (openOnFocus.value) {
      events.focus = availableEvents.focus
      events.blur = availableEvents.blur
    }

    return events
  })

  const contentEvents = computed(() => {
    const events: Partial<typeof availableEvents> = {}

    if (props.openOnHover) {
      events.mouseenter = () => {
        isHovered = true
        runOpenDelay()
      }
      events.mouseleave = () => {
        isHovered = false
        runCloseDelay()
      }
    }

    if (props.closeOnContentClick) {
      const menu = inject(VMenuSymbol, null)
      events.click = () => {
        isActive.value = false
        menu?.closeParents()
      }
    }

    return events
  })

  const scrimEvents = computed(() => {
    const events: Partial<typeof availableEvents> = {}
    if (props.openOnHover) {
      events.mouseenter = () => {
        if (firstEnter) {
          isHovered = true
          firstEnter = false
          runOpenDelay()
        }
      }
      events.mouseleave = () => {
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

  const activatorRef = ref()
  watchEffect(() => {
    if (!activatorRef.value) return

    nextTick(() => {
      activatorEl.value = refElement(activatorRef.value)
    })
  })

  const vm = getCurrentInstance('useActivator')
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

  return { activatorEl, activatorRef, activatorEvents, contentEvents, scrimEvents }
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

    Object.entries(activatorEvents.value).forEach(([name, cb]) => {
      el.addEventListener(name, cb as (e: Event) => void)
    })

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

    Object.entries(activatorEvents.value).forEach(([name, cb]) => {
      el.removeEventListener(name, cb as (e: Event) => void)
    })

    Object.keys(_props).forEach(k => {
      el.removeAttribute(k)
    })
  }

  function getActivator (selector = props.activator): HTMLElement | undefined {
    let activator
    if (selector) {
      if (selector === 'parent') {
        let el = vm?.proxy?.$el?.parentNode
        while (el.hasAttribute('data-no-activator')) {
          el = el.parentNode
        }
        activator = el
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
    activatorEl.value = activator?.nodeType === Node.ELEMENT_NODE ? activator : null

    return activatorEl.value
  }
}
