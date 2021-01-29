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

function VBannerContent () {
  return defineComponent({
    render () {
      return h('div', {
        class: 'v-banner__content',
      }, this.$slots.default?.())
    },
  })
}

function VBannerActions () {
  return defineComponent({
    render () {
      return h('div', {
        class: 'v-banner__actions',
      }, this.$slots.actions?.())
    },
  })
}

function VBannerThumbnail () {
  return defineComponent({
    render () {
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

    const children = [h(VBannerContent(), props, slots)]

    if (slots.actions) {
      children.push(
        h(VBannerActions(), props, slots)
      )
    }

    if (props.avatar || props.icon || slots.thumbnail) {
      children.unshift(
        h(VBannerThumbnail(), props, slots)
      )
    }

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
      }, children)
    )
  },
})
