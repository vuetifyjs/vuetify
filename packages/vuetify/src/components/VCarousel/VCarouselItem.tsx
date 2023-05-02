// Components
import { VImg } from '@/components/VImg'
import { makeVWindowItemProps, VWindowItem } from '@/components/VWindow/VWindowItem'

// Utilities
import { genericComponent, useRender } from '@/util'

// Types
import { makeVImgProps, type VImgSlots } from '@/components/VImg/VImg'

export const VCarouselItem = genericComponent<VImgSlots>()({
  name: 'VCarouselItem',

  inheritAttrs: false,

  props: {
    ...makeVImgProps(),
    ...makeVWindowItemProps(),
  },

  setup (props, { slots, attrs }) {
    useRender(() => {
      const [imgProps] = VImg.filterProps(props)
      const [windowItemProps] = VWindowItem.filterProps(props)

      return (
        <VWindowItem
          class="v-carousel-item"
          { ...windowItemProps }
        >
          <VImg
            { ...attrs }
            { ...imgProps }
            v-slots={ slots }
          />
        </VWindowItem>
      )
    })
  },
})

export type VCarouselItem = InstanceType<typeof VCarouselItem>
