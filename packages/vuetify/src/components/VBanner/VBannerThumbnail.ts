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

  props: makeProps({
    mobile: Boolean,
    ...makeThumbnailProps(),
  }),

  setup (props, { slots }) {
    return () => h('div', {
      class: {
        'v-banner-thumbnail': true,
        'v-banner-thumbnail--is-mobile': props.mobile,
      },
    }, [
      slots.thumbnail?.(),
      props.avatar && h('div', {
        class: 'v-banner-thumbnail__avatar',
        style: {
          height: '36px',
          width: '36px',
        },
      }),
    ])
  },
})
