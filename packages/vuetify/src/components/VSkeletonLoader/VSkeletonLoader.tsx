
// Styles
import './VSkeletonLoader.sass'

// Components
import { VSkeletonBone } from './VSkeletonBone'

// Composables

import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { genericComponent, useRender, wrapInArray } from '@/util'
import type { PropType } from 'vue'
import { computed } from 'vue'

const rootTypes = ['card']

export const types = {
  actions: ['button@2'],
  article: ['heading', 'paragraph'],
  avatar: 'avatar',
  button: 'button',
  card: ['image', 'card-heading'],
  'card-avatar': ['image', 'list-item-avatar'],
  'card-heading': 'heading',
  chip: 'chip',
  'date-picker': ['list-item', 'card-heading', 'divider', 'date-picker-options', 'date-picker-days', 'actions'],
  'date-picker-options': ['text', 'avatar@2'],
  'date-picker-days': ['avatar@28'],
  heading: 'heading',
  image: 'image',
  'list-item': 'text',
  'list-item-avatar': ['avatar', 'text'],
  'list-item-two-line': ['sentences'],
  'list-item-avatar-two-line': ['avatar', 'sentences'],
  'list-item-three-line': ['paragraph'],
  'list-item-avatar-three-line': ['avatar', 'paragraph'],
  paragraph: ['text@3'],
  sentences: ['text@2'],
  table: ['table-heading', 'table-thead', 'table-tbody', 'table-tfoot'],
  'table-heading': ['heading', 'text'],
  'table-thead': ['heading@6'],
  'table-tbody': ['table-row-divider@6'],
  'table-row-divider': ['table-row', 'divider'],
  'table-row': ['table-cell@6'],
  'table-cell': 'text',
  'table-tfoot': ['text@2', 'avatar@2'],
  text: 'text',
} as const

function processElement (element: string | { type: string, children?: any[] }): any[] {
  const [item, repeat] = (typeof element === 'string' ? element : element.type).split('@')
  const itemCount = repeat ? parseInt(repeat, 10) : 1
  const flatItems = Array(itemCount).fill(flattenTypes(item)).flat()
  const children = typeof element === 'object' && element.children ? flattenTypes(element.children) : []

  return [...flatItems, ...children]
}

function flattenTypes (key: any): any[] {
  if (typeof key === 'string') {
    const value = types[key]

    if (key === value) {
      return [{ type: key }]
    }

    return wrapInArray(value).flatMap(processElement)
  }

  if (Array.isArray(key)) {
    return key.flatMap(processElement)
  }

  throw new Error('Invalid argument type for flattenTypes function')
}

export const VSkeletonLoader = genericComponent()({
  name: 'VSkeletonLoader',

  props: {
    boilerplate: Boolean,
    loading: Boolean,
    type: {
      type: [String, Array] as PropType<string | string[]>,
      validator: (val: string) => rootTypes.includes(val),
      default: 'card',
    },

    ...makeElevationProps(),
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    const { themeClasses } = provideTheme(props)
    const { elevationClasses } = useElevation(props)

    useRender(() => {
      return (
        <div
          class={[
            'v-skeleton-loader',
            themeClasses.value,
            elevationClasses.value,
          ]}
        >
          { props.type === 'card' && (
            <VSkeletonBone
              class="v-skeleton-loader-card"
              key="card"
              type="sheet"
            >
              <VSkeletonBone type="image" />

              <VSkeletonBone type="heading" />
            </VSkeletonBone>
          )}

          { slots.default?.() }
        </div>
      )
    })

    return {}
  },
})
