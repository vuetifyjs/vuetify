// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { makeVSnackbarProps, VSnackbar } from '@/components/VSnackbar/VSnackbar'

// Utilities
import { nextTick, shallowRef, watch } from 'vue'
import { genericComponent, useRender } from '@/util'

// Types
import type { PropType } from 'vue'
import type { GenericProps } from '@/util'

export type VSnackbarQueueSlots<T extends string | SnackbarMessage> = {
  default: { item: T }
  text: { item: T }
  actions: { item: T }
}

export type SnackbarMessage = Omit<
  VSnackbar['$props'],
  | '$children'
  | 'modelValue'
  | 'onUpdate:modelValue'
  | 'activator'
  | 'activatorProps'
  | 'closeDelay'
  | 'openDelay'
  | 'openOnClick'
  | 'openOnFocus'
  | 'openOnHover'
>

export const VSnackbarQueue = genericComponent<new <T extends readonly (string | SnackbarMessage)[]> (
  props: {
    modelValue?: T
    'onUpdate:modelValue'?: (val: T) => void
  },
  slots: VSnackbarQueueSlots<T[number]>,
) => GenericProps<typeof props, typeof slots>>()({
  name: 'VSnackbarQueue',

  props: {
    ...makeVSnackbarProps(),

    modelValue: {
      type: Array as PropType<readonly (string | SnackbarMessage)[]>,
      default: () => [],
    },
  },

  emits: {
    'update:modelValue': (val: (string | SnackbarMessage)[]) => true,
  },

  setup (props, { emit, slots }) {
    const isActive = shallowRef(false)
    const isVisible = shallowRef(false)
    const current = shallowRef<SnackbarMessage>()

    watch(() => props.modelValue.length, (val, oldVal) => {
      if (!isVisible.value && val > oldVal) {
        showNext()
      }
    })
    watch(isActive, val => {
      if (val) isVisible.value = true
    })

    function onAfterLeave () {
      if (props.modelValue.length) {
        showNext()
      } else {
        current.value = undefined
        isVisible.value = false
      }
    }
    function showNext () {
      const [next, ...rest] = props.modelValue
      emit('update:modelValue', rest)
      current.value = typeof next === 'string' ? { text: next } : next
      nextTick(() => {
        isActive.value = true
      })
    }

    useRender(() => (
      <>
        { isVisible.value && !!current.value && (
          slots.default
            ? (
              <VDefaultsProvider defaults={{ VSnackbar: current.value }}>
                { slots.default({ item: current.value }) }
              </VDefaultsProvider>
            ) : (
              <VSnackbar
                { ...current.value }
                v-model={ isActive.value }
                onAfterLeave={ onAfterLeave }
              >
                {{
                  text: () => slots.text?.({ item: current.value! }),
                  actions: () => slots.actions?.({ item: current.value! }),
                }}
              </VSnackbar>
            )
        )}
      </>
    ))
  },
})

export type VSnackbarQueue = InstanceType<typeof VSnackbarQueue>
