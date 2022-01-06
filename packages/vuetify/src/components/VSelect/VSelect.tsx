// Components
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VTextField } from '..'

// Utility
import { genericComponent, useRender, wrapInArray } from '@/util'
import type { PropType } from 'vue'
import { computed, ref, watch } from 'vue'

// Types
import type { MakeSlots } from '@/util'
import type { LinkProps } from '@/composables/router'
import { useProxiedModel } from '@/composables/proxiedModel'

export type SelectItem = string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any) | (LinkProps & {
  text: string
})

function filterDuplicates (arr: any[]) {
  const uniqueValues = new Map()
  for (let index = 0; index < arr.length; ++index) {
    const item = arr[index]

    // Do not deduplicate headers or dividers (#12517)
    if (item.header || item.divider) {
      uniqueValues.set(item, item)
      continue
    }

    const val = this.getValue(item)

    // TODO: comparator
    !uniqueValues.has(val) && uniqueValues.set(val, item)
  }
  return Array.from(uniqueValues.values())
}

export const VSelect = genericComponent<new <T>() => {
  $slots: MakeSlots<{
    default: []
    title: []
  }>
}>()({
  name: 'VSelect',

  props: {
    items: {
      type: Array as PropType<SelectItem[]>,
      default: () => ([]),
    },
    modelValue: {
      type: [String, Array],
      default: () => ([]),
    },
    multiple: Boolean,
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { attrs, slots, emit }) {
    const model = useProxiedModel(
      props,
      'modelValue',
      [],
      v => wrapInArray(v),
      (v: any) => props.multiple ? v : v[0]
    )
    const menu = ref(false)
    const items = computed(() => (
      props.items.map(item => (
        Object(item) === item
          ? item
          : { title: item, value: item }
      ))
    ))

    const activated = computed({
      get: () => model.value,
      set: val => {
        model.value = val
        menu.value = false
      },
    })

    useRender(() => {
      return (
        <VTextField
          { ...attrs }
          { ...props }
          readonly
          modelValue={ model.value.join(', ') }
        >
          {{
            ...slots,
            control: () => (
              <VMenu v-model={ menu.value } activator="parent" anchor="bottom center" eager>
                <VList
                  elevation="4"
                  rounded
                  v-model:active={ activated.value }
                  items={ items.value }
                  activeStrategy={ props.multiple ? 'multiple' : 'single' }
                />
              </VMenu>
            ),
          }}
        </VTextField>
      )
    })

    return {}
  },
})

export type VSelect = InstanceType<typeof VSelect>
