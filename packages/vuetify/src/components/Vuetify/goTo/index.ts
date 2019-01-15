import * as easingPatterns from './easing-patterns'
import {
  $,
  scroll,
  offset,
  type,
  isValidTarget,
  isValidContainer
} from './util'
import Vue from 'vue'

type GoToTarget = number | string | HTMLElement | Vue
interface GoToSettings {
  container: string | HTMLElement | Vue
  duration: number
  offset: number
  easing: string | ((t: number) => number)
  appOffset: boolean
}

export default function goTo (
  this: Vue,
  _target: GoToTarget,
  _settings: Partial<GoToSettings> = {}
): Promise<number> {
  const { bar, top } = this.$vuetify.application
  const defaults = {
    container: document.scrollingElement || document.body || document.documentElement,
    duration: 500,
    offset: 0,
    easing: 'easeInOutCubic',
    appOffset: true
  }
  const settings = {
    ...defaults,
    ..._settings
  }

  // tslint:disable-next-line:promise-must-complete
  return new Promise(resolve => {
    if (typeof window === 'undefined') throw new Error('Window is undefined.')

    if (!isValidTarget(_target)) throw new TypeError(`Target must be a Number/Selector/HTMLElement/VueComponent, received ${type(_target)} instead.`)
    if (!isValidContainer(settings.container)) throw new TypeError(`Container must be a Selector/HTMLElement/VueComponent, received ${type(settings.container)} instead.`)

    const container = $(settings.container)

    if (settings.appOffset) {
      const isDrawer = container.classList.contains('v-navigation-drawer')
      const isClipped = container.classList.contains('v-navigation-drawer--clipped')

      if (isDrawer) settings.offset += bar + (isClipped ? top : 0)
      else settings.offset += bar + top
    }

    const targetLocation = ((typeof _target === 'number') ? _target : offset($(_target))) - settings.offset
    const startLocation = container.scrollTop
    const distance = targetLocation - startLocation
    const startTime = performance.now()
    const ease = typeof settings.easing === 'function'
      ? settings.easing
      : (easingPatterns as Record<string, easingPatterns.EasingFunction>)[settings.easing]

    if (!ease) throw new TypeError(`Easing function "${settings.easing}" not found.`)

    function step (currentTime: number) {
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
