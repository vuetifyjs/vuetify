/**
 * Modified from https://github.com/alamcordeiro/vue-smooth-scroll
 */

function easeInOutCubic (t) { return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1 }

export default function (target) {
  if (typeof window === 'undefined') return

  let duration = 500
  let start = Date.now()

  function step () {
    let elapsed = Date.now() - start
    let position = target
    if (elapsed < duration){
      position = window.pageYOffset + (target - window.pageYOffset) * easeInOutCubic(elapsed / duration)
      window.requestAnimationFrame(step)
    }
    window.scroll(0, position)
  }

  step()
}
