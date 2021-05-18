// Composables
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeProps, maybeTransition } from '@/util'
import { makeTagProps } from '@/composables/tag'
import { makeTransitionProps } from '@/composables/transition'
import { useProxiedModel } from '@/composables/proxiedModel'

// Directives
import intersect from '@/directives/intersect'

// Utilities
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'VLazy',

  directives: { intersect },

  props: makeProps({
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
    ...makeDimensionProps(),
    ...makeTagProps(),
    ...makeTransitionProps({ transition: 'fade-transition' }),
  }),

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

    return () => (
      <props.tag
        class="v-lazy"
        v-intersect={[
          onIntersect,
          props.options,
          ['once'],
        ]}
        style={dimensionStyles.value}
      >
        { isActive.value && (
          maybeTransition(
            props,
            { appear: true },
            slots.default?.()
          )
        ) }
      </props.tag>
    )
  },
})
