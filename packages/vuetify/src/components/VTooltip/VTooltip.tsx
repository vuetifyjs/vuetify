// Styles
import './VTooltip.sass'

// Components
import { VOverlay } from '@/components/VOverlay'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'
import { useScopeId } from '@/composables/scopeId'
import { forwardRefs } from '@/composables/forwardRefs'

// Utilities
import { computed, ref } from 'vue'
import { genericComponent, getUid, omit, useRender } from '@/util'
import { filterVOverlayProps, makeVOverlayProps } from '@/components/VOverlay/VOverlay'

// Types
import type { SlotsToProps } from '@/util'
import type { OverlaySlots } from '@/components/VOverlay/VOverlay'
import type { StrategyProps } from '@/components/VOverlay/locationStrategies'

export const VTooltip = genericComponent<new () => {
  $props: SlotsToProps<OverlaySlots>
}>()({
  name: 'VTooltip',

  props: {
    id: String,
    text: String,

    ...omit(makeVOverlayProps({
      transition: false,
      origin: 'auto' as const,
      location: 'end' as const,
      minWidth: 0,
      offset: 10,
    }), [
      'absolute',
      'locationStrategy',
      'scrollStrategy',
      'scrim',
      'persistent',
      'openOnClick',
      'openOnHover',
      'closeOnBack',
      'eager',
    ])[0],
  },

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

    useRender(() => {
      const [overlayProps] = filterVOverlayProps(props)

      return (
        <VOverlay
          ref={ overlay }
          class={[
            'v-tooltip',
          ]}
          id={ id.value }
          { ...overlayProps }
          v-model={ isActive.value }
          transition={ transition.value }
          absolute
          locationStrategy="connected"
          scrollStrategy="reposition"
          location={ location.value }
          origin={ origin.value }
          scrim={ false }
          persistent
          open-on-click={ false }
          open-on-hover
          close-on-back={ false }
          role="tooltip"
          eager
          activatorProps={{
            'aria-describedby': id.value,
            ...overlayProps.activatorProps,
          }}
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
