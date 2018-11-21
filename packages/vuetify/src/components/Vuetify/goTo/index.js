import * as easingPatterns from './easing-patterns'
import {
  $,
  scroll,
  offset,
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
 * @param {Boolean}                         _settings.appOffset
 */
export default function goTo (_target, _settings) {
  const { bar, top } = this.$vuetify.application
  const defaults = {
    container: document.scrollingElement || document.body || document.documentElement,
    duration: 500,
    offset: 0,
    easing: 'easeInOutCubic',
    appOffset: true
  }
  const settings = Object.assign({}, defaults, _settings)

  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return reject('Window is undefined.')

    if (!isValidTarget(_target)) throw new TypeError(`Target must be a Number/Selector/HTMLElement/VueComponent, received ${type(_target)} instead.`)
    if (!isValidContainer(settings.container)) throw new TypeError(`Container must be a Selector/HTMLElement/VueComponent, received ${type(settings.container)} instead.`)

    const container = $(settings.container)

    if (settings.appOffset) {
      const isDrawer = container.classList.contains('v-navigation-drawer')
      const isClipped = container.classList.contains('v-navigation-drawer--clipped')

      if (isDrawer) settings.offset += bar + (isClipped ? top : 0)
      else settings.offset += bar + top
    }

    const targetLocation = (isNaN(_target) ? offset($(_target)) : _target) - settings.offset
    const startLocation = container.scrollTop
    const distance = targetLocation - startLocation
    const startTime = performance.now()
    const ease = typeof settings.easing === 'function' ? settings.easing : easingPatterns[settings.easing]

    if (!ease) throw new TypeError(`Easing function "${settings.easing}" not found.`)

    function step (currentTime) {
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / settings.duration, 1)
      const stepTargetLocation = Math.floor(startLocation + distance * ease(progress))

      scroll(container, stepTargetLocation)

      if (
        targetLocation === startLocation ||
        container.clientHeight + container.scrollTop === container.scrollHeight ||
        progress === 1
      ) return resolve(targetLocation)

      window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
  })
}
