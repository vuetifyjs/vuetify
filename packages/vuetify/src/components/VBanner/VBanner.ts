// Styles
import './VBanner.scss'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeBorderRadiusProps, useBorderRadius } from '@/composables/border-radius'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeTagProps } from '@/composables/tag'
import { useTheme } from '@/composables/theme'

// Utilities
import { defineComponent, h } from 'vue'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VBanner',

  props: makeProps({
    avatar: [Boolean, String],
    icon: [Boolean, String],
    mobile: Boolean,
    singleLine: Boolean,
    sticky: Boolean,
    ...makeBorderProps(),
    ...makeBorderRadiusProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeTagProps(),
  }),

  setup (props, { slots }) {
    const { themeClasses } = useTheme()
    const { borderClasses } = useBorder(props)
    const { borderRadiusClasses } = useBorderRadius(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props, 'v-banner')

    return () => {
      const hasThumbnail = (!!props.avatar || !!props.icon || !!slots.thumbnail)

      return h(props.tag, {
        class: [
          {
            'v-banner': true,
            'v-banner--has-thumbnail': hasThumbnail,
            'v-banner--is-mobile': props.mobile,
            'v-banner--single-line': props.singleLine,
            'v-banner--sticky': props.sticky,
          },
          themeClasses.value,
          borderClasses.value,
          borderRadiusClasses.value,
          elevationClasses.value,
          positionClasses.value,
        ],
        style: [
          dimensionStyles.value,
          positionStyles.value,
        ],
        role: 'banner',
      }, [
        h('div', { class: 'v-banner__sizer' }, [
          h('div', { class: 'v-banner__content' }, [
            hasThumbnail && h('div', { class: 'v-banner__thumbnail' }, [
              slots.thumbnail?.(),
              props.avatar && h('img', {
                class: 'v-banner__avatar',
                src: props.avatar,
              }),
              props.icon && h('i', {
                class: [
                  'v-banner__icon',
                  props.icon,
                ],
              }),
            ]),
            h('div', { class: 'v-banner__text' }, slots.default?.()),
          ]),

          slots.actions && h('div', {
            class: 'v-banner__actions',
          }, slots.actions?.()),
        ]),
      ])
    }
  },
})
