import { consoleError } from '../../../util/console'
import * as easingPatterns from '../../../util/easing-patterns'

const defaults = {
  duration: 500,
  offset: 0,
  easing: 'easeInOutCubic'
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
  else if (target && target.constructor && target.constructor.name === 'VueComponent') location = target.$el.offsetTop
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
  const easingFunction = typeof settings.easing === 'function' ? settings.easing : easingPatterns[settings.easing]

  if (isNaN(targetLocation)) {
    const type = target && target.constructor ? target.constructor.name : target
    return consoleError(`Target must be a Selector/Number/DOMElement/VueComponent, received ${type} instead.`)
  }
  if (!easingFunction) return consoleError(`Easing function '${settings.easing}' not found.`)

  function step (currentTime) {
    let progressPercentage = Math.min(1, ((currentTime - startTime) / settings.duration))
    let targetPosition = Math.floor(startLocation + distanceToScroll * easingFunction(progressPercentage))

    window.scrollTo(0, targetPosition)
    if (Math.round(window.pageYOffset) === targetLocation) return
    window.requestAnimationFrame(step)
  }

  window.requestAnimationFrame(step)
}
