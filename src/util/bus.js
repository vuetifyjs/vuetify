import EventEmitter from 'events'

class Bus extends EventEmitter {
  constructor () {
    super()
    this.setMaxListeners(50)
  }

  sub (event, cb) {
    const type = typeof event
    if (type === 'object' || type === 'array') {
      event.forEach(i => this.on(...i))
    } else {
      this.on(event, cb)
    }
  }

  unsub (event, cb) {
    const type = typeof event
    if (type === 'object' || type === 'array') {
      event.forEach(i => this.removeListener(...i))
    } else {
      this.removeListener(event, cb)
    }
  }

  pub () {
    this.emit(...arguments)
  }
}

export default new Bus()