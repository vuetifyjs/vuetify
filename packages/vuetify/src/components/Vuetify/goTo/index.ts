import * as easingPatterns from './easing-patterns'
import {
  getContainer,
  getOffset
} from './util'
import Vue from 'vue'

type GoToTarget = number | string | HTMLElement | Vue
interface GoToSettings {
  container: string | HTMLElement | Vue
  duration: number
  offset: number
  easing: string | easingPatterns.EasingFunction
  appOffset: boolean
}

export default function goTo (_target: GoToTarget, _settings: Partial<GoToSettings> = {}): Promise<number> {
  const settings: GoToSettings = {
    container: (document.scrollingElement as HTMLElement | null) || document.body || document.documentElement,
    duration: 500,
    offset: 0,
    easing: 'easeInOutCubic',
    appOffset: true,
    ..._settings
  }
  const container = getContainer(settings.container)

  if (settings.appOffset) {
    const isDrawer = container.classList.contains('v-navigation-drawer')
    const isClipped = container.classList.contains('v-navigation-drawer--clipped')

    settings.offset += Vue.prototype.$vuetify.application.bar
    if (!isDrawer || isClipped) settings.offset += Vue.prototype.$vuetify.application.top
  }

  const startTime = performance.now()
  const targetLocation = getOffset(_target) - settings.offset
  const startLocation = container.scrollTop
  if (targetLocation === startLocation) return Promise.resolve(targetLocation)

  const ease = typeof settings.easing === 'function'
    ? settings.easing
    : (easingPatterns as Dictionary<easingPatterns.EasingFunction>)[settings.easing]
  if (!ease) throw new TypeError(`Easing function "${settings.easing}" not found.`)

  // tslint:disable-next-line:promise-must-complete
  return new Promise(resolve => requestAnimationFrame(function step (currentTime: number) {
    const timeElapsed = currentTime - startTime
    const progress = Math.abs(settings.duration ? Math.min(timeElapsed / settings.duration, 1) : 1)

    container.scrollTop = Math.floor(startLocation + (targetLocation - startLocation) * ease(progress))

    const clientHeight = container === document.body ? document.documentElement.clientHeight : container.clientHeight
    if (progress === 1 || clientHeight + container.scrollTop === container.scrollHeight) {
      return resolve(targetLocation)
    }

    requestAnimationFrame(step)
  }))
}
