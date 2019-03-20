// Extensions
import { Service } from '../service'

// Mixins
import Stackable from '../../mixins/stackable'

// Utilities
import { keyCodes } from '../../util/helpers'

// Types
import { VuetifyStackOptions } from 'vuetify/types/services/stack'

type StackableInstance = InstanceType<typeof Stackable>

export class Stack extends Service {
  static property = 'stack'

  public items: StackableInstance[] = []

  constructor (options: Partial<VuetifyStackOptions> = {}) {
    super()
  }

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

    this.items.push(node)
    this.updateValues()
  }

  public unregister (node: StackableInstance) {
    node.activeZIndex = 0
    this.items = this.items.filter(item => item !== node)
    this.updateValues()

    if (this.items.length === 0) {
      this.startScroll()
    }
  }

  public updateValues () {
    let isFullscreen = false

    this.items.forEach((item, i) => {
      if (item.fullscreen) isFullscreen = true

      item.activeZIndex = this.getZIndex(i, item.stackMinZIndex)
    })

    const method = isFullscreen ? 'add' : 'remove'

    document.documentElement.classList[method]('overflow-y-hidden')
  }

  private getZIndex (index: number, minZIndex: number) {
    return (
      (index * 2) +
      minZIndex
    )
  }

  private stopScroll () {
    if (this.framework.breakpoint.smAndDown) {
      document.documentElement!.classList.add('overflow-y-hidden')
    } else {
      // window.onwheel = this.scrollListener.bind(this)
      // window.onkeydown = this.scrollListener.bind(this)
      window.addEventListener('wheel', Stack.scrollListener as EventHandlerNonNull, { passive: false })
      window.addEventListener('keydown', Stack.scrollListener as EventHandlerNonNull)
    }
  }

  private startScroll () {
    document.documentElement!.classList.remove('overflow-y-hidden')
    window.onwheel = null
    window.onkeydown = null
    window.removeEventListener('wheel', Stack.scrollListener as EventHandlerNonNull)
    window.removeEventListener('keydown', Stack.scrollListener as EventHandlerNonNull)
  }
}
