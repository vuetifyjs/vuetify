// Utilities
import { Transition } from 'vue'
import {
  acceleratedEasing,
  animate,
  deceleratedEasing,
  genericComponent,
  nullifyTransforms,
  propsFactory,
  standardEasing,
} from '@/util'

// Types
import type { PropType } from 'vue'

export const makeVDialogTransitionProps = propsFactory({
  target: Object as PropType<HTMLElement>,
}, 'v-dialog-transition')

export const VDialogTransition = genericComponent()({
  name: 'VDialogTransition',

  props: makeVDialogTransitionProps(),

  setup (props, { slots }) {
    const functions = {
      onBeforeEnter (el: Element) {
        (el as HTMLElement).style.pointerEvents = 'none'
        ;(el as HTMLElement).style.visibility = 'hidden'
      },
      async onEnter (el: Element, done: () => void) {
        await new Promise(resolve => requestAnimationFrame(resolve))
        await new Promise(resolve => requestAnimationFrame(resolve))
        ;(el as HTMLElement).style.visibility = ''

        const { x, y, sx, sy, speed } = getDimensions(props.target!, el as HTMLElement)

        const animation = animate(el, [
          { transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`, opacity: 0 },
          {},
        ], {
          duration: 225 * speed,
          easing: deceleratedEasing,
        })
        getChildren(el)?.forEach(el => {
          animate(el, [
            { opacity: 0 },
            { opacity: 0, offset: 0.33 },
            {},
          ], {
            duration: 225 * 2 * speed,
            easing: standardEasing,
          })
        })
        animation.finished.then(() => done())
      },
      onAfterEnter (el: Element) {
        (el as HTMLElement).style.removeProperty('pointer-events')
      },
      onBeforeLeave (el: Element) {
        (el as HTMLElement).style.pointerEvents = 'none'
      },
      async onLeave (el: Element, done: () => void) {
        await new Promise(resolve => requestAnimationFrame(resolve))

        const { x, y, sx, sy, speed } = getDimensions(props.target!, el as HTMLElement)

        const animation = animate(el, [
          {},
          { transform: `translate(${x}px, ${y}px) scale(${sx}, ${sy})`, opacity: 0 },
        ], {
          duration: 125 * speed,
          easing: acceleratedEasing,
        })
        animation.finished.then(() => done())
        getChildren(el)?.forEach(el => {
          animate(el, [
            {},
            { opacity: 0, offset: 0.2 },
            { opacity: 0 },
          ], {
            duration: 125 * 2 * speed,
            easing: standardEasing,
          })
        })
      },
      onAfterLeave (el: Element) {
        (el as HTMLElement).style.removeProperty('pointer-events')
      },
    }

    return () => {
      return props.target
        ? (
          <Transition
            name="dialog-transition"
            { ...functions }
            css={ false }
            v-slots={ slots }
          />
        )
        : <Transition name="dialog-transition" v-slots={ slots } />
    }
  },
})

/** Animatable children (card, sheet, list) */
function getChildren (el: Element) {
  const els = el.querySelector(':scope > .v-card, :scope > .v-sheet, :scope > .v-list')?.children
  return els && [...els]
}

function getDimensions (target: HTMLElement, el: HTMLElement) {
  const targetBox = target.getBoundingClientRect()
  const elBox = nullifyTransforms(el)
  const [originX, originY] = getComputedStyle(el).transformOrigin.split(' ').map(v => parseFloat(v))

  const [anchorSide, anchorOffset] = getComputedStyle(el).getPropertyValue('--v-overlay-anchor-origin').split(' ')

  let offsetX = targetBox.left + targetBox.width / 2
  if (anchorSide === 'left' || anchorOffset === 'left') {
    offsetX -= targetBox.width / 2
  } else if (anchorSide === 'right' || anchorOffset === 'right') {
    offsetX += targetBox.width / 2
  }

  let offsetY = targetBox.top + targetBox.height / 2
  if (anchorSide === 'top' || anchorOffset === 'top') {
    offsetY -= targetBox.height / 2
  } else if (anchorSide === 'bottom' || anchorOffset === 'bottom') {
    offsetY += targetBox.height / 2
  }

  const tsx = targetBox.width / elBox.width
  const tsy = targetBox.height / elBox.height
  const maxs = Math.max(1, tsx, tsy)
  const sx = tsx / maxs || 0
  const sy = tsy / maxs || 0

  // Animate elements larger than 12% of the screen area up to 1.5x slower
  const asa = (elBox.width * elBox.height) / (window.innerWidth * window.innerHeight)
  const speed = asa > 0.12
    ? Math.min(1.5, (asa - 0.12) * 10 + 1)
    : 1

  return {
    x: offsetX - (originX + elBox.left),
    y: offsetY - (originY + elBox.top),
    sx,
    sy,
    speed,
  }
}

export type VDialogTransition = InstanceType<typeof VDialogTransition>
