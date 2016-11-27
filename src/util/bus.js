import EventEmitter from 'events'

class Bus extends EventEmitter {
  constructor () {
    super()
    this.setMaxListeners(500)
  }

  sub (event, cb) {
    const type = typeof event
    
    if (type !== 'object' && type !== 'array') {
      return this.on(event, cb)
    }

    event.forEach(i => this.on.apply(null, i))
  }

  unsub (event, cb) {
    const type = typeof event

    if (type !== 'object' && type !== 'array') {
      return this.removeListener(event, cb)
    }
    
    event.forEach(i => this.removeListener.apply(null, i))
  }

  pub () {
    this.emit.apply(null, arguments)
  }
}

export default new Bus()