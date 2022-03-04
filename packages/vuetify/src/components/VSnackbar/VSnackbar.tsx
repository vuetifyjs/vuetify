// Styles
import './VSnackbar.sass'

// Composables
import { makePositionProps } from '@/composables/position'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'
import { makeVariantProps, useVariant } from '@/composables/variant'

// Utilities
import { computed, onMounted, watch } from 'vue'
import { defineComponent, useRender } from '@/util'

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
    text: Boolean,
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

    const hasBackground = computed(() => !props.text && props.variant !== 'outlined')
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
            'v-snackbar--absolute': props.absolute,
            'v-snackbar--active': isActive.value,
            'v-snackbar--bottom': props.bottom || !props.top,
            'v-snackbar--centered': props.centered,
            'v-snackbar--has-background': hasBackground.value,
            'v-snackbar--left': props.left,
            'v-snackbar--multi-line': props.multiLine && !props.vertical,
            'v-snackbar--right': props.right,
            'v-snackbar--text': props.text,
            'v-snackbar--top': props.top,
            'v-snackbar--vertical': props.vertical,
          },
        ]}
        style={ colorStyles.value }
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
            <div class={['v-snackbar__content', props.contentClass]} role="status" aria-live="polite">
              { slots.default?.() }
            </div>
            <div class="v-snackbar__action">
              { slots.action?.({
                props: { class: 'v-snackbar__btn' },
              }) }
            </div>
          </div>
        </MaybeTransition>
      </div>
    ))
  },
})

export type VSnackbar = InstanceType<typeof VSnackbar>
