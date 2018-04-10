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

function getWindowHeight () {
  return window.innerHeight ||
    (document.documentElement || document.body).clientHeight
}

function isVueComponent (obj) {
  return obj != null && obj._isVue
}

function getTargetLocation (target, settings) {
  let location

  if (isVueComponent(target)) {
    target = target.$el
  }

  if (target instanceof Element) {
    location = target.getBoundingClientRect().top + window.scrollY
  } else if (typeof target === 'string') {
    location = document.querySelector(target).offsetTop
  } else if (typeof target === 'number') {
    location = target
  } else {
    return undefined
  }

  return Math.round(
    Math.min(
      Math.max(location + settings.offset, 0),
      getDocumentHeight() - getWindowHeight()
    )
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
    const type = target == null ? target : target.constructor.name
    return consoleError(`Target must be a Selector/Number/DOMElement/VueComponent, received ${type} instead.`)
  }
  if (!easingFunction) return consoleError(`Easing function '${settings.easing}' not found.`)

  function step (currentTime) {
    let progressPercentage = Math.min(1, ((currentTime - startTime) / settings.duration))
    let targetPosition = Math.floor(startLocation + distanceToScroll * easingFunction(progressPercentage))

    window.scrollTo(0, targetPosition)

    if (
      Math.round(window.pageYOffset) === targetLocation ||
      progressPercentage === 1
    ) return

    window.requestAnimationFrame(step)
  }

  window.requestAnimationFrame(step)
}
