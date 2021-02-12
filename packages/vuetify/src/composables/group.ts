// Utilities
import { reactive, provide, inject, computed, onBeforeUnmount, toRef, onMounted } from 'vue'
import { wrapInArray, getUid, deepEqual } from '@/util/helpers'
import { consoleWarn } from '@/util/console'
import { useProxiedModel } from './proxiedModel'

// Types
import type { Ref, UnwrapRef, InjectionKey } from 'vue'

interface GroupItem {
  id: number
  value: Ref<unknown>
  disabled: Ref<boolean | undefined>
}

interface GroupProps {
  modelValue?: unknown
  multiple?: boolean
  mandatory?: boolean
  max?: number
}

interface GroupProvide {
  register: (item: GroupItem, index?: number) => void
  unregister: (id: number) => void
  select: (id: number, value: boolean) => void
  selected: Ref<any[]>
  isSelected: (id: number) => boolean
  prev: () => void
  next: () => void
}

export function useGroupItem (
  props: { value?: unknown, index?: number, disabled?: boolean },
  injectKey: InjectionKey<GroupProvide>,
) {
  const group = inject(injectKey, null)

  if (!group) {
    throw new Error(`[Vuetify] Could not find useGroup injection with symbol ${injectKey.description}`)
  }

  const id = getUid()

  group.register({
    id,
    value: toRef(props, 'value'),
    disabled: toRef(props, 'disabled'),
  }, props.index)

  onBeforeUnmount(() => {
    group.unregister(id)
  })

  const isSelected = computed(() => {
    return group.isSelected(id)
  })

  return {
    isSelected,
    toggle: () => group.select(id, !isSelected.value),
    select: (value: boolean) => group.select(id, value),
  }
}

export function useGroup (
  props: GroupProps,
  injectKey: InjectionKey<GroupProvide>
) {
  const items = reactive<GroupItem[]>([])
  const selected = useProxiedModel(
    props,
    'modelValue',
    [],
    v => {
      if (v == null) return []

      return getIds(items, wrapInArray(v))
    },
    v => {
      const arr = getValues(items, v)

      return props.multiple ? arr : arr[0]
    }
  )

  function register (item: GroupItem, index?: number) {
    // Is there a better way to fix this typing?
    const unwrapped = item as unknown as UnwrapRef<GroupItem>
    if (index != null) items.splice(index, 0, unwrapped)
    else items.push(unwrapped)
  }

  function unregister (id: number) {
    selected.value = selected.value.filter(v => v !== id)

    if (props.mandatory && !selected.value.length) {
      selected.value = [items[items.length - 1].id]
    }

    const index = items.findIndex(item => item.id === id)
    items.splice(index, 1)
  }

  onMounted(() => {
    // If mandatory and nothing is selected, then select first non-disabled item
    const item = items.find(item => !item.disabled)
    if (item && props.mandatory && !selected.value.length) {
      selected.value = [item.id]
    }
  })

  function select (id: number, isSelected: boolean) {
    const item = items.find(item => item.id === id)
    if (isSelected && item?.disabled) return

    if (props.multiple) {
      const internalValue = selected.value.slice()
      const index = internalValue.findIndex(v => v === id)

      // We can't remove value if group is
      // mandatory, value already exists,
      // and it is the only value
      if (
        props.mandatory &&
        index > -1 &&
        internalValue.length <= 1
      ) return

      // We can't add value if it would
      // cause max limit to be exceeded
      if (
        props.max != null &&
        index < 0 &&
        internalValue.length + 1 > props.max
      ) return

      if (index < 0 && isSelected) internalValue.push(id)
      else if (index >= 0 && !isSelected) internalValue.splice(index, 1)

      selected.value = internalValue
    } else {
      if (props.mandatory && selected.value.includes(id)) return

      selected.value = isSelected ? [id] : []
    }
  }

  function getOffsetId (offset: number) {
    // getting an offset from selected value obviously won't work with multiple values
    if (props.multiple) consoleWarn('This method is not supported when using "multiple" prop')

    // If there is nothing selected, then next value is first item
    if (!selected.value.length) return items[0].id

    const currentId = selected.value[0]
    const currentIndex = items.findIndex(i => i.id === currentId)
    const newIndex = (currentIndex + offset) % items.length

    return items[newIndex].id
  }

  const state = {
    register,
    unregister,
    selected,
    select,
    prev: () => selected.value = [getOffsetId(items.length - 1)],
    next: () => selected.value = [getOffsetId(1)],
    step: (steps: number) => selected.value = [getOffsetId(steps)],
    isSelected: (id: number) => selected.value.includes(id),
  }

  provide(injectKey, state)

  return state
}

function getIds (items: UnwrapRef<GroupItem[]>, modelValue: any[]) {
  const ids = []

  for (const item of items) {
    if (
      (item.value != null && modelValue.find(value => deepEqual(value, item.value))) ||
      modelValue.includes(item.id)
    ) {
      ids.push(item.id)
    }
  }

  return ids
}

function getValues (items: UnwrapRef<GroupItem[]>, ids: any[]) {
  const values = []

  for (const item of items) {
    if (ids.includes(item.id)) {
      values.push(item.value != null ? item.value : item.id)
    }
  }

  return values
}
