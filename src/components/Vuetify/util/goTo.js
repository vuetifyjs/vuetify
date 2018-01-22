import { consoleError } from '../../../util/console'

const defaults = {
  duration: 500,
  offset: 0,
  easing: 'easeInOutCubic'
}

const easingPatterns = {
  // linear
  linear: t => t,
  // accelerating from zero velocity
  easeInQuad: t => t * t,
  // decelerating to zero velocity
  easeOutQuad: t => t * (2 - t),
  // acceleration until halfway, then deceleration
  easeInOutQuad: t => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  // accelerating from zero velocity
  easeInCubic: t => t * t * t,
  // decelerating to zero velocity
  easeOutCubic: t => --t * t * t + 1,
  // acceleration until halfway, then deceleration
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // accelerating from zero velocity
  easeInQuart: t => t * t * t * t,
  // decelerating to zero velocity
  easeOutQuart: t => 1 - --t * t * t * t,
  // acceleration until halfway, then deceleration
  easeInOutQuart: t => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
  // accelerating from zero velocity
  easeInQuint: t => t * t * t * t * t,
  // decelerating to zero velocity
  easeOutQuint: t => 1 + --t * t * t * t * t,
  // acceleration until halfway, then deceleration
  easeInOutQuint: t => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
}

function getDocumentHeight () {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  )
}

function getTargetLocation (target, settings) {
  const documentHeight = getDocumentHeight()
  const windowHeight = window.innerHeight || (document.documentElement || document.body).clientHeight

  let location

  if (target instanceof Element) location = target.offsetTop
  else if (typeof target === 'string') location = document.querySelector(target).offsetTop
  else if (typeof target === 'number') location = target
  else location = undefined

  location += settings.offset

  return Math.round(
    documentHeight - location < windowHeight
      ? documentHeight - windowHeight
      : location
  )
}

export default function goTo (target, options) {
  if (typeof window === 'undefined') return

  const settings = Object.assign({}, defaults, options)

  const startTime = performance.now()
  const startLocation = window.pageYOffset
  const targetLocation = getTargetLocation(target, settings)
  const distanceToScroll = targetLocation - startLocation

  if (isNaN(targetLocation)) return consoleError(`Target must be a Selector/Number/DOMElement, received ${target.constructor.name} instead.`)

  function step (currentTime) {
    let progressPercentage = Math.min(1, ((currentTime - startTime) / settings.duration))
    let easeFunction = easingPatterns[settings.easing](progressPercentage)
    let targetPosition = Math.floor(startLocation + distanceToScroll * easeFunction)

    window.scrollTo(0, targetPosition)
    if (window.pageYOffset === targetLocation) return
    window.requestAnimationFrame(step)
  }

  window.requestAnimationFrame(step)
}
