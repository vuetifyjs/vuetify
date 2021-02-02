// Styles
import './VBannerContent.scss'

// Components
import VBannerThumbnail, { makeThumbnailProps } from './VBannerThumbnail'

// Utilities
import { defineComponent, h } from 'vue'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VBannerContent',

  inheritAttrs: false,

  props: makeProps({
    mobile: Boolean,
    singleLine: Boolean,
    ...makeThumbnailProps(),
  }),

  setup (props, { slots }) {
    return () => h('div', {
      class: {
        'v-banner-content': true,
        'v-banner-content--is-mobile': props.mobile,
        'v-banner-content--single-line': props.singleLine,
      },
    }, [
      (!!props.avatar || !!props.icon || !!slots.thumbnail) && h(VBannerThumbnail, props, slots),
      slots.default?.(),
    ])
  },
})
