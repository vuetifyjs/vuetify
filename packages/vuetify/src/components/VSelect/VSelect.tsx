// Styles
import './VSelect.sass'

// Components
import { VList } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VTextField } from '@/components/VTextField'

// Composables
import { makeFilterProps, useFilter } from '@/composables/filter'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utility
import { computed, ref } from 'vue'
import { genericComponent, useRender, wrapInArray } from '@/util'

// Types
import type { LinkProps } from '@/composables/router'
import type { MakeSlots } from '@/util'
import type { PropType } from 'vue'

export type SelectItem = string | (string | number)[] | ((item: Record<string, any>, fallback?: any) => any) | (LinkProps & {
  text: string
})

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

    ...makeFilterProps(),
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { slots }) {
    const model = useProxiedModel(
      props,
      'modelValue',
      [],
      v => wrapInArray(v),
      (v: any) => props.multiple ? v : v[0]
    )
    const { filteredItems } = useFilter(props, props.items)

    const menu = ref(false)
    const items = computed(() => (
      filteredItems.value.map(({ item }: any) => (
        Object(item) === item
          ? item
          : { title: item, value: item }
      ))
    ))

    const activated = computed({
      get: () => model.value,
      set: val => {
        model.value = val

        if (props.multiple) return

        menu.value = false
      },
    })

    useRender(() => {
      return (
        <VTextField
          class="v-select"
          readonly
          persistentPlaceholder={ menu.value || wrapInArray(model.value).length > 0 }
        >
          {{
            ...slots,
            default: slotProps => (
              <>
                <VMenu v-model={ menu.value } activator="parent" anchor="bottom center" content-class="v-select__content">
                  <VList
                    v-model:active={ activated.value }
                    items={ items.value }
                    activeStrategy={ props.multiple ? 'multiple' : 'single' }
                  />
                </VMenu>

                <div class="v-select__selections">
                  { model.value.join(', ') }
                </div>

                { slots.default?.(slotProps) }
              </>
            ),
          }}
        </VTextField>
      )
    })

    return {}
  },
})

export type VSelect = InstanceType<typeof VSelect>
