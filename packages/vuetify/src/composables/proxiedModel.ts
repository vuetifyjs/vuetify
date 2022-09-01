// Utilities
import { computed, isRef, ref, unref, watch } from 'vue'
import { getCurrentInstance, toKebabCase } from '@/util'

// Types
import type { Ref } from 'vue'
import type { MaybeRef } from '@/util'

// Composables
export function useProxiedModel<
  Props extends object & { [key in Prop as `onUpdate:${Prop}`]: ((val: any) => void) | undefined },
  Prop extends Extract<keyof Props, string>,
  Inner = Props[Prop],
> (
  props: Props,
  prop: Prop,
  defaultValue?: MaybeRef<Props[Prop] | undefined>,
  transformIn: (value?: Props[Prop]) => Inner = (v: any) => v,
  transformOut: (value: Inner) => Props[Prop] = (v: any) => v,
) {
  const vm = getCurrentInstance('useProxiedModel')

  const propIsDefined = computed(() => {
    void props[prop]
    return !!(
      (vm?.vnode.props?.hasOwnProperty(prop) || vm?.vnode.props?.hasOwnProperty(toKebabCase(prop)))
    )
  })

  const initialValue = unref(defaultValue)
  const internal = ref(
    propIsDefined.value ? transformIn(props[prop])
    : initialValue !== undefined ? transformIn(initialValue)
    : undefined
  ) as Ref<Inner>

  if (isRef(defaultValue)) {
    watch(defaultValue, val => internal.value = transformIn(val))
  }

  return computed<Inner extends any[] ? Readonly<Inner> : Inner>({
    get (): any {
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
