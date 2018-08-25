import * as easingPatterns from './easing-patterns'
import {
  $,
  scroll,
  offset,
  height,
  type,
  isValidTarget,
  isValidContainer
} from './util'

/**
 * @param {Number|String|HTMLElement|VueComponent} _target
 * @param {Object}                                 _settings - Optional
 * ---
 * @param {String|HTMLElement|VueComponent} _settings.container
 * @param {Number}                          _settings.duration
 * @param {Number}                          _settings.offset
 * @param {String|Function}                 _settings.easing
 */
export default function goTo (_target, _settings) {
  const defaults = {
    container: document.scrollingElement || document.body || document.documentElement,
    duration: 500,
    offset: 0,
    easing: 'easeInOutCubic'
  }

  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject('Window is undefined.')

    const settings = Object.assign({}, defaults, _settings)

    if (!isValidTarget(_target)) throw new TypeError(`Target must be a Number/Selector/HTMLElement/VueComponent, received ${type(_target)} instead.`)
    if (!isValidContainer(settings.container)) throw new TypeError(`Container must be a Selector/HTMLElement/VueComponent, received ${type(settings.container)} instead.`)

    const container = $(settings.container)
    const target = (isNaN(_target) ? offset($(_target)) : _target) - settings.offset
    const targetOffset = Math.round(
      Math.min(
        Math.max(target, 0),
        height(container)
      )
    )
    const startLocation = container.scrollTop
    const distance = targetOffset - startLocation
    const ease = typeof settings.easing === 'function' ? settings.easing : easingPatterns[settings.easing]

    if (!ease) throw new TypeError(`Easing function '${settings.easing}' not found.`)

    let startTime
    let timeElapsed
    let progress

    function step (now) {
      if (!startTime) startTime = now

      timeElapsed = now - startTime

      progress = Math.min(timeElapsed / settings.duration, 1)
      progress = ease(progress)

      scroll(container, startLocation + distance * progress)

      if (progress === 1) return resolve(target)

      window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
  })
}
