// Utilities
import { computed, ref } from 'vue'
import { getCurrentInstance, toKebabCase } from '@/util'

// Types
import type { Ref } from 'vue'

type InnerVal<T> = T extends any[] ? Readonly<T> : T

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
    void props[prop]
    return !!(
      (vm?.vnode.props?.hasOwnProperty(prop) || vm?.vnode.props?.hasOwnProperty(toKebabCase(prop)))
    )
  })

  const internal = ref(props[prop]) as Ref<Props[Prop]>

  const model = computed({
    get (): any {
      return transformIn(propIsDefined.value ? props[prop] : internal.value)
    },
    set (newValue) {
      if (transformIn(propIsDefined.value ? props[prop] : internal.value) === newValue) {
        return
      }
      newValue = transformOut(newValue)
      internal.value = newValue
      vm?.emit(`update:${prop}`, newValue)
    },
  }) as any as Ref<InnerVal<Inner>> & { readonly externalValue: Props[Prop] }

  Object.defineProperty(model, 'externalValue', {
    get: () => propIsDefined.value ? props[prop] : internal.value,
  })

  return model
}
