// Styles
import './VMain.sass'

// Composables
import { makeTagProps } from '@/composables/tag'
import { useLayout } from '@/composables/layout'
import { useSsrBoot } from '@/composables/ssrBoot'

// Utilities
import { defineComponent, useRender } from '@/util'

export const VMain = defineComponent({
  name: 'VMain',

  props: {
    scrollable: Boolean,

    ...makeTagProps({ tag: 'main' }),
  },

  setup (props, { slots }) {
    const { mainStyles } = useLayout()
    const { ssrBootStyles } = useSsrBoot()

    useRender(() => (
      <props.tag
        class={[
          'v-main',
          { 'v-main--scrollable': props.scrollable },
        ]}
        style={[
          mainStyles.value,
          ssrBootStyles.value,
        ]}
      >
        { props.scrollable
          ? (
            <div class="v-main__scroller">
              { slots.default?.() }
            </div>
          )
          : slots.default?.()
        }
      </props.tag>
    ))

    return {}
  },
})

export type VMain = InstanceType<typeof VMain>
