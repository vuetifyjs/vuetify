import './VCombobox.sass'

// Components
import { filterFieldProps, makeVFieldProps, VField } from '@/components/VField/VField'
import { filterInputProps, makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VSheet } from '@/components/VSheet'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'
import { useFilter } from '@/composables/filter'
import { useTextField } from '@/components/VTextField/useTextField'

// Directives
import Intersect from '@/directives/intersect'

// Utilities
import { computed, ref } from 'vue'
import { defineComponent, filterInputAttrs, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import { useForwardRef } from '@/composables/forwardRef'
import type { FilterFunction, FilterMatch } from '@/composables/filter'

export const VCombobox = defineComponent({
  name: 'VCombobox',

  directives: { Intersect },

  inheritAttrs: false,

  props: {
    autofocus: Boolean,
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

    const {
      isFocused,
      inputRef,
      vInputRef,
      vFieldRef,
      focus,
      blur,
      getInputProps,
      intersectOptions,
    } = useTextField(props)

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
    function onFocus (e: FocusEvent) {
      pendingClean = false
    }
    function onBlur (e: FocusEvent) {
      pendingClean = true
    }

    useRender(() => {
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const [inputProps] = filterInputProps(props)
      const [fieldProps] = filterFieldProps(props)

      return (
        <VInput
          ref={ vInputRef }
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
                      ref={ vFieldRef }
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
                            v-model={ model.value }
                            v-intersect={ intersectOptions }
                            class="v-field__input"
                            readonly={ isReadonly.value }
                            disabled={ isDisabled.value }
                            { ...getInputProps() }
                            onInput={ onInput }
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
                            {{ title: () => highlightResult(item.text, matches.text, model.value.length) }}
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
    }, vInputRef, vFieldRef, inputRef)
  },
})

export type VCombobox = InstanceType<typeof VCombobox>

function highlightResult (text: string, matches: FilterMatch, length: number) {
  if (Array.isArray(matches)) throw new Error('Multiple matches is not implemented')

  return typeof matches === 'number' && ~matches
    ? (
      <>
        <span class="v-list-item__unmask">{ text.substr(0, matches) }</span>
        <span class="v-list-item__mask">{ text.substr(matches, length) }</span>
        <span class="v-list-item__unmask">{ text.substr(matches + length) }</span>
      </>
    )
    : text
}
