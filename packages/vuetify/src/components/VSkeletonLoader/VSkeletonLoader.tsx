// Styles
import './VSkeletonLoader.sass'

// Composables
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeThemeProps, provideTheme } from '@/composables/theme'
import { useBackgroundColor } from '@/composables/color'

// Utilities
import { computed, h, toRef } from 'vue'
import { genericComponent, useRender } from '@/util'

// Types
import type { PropType, VNode } from 'vue'

export const rootTypes = {
  actions: 'button@2',
  article: 'heading, paragraph',
  avatar: 'avatar',
  button: 'button',
  card: 'image, card-heading',
  'card-avatar': 'image, list-item-avatar',
  'card-heading': 'heading',
  chip: 'chip',
  'date-picker': 'list-item, card-heading, divider, date-picker-options, date-picker-days, actions',
  'date-picker-options': 'text, avatar@2',
  'date-picker-days': 'avatar@28',
  heading: 'heading',
  image: 'image',
  'list-item': 'text',
  'list-item-avatar': 'avatar, text',
  'list-item-two-line': 'sentences',
  'list-item-avatar-two-line': 'avatar, sentences',
  'list-item-three-line': 'paragraph',
  'list-item-avatar-three-line': 'avatar, paragraph',
  paragraph: 'text@3',
  sentences: 'text@2',
  table: 'table-heading, table-thead, table-tbody, table-tfoot',
  'table-heading': 'heading, text',
  'table-thead': 'heading@6',
  'table-tbody': 'table-row-divider@6',
  'table-row-divider': 'table-row, divider',
  'table-row': 'table-cell@6',
  'table-cell': 'text',
  'table-tfoot': 'text@2, avatar@2',
  text: 'text',
} as Record<string, string>

function genBone (text: string, children: VNode[] = []) {
  return h('div', {
    class: [
      'v-skeleton-loader__bone',
      `v-skeleton-loader__${text}`,
    ],
  }, children)
}

function genBones (bone: string) {
  // e.g. 'text@3'
  const [type, length] = bone.split('@') as [string, number]

  // Generate a length array based upon
  // value after @ in the bone string
  return Array.from({ length }).map(() => genStructure(type))
}

function genStructure (type?: string): any {
  let children: VNode[] = []

  if (!type) return children

  const bone = type in rootTypes ? rootTypes[type] : 'card'

  // End of recursion, do nothing
  /* eslint-disable-next-line no-empty, brace-style */
  if (type === bone) {}
  // Array of values - e.g. 'heading, paragraph, text@2'
  else if (type.includes(',')) return mapBones(type)
  // Array of values - e.g. 'paragraph@4'
  else if (type.includes('@')) return genBones(type)
  // Array of values - e.g. 'card@2'
  else if (bone.includes(',')) children = mapBones(bone)
  // Array of values - e.g. 'list-item@2'
  else if (bone.includes('@')) children = genBones(bone)
  // Single value - e.g. 'card-heading'
  else if (bone) children.push(genStructure(bone))

  return [genBone(type, children)]
}

function mapBones (bones: string): VNode[] {
  // Remove spaces and return array of structures
  return bones.replace(/\s/g, '').split(',').map(genStructure)
}

export const VSkeletonLoader = genericComponent()({
  name: 'VSkeletonLoader',

  props: {
    boilerplate: Boolean,
    color: String,
    loading: Boolean,
    type: {
      type: [String, Array] as PropType<string | string[]>,
      default: 'image',
    },

    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(toRef(props, 'color'))
    const { themeClasses } = provideTheme(props)

    const items = computed(() => {
      return genStructure(props.type as any)
    })

    useRender(() => {
      const isLoading = !slots.default || props.loading

      return h('div', {
        class: [
          'v-skeleton-loader',
          {
            'v-skeleton-loader--boilerplate': props.boilerplate,
          },
          themeClasses.value,
          backgroundColorClasses.value,
          elevationClasses.value,
        ],
        style: [
          backgroundColorStyles.value,
          isLoading ? dimensionStyles.value : undefined,
        ],
      }, [
        isLoading ? items.value : slots.default?.(),
      ])
    })

    return {}
  },
})