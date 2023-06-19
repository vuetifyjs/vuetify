// Components
import { makeVImgProps, VImg } from '@/components/VImg/VImg'
import { makeVWindowItemProps, VWindowItem } from '@/components/VWindow/VWindowItem'

// Utilities
import { genericComponent, propsFactory, useRender } from '@/util'

// Types
import type { VImgSlots } from '@/components/VImg/VImg'

export const makeVCarouselItemProps = propsFactory({
  ...makeVImgProps(),
  ...makeVWindowItemProps(),
}, 'v-carousel-item')

export const VCarouselItem = genericComponent<VImgSlots>()({
  name: 'VCarouselItem',

  inheritAttrs: false,

  props: makeVCarouselItemProps(),

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
