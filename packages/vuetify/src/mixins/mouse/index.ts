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
    getDefaultMouseEventHandlers (suffix: string, getData: MouseHandler, eventFirst = false): MouseEventsMap {
      const listeners = Object.keys(this.$listeners)
        .filter(key => key.endsWith(suffix))
        .reduce((acc, key) => {
          acc[key] = { event: key.slice(0, -suffix.length) }
          return acc
        }, {} as MouseEvents)

      return this.getMouseEventHandlers({
        ...listeners,
        ['contextmenu' + suffix]: { event: 'contextmenu', prevent: true, result: false },
      }, getData, eventFirst)
    },
    getMouseEventHandlers (events: MouseEvents, getData: MouseHandler, eventFirst = false): MouseEventsMap {
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
            if (e && 'touches' in e) {
              const classSeparator = ' '

              const eventTargetClasses = (e.currentTarget as HTMLElement)?.className.split(classSeparator)
              const currentTargets = document.elementsFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY)

              // Get "the same kind" current hovering target by checking
              // If element has the same class of initial touch start element (which has touch event listener registered)
              const currentTarget = currentTargets.find(t => t.className.split(classSeparator).some(c => eventTargetClasses.includes(c)))

              if (currentTarget &&
                !(e.target as HTMLElement)?.isSameNode(currentTarget)
              ) {
                currentTarget.dispatchEvent(new TouchEvent(e.type, {
                  changedTouches: e.changedTouches as unknown as Touch[],
                  targetTouches: e.targetTouches as unknown as Touch[],
                  touches: e.touches as unknown as Touch[],
                }))
                return
              }
            }

            // TODO: VCalendar emits the calendar event as the first argument,
            // but it really should be the native event instead so modifiers can be used
            if (eventFirst) {
              this.$emit(event, e, getData(e))
            } else {
              this.$emit(event, getData(e), e)
            }
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
