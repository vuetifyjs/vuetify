
// Styles
import './VSkeletonLoader.sass'

// Composables

import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makeThemeProps, useTheme } from '@/composables/theme'

// Utilities
import { genericComponent } from '@/util'
import type { PropType } from 'vue'
import { computed, h } from 'vue'

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
} as const

function genBone (text: string, children: string[] = []) {
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
  const generator = () => genStructure(type)

  // Generate a length array based upon
  // value after @ in the bone string
  return Array.from({ length }).map(generator)
}

function genStructure (type: any) {
  let children = []
  const bone = rootTypes[type] || ''

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

function mapBones (bones: string) {
  // Remove spaces and return array of structures
  return bones.replace(/\s/g, '').split(',').map(genStructure)
}

export const VSkeletonLoader = genericComponent()({
  name: 'VSkeletonLoader',

  props: {
    boilerplate: Boolean,
    loading: Boolean,
    type: {
      type: [String, Array] as PropType<string | string[]>,
      default: 'card',
    },

    ...makeElevationProps(),
    ...makeThemeProps(),
  },

  setup (props, { slots }) {
    const { elevationClasses } = useElevation(props)
    const { themeClasses } = useTheme()

    const items = computed(() => {
      return genStructure(props.type as any)
    })

    return () => h('div', {
      class: ['v-skeleton-loader', themeClasses.value, elevationClasses.value],
    }, [items.value, slots.default?.()])
  },
})
