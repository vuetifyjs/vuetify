// Composables
import { makeComponentProps } from '@/composables/component'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { useProxiedModel } from '@/composables/proxiedModel'
import { makeTagProps } from '@/composables/tag'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Directives
import intersect from '@/directives/intersect'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVLazyProps = propsFactory({
  modelValue: Boolean,
  options: {
    type: Object as PropType<IntersectionObserverInit>,
    // For more information on types, navigate to:
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    default: () => ({
      root: undefined,
      rootMargin: undefined,
      threshold: undefined,
    }),
  },

  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeTagProps(),
  ...makeTransitionProps({ transition: 'fade-transition' }),
}, 'v-lazy')

export const VLazy = genericComponent()({
  name: 'VLazy',

  directives: { intersect },

  props: makeVLazyProps(),

  emits: {
    'update:modelValue': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const { dimensionStyles } = useDimension(props)

    const isActive = useProxiedModel(props, 'modelValue')

    function onIntersect (isIntersecting: boolean) {
      if (isActive.value) return

      isActive.value = isIntersecting
    }

    useRender(() => (
      <props.tag
        class={[
          'v-lazy',
          props.class,
        ]}
        v-intersect={[
          {
            handler: onIntersect,
            options: props.options,
          },
          null,
          isActive.value ? [] : ['once'],
        ]}
        style={[
          dimensionStyles.value,
          props.style,
        ]}
      >
        { isActive.value && (
          <MaybeTransition transition={ props.transition } appear>
            { slots.default?.() }
          </MaybeTransition>
        )}
      </props.tag>
    ))

    return {}
  },
})

export type VLazy = InstanceType<typeof VLazy>
