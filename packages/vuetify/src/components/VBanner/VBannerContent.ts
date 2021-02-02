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

  props: makeProps(makeThumbnailProps()),

  setup (props, { slots }) {
    return () => h('div', {
      class: 'v-banner__content',
    }, [
      (props.avatar || props.icon) && h(VBannerThumbnail, props, slots),
      slots.thumbnail?.(),
      slots.default?.(),
    ])
  },
})
