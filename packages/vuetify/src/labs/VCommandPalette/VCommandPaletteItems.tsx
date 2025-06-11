// Styles
import './VCommandPaletteItems.scss'

// Composables
import { useCommandPaletteContext } from './composables/useCommandPaletteContext'
import { makeComponentProps } from '@/composables/component'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export const makeVCommandPaletteItemsProps = propsFactory({
  tag: {
    type: String,
    default: 'div',
  },
  ...makeComponentProps(),
}, 'VCommandPaletteItems')

export const VCommandPaletteItems = genericComponent()({
  name: 'VCommandPaletteItems',

  props: makeVCommandPaletteItemsProps(),

  setup (props, { slots }) {
    const context = useCommandPaletteContext()

    const rootProps = computed(() => ({
      ...context.rootProps.value,
      class: [
        'v-command-palette-items',
        {
          'v-command-palette-items--grid': context.navigationMode.value === 'grid',
          'v-command-palette-items--list': context.navigationMode.value === 'list',
        },
        props.class,
      ],
      style: props.style,
    }))

    useRender(() => {
      const Tag = props.tag as any

      return (
        <Tag { ...rootProps.value }>
          { slots.default?.() }
        </Tag>
      )
    })
  },
})

export type VCommandPaletteItems = InstanceType<typeof VCommandPaletteItems>
