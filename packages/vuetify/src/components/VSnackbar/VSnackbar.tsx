// Styles
import './VSnackbar.sass'

// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VSnackbarActions } from './VSnackbarActions'

// Composables
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { useProxiedModel } from '@/composables/proxiedModel'

// Utilities
import { defineComponent, useRender } from '@/util'
import { onMounted, watch } from 'vue'

export const VSnackbar = defineComponent({
  name: 'VSnackbar',

  props: {
    app: Boolean,
    centered: Boolean,
    contentClass: {
      type: String,
      default: '',
    },
    multiLine: Boolean,
    timeout: {
      type: [Number, String],
      default: 5000,
    },
    vertical: Boolean,

    modelValue: Boolean,

    ...makePositionProps(),
    ...makeVariantProps(),
    ...makeTransitionProps({ transition: 'v-snackbar-transition' }),
  },

  emits: {
    'update:modelValue': (v: boolean) => true,
  },

  setup (props, { slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { positionClasses, positionStyles } = usePosition(props)

    // const hasBackground = computed(() => !props.text && props.variant !== 'outlined')
    const { colorClasses, colorStyles, variantClasses } = useVariant(props)

    watch(isActive, startTimeout)
    watch(() => props.timeout, startTimeout)

    onMounted(() => {
      if (isActive.value) startTimeout()
    })

    let activeTimeout = -1
    function startTimeout () {
      window.clearTimeout(activeTimeout)
      const timeout = Number(props.timeout)

      if (!isActive.value || timeout === -1) return

      activeTimeout = window.setTimeout(() => {
        isActive.value = false
      }, timeout)
    }

    function onPointerenter () {
      window.clearTimeout(activeTimeout)
    }

    useRender(() => (
      <div
        class={[
          'v-snackbar',
          {
            'v-snackbar--active': isActive.value,
            'v-snackbar--bottom': props.bottom || !props.top,
            'v-snackbar--centered': props.centered,
            'v-snackbar--end': props.right,
            'v-snackbar--multi-line': props.multiLine && !props.vertical,
            'v-snackbar--start': props.left,
            'v-snackbar--top': props.top,
            'v-snackbar--vertical': props.vertical,
          },
          positionClasses.value,
        ]}
        style={[
          colorStyles.value,
          positionStyles.value,
        ]}
      >
        <MaybeTransition transition={ props.transition }>
          <div
            class={[
              'v-snackbar__wrapper',
              colorClasses.value,
              variantClasses.value,
            ]}
            v-show={ isActive.value }
            onPointerenter={ onPointerenter }
            onPointerleave={ startTimeout }
          >
            { genOverlays(true, 'v-snackbar') }

            { slots.default && (
              <div
                class={[
                  'v-snackbar__content',
                  props.contentClass,
                ]}
                role="status"
                aria-live="polite"
              >
                { slots.default?.() }
              </div>
            ) }

            <VDefaultsProvider
              defaults={{
                VBtn: {
                  variant: 'text',
                },
              }}
            >
              { slots.actions && (
                <VSnackbarActions>
                  { slots.actions?.() }
                </VSnackbarActions>
              ) }
            </VDefaultsProvider>
          </div>
        </MaybeTransition>
      </div>
    ))
  },
})

export type VSnackbar = InstanceType<typeof VSnackbar>
