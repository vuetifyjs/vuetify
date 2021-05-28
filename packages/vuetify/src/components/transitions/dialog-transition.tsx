import type { PropType } from 'vue'
import { defineComponent, Transition } from 'vue'
import { acceleratedEasing, deceleratedEasing, makeProps } from '@/util'

export default defineComponent({
  name: 'VDialogTransition',

  props: makeProps({
    target: Object as PropType<HTMLElement>,
  }),

  setup (props, { slots }) {
    const functions = {
      onEnter (el: Element, done: () => void) {
        const { x, y } = getDimensions(props.target!, el as HTMLElement)

        const animation = el.animate([
          { transform: `translate(${x}px, ${y}px) scale(0.1)`, opacity: 0 },
          { transform: '' },
        ], {
          duration: 225,
          easing: deceleratedEasing,
        })
        animation.finished.then(() => done())
      },
      onLeave (el: Element, done: () => void) {
        const { x, y } = getDimensions(props.target!, el as HTMLElement)

        const animation = el.animate([
          { transform: '' },
          { transform: `translate(${x}px, ${y}px) scale(0.1)`, opacity: 0 },
        ], {
          duration: 125,
          easing: acceleratedEasing,
        })
        animation.finished.then(() => done())
      },
    }

    return () => {
      return props.target
        ? <Transition name="dialog-transition" { ...functions } css={ false } v-slots={ slots } />
        : <Transition name="dialog-transition" v-slots={ slots } />
    }
  },
})

function getDimensions (target: HTMLElement, el: HTMLElement) {
  const initialDisplay = el.style.display
  const initialTransform = el.style.transform

  el.style.transition = 'none'
  el.style.display = ''
  el.style.transform = 'none'

  const targetBox = target.getBoundingClientRect()
  const elBox = el.getBoundingClientRect()
  const x = (targetBox.width / 2 + targetBox.left) - (elBox.width / 2 + elBox.left)
  const y = (targetBox.height / 2 + targetBox.top) - (elBox.height / 2 + elBox.top)
  el.style.display = initialDisplay
  el.style.transform = initialTransform

  return { x, y }
}
