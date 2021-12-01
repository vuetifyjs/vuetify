// Styles
import './VSwitch.sass'

// Components
import { filterControlProps, makeSelectionControlProps, VSelectionControl } from '@/components/VSelectionControl/VSelectionControl'
import { filterInputProps, makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VProgressCircular } from '@/components/VProgressCircular'

// Composables
import { LoaderSlot, makeLoaderProps, useLoader } from '@/composables/loader'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utility
import { computed, defineComponent, ref } from 'vue'
import { filterInputAttrs, useRender } from '@/util'

// Types
import type { LoaderSlotProps } from '@/composables/loader'

export const VSwitch = defineComponent({
  name: 'VSwitch',

  inheritAttrs: false,

  props: {
    indeterminate: Boolean,
    inset: Boolean,
    flat: Boolean,

    ...makeLoaderProps(),
    ...makeVInputProps(),
    ...makeSelectionControlProps(),
  },

  emits: {
    'update:indeterminate': (val: boolean) => true,
  },

  setup (props, { attrs, slots }) {
    const indeterminate = useProxiedModel(props, 'indeterminate')
    const { loaderClasses } = useLoader(props, 'v-switch')

    const loaderColor = computed(() => {
      return typeof props.loading === 'string' && props.loading !== ''
        ? props.loading
        : props.color
    })

    function onChange () {
      if (indeterminate.value) {
        indeterminate.value = false
      }
    }

    useRender(() => {
      const [inputAttrs, controlAttrs] = filterInputAttrs(attrs)
      const [inputProps, _1] = filterInputProps(props)
      const [controlProps, _2] = filterControlProps(props)
      const control = ref<VSelectionControl>()

      function onClick () {
        control.value?.input?.click()
      }

      return (
        <VInput
          class={[
            'v-switch',
            { 'v-switch--indeterminate': indeterminate.value },
            loaderClasses.value,
          ]}
          { ...inputAttrs }
          { ...inputProps }
          v-slots={{
            ...slots,
            default: ({
              isDisabled,
              isReadonly,
              isValid,
            }) => (
              <VSelectionControl
                ref={ control }
                { ...controlProps }
                type="checkbox"
                onUpdate:modelValue={ onChange }
                aria-checked={ indeterminate.value ? 'mixed' : undefined }
                disabled={ isDisabled.value }
                readonly={ isReadonly.value }
                { ...controlAttrs }
                v-slots={{
                  default: () => (<div class="v-switch__track" onClick={ onClick }></div>),
                  input: ({ textColorClasses }) => (
                    <div
                      class={[
                        'v-switch__thumb',
                        textColorClasses.value,
                      ]}
                    >
                      { props.loading && (
                        <LoaderSlot
                          name="v-switch"
                          active
                          color={ isValid.value === false ? undefined : loaderColor.value }
                          v-slots={{
                            default (slotProps: LoaderSlotProps) {
                              return slots.loader
                                ? slots.loader(slotProps)
                                : (
                                  <VProgressCircular
                                    active={ slotProps.isActive }
                                    color={ slotProps.color }
                                    indeterminate
                                    size="16"
                                    width="2"
                                  />
                                )
                            },
                          }}
                        />
                      ) }
                    </div>
                  ),
                }}
              />
            ),
          }}
        />
      )
    })

    return {}
  },
})

export type VSwitch = InstanceType<typeof VSwitch>
