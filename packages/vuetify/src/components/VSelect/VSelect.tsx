// Components
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VTextField } from '..'

// Utility
import { genericComponent, useRender } from '@/util'
import type { PropType } from 'vue'
import { computed, ref, watch } from 'vue'

// Types
import type { MakeSlots } from '@/util'
import type { LinkProps } from '@/composables/router'
import { useProxiedModel } from '@/composables/proxiedModel'

export type SelectItem = string | (LinkProps & {
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
      type: Array,
      default: () => ([]),
    },
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { attrs, slots, emit }) {
    const model = useProxiedModel(props, 'modelValue')
    const activated = ref<unknown[]>([])
    const items = computed(() => (
      props.items.map(item => (
        Object(item) === item
          ? item
          : { title: item, value: item }
      ))
    ))

    watch(() => !!activated.value.length, val => {
      console.log('here')
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
              <VMenu activator="parent" attach>
                <VList
                  elevation="4"
                  rounded
                  v-model:activated={ activated }
                  items={ items.value }
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
