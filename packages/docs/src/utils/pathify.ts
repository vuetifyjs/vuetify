// general pathify function used to connect vuex-pathify to vue3 setup()
// https://github.com/davestewart/vuex-pathify/issues/95
import { computed } from 'vue'
import { useStore } from 'vuex'

export const usePathify = () => {
  const store = useStore()

  const get = (path: string) => computed(() => store.get(path))
  const set = (path: string, data: any) => store.set(path, data)
  const sync = (path: string) => {
    return computed({
      get () {
        return store.get(path)
      },
      set (val) {
        return store.set(path, val)
      },
    })
  }
  const call = (action: string, data: any) => store.dispatch(action, data)
  const commit = (mutation: string, data: any) => store.dispatch(mutation, data)

  return { get, set, sync, call, commit }
}
