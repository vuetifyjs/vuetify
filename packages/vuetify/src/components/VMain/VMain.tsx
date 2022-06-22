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

  props: makeTagProps({ tag: 'main' }),

  setup (props, { slots }) {
    const { mainStyles } = useLayout()
    const { ssrBootStyles } = useSsrBoot()

    useRender(() => (
      <props.tag
        class="v-main"
        style={[
          mainStyles.value,
          ssrBootStyles.value,
        ]}
      >
        <div class="v-main__wrap">
          { slots.default?.() }
        </div>
      </props.tag>
    ))

    return {}
  },
})
