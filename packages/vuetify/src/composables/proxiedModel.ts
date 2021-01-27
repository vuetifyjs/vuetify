// Types
import type { Ref } from 'vue'

// Utilities
import { ref, computed, getCurrentInstance, capitalize } from 'vue'
import { consoleError } from '../util/console'

export function useProxiedModel<
  Inner,
  Props extends object,
  Prop extends Extract<keyof Props, string>,
> (
  props: Props,
  prop: Prop,
  defaultValue?: Props[Prop],
  transformIn: (value?: Props[Prop]) => Inner = (v: any) => v,
  transformOut: (value: Inner) => Props[Prop] = (v: any) => v,
) {
  const vm = getCurrentInstance()

  if (!vm) consoleError('useProxiedModel must be called from inside a setup function')

  const propIsDefined = computed(() => {
    return !!(
      typeof props[prop] !== 'undefined' &&
      (vm?.vnode.props?.hasOwnProperty(prop) || vm?.vnode.props?.hasOwnProperty(capitalize(prop)))
    )
  })

  const internal = ref(transformIn(propIsDefined.value ? props[prop] : defaultValue)) as Ref<Inner>

  return computed<Inner>({
    get () {
      if (propIsDefined.value) return transformIn(props[prop])
      else return internal.value
    },
    set (newValue) {
      internal.value = newValue
      vm?.emit(`update:${prop}`, transformOut(newValue))
    },
  })
}
