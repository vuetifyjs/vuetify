import { defineComponent, Transition } from 'vue'
import type { PropType } from 'vue'
import {
  acceleratedEasing,
  deceleratedEasing,
  makeProps,
  standardEasing,
} from '@/util'

export default defineComponent({
  name: 'VContainerTransformTransition',

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
      <Transition name="container-transform-transition" { ...functions } v-slots={ slots } />
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

  el.style.display = initialDisplay
  el.style.transform = initialTransform

  return { targetBox, elBox }
}

function generateKeyframes (): Keyframe[] {
  //
}

function show (props, el) {
  // el.style.transition = 'none'

  // const x = (targetBox.width / 2 + targetBox.left) - (elBox.width / 2 + elBox.left)
  // const y = (targetBox.height / 2 + targetBox.top) - (elBox.height / 2 + elBox.top)

  const { targetBox, elBox } = getDimensions(props, el)
  const targetEnd = {
    x: (elBox.width / 2 + elBox.left) - (targetBox.width / 2 + targetBox.left),
    y: (elBox.height / 2 + elBox.top) - (targetBox.height / 2 + targetBox.top),
    scaleX: elBox.width / targetBox.width,
    scaleY: elBox.height / targetBox.height,
  }

  const elStart = {
    x: (targetBox.width / 2 + targetBox.left) - (elBox.width / 2 + elBox.left),
    y: (targetBox.height / 2 + targetBox.top) - (elBox.height / 2 + elBox.top),
    scaleX: targetBox.width / elBox.width,
    scaleY: targetBox.height / elBox.height,
  }

  const { backgroundColor, borderRadius } = window.getComputedStyle(props.target!)

  // const { x, y, width, height } = el.getBoundingClientRect()
  // const { backgroundColor, borderRadius } = window.getComputedStyle(el)

  const backgroundProxy = document.createElement('div')
  backgroundProxy.style.position = 'absolute'
  backgroundProxy.style.top = '0'
  backgroundProxy.style.bottom = '0'
  backgroundProxy.style.left = '0'
  backgroundProxy.style.right = '0'
  backgroundProxy.style.backgroundColor = backgroundColor
  el.appendChild(backgroundProxy)

  const initialTransform = el.style.transform
  el.style.transition = 'none'
  el.style.transform = `translate(${elStart.x}px, ${elStart.y}px) scale(${elStart.scaleX}, ${elStart.scaleY})`

  const length = Math.round(350 / 16.67)
  const frames = Array.from({ length: length + 1 }, (_, i) => {
    return standardEasing(i / length)
  })

  Promise.all([
    props.target!.animate([{}, { opacity: 0 }], { duration: 50, fill: 'forwards' }).finished,
    el.animate([{ opacity: 0 }, {}], { duration: 50 }).finished,
  ]).then(() => {
    el.style.transform = initialTransform

    el.animate([
      {
        transform: `translate(${elStart.x}px, ${elStart.y}px) scale(${elStart.scaleX}, ${elStart.scaleY})`,
        borderRadius: Math.min(parseFloat(borderRadius), targetBox.width / 2, targetBox.height / 2) + 'px',
      },
      { transform: '' },
    ], {
      duration: 350,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    })

    backgroundProxy.animate({
      opacity: [1, 0],
    }, {
      duration: 350,
      easing: 'cubic-bezier(0.0, 0, 0.2, 1)',
    }).finished.then(() => backgroundProxy.remove())
  })

  // props.target!.animate([
  //   { transform: '' },
  //   { transform: `translate(${targetEnd.x}px, ${targetEnd.y}px) scale(${targetEnd.scaleX}, ${targetEnd.scaleY})` },
  // ], {
  //   duration: 300,
  //   easing: 'cubic-bezier(0.0, 0, 0.2, 1)',
  // })

  // el.animate([
  //   { transform: `translate(${elStart.x}px, ${elStart.y}px) scale(${elStart.scaleX}, ${elStart.scaleY})` },
  //   { transform: '' },
  // ], {
  //   duration: 300,
  //   easing: 'cubic-bezier(0.0, 0, 0.2, 1)',
  // })
}

function hide (props, el) {
  // const { x, y } = getDimensions(props, el)
  //
  // el.style.transform = `scale(0.5) translate(${x / 0.5}px, ${y / 0.5}px)`
}

function cleanup (props, el) {
  // el.style.transform = ''
}
