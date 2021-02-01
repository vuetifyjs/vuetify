// Components
import VBannerThumbnail, { makeThumbnailProps } from './VBannerThumbnail'

// Utilities
import { defineComponent, h } from 'vue'
import makeProps from '@/util/makeProps'

export default defineComponent({
  name: 'VBannerContent',

  inheritAttrs: false,

  props: makeProps(makeThumbnailProps()),

  render () {
    return h('div', {
      class: 'v-banner__content',
    }, [
      (this.$props.avatar || this.$props.icon) && h(VBannerThumbnail, this.$props, this.$slots),
      this.$slots.thumbnail?.(),
      this.$slots.default?.(),
    ])
  },
})
