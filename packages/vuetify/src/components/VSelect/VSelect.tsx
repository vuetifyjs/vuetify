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
import { computed, nextTick, ref, watch } from 'vue'
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
    openOnClear: Boolean,

    ...makeFilterProps(),
  },

  emits: {
    'update:modelValue': (val: any) => true,
  },

  setup (props, { slots }) {
    const vTextFieldRef = ref()
    const activator = ref()
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
    const selections = computed({
      get: () => model.value.join(', '),
      set: (val: string) => !val && (model.value = []),
    })

    function onClear (e: Event) {
      e.preventDefault()

      if (props.openOnClear && !menu.value) {
        menu.value = true
      }
    }

    watch(() => vTextFieldRef.value, val => {
      activator.value = val.$el.querySelector('.v-input__control')
    })

    useRender(() => {
      return (
        <VTextField
          ref={ vTextFieldRef }
          class="v-select"
          readonly
          onClick:clear={ onClear }
          v-model={ selections.value }
        >
          {{
            ...slots,
            default: () => (
              <>
                { activator.value && (
                  <VMenu
                    v-model={ menu.value }
                    activator={ activator.value }
                    contentClass="v-select__content"
                    openOnClick={ false }
                  >
                    <VList
                      v-model:active={ activated.value }
                      items={ items.value }
                      activeStrategy={ props.multiple ? 'multiple' : 'single' }
                    >
                      {{
                        item: slots.item,
                      }}
                    </VList>
                  </VMenu>
                ) }

                <div class="v-select__selections">
                  { model.value.map(selection => (
                    <div class="v-select__selection">
                      { selection as string }
                    </div>
                  )) }
                </div>
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
