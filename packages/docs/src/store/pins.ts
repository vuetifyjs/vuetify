import { defineStore } from 'pinia'

export type Pin = {
  category: string
  title: string
  to: string
}

interface State {
  pins: Pin[]
}

export const usePinsStore = defineStore('pins', {
  state: (): State => ({
    pins: [],
  }),
  actions: {
    toggle (value: boolean, pin: Pin) {
      if (value) {
        this.pins.push(pin)
      } else {
        this.pins = this.pins.filter(p => p.to !== pin.to)
      }

      this.save()
    },
    load () {
      this.pins = JSON.parse(localStorage.getItem('pins') || '[]')
    },
    save () {
      localStorage.setItem('pins', JSON.stringify(this.pins))
    },
  },
})
