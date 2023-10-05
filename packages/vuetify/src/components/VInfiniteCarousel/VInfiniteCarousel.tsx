// Styles
import './VInfiniteCarousel.sass'

// Composables
import { makeComponentProps } from '@/composables/component'
import { makeTagProps } from '@/composables/tag'
import { makeThemeProps, provideTheme } from '@/composables/theme'

// Utilities
import { onMounted, reactive } from 'vue'
import { genericComponent, propsFactory, useRender } from '@/util'

export type VInfiniteCarouselSlots = {
  default: never
  prepend: never
  append: never
  loader: never
}

export const makeVInfiniteCarouselProps = propsFactory({
  reverse: {
    type: Boolean,
    default: false,
  },

  speed: {
    type: Number,
    default: 10,
  },

  step: {
    type: Number,
    default: 1,
  },

  pause: {
    type: Boolean,
    default: false,
  },

  ...makeComponentProps(),
  ...makeTagProps({ tag: 'div' }),
  ...makeThemeProps(),
}, 'VInfiniteCarousel')

export const VInfiniteCarousel = genericComponent<VInfiniteCarouselSlots>()({
  name: 'VInfiniteCarousel',

  props: makeVInfiniteCarouselProps(),

  setup (props, { attrs, slots }) {
    const { themeClasses } = provideTheme(props)

    const options = reactive({
      showOriginal: true, // Probably wont be needed anymore, so if this is still here then its probably an error
      numOfItems: 1, // The amount of items that are needed to fill the viewport ( * 3 for infinite scroll effect)
      carouselId: crypto.randomUUID(), // This is used to make sure that each carousel is accessed individually, and that no ids override (I am willing ti be money they won't with this method)

      getItems() { // This works like a computed property
        const items = []

        if (slots.default) {
          // This returns the center element, the number will always be odd
          const centerNumber = Math.ceil(options.numOfItems / 2)

          for (let i = 1; i <= options.numOfItems; i++) {
            // Only apply the id to the center elements so I can guarentee that the
            // correct element is being used (for the infinite scroll effect)
            if (i === centerNumber) {
              items.push(<div class='v-infinite-carousel__inner' id={'v-infinite-carousel__inner-' + options.carouselId}>{ slots.default() }</div>)
            }else {
              items.push(<div class='v-infinite-carousel__inner-'> { slots.default() } </div>)
            }
          }
        }

        return items
      }
    })

    onMounted(() => {
      // This is used to make sure that the carousel only moves based on the number
      // of ms that the user supplied (or 10 default)
      // I just didnt want to use two different intervals, so I included it all in one
      let timerCounter = 0

      setInterval(() => {
        const element = document.getElementById('v-infinite-carousel__inner-' + options.carouselId)
        if (element && element.parentElement) {

          if (!props.pause) {
            timerCounter++

            if (timerCounter === props.speed) {
              if (props.reverse) {
                element.parentElement.scrollLeft -= props.step
              }else {
                element.parentElement.scrollLeft += props.step
              }
              timerCounter = 0
            }
          }

          const widthOfOneItem = element.clientWidth
          const widthOfViewPort = element.parentElement.clientWidth

          // This gets the number of elements that are needed to fill the viewport, then multipliers it by 3
          // to get the number of elements needed to make the infinite scroll effect work
          // The number is then rounded up to the nearest odd number for the center element
          const numOfItems = Math.ceil(widthOfViewPort / widthOfOneItem) * 3 % 2 === 0
            ? Math.ceil(widthOfViewPort / widthOfOneItem) * 3 + 1
            : Math.ceil(widthOfViewPort / widthOfOneItem) * 3

          options.numOfItems = numOfItems

          const scrollLeft = element.parentElement.scrollLeft // The users current scroll position

          const centerNumber = Math.ceil(options.numOfItems / 2)

          // These next few variables are used to tell if the user should be scrolled to the center element
          // This is what gives the infinite scroll effect
          const scrollPositionBefore = widthOfOneItem * centerNumber - 1 // The last pixel position of the element before the center element
          const scrollPositionAfter = widthOfOneItem * centerNumber // The first pixel position of the element after the center element

          if (scrollLeft + widthOfViewPort <= scrollPositionBefore) {
            element.parentElement.scrollLeft = ((widthOfOneItem * 2) - widthOfOneItem) - (widthOfOneItem - (scrollLeft + widthOfOneItem))
          }else if (scrollLeft >= scrollPositionAfter) {
            element.parentElement.scrollLeft = widthOfOneItem + (scrollLeft - (widthOfOneItem * 2))
          }
        }
        // Keep the interval going if the element is undefined but don't do anything until the
        // element is available again (A webpage reset would stop this interval which is fine)
      }, 1)
    })

    useRender(() => {
      const Tag = 'div'

      return (
        <Tag
          class={[
            'v-infinite-carousel',
            themeClasses.value,
            props.class,
          ]}
        >
          { options.getItems() }
        </Tag>
      )
    })

    return {}
  },
})

export type VInfiniteCarousel = InstanceType<typeof VInfiniteCarousel>
