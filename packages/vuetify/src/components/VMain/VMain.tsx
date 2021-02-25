// Styles
import './VMain.sass'

// Utilities
import { defineComponent } from 'vue'
import makeProps from '@/util/makeProps'

// Composables
import { makeTagProps } from '@/composables/tag'
import { useMain } from '@/composables/layout'
import { useSsrBoot } from '@/composables/ssrBoot'

export default defineComponent({
  name: 'VMain',

  props: makeProps(makeTagProps({ tag: 'main' })),

  setup (props, { slots }) {
    const { mainStyles } = useMain()
    const { ssrBootStyles } = useSsrBoot()

    return () => (
      <props.tag
        class="v-main"
        style={{
          ...mainStyles.value,
          ...ssrBootStyles.value,
        }}
      >
        <div class="v-main__wrap">
          {slots.default?.()}
        </div>
      </props.tag>
    )
  }
})
