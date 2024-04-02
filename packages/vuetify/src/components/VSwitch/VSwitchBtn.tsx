// Styles
import './VSwitch.sass'

// Components
import { VScaleTransition } from '@/components/transitions'
import { VDefaultsProvider } from '@/components/VDefaultsProvider/VDefaultsProvider'
import { VIcon } from '@/components/VIcon'
import { makeVInputProps, VInput } from '@/components/VInput/VInput'
import { VProgressCircular } from '@/components/VProgressCircular'
import {
  makeVSelectionControlProps,
  VSelectionControl,
} from '@/components/VSelectionControl/VSelectionControl'
import { makeVSwitchTrackProps, VSwitchTrack } from './VSwitchTrack'

// Composables
import { useFocus } from '@/composables/focus'
import { LoaderSlot, useLoader } from '@/composables/loader'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { computed, ref } from 'vue'
import {
  filterInputAttrs,
  genericComponent,
  getUid,
  propsFactory,
  omit,
  useRender,
} from '@/util'

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

export type VSwitchSlots = VInputSlots &
  VSelectionControlSlots & {
    loader: LoaderSlotProps
    thumb: { icon: IconValue | undefined } & VSwitchSlot
    'track-false': VSwitchSlot
    'track-true': VSwitchSlot
  }

export const makeVSwitchBtnProps = propsFactory(
  {
    indeterminate: Boolean,
    inset: Boolean,
    flat: Boolean,
    isValid: {
      type: [Boolean],
      default: true,
    },
    loading: {
      type: [Boolean, String],
      default: false,
    },

    ...makeVInputProps(),
    ...makeVSelectionControlProps(),
  },
  'VSwitchBtn'
)

export const VSwitchBtn = genericComponent<
  new <T>(
    props: {
      modelValue?: T | null
      'onUpdate:modelValue'?: (value: T | null) => void
    },
    slots: VSwitchSlots
  ) => GenericProps<typeof props, typeof slots>
>()({
  name: 'VSwitchBtn',

  inheritAttrs: false,

  props: makeVSwitchBtnProps(),

  emits: {
    'update:focused': (focused: boolean) => true,
    'update:modelValue': (value: any) => true,
    'update:indeterminate': (value: boolean) => true,
  },

  setup (props, { attrs, slots }) {
    const indeterminate = useProxiedModel(props, 'indeterminate')
    const { focus, blur } = useFocus(props)
    const control = ref<VSelectionControl>()
    const { loaderClasses } = useLoader(props)
    const model = useProxiedModel(props, 'modelValue')
    const controlProps = omit(VSelectionControl.filterProps(props), [
      'modelValue',
    ])
    const [controlAttrs] = filterInputAttrs(attrs)

    const slotProps = {
      model,
      isValid: computed(() => props.isValid || null),
    }
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

      console.log(model.value)
    }

    useRender(() => {
      return (
        <VSelectionControl
          class={[
            'v-switch-btn',
            { 'v-switch-btn--flat': props.flat },
            { 'v-switch-btn--inset': props.inset },
            { 'v-switch-btn--indeterminate': indeterminate.value },
            loaderClasses.value,
            props.class,
          ]}

          { ...controlProps }
          v-model={ model.value }
          style={ props.style }
          type="checkbox"
          onUpdate:modelValue={ onChange }
          aria-checked={ indeterminate.value ? 'mixed' : undefined }
          ref={ control }
          id={ id.value }
          { ...controlAttrs }
        >
          {{
            ...slots,
            default: ({ backgroundColorClasses }) => (
              <VSwitchTrack
                bgColor={ backgroundColorClasses.value }
                { ...controlProps }
                id={ id.value }
                { ...controlAttrs }
                v-model={ model.value }
                onFocus={ focus }
                onBlur={ blur }
                v-slots={ slots }
                onUpdate:modelValue={ onChange }
              />
            ),
            input: ({
              inputNode,
              icon,
              backgroundColorClasses,
              backgroundColorStyles,
            }) => (
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
                        icon && (
                          <VIcon
                            key={ String(icon) }
                            icon={ icon }
                            size="x-small"
                          />
                        )
                      ) : (
                        <LoaderSlot
                          name="v-switch"
                          active
                          color={
                            !props.isValid
                              ? undefined
                              : loaderColor.value
                          }
                        >
                          { slotProps =>
                            slots.loader ? (
                              slots.loader(slotProps)
                            ) : (
                              <VProgressCircular
                                active={ slotProps.isActive }
                                color={ slotProps.color }
                                indeterminate
                                size="16"
                                width="2"
                              />
                            )
                          }
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
    })

    return {}
  },
})

export type VSwitchBtn = InstanceType<typeof VSwitchBtn>
