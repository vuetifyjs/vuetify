import { consoleError } from '../../../util/console'

/**
 * Modified from https://github.com/alamcordeiro/vue-smooth-scroll
 */

function easeInOutCubic (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 }

export default function goTo (target, offset = 0) {
  if (typeof window === 'undefined') return

  if (offset && isNaN(offset)) {
    consoleError(`Offset must be a number, received '${typeof offset}' instead.`)
    return
  }

  let end

  if (typeof target === 'string') {
    let anchor = target.charAt(0) === '#' ? target.substring(1) : target
    let scrollTo = document.getElementById(anchor)
    if(!scrollTo) return
    end = scrollTo.getBoundingClientRect().top + window.pageYOffset
  }
  else if (typeof target === 'number') end = target
  else {
    consoleError(`Target must be a String or a Number, received '${typeof target}' instead.`)
    return
  }

  end += offset
  let duration = 500
  let start = performance.now()

  function step (now) {
    let elapsed = now - start
    let position = end
    if (elapsed < duration){
      position = window.pageYOffset + (end - window.pageYOffset) * easeInOutCubic(elapsed / duration)
      window.requestAnimationFrame(step)
    }
    window.scroll(0, position)
  }

  window.requestAnimationFrame(step)
}
