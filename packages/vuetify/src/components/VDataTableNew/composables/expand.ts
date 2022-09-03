import { inject, provide, ref, toRef } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import { propsFactory } from '@/util'

export const makeDataTableExpandProps = propsFactory({
  expandOnClick: Boolean,
}, 'v-data-table-expand')

export const VDataTableExpandedKey: InjectionKey<{
  expand: (item: any, value: boolean) => void
  expanded: Ref<Set<string>>
  expandOnClick: Ref<boolean | undefined>
}> = Symbol.for('vuetify:datatable:expanded')

type ExpandProps = {
  expandOnClick: boolean
}

export function createExpanded (props: ExpandProps) {
  const expandOnClick = toRef(props, 'expandOnClick')
  const expanded = ref(new Set<string>())

  function expand (item: any, value: boolean) {
    if (!value) {
      expanded.value.delete(item.value)
    } else {
      expanded.value.add(item.value)
    }
  }

  const data = { expand, expanded, expandOnClick }

  provide(VDataTableExpandedKey, data)

  return data
}

export function useExpanded () {
  const data = inject(VDataTableExpandedKey)

  if (!data) throw new Error('foo')

  return data
}
