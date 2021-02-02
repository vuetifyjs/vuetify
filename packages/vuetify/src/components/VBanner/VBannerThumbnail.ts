// Styles
import './VBannerThumbnail.scss'

// Utilities
import { defineComponent, h } from 'vue'
import makeProps from '@/util/makeProps'
import propsFactory from '@/util/propsFactory'

// Composables
export const makeThumbnailProps = propsFactory({
  avatar: String,
  icon: String,
})

export default defineComponent({
  name: 'VBannerThumbnail',

  inheritAttrs: false,

  props: makeProps(makeThumbnailProps()),

  render () {
    const children = []

    if (this.$slots.thumbnail) {
      children.push(this.$slots.thumbnail?.())
    } else if (this.$props.avatar) {
      children.push(
        h('div', {
          class: 'v-banner__thumbnail__avatar',
          style: {
            height: '36px',
            width: '36px',
          },
        })
      )
    }

    return h('div', {
      class: 'v-banner__thumbnail',
    }, children)
  },
})
