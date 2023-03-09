// Styles
import './VMain.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'
import { useLayout } from '@/composables/layout'
import { useSsrBoot } from '@/composables/ssrBoot'

// Utilities
import { genericComponent, useRender } from '@/util'

export const VMain = genericComponent()({
  name: 'VMain',

  props: {
    scrollable: Boolean,

    ...makeComponentProps(),
    ...makeTagProps({ tag: 'main' }),
  },

  setup (props, { slots }) {
    const { mainStyles } = useLayout()
    const { ssrBootStyles } = useSsrBoot()

    useRender(() => (
      <props.tag
        class={[
          'v-main',
          props.class,
          { 'v-main--scrollable': props.scrollable },
        ]}
        style={[
          props.style,
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
