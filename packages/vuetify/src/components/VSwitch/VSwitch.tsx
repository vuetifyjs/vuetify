// Styles
import './VSwitch.sass'

// Components
import { VScaleTransition } from '@/components/transitions'
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VProgressCircular } from '@/components/VProgressCircular'
import { makeVSelectionControlProps, VSelectionControl } from '@/components/VSelectionControl/VSelectionControl'

// Composables
import { useFocus } from '@/composables/focus'
import { LoaderSlot, useLoader } from '@/composables/loader'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref } from 'vue'
import { filterInputAttrs, genericComponent, getUid, propsFactory, useRender } from '@/util'

// Types
import type { ComputedRef, Ref } from 'vue'
import type { VInputSlots } from '@/components/VInput/VInput'
import type { VSelectionControlSlots } from '@/components/VSelectionControl/VSelectionControl'
import type { IconValue } from '@/composables/icons'
import type { LoaderSlotProps } from '@/composables/loader'
import type { GenericProps } from '@/util'

export type VSwitchSlot = {
  model: Ref<boolean>
  isValid: ComputedRef<boolean | null>
}

export type VSwitchSlots =
  & VInputSlots
  & VSelectionControlSlots
  & {
    loader: LoaderSlotProps
    thumb: { icon: IconValue | undefined } & VSwitchSlot
    'track-false': VSwitchSlot
    'track-true': VSwitchSlot
  }

export const makeVSwitchProps = propsFactory({
  indeterminate: Boolean,
  inset: Boolean,
  flat: Boolean,
  loading: {
    type: [Boolean, String],
    default: false,
  },

  ...makeVInputProps(),
  ...makeVSelectionControlProps(),
}, 'VSwitch')

export const VSwitch = genericComponent<new <T>(
  props: {
    modelValue?: T | null
    'onUpdate:modelValue'?: (value: T | null) => void
  },
  slots: VSwitchSlots,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VSwitch',

  inheritAttrs: false,

  props: makeVSwitchProps(),

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (value: any) => true,
    'update:indeterminate': (value: boolean) => true,
  },

  setup (props, { attrs, slots }) {
    const indeterminate = useProxiedModel(props, 'indeterminate')
    const model = useProxiedModel(props, 'modelValue')
    const { loaderClasses } = useLoader(props)
    const { isFocused, focus, blur } = useFocus(props)
    const control = ref<VSelectionControl>()

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
    function onTrackClick (e: Event) {
      e.stopPropagation()
      e.preventDefault()
      control.value?.input?.click()
    }

    useRender(() => {
      const [rootAttrs, controlAttrs] = filterInputAttrs(attrs)
      const inputProps = VInput.filterProps(props)
      const controlProps = VSelectionControl.filterProps(props)

      return (
        <VInput
          class={[
            'v-switch',
            { 'v-switch--flat': props.flat },
            { 'v-switch--inset': props.inset },
            { 'v-switch--indeterminate': indeterminate.value },
            loaderClasses.value,
            props.class,
          ]}
          { ...rootAttrs }
          { ...inputProps }
          v-model={ model.value }
          id={ id.value }
          focused={ isFocused.value }
          style={ props.style }
        >
          {{
            ...slots,
            default: ({
              id,
              messagesId,
              isDisabled,
              isReadonly,
              isValid,
            }) => {
              const slotProps = {
                model,
                isValid,
              }

              return (
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
                    default: ({ backgroundColorClasses, backgroundColorStyles }) => (
                      <div
                        class={[
                          'v-switch__track',
                          ...backgroundColorClasses.value,
                        ]}
                        style={ backgroundColorStyles.value }
                        onClick={ onTrackClick }
                      >
                        { slots['track-true'] && (
                          <div key="prepend" class="v-switch__track-true">
                            { slots['track-true'](slotProps) }
                          </div>
                        )}

                        { slots['track-false'] && (
                          <div key="append" class="v-switch__track-false">
                            { slots['track-false'](slotProps) }
                          </div>
                        )}
                      </div>
                    ),
                    input: ({ inputNode, icon, backgroundColorClasses, backgroundColorStyles }) => (
                      <>
                        { inputNode }
                        <div
                          class={[
                            'v-switch__thumb',
                            { 'v-switch__thumb--filled': icon || props.loading },
                            props.inset ? undefined : backgroundColorClasses.value,
                          ]}
                          style={ props.inset ? undefined : backgroundColorStyles.value }
                        >
                          { slots.thumb ? (
                            <VDefaultsProvider
                              defaults={{
                                VIcon: {
                                  icon,
                                  size: 'x-small',
                                },
                              }}
                            >
                              { slots.thumb({ ...slotProps, icon }) }
                            </VDefaultsProvider>
                          ) : (
                            <VScaleTransition>
                              { !props.loading ? (
                                (icon && (
                                  <VIcon
                                    key={ String(icon) }
                                    icon={ icon }
                                    size="x-small"
                                  />
                                ))) : (
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
                            </VScaleTransition>
                          )}
                        </div>
                      </>
                    ),
                  }}
                </VSelectionControl>
              )
            },
          }}
        </VInput>
      )
    })

    return {}
  },
})

export type VSwitch = InstanceType<typeof VSwitch>
