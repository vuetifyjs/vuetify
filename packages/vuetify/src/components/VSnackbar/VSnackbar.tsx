// Styles
import './VSnackbar.sass'

// Components
import { VDefaultsProvider } from '@/components/VDefaultsProvider'
import { VOverlay } from '@/components/VOverlay'

// Composables
import { genOverlays, makeVariantProps, useVariant } from '@/composables/variant'
import { makeLocationProps, useLocation } from '@/composables/location'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeRoundedProps, useRounded } from '@/composables/rounded'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useScopeId } from '@/composables/scopeId'
import { forwardRefs } from '@/composables/forwardRefs'

// Utilities
import { mergeProps, onMounted, ref, watch } from 'vue'
import { genericComponent, omit, useRender } from '@/util'
import { filterVOverlayProps, makeVOverlayProps } from '@/components/VOverlay/VOverlay'

// Types
import type { SlotsToProps } from '@/util'

export const VSnackbar = genericComponent<new () => {
  $props: SlotsToProps<{
    activator: [{ isActive: boolean, props: Record<string, any> }]
    default: []
    actions: []
  }>
}>()({
  name: 'VSnackbar',

  props: {
    multiLine: Boolean,
    timeout: {
      type: [Number, String],
      default: 5000,
    },
    vertical: Boolean,

    ...makeLocationProps({ location: 'bottom' } as const),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeVariantProps(),
    ...omit(makeVOverlayProps({
      transition: 'v-snackbar-transition',
    }), ['persistent', 'noClickAnimation', 'scrim', 'scrollStrategy']),
  },

  emits: {
    'update:modelValue': (v: boolean) => true,
  },

  setup (props, { slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { locationStyles } = useLocation(props)
    const { positionClasses } = usePosition(props)
    const { scopeId } = useScopeId()

    const { colorClasses, colorStyles, variantClasses } = useVariant(props)
    const { roundedClasses } = useRounded(props)

    const overlay = ref<VOverlay>()

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

    useRender(() => {
      const [overlayProps] = filterVOverlayProps(props)

      return (
        <VOverlay
          ref={ overlay }
          class={[
            'v-snackbar',
            {
              'v-snackbar--active': isActive.value,
              'v-snackbar--multi-line': props.multiLine && !props.vertical,
              'v-snackbar--vertical': props.vertical,
            },
            positionClasses.value,
          ]}
          { ...overlayProps }
          v-model={ isActive.value }
          contentProps={ mergeProps({
            style: locationStyles.value,
          }, overlayProps.contentProps) }
          persistent
          noClickAnimation
          scrim={ false }
          scrollStrategy="none"
          { ...scopeId }
          v-slots={{ activator: slots.activator }}
        >
          <div
            class={[
              'v-snackbar__wrapper',
              colorClasses.value,
              roundedClasses.value,
              variantClasses.value,
            ]}
            style={[colorStyles.value]}
            onPointerenter={ onPointerenter }
            onPointerleave={ startTimeout }
          >
            { genOverlays(false, 'v-snackbar') }

            { slots.default && (
              <div
                class="v-snackbar__content"
                role="status"
                aria-live="polite"
              >
                { slots.default() }
              </div>
            ) }

            { slots.actions && (
              <VDefaultsProvider
                defaults={{
                  VBtn: {
                    variant: 'text',
                    ripple: false,
                  },
                }}
              >
                <div class="v-snackbar__actions">
                  { slots.actions() }
                </div>
              </VDefaultsProvider>
            ) }
          </div>
        </VOverlay>
      )
    })

    return forwardRefs({}, overlay)
  },
})

export type VSnackbar = InstanceType<typeof VSnackbar>
