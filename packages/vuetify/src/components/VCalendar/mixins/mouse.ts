import Vue from 'vue'

export type MouseHandler = (e: MouseEvent | TouchEvent) => any

export type MouseEvents = {
  [event: string]: {
    event: string
    passive?: boolean
    capture?: boolean
    once?: boolean
    stop?: boolean
    prevent?: boolean
    button?: number
    result?: any
  }
}

export type MouseEventsMap = {
  [event: string]: MouseHandler | MouseHandler[]
}

export default Vue.extend({
  name: 'mouse',

  methods: {
    getDefaultMouseEventHandlers (suffix: string, getEvent: MouseHandler): MouseEventsMap {
      return this.getMouseEventHandlers({
        ['click' + suffix]: { event: 'click' },
        ['contextmenu' + suffix]: { event: 'contextmenu', prevent: true, result: false },
        ['mousedown' + suffix]: { event: 'mousedown' },
        ['mousemove' + suffix]: { event: 'mousemove' },
        ['mouseup' + suffix]: { event: 'mouseup' },
        ['mouseenter' + suffix]: { event: 'mouseenter' },
        ['mouseleave' + suffix]: { event: 'mouseleave' },
        ['touchstart' + suffix]: { event: 'touchstart' },
        ['touchmove' + suffix]: { event: 'touchmove' },
        ['touchend' + suffix]: { event: 'touchend' },
      }, getEvent)
    },
    getMouseEventHandlers (events: MouseEvents, getEvent: MouseHandler): MouseEventsMap {
      const on: MouseEventsMap = {}

      for (const event in events) {
        const eventOptions = events[event]

        if (!this.$listeners[event]) continue

        // TODO somehow pull in modifiers

        const prefix = eventOptions.passive ? '&' : ((eventOptions.once ? '~' : '') + (eventOptions.capture ? '!' : ''))
        const key = prefix + eventOptions.event

        const handler: MouseHandler = e => {
          const mouseEvent: MouseEvent = e as MouseEvent
          if (eventOptions.button === undefined || (mouseEvent.buttons > 0 && mouseEvent.button === eventOptions.button)) {
            if (eventOptions.prevent) {
              e.preventDefault()
            }
            if (eventOptions.stop) {
              e.stopPropagation()
            }

            // Due to TouchEvent target always returns the element that is first placed
            // Even if touch point has since moved outside the interactive area of that element
            // Ref: https://developer.mozilla.org/en-US/docs/Web/API/Touch/target
            // This block of code aims to make sure touchEvent is always dispatched from the element that is being pointed at
            if (e instanceof TouchEvent) {
              const currentTarget = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY)

              if (currentTarget &&
                !(e.target as HTMLElement)?.isSameNode(currentTarget) &&
                (e.target as HTMLElement)?.className === currentTarget.className
              ) {
                currentTarget.dispatchEvent(new TouchEvent(e.type, {
                  changedTouches: e.changedTouches as unknown as Touch[],
                  targetTouches: e.targetTouches as unknown as Touch[],
                  touches: e.touches as unknown as Touch[],
                }))
                return
              }
            }

            this.$emit(event, getEvent(e))
          }

          return eventOptions.result
        }

        if (key in on) {
          /* istanbul ignore next */
          if (Array.isArray(on[key])) {
            (on[key] as MouseHandler[]).push(handler)
          } else {
            on[key] = [on[key], handler] as MouseHandler[]
          }
        } else {
          on[key] = handler
        }
      }

      return on
    },
  },
})
