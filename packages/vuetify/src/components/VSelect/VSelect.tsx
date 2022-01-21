// Styles
import './VSelect.sass'

// Components
import { VChip } from '@/components/VChip'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VTextField } from '@/components/VTextField'

// Composables
import { makeFilterProps, useFilter } from '@/composables/filter'
import { useLocale } from '@/composables/locale'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utility
import { computed, ref, watch } from 'vue'
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
    chips: Boolean,
    hideNoData: Boolean,
    hideSelected: Boolean,
    items: {
      type: Array as PropType<SelectItem[]>,
      default: () => ([]),
    },
    modelValue: {
      type: [String, Array],
      default: () => ([]),
    },
    multiple: Boolean,
    noDataText: {
      type: String,
      default: '$vuetify.noDataText',
    },
    openOnClear: Boolean,

    ...makeFilterProps(),
  },

  emits: {
    'click:clear': (e: MouseEvent) => true,
    'update:modelValue': (val: any) => true,
  },

  setup (props, { slots }) {
    const { t } = useLocale()
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
    const active = computed({
      get: () => model.value,
      set: val => {
        model.value = val

        if (props.multiple) return

        menu.value = false
      },
    })
    const items = computed(() => {
      const array = []

      for (const { item } of filteredItems.value as any) {
        const title = item?.title ?? item
        const value = item?.value ?? item

        if (props.hideSelected && active.value.includes(value)) {
          continue
        }

        array.push({ title, value })
      }

      if (!array.length && !props.hideNoData) {
        array.push({ title: t(props.noDataText) })
      }

      return array
    })

    function onClear (e: MouseEvent) {
      active.value = []

      if (props.openOnClear) {
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
          onClick:control={ () => menu.value = true }
          onBlur={ () => menu.value = false }
          modelValue={ model.value.join(', ') }
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
                      v-model:active={ active.value }
                      items={ items.value }
                      activeStrategy={ props.multiple ? 'multiple' : 'single' }
                    >
                      {{
                        item: (item: any) => {
                          return (
                            <VListItem
                              onMousedown={ (e: MouseEvent) => e.preventDefault() }
                              { ...item }
                            />
                          )
                        },
                      }}
                    </VList>
                  </VMenu>
                ) }

                <div class="v-select__selections">
                  { active.value.map((selection, index) => (
                    <div class="v-select__selection">
                      { props.chips
                        ? (<VChip text={ selection as any } size="small" />)
                        : (
                          <span>
                            { selection as string }
                            { index < model.value.length - 1 && (
                              <span class="v-select__selection-comma">,&nbsp;</span>
                            ) }
                          </span>
                        )
                      }
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
