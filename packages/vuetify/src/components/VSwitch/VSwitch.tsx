// Styles
import './VSwitch.sass'

// Components
import { makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VProgressCircular } from '@/components/VProgressCircular'
import { makeSelectionControlProps, VSelectionControl } from '@/components/VSelectionControl/VSelectionControl'

// Composables
import { useFocus } from '@/composables/focus'
import { LoaderSlot, useLoader } from '@/composables/loader'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref } from 'vue'
import { filterInputAttrs, genericComponent, getUid, propsFactory, useRender } from '@/util'

// Types
import type { VInputSlots } from '@/components/VInput/VInput'
import type { VSelectionControlSlots } from '@/components/VSelectionControl/VSelectionControl'
import type { LoaderSlotProps } from '@/composables/loader'

export type VSwitchSlots =
  & VInputSlots
  & VSelectionControlSlots
  & { loader: LoaderSlotProps }

export const makeVSwitchProps = propsFactory({
  indeterminate: Boolean,
  inset: Boolean,
  flat: Boolean,
  loading: {
    type: [Boolean, String],
    default: false,
  },

  ...makeVInputProps(),
  ...makeSelectionControlProps(),
}, 'v-switch')

export const VSwitch = genericComponent<VSwitchSlots>()({
  name: 'VSwitch',

  inheritAttrs: false,

  props: makeVSwitchProps(),

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:modelValue': () => true,
    'update:indeterminate': (val: boolean) => true,
  },

  setup (props, { attrs, slots }) {
    const indeterminate = useProxiedModel(props, 'indeterminate')
    const model = useProxiedModel(props, 'modelValue')
    const { loaderClasses } = useLoader(props)
    const { isFocused, focus, blur } = useFocus(props)

    const loaderColor = computed(() => {
      return typeof props.loading === 'string' && props.loading !== ''
        ? props.loading
        : props.color
    })

    const uid = getUid()
    const id = computed(() => props.id || `switch-${uid}`)

    function onChange () {
      if (indeterminate.value) {
        indeterminate.value = false
      }
    }

    useRender(() => {
      const [inputAttrs, controlAttrs] = filterInputAttrs(attrs)
      const [inputProps, _1] = VInput.filterProps(props)
      const [controlProps, _2] = VSelectionControl.filterProps(props)
      const control = ref<VSelectionControl>()

      function onClick (e: Event) {
        e.stopPropagation()
        e.preventDefault()
        control.value?.input?.click()
      }

      return (
        <VInput
          class={[
            'v-switch',
            { 'v-switch--inset': props.inset },
            { 'v-switch--indeterminate': indeterminate.value },
            loaderClasses.value,
            props.class,
          ]}
          style={ props.style }
          { ...inputAttrs }
          { ...inputProps }
          id={ id.value }
          focused={ isFocused.value }
        >
          {{
            ...slots,
            default: ({
              id,
              messagesId,
              isDisabled,
              isReadonly,
              isValid,
            }) => (
              <VSelectionControl
                ref={ control }
                { ...controlProps }
                v-model={ model.value }
                id={ id.value }
                aria-describedby={ messagesId.value }
                type="checkbox"
                onUpdate:modelValue={ onChange }
                aria-checked={ indeterminate.value ? 'mixed' : undefined }
                disabled={ isDisabled.value }
                readonly={ isReadonly.value }
                onFocus={ focus }
                onBlur={ blur }
                { ...controlAttrs }
              >
                {{
                  ...slots,
                  default: () => (<div class="v-switch__track" onClick={ onClick }></div>),
                  input: ({ textColorClasses, textColorStyles }) => (
                    <div
                      class={[
                        'v-switch__thumb',
                        textColorClasses.value,
                      ]}
                      style={ textColorStyles.value }
                    >
                      { props.loading && (
                        <LoaderSlot
                          name="v-switch"
                          active
                          color={ isValid.value === false ? undefined : loaderColor.value }
                        >
                          { slotProps => (
                            slots.loader
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
                          )}
                        </LoaderSlot>
                      )}
                    </div>
                  ),
                }}
              </VSelectionControl>
            ),
          }}
        </VInput>
      )
    })

    return {}
  },
})

export type VSwitch = InstanceType<typeof VSwitch>
