// Styles
import './VMain.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { useLayout } from '@/composables/layout'
import { useSsrBoot } from '@/composables/ssrBoot'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVMainProps = propsFactory({
  scrollable: Boolean,

  ...makeComponentProps(),
  ...makeTagProps({ tag: 'main' }),
}, 'v-main')

export const VMain = genericComponent()({
  name: 'VMain',

  props: makeVMainProps(),

  setup (props, { slots }) {
    const { mainStyles } = useLayout()
    const { ssrBootStyles } = useSsrBoot()

    useRender(() => (
      <props.tag
        class={[
          'v-main',
          { 'v-main--scrollable': props.scrollable },
          props.class,
        ]}
        style={[
          mainStyles.value,
          ssrBootStyles.value,
          props.style,
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
