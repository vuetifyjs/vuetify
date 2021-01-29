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
// import { createSimpleFunctional } from '@/util'

// export const VBannerContent = defineComponent((props, context) => {
//   return () => h('div', { class: 'v-banner__content' }, context.slots)
// })

// (props, context) => {
//   console.log(context.slots.default?.())

//   return () => h('div', {
//     class: 'v-banner__content',
//   }, context.slots.default?.())
// }

export function VBannerContent () {
  return h(
    defineComponent({
      render () {
        return h('div', this.$slots.default?.())
      },
    })
  )
}

export function VBannerContent1 () {
  return h(
    defineComponent({
      setup (props, context) {
        return () => h('div', context.slots.default?.())
      },
    })
  )
}

export function VBannerContent2 () {
  return h(defineComponent((props, context) => {
    return () => h('div', context.slots.default?.())
  }))
}

export function VBannerContent3 () {
  return defineComponent({
    render () {
      return h('div', this.$slots.default?.())
    },
  })
}

export const VBannerContent4 = defineComponent(function (props, context) {
  return h('div', 'foobar')
})

export const x = defineComponent(function VBC (props, context) {
  return h('div', context.slots.default?.())
})

const VBannerContent5 = (props, context) => {
  return h('div', { class: 'v-banner__actions' }, context.slots.default?.())
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

  setup (props, context) {
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

    const children: any = [
      VBannerContent5(props, context),
      // VBannerContent1(),
      // VBannerContent2(),
      // h(VBannerContent3()),
      // h(VBannerContent4),
    ]

    // if (slots.actions) {
    //   children.push(h('div', { class: 'v-banner__actions' }, slots.actions?.()))
    // }

    // if (props.avatar || props.icon || slots.thumbnail) {
    //   children.unshift(
    //     h('div', { class: 'v-banner__thumbnail' }, [
    //       slots.thumbnail?.(),
    //     ])
    //   )
    // }

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
