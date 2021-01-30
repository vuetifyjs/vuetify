// Styles
import './VBanner.sass'

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

export function VBannerActions () {
  return defineComponent({
    render () {
      if (!this.$slots.actions) return undefined

      return h('div', {
        class: 'v-banner__actions',
      }, this.$slots.actions?.())
    },
  })
}

export function VBannerContent () {
  return defineComponent({
    render () {
      return h('div', {
        class: 'v-banner__content',
      }, this.$slots.default?.())
    },
  })
}

export function VBannerThumbnail () {
  return defineComponent({
    props: {
      avatar: String,
      icon: String,
    },

    render () {
      if (
        !this.$slots.thumbnail &&
        !this.$props.avatar &&
        !this.$props.icon
      ) return undefined

      return h('div', {
        class: 'v-banner__thumbnail',
      }, this.$slots.thumbnail?.())
    },
  })
}

export default defineComponent({
  name: 'VBanner',

  props: makeProps({
    avatar: String,
    icon: String,
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

    const bannerClasses = computed(() => {
      return {

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
        h(VBannerThumbnail(), props, slots),
        h(VBannerContent(), props, slots),
        h(VBannerActions(), props, slots),
      ])
    )
  },
})
