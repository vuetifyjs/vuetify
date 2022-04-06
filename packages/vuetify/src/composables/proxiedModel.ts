// Utilities
import { computed, ref } from 'vue'
import { getCurrentInstance, toKebabCase } from '@/util'

// Types
import type { Ref } from 'vue'

// Composables
export function useProxiedModel<
  Props extends object & { [key in Prop as `onUpdate:${Prop}`]: ((val: any) => void) | undefined },
  Prop extends Extract<keyof Props, string>,
  Inner = Props[Prop],
> (
  props: Props,
  prop: Prop,
  defaultValue?: Props[Prop],
  transformIn: (value?: Props[Prop]) => Inner = (v: any) => v,
  transformOut: (value: Inner) => Props[Prop] = (v: any) => v,
) {
  const vm = getCurrentInstance('useProxiedModel')

  const propIsDefined = computed(() => {
    return !!(
      typeof props[prop] !== 'undefined' &&
      (vm?.vnode.props?.hasOwnProperty(prop) || vm?.vnode.props?.hasOwnProperty(toKebabCase(prop)))
    )
  })

  const internal = ref(transformIn(props[prop])) as Ref<Inner>

  return computed<Inner>({
    get () {
      if (propIsDefined.value) return transformIn(props[prop])
      else return internal.value
    },
    set (newValue) {
      if ((propIsDefined.value ? transformIn(props[prop]) : internal.value) === newValue) {
        return
      }
      internal.value = newValue
      vm?.emit(`update:${prop}`, transformOut(newValue))
    },
  })
}
