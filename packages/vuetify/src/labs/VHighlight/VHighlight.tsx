// Styles
import './VHighlight.sass'

// Composables
import { useHighlight } from './highlight'
import { useTextColor } from '@/composables/color'
import { makeTagProps } from '@/composables/tag'

// Utilities
import { toRef } from 'vue'
import { defineComponent, propsFactory } from '@/util'

// Types
import type { PropType } from 'vue'
import type { FilterMatchArrayMultiple } from '@/composables/filter'

export const makeVHighlightProps = propsFactory({
  text: {
    type: String,
    default: '',
  },
  query: [String, Array] as PropType<string | string[]>,
  matches: Array as PropType<FilterMatchArrayMultiple>,
  matchAll: Boolean,
  ignoreCase: Boolean,
  color: String,
  opacity: [String, Number],
  markClass: String,
  ...makeTagProps({ tag: 'span' }),
}, 'VHighlight')

export const VHighlight = defineComponent({
  name: 'VHighlight',

  props: makeVHighlightProps(),

  setup (props) {
    const chunks = useHighlight({
      text: toRef(props, 'text'),
      query: toRef(props, 'query'),
      matches: toRef(props, 'matches'),
      matchAll: toRef(props, 'matchAll'),
      ignoreCase: toRef(props, 'ignoreCase'),
    })

    const { textColorClasses, textColorStyles } = useTextColor(() => props.color)

    return () => (
      <props.tag class="v-highlight">
        { chunks.value.map((chunk, i) => (
          chunk.match
            ? (
              <mark
                key={ i }
                class={['v-highlight__mark', textColorClasses.value, props.markClass]}
                style={[
                  textColorStyles.value,
                  { '--v-highlight-opacity': props.opacity },
                ]}
              >
                { chunk.text }
              </mark>
            )
            : <span key={ i }>{ chunk.text }</span>
        ))}
      </props.tag>
    )
  },
})

export type VHighlight = InstanceType<typeof VHighlight>
