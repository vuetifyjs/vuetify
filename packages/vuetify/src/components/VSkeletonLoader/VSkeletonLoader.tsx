// Styles
import './VSkeletonLoader.sass'

// Composables
import { useBackgroundColor } from '@/composables/color'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { useLocale } from '@/composables/locale'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { computed } from 'vue'
import { genericComponent, propsFactory, useRender, wrapInArray } from '@/util'

// Types
import type { PropType, VNode } from 'vue'

type VSkeletonBone<T> = T | VSkeletonBone<T>[]

export type VSkeletonBones = VSkeletonBone<VNode>
export type VSkeletonLoaderType = keyof typeof rootTypes

export const rootTypes = {
  actions: 'button@2',
  article: 'heading, paragraph',
  avatar: 'avatar',
  button: 'button',
  card: 'image, heading',
  'card-avatar': 'image, list-item-avatar',
  chip: 'chip',
  'date-picker': 'list-item, heading, divider, date-picker-options, date-picker-days, actions',
  'date-picker-options': 'text, avatar@2',
  'date-picker-days': 'avatar@28',
  divider: 'divider',
  heading: 'heading',
  image: 'image',
  'list-item': 'text',
  'list-item-avatar': 'avatar, text',
  'list-item-two-line': 'sentences',
  'list-item-avatar-two-line': 'avatar, sentences',
  'list-item-three-line': 'paragraph',
  'list-item-avatar-three-line': 'avatar, paragraph',
  ossein: 'ossein',
  paragraph: 'text@3',
  sentences: 'text@2',
  subtitle: 'text',
  table: 'table-heading, table-thead, table-tbody, table-tfoot',
  'table-heading': 'chip, text',
  'table-thead': 'heading@6',
  'table-tbody': 'table-row-divider@6',
  'table-row-divider': 'table-row, divider',
  'table-row': 'text@6',
  'table-tfoot': 'text@2, avatar@2',
  text: 'text',
} as const

export const makeVSkeletonLoaderProps = propsFactory({
  boilerplate: Boolean,
  color: String,
  loading: Boolean,
  loadingText: {
    type: String,
    default: '$vuetify.loading',
  },
  type: {
    type: [String, Array] as PropType<
      | VSkeletonLoaderType | (string & {})
      | ReadonlyArray<VSkeletonLoaderType | (string & {})>
    >,
    default: 'ossein',
  },
  types: {
    type: Object as PropType<Record<string, string>>,
    default: () => ({}),
  },

  ...makeDimensionProps(),
  ...makeElevationProps(),
  ...makeThemeProps(),
}, 'VSkeletonLoader')

export const VSkeletonLoader = genericComponent()({
  name: 'VSkeletonLoader',

  inheritAttrs: false,

  props: makeVSkeletonLoaderProps(),

  setup (props, { attrs, slots }) {
    const { backgroundColorClasses, backgroundColorStyles } = useBackgroundColor(() => props.color)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { themeClasses } = provideTheme(props)
    const { t } = useLocale()

    // Merge custom types into the root types for use throughout genX functions
    // TODO: figure out a better way to type this
    const mergedTypes = computed(() => ({ ...(rootTypes as Record<string, string>), ...props.types }))

    function genBone (type: string, children: VSkeletonBones = []) {
      return (
        <div
          class={[
            'v-skeleton-loader__bone',
            `v-skeleton-loader__${type}`,
          ]}
        >
          { children }
        </div>
      )
    }

    function genBones (bone: string) {
      // e.g. 'text@3'
      const [type, length] = bone.split('@') as [VSkeletonLoaderType, number]

      // Generate a length array based upon
      // value after @ in the bone string
      return Array.from({ length }).map(() => genStructure(type))
    }

    function genStructure (type?: string): VSkeletonBones {
      let children: VSkeletonBones = []

      if (!type) return children

      const bone = mergedTypes.value[type]

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

    const items = computed(() => genStructure(wrapInArray(props.type).join(',')))

    useRender(() => {
      const isLoading = !slots.default || props.loading
      const loadingProps = (props.boilerplate || !isLoading) ? {} : {
        ariaLive: 'polite',
        ariaLabel: t(props.loadingText),
        role: 'alert',
      }

      return (
        <>
          { isLoading
            ? (
              <div
                class={[
                  'v-skeleton-loader',
                  {
                    'v-skeleton-loader--boilerplate': props.boilerplate,
                  },
                  themeClasses.value,
                  backgroundColorClasses.value,
                  elevationClasses.value,
                ]}
                style={[
                  backgroundColorStyles.value,
                  dimensionStyles.value,
                ]}
                { ...loadingProps }
                { ...attrs }
              >
                { items.value }
              </div>
            )
            : slots.default?.()
          }
        </>
      )
    })

    return {}
  },
})

export type VSkeletonLoader = InstanceType<typeof VSkeletonLoader>
