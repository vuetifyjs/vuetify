import {
  ref,
  SetupContext,
  computed,
  getCurrentInstance,
  Ref,
} from 'vue'
import { deepEqual } from '../util/helpers'

export function useValueProxy <T, P extends keyof T> (props: T, context: SetupContext, prop: P, event?: string) {
  const internal: Ref<T[P]> = ref(props[prop])

  const propIsDefined = computed(() => {
    const instance = getCurrentInstance()
    return instance && instance.vnode.props && instance.vnode.props.hasOwnProperty(prop)
  })

  const proxy = computed<T[P]>({
    get () {
      if (propIsDefined.value) return props[prop]
      else return internal.value as unknown as T[P]
    },
    set (v) {
      const value = (propIsDefined.value ? props[prop] : internal.value) as T[P]
      if (deepEqual(v, value)) return

      internal.value = v as any
      context.emit(`update:${event || prop}`, v)
    },
  })

  return { proxy }
}
