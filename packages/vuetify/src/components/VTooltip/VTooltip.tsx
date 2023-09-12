// Styles
import './VTooltip.sass'

// Components
import { VOverlay } from '@/components/VOverlay'
import { makeVOverlayProps } from '@/components/VOverlay/VOverlay'

// Composables
import { forwardRefs } from '@/composables/forwardRefs'
import { useProxiedModel } from '@/composables/proxiedModel'
import { useScopeId } from '@/composables/scopeId'
import { makeSpeechBubbleProps, useSpeechBubble } from '@/composables/speechBubble'

// Utilities
import { computed, mergeProps, ref } from 'vue'
import { flipSide, genericComponent, getUid, omit, parseAnchor, propsFactory, useRender } from '@/util'
import { includes } from '@/util/helpers'

// Types
import type { StrategyProps } from '@/components/VOverlay/locationStrategies'
import type { OverlaySlots } from '@/components/VOverlay/VOverlay'

export const makeVTooltipProps = propsFactory({
  id: String,
  text: String,

  ...omit(makeVOverlayProps({
    closeOnBack: false,
    location: 'end' as const,
    locationStrategy: 'connected' as const,
    eager: true,
    minWidth: 0,
    offset: 10,
    openOnClick: false,
    openOnHover: true,
    origin: 'auto' as const,
    scrim: false,
    scrollStrategy: 'reposition' as const,
    transition: false,
  }), [
    'absolute',
    'persistent',
  ]),
  ...makeSpeechBubbleProps({
    pointerHeight: 10,
    pointerWidth: 20,
    pointerPosition: 50,
    pointerSide: 'bottom' as const,
  }),
}, 'VTooltip')

export const VTooltip = genericComponent<OverlaySlots>()({
  name: 'VTooltip',

  props: makeVTooltipProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const isActive = useProxiedModel(props, 'modelValue')
    const { scopeId } = useScopeId()

    const uid = getUid()
    const id = computed(() => props.id || `v-tooltip-${uid}`)

    const overlay = ref<VOverlay>()

    const location = computed(() => {
      return props.location.split(' ').length > 1
        ? props.location
        : props.location + ' center' as StrategyProps['location']
    })

    const origin = computed(() => {
      return (
        props.origin === 'auto' ||
        props.origin === 'overlap' ||
        props.origin.split(' ').length > 1 ||
        props.location.split(' ').length > 1
      ) ? props.origin
        : props.origin + ' center' as StrategyProps['origin']
    })

    const transition = computed(() => {
      if (props.transition) return props.transition
      return isActive.value ? 'scale-transition' : 'fade-transition'
    })

    const activatorProps = computed(() =>
      mergeProps({
        'aria-describedby': id.value,
      }, props.activatorProps)
    )

    const speechBubbleProps = computed(() => {
      const locationAnchor = flipSide(parseAnchor(location.value, false))
      const position = includes(['bottom', 'left'], locationAnchor.align)
        ? '0%' : includes(['right', 'top'], locationAnchor.align) ? '100%' : '50%'
      return {
        speechBubble: props.speechBubble,
        pointerHeight: props.pointerHeight,
        pointerWidth: props.pointerWidth,
        pointerPosition: position,
        pointerSide: locationAnchor.side === 'center' ? 'bottom' : locationAnchor.side,
      }
    })

    useRender(() => {
      const [overlayProps] = VOverlay.filterProps(props)
      const { speechBubbleClasses, speechBubbleStyles } = useSpeechBubble(speechBubbleProps.value)

      return (
        <VOverlay
          ref={ overlay }
          class={[
            'v-tooltip',
            props.class,
          ]}
          style={[props.style, speechBubbleStyles.value]}
          id={ id.value }
          { ...overlayProps }
          v-model={ isActive.value }
          transition={ transition.value }
          absolute
          location={ location.value }
          origin={ origin.value }
          persistent
          role="tooltip"
          activatorProps={ activatorProps.value }
          contentClass={ speechBubbleClasses.value }
          _disableGlobalStack
          { ...scopeId }
        >
          {{
            activator: slots.activator,
            default: (...args) => slots.default?.(...args) ?? props.text,
          }}
        </VOverlay>
      )
    })

    return forwardRefs({}, overlay)
  },
})

export type VTooltip = InstanceType<typeof VTooltip>
