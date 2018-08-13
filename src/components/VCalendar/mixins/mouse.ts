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
        ['touchend' + suffix]: { event: 'touchend' }
      }, getEvent)
    },
    getMouseEventHandlers (events: MouseEvents, getEvent: MouseHandler): MouseEventsMap {
      let on: MouseEventsMap = {}

      for (let event in events) {
        let eventOptions = events[event]

        if (!this.$listeners[event]) {
          continue
        }

        // TODO somehow pull in modifiers

        let prefix = eventOptions.passive ? '&' : ((eventOptions.once ? '~' : '') + (eventOptions.capture ? '!' : ''))
        let key = prefix + eventOptions.event

        let handler: MouseHandler = e => {
          let mouseEvent: MouseEvent = e as MouseEvent
          if (eventOptions.button === undefined || (mouseEvent.buttons > 0 && mouseEvent.button === eventOptions.button)) {
            if (eventOptions.prevent) {
              e.preventDefault()
            }
            if (eventOptions.stop) {
              e.stopPropagation()
            }
            this.$emit(event, getEvent(e))
          }

          return eventOptions.result
        }

        if (key in on) {
          if (on[key] instanceof Array) {
            (on[key] as MouseHandler[]).push(handler)
          } else {
            on[key] = [on[key], handler] as MouseHandler[]
          }
        } else {
          on[key] = handler
        }
      }

      return on
    }
  }
})
