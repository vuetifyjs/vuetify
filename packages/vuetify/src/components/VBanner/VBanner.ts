// Styles
import './VBanner.scss'

// Components
import { makeThumbnailProps } from './VBannerThumbnail'
import VBannerContent from './VBannerContent'

// Composables
import { makeBorderProps, useBorder } from '@/composables/border'
import { makeBorderRadiusProps, useBorderRadius } from '@/composables/border-radius'
import { makeDimensionProps, useDimension } from '@/composables/dimensions'
import { makeElevationProps, useElevation } from '@/composables/elevation'
import { makePositionProps, usePosition } from '@/composables/position'
import { makeTagProps } from '@/composables/tag'
import { useTheme } from '@/composables/theme'

// Utilities
import { computed, defineComponent, h } from 'vue'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VBanner',

  props: makeProps({
    mobile: Boolean,
    singleLine: Boolean,
    ...makeBorderProps(),
    ...makeBorderRadiusProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeTagProps(),
    ...makeThumbnailProps(),
  }),

  setup (props, { slots }) {
    const { themeClasses } = useTheme()
    const { borderClasses } = useBorder(props)
    const { borderRadiusClasses } = useBorderRadius(props)
    const { dimensionStyles } = useDimension(props)
    const { elevationClasses } = useElevation(props)
    const { positionClasses, positionStyles } = usePosition(props, 'v-banner')

    const bannerClasses = computed(() => {
      return {
        'v-banner--has-thumbnail': (!!props.avatar || !!props.icon || !!slots.thumbnail),
        'v-banner--is-mobile': props.mobile,
        'v-banner--single-line': props.singleLine,
      }
    })

    return () => (
      h(props.tag, {
        class: [
          'v-banner',
          bannerClasses.value,
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
          h(VBannerContent, props, slots),

          slots.actions && h('div', {
            class: 'v-banner__actions',
          }, slots.actions?.()),
        ]),
      ])
    )
  },
})
