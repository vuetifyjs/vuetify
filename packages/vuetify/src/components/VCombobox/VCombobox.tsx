import { defineComponent, useRender } from '@/util'
import { computed, ref } from 'vue'
import { useProxiedModel } from '@/composables/proxiedModel'

// Components
import { filterFieldProps, makeVFieldProps, VField } from '@/components/VField/VField'
import { filterInputAttrs } from '@/components/VInput/VInput'
import { VList, VListItem } from '@/components/VList'
import { VMenu } from '@/components/VMenu'
import { VSheet } from '@/components/VSheet'

// Types
import type { PropType } from 'vue'

export const VCombobox = defineComponent({
  name: 'VCombobox',

  props: {
    items: Array as PropType<any[]>,
    multiple: Boolean,
    search: String,
    menu: Boolean,

    ...makeVFieldProps(),
  },

  emits: {
    'update:modelValue': (val: any) => true,
    'update:search': (val: string) => true,
    'update:menu': (val: boolean) => true,
  },

  setup (props, { attrs, slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const search = useProxiedModel(props, 'search')
    const menu = useProxiedModel(props, 'menu')

    const fieldRef = ref<VField>()

    const internalDirty = ref(false)
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

    useRender(() => {
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
      const [fieldProps, _] = filterFieldProps(props)

      return (
        <VField
          ref={ fieldRef }
          class="v-combobox"
          active={ isDirty.value }
          onUpdate:active={ val => internalDirty.value = val }
          { ...rootAttrs }
          { ...fieldProps }
          v-slots={{
            ...slots,
            default: ({
              isActive,
              isDisabled,
              isReadonly,
              inputRef,
              props: { class: fieldClass, ...slotProps },
            }) => {
              const showPlaceholder = isActive
              return (
                <>
                  <input
                    class={ fieldClass }
                    style={{ opacity: showPlaceholder ? undefined : '0' }} // can't this just be a class?
                    v-model={ model.value }
                    ref={ inputRef }
                    readonly={ isReadonly }
                    disabled={ isDisabled }
                    placeholder={ props.placeholder }
                    size={ 1 }
                    { ...slotProps }
                    { ...inputAttrs }
                  />

                  <VMenu v-model={ menu.value } activator="parent">
                    <VSheet>
                      <VList>
                        { items.value.map(item => (
                          <VListItem
                            title={ item.text }
                            value={ item.value }
                            onClick={ () => {
                              model.value = item.value
                              menu.value = false
                            } }
                          />
                        )) }
                      </VList>
                    </VSheet>
                  </VMenu>
                </>
              )
            },
          }}
        />
      )
    })
  },
})

export type VCombobox = InstanceType<typeof VCombobox>
