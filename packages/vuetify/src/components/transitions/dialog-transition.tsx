import type { PropType } from 'vue'
import { defineComponent, Transition } from 'vue'
import { makeProps } from '@/util'

export default defineComponent({
  name: 'VDialogTransition',

  props: makeProps({
    target: Element as PropType<Element>,
  }),

  setup (props, { slots }) {
    const functions = {
      // enter
      onEnter: show.bind(undefined, props),
      onAfterEnter: cleanup.bind(undefined, props),
      onEnterCancelled: cleanup.bind(undefined, props),
      // leave
      onLeave: hide.bind(undefined, props),
      onAfterLeave: cleanup.bind(undefined, props),
      onLeaveCancelled: cleanup.bind(undefined, props),
    }

    return () => (
      <Transition name="dialog-transition" { ...functions } v-slots={ slots } />
    )
  },
})

function getDimensions (props, el) {
  const initialDisplay = el.style.display
  const initialTransform = el.style.transform

  el.style.display = ''
  el.style.transform = 'none'

  const targetBox = props.target!.getBoundingClientRect()
  const elBox = el.getBoundingClientRect()
  const x = (targetBox.width / 2 + targetBox.left) - (elBox.width / 2 + elBox.left)
  const y = (targetBox.height / 2 + targetBox.top) - (elBox.height / 2 + elBox.top)
  el.style.display = initialDisplay
  el.style.transform = initialTransform

  return { x, y }
}

function show (props, el) {
  el.style.transition = 'none'

  window.requestAnimationFrame(() => {
    const { x, y } = getDimensions(props, el)
    el.style.transform = `scale(0.5) translate(${x / 0.5}px, ${y / 0.5}px)`
    void el.offsetHeight
    el.style.transition = ''
    el.style.transform = ''
  })
}

function hide (props, el) {
  const { x, y } = getDimensions(props, el)

  el.style.transform = `scale(0.5) translate(${x / 0.5}px, ${y / 0.5}px)`
}

function cleanup (props, el) {
  el.style.transform = ''
}
