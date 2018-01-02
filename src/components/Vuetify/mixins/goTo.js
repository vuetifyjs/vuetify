/**
 * Modified from https://github.com/alamcordeiro/vue-smooth-scroll
 */

function easeInOutCubic (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 }

export default function goTo (target) {
  if (typeof window === 'undefined') return

  let duration = 500
  let start = performance.now()

  function step (now) {
    let elapsed = now - start
    let position = target
    if (elapsed < duration){
      position = window.pageYOffset + (target - window.pageYOffset) * easeInOutCubic(elapsed / duration)
      window.requestAnimationFrame(step)
    }
    window.scroll(0, position)
  }

  window.requestAnimationFrame(step)
}
