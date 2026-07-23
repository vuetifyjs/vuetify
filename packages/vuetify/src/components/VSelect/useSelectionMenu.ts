// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, toValue } from 'vue'

// Types
import type { MaybeRefOrGetter, Ref } from 'vue'
import type { VMenu } from '@/components/VMenu'

export interface SelectionMenuProps {
  menu: boolean
  'onUpdate:menu': ((value: boolean) => void) | undefined
  menuProps: VMenu['$props'] | undefined
  multiple: boolean
}

export function useSelectionMenu (
  props: SelectionMenuProps,
  options: {
    vMenuRef: Ref<VMenu | undefined>
    menuDisabled: MaybeRefOrGetter<boolean>
  },
) {
  const _menu = useProxiedModel(props, 'menu')
  const menu = computed({
    get: () => _menu.value,
    set: v => {
      if (_menu.value && !v && options.vMenuRef.value?.ΨopenChildren.size) return
      if (!v && props.menuProps?.persistent) return
      if (v && toValue(options.menuDisabled)) return
      _menu.value = v
    },
  })

  function closeOnSelect () {
    if (props.multiple || props.menuProps?.closeOnContentClick === false) return
    menu.value = false
  }

  return { menu, closeOnSelect }
}
