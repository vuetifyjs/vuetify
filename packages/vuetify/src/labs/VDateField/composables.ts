import { useDate } from '@/composables/date'
import { useProxiedModel } from '@/composables/proxiedModel'
import { wrapInArray } from '@/util'

export function createDateField (props: any, isRange: boolean) {
  const { adapter } = useDate()
  const model = useProxiedModel(
    props,
    'modelValue',
    null,
    v => {
      const arr = wrapInArray(v).filter(v => !!v)

      return arr.map(adapter.value.date)
    },
    v => {
      // if (isRange) return v
      // return v[0]
      return wrapInArray(v)
    })

  // const model = computed({
  //   get () {
  //     console.log('foo', wrapInArray(foo.value))
  //     return wrapInArray(foo.value)
  //   },
  //   set (value) {
  //     console.log('set', value)
  //     foo.value = value
  //   },
  // })

  const inputMode = useProxiedModel(props, 'inputMode')
  const viewMode = useProxiedModel(props, 'viewMode')
  const displayDate = useProxiedModel(props, 'displayDate', adapter.value.date())

  return {
    model,
    adapter,
    inputMode,
    viewMode,
    displayDate,
  }
}
