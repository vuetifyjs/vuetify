// Extensions
import { Service } from '../service'

// Utilities
import { keyCodes } from '../../util/helpers'

// Types
import {
  StackableInstance,
  VuetifyStackOptions
} from 'vuetify/types/services/stack'

export class Stack extends Service {
  static property = 'stack'

  public items: StackableInstance[] = []

  private minZIndex: number

  constructor (options: Partial<VuetifyStackOptions> = {}) {
    super()

    this.minZIndex = options.minZIndex || 200
  }

  /** Check if a given element has a scrollbar */
  public static hasScrollbar (el?: Element) {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return false

    const style = window.getComputedStyle(el)
    return ['auto', 'scroll'].includes(style.overflowY!) && el.scrollHeight > el.clientHeight
  }

  public static shouldScroll (el: Element, delta: number) {
    if (el.scrollTop === 0 && delta < 0) return true
    return el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0
  }

  public static checkPath (e: WheelEvent) {
    const path = (e as any).path || Stack.composedPath(e)
    const delta = e.deltaY

    for (let index = 0; index < path.length; index++) {
      const el = path[index]

      if (el === document) return true
      if (el === document.documentElement) return true

      if (Stack.hasScrollbar(el as Element)) return Stack.shouldScroll(el as Element, delta)
    }

    return true
  }

  public static composedPath (e: WheelEvent): EventTarget[] {
    if (e.composedPath) return e.composedPath()

    const path = []
    let el = e.target as Element

    while (el) {
      path.push(el)

      if (el.tagName === 'HTML') {
        path.push(document)
        path.push(window)

        return path
      }

      el = el.parentElement!
    }
    return path
  }

  /** Check if element is inside designated parent */
  public static isInside (el: Element, parent: Element): boolean {
    if (el === parent) {
      return true
    } else if (el === null || el === document.body) {
      return false
    } else {
      return Stack.isInside(el.parentNode as Element, parent)
    }
  }

  public static scrollListener (e: WheelEvent & KeyboardEvent) {
    if (e.type === 'keydown') {
      if (
        ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as Element).tagName) ||
        // https://github.com/vuetifyjs/vuetify/issues/4715
        (e.target as HTMLElement).isContentEditable
      ) return

      const up = [keyCodes.up, keyCodes.pageup]
      const down = [keyCodes.down, keyCodes.pagedown]

      if (up.includes(e.keyCode)) {
        (e as any).deltaY = -1
      } else if (down.includes(e.keyCode)) {
        (e as any).deltaY = 1
      } else {
        return
      }
    }

    if (
      (e.type !== 'keydown' && e.target === document.body) ||
      Stack.checkPath(e)
    ) e.preventDefault()
  }

  public register (node: StackableInstance) {
    if (this.items.length === 0) {
      this.stopScroll()
    }

    node.activeZIndex = this.getZIndex(this.items.push(node), node.stackMinZIndex)
    this.checkFullscreen()
  }

  public unregister (node: StackableInstance) {
    this.items = this.items.filter(item => item !== node)

    if (this.items.length === 0) {
      this.startScroll()
    }

    this.checkFullscreen()
  }

  // https://github.com/vuetifyjs/vuetify/issues/3101
  public checkFullscreen () {
    const isFullscreen = this.items.some(item => item.fullscreen)
    const method = isFullscreen ? 'add' : 'remove'

    document.documentElement.classList[method]('overflow-y-hidden')
  }

  private getZIndex (index: number, minZIndex: number) {
    return (
      (index * 2) +
      Math.max(minZIndex, this.minZIndex)
    )
  }

  private stopScroll () {
    if (this.framework.breakpoint.smAndDown) {
      document.documentElement!.classList.add('overflow-y-hidden')
    } else {
      window.addEventListener('wheel', Stack.scrollListener as EventHandlerNonNull, { passive: false })
      window.addEventListener('keydown', Stack.scrollListener as EventHandlerNonNull)
    }
  }

  private startScroll () {
    document.documentElement!.classList.remove('overflow-y-hidden')
    window.removeEventListener('wheel', Stack.scrollListener as EventHandlerNonNull)
    window.removeEventListener('keydown', Stack.scrollListener as EventHandlerNonNull)
  }
}
