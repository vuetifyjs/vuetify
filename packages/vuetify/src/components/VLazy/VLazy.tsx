// Composables
import { makeActiveProps, useActive } from '@/composables/active'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeTagProps } from '@/composables/tag'
import { makeTransitionProps, MaybeTransition } from '@/composables/transition'

// Directives
import intersect from '@/directives/intersect'

// Utilities
import type { PropType } from 'vue'
import { defineComponent } from '@/util'

export default defineComponent({
  name: 'VLazy',

  directives: { intersect },

  props: {
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

    ...makeActiveProps(),
    ...makeDimensionProps(),
    ...makeTagProps(),
    ...makeTransitionProps({ transition: 'fade-transition' }),
  },

  emits: {
    'update:active': (value: boolean) => true,
  },

  setup (props, { slots }) {
    const { dimensionStyles } = useDimension(props)
    const { isActive, activeClasses } = useActive(props, 'v-lazy')

    function onIntersect (isIntersecting: boolean) {
      if (isActive.value) return

      isActive.value = isIntersecting
    }

    return () => (
      <MaybeTransition transition={ props.transition } appear>
        { isActive.value && (
          <props.tag
            class={[
              'v-lazy',
              activeClasses.value,
            ]}
            v-intersect={[
              onIntersect,
              props.options,
              isActive.value ? [] : ['once'],
            ]}
            style={ dimensionStyles.value }
          >
            { slots.default?.() }
          </props.tag>
        )}
      </MaybeTransition>
    )
  },
})
