import { consoleError } from '../../../util/console'

/**
 * Modified from https://github.com/alamcordeiro/vue-smooth-scroll
 */

function easeInOutCubic (t) { return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 }

export default function goTo (target, offset = 0, duration = 500) {
  if (typeof window === 'undefined') return

  if (offset && isNaN(offset)) {
    consoleError(`Offset must be a Number, received ${offset.constructor.name} instead.`)
    return
  }
  if (duration && isNaN(duration)) {
    consoleError(`Duration must be a Number, received ${duration.constructor.name} instead.`)
    return
  }

  let end

  if (target instanceof Element) {
    end = target.getBoundingClientRect().top + window.pageYOffset
  } else if (typeof target === 'string') {
    end = document.querySelector(target).getBoundingClientRect().top + window.pageYOffset
  } else if (typeof target === 'number') {
    end = target
  } else {
    consoleError(`Target must be a String/Number/DOMElement, received ${target.constructor.name} instead.`)
    return
  }

  end += offset
  let start = performance.now()

  function step (now) {
    let elapsed = now - start
    let position = end
    if (elapsed < duration) {
      position = window.pageYOffset + (end - window.pageYOffset) * easeInOutCubic(elapsed / duration)
      window.requestAnimationFrame(step)
    }
    window.scroll(0, position)
  }

  window.requestAnimationFrame(step)
}
