import './VCombobox.sass'

// Components
import { filterFieldProps, makeVFieldProps, VField } from '@/components/VField/VField'
import { filterInputProps, makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VSheet } from '@/components/VSheet'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'
import type { FilterFunction } from '@/composables/filter'
import { useFilter } from '@/composables/filter'

// Utilities
import { computed, ref } from 'vue'
import { defineComponent, filterInputAttrs, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import { useForwardRef } from '@/composables/forwardRef'

export const VCombobox = defineComponent({
  name: 'VCombobox',

  props: {
    placeholder: String,
    items: Array as PropType<any[]>,
    multiple: Boolean,
    menu: Boolean,
    customFilter: Function as PropType<FilterFunction>,
    filterKeys: {
      type: [String, Array] as PropType<string | string[]>,
      default: 'text',
    },

    ...makeVInputProps(),
    ...makeVFieldProps(),
  },

  emits: {
    'update:modelValue': (val: any) => true,
    'update:search': (val: string) => true,
    'update:menu': (val: boolean) => true,
  },

  setup (props, { attrs, slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const menu = useProxiedModel(props, 'menu')

    const internalDirty = ref(false)
    const searchDirty = ref(false)
    const isDirty = computed(() => {
      return internalDirty.value || !!model.value
    })

    const items = computed(() => {
      return (props.items || []).map(item => {
        return typeof item === 'string' ? {
          text: item,
          value: item,
        } : item
      })
    })
    const { filteredItems } = useFilter(props, items, computed(() => {
      return searchDirty.value ? model.value : ''
    }))

    function onInput () {
      searchDirty.value = !!model.value.length
    }
    let pendingClean = false
    function select (item: any) {
      if (menu.value) {
        pendingClean = true
      }
      model.value = item.value
      menu.value = false
    }
    function onAfterLeave () {
      if (pendingClean) {
        searchDirty.value = false
        pendingClean = false
      }
    }

    const isFocused = ref(false)
    const inputRef = ref<HTMLInputElement>()
    function focus () {
      inputRef.value?.focus()
    }
    function blur () {
      inputRef.value?.blur()
    }
    function onFocus (e: FocusEvent) {
      isFocused.value = true
    }
    function onBlur (e: FocusEvent) {
      isFocused.value = false
    }

    const vInputRef = ref<VInput>()
    const vFieldRef = ref<VInput>()

    useRender(() => {
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const [inputProps] = filterInputProps(props)
      const [fieldProps] = filterFieldProps(props)

      return (
        <VInput
          class="v-combobox"
          focused={ isFocused.value }
          { ...rootAttrs }
          { ...inputProps }
        >
          {{
            ...slots,
            default: ({ isDisabled, isReadonly }) => (
              <VMenu v-model={ menu.value } onAfterLeave={ onAfterLeave }>
                {{
                  activator: ({ props: activatorProps }) => (
                    <VField
                      active={ isDirty.value }
                      onUpdate:active={ val => internalDirty.value = val }
                      onClick:control={ focus }
                      { ...activatorProps }
                      { ...fieldProps }
                    >
                      {{
                        ...slots,
                        default: ({ props: slotProps }) => (
                          <input
                            ref={ inputRef }
                            v-model={ model.value }
                            class="v-field__input"
                            onInput={ onInput }
                            readonly={ isReadonly.value }
                            disabled={ isDisabled.value }
                            placeholder={ props.placeholder }
                            size={ 1 }
                            onFocus={ onFocus }
                            onBlur={ onBlur }
                            { ...slotProps }
                            { ...inputAttrs }
                          />
                        ),
                      }}
                    </VField>
                  ),
                  default: () => (
                    <VSheet>
                      <VList>
                        { filteredItems.value.map(({ item, matches }) => (
                          <VListItem
                            value={ item.value }
                            onClick={ select.bind(undefined, item) }
                          >
                            {{
                              title: () => (
                                <div>
                                  { matches.text != null && ~matches.text
                                    ? highlightResult(item.text, matches.text, model.value.length)
                                    : item.text
                                  }
                                </div>
                              ),
                            }}
                          </VListItem>
                        )) }
                      </VList>
                    </VSheet>
                  ),
                }}
              </VMenu>
            ),
          }}
        </VInput>
      )
    })

    return useForwardRef({
      focus,
      blur,
      filteredItems,
    }, vInputRef, vFieldRef)
  },
})

export type VCombobox = InstanceType<typeof VCombobox>

function highlightResult (text: string, start: number, length: number) {
  return (
    <>
      <span class="v-list-item__unmask">{ text.substr(0, start) }</span>
      <span class="v-list-item__mask">{ text.substr(start, length) }</span>
      <span class="v-list-item__unmask">{ text.substr(start + length) }</span>
    </>
  )
}
