import Vue from 'vue'

class Bus {
  constructor() {
    this.bus = new Vue()
  }

  sub (event, cb) {
    if (typeof event === 'object') {
      event.forEach(i => this.bus.$on(...i))
    } else {
      this.bus.$on(event, cb)
    }
  }

  unsub (event, cb) {
    if (typeof event === 'object') {
      event.forEach(i => this.bus.$off(...i))
    } else {
      this.bus.$off(event, cb)
    }
  }

  pub () {
    this.bus.$emit(...arguments)
  }
}

export default new Bus()