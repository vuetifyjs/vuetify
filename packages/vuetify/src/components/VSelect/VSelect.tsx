// Components
import { VMenu } from '@/components/VMenu'
import { VList, VListItem } from '@/components/VList'

import { useProxiedModel } from '@/composables/proxiedModel'
// Utility
import { filterInputAttrs, genericComponent, useRender } from '@/util'
import { VField } from '@/components/VField'
import { filterFieldProps, makeVFieldProps } from '@/components/VField/VField'

// Types
import type { MakeSlots } from '@/util'
import { computed, ref } from 'vue'

export const VSelect = genericComponent<new <T>() => {
  $slots: MakeSlots<{
    default: []
  }>
}>()({
  name: 'VSelect',

  props: {
    ...makeVFieldProps({
      appendInnerIcon: 'mdi-menu-down',
    }),
  },

  emits: {
    'update:modelValue': (val: string) => true,
  },

  setup (props, { attrs, slots }) {
    const model = useProxiedModel(props, 'modelValue')
    const [rootAttrs, inputAttrs] = filterInputAttrs(attrs)
    const [fieldProps, _] = filterFieldProps(props)
    const isMenuActive = ref(false)
    const fieldRef = ref<VField>()

    useRender(() => {
      return (
        <VField
          ref={ fieldRef }
          class={[
            'v-select',
          ]}
          active={ isMenuActive.value }
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
              return (
                <>
                  <VMenu
                    activator={ fieldRef.value?.$el.firstElementChild || 'parent' }
                    anchor="top center"
                    absolute
                    v-model={ isMenuActive.value }
                  >
                    <VList elevation="4" rounded>
                      <VListItem title="Foobar"></VListItem>
                      <VListItem title="Foobar"></VListItem>
                      <VListItem title="Foobar"></VListItem>
                      <VListItem title="Foobar"></VListItem>
                    </VList>
                  </VMenu>

                  <input
                    class={ fieldClass }
                    v-model={ model.value }
                    // v-intersect={[{
                    //   handler: onIntersect,
                    // }, null, ['once']]}
                    ref={ inputRef }
                    // autofocus={ props.autofocus }
                    aria-readonly={ isReadonly.value }
                    readonly
                    disabled={ isDisabled.value }
                    // placeholder={ props.placeholder }
                    type="text"
                    { ...slotProps }
                    { ...inputAttrs }
                  />
                </>
              )
            },
          }}
        />
      )
    })

    return {}
  },
})

export type VSelect = InstanceType<typeof VSelect>
