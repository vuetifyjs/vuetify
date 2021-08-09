import type { PropType } from 'vue'
import { Transition } from 'vue'
import { acceleratedEasing, deceleratedEasing, defineComponent, nullifyTransforms } from '@/util'

export default defineComponent({
  name: 'VDialogTransition',

  props: {
    target: Object as PropType<HTMLElement>,
  },

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
  const targetBox = target.getBoundingClientRect()
  const elBox = nullifyTransforms(el)

  return {
    x: (targetBox.width / 2 + targetBox.left) - (elBox.width / 2 + elBox.left),
    y: (targetBox.height / 2 + targetBox.top) - (elBox.height / 2 + elBox.top),
  }
}
