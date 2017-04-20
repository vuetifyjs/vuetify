export default {
  methods: {
    genBody () {
      const children = [this.genHand(this.selectingHour ? 'hour' : 'minute')]

      this.selectingHour &&
        children.push(this.genHours()) ||
        children.push(this.genMinutes())

      return this.$createElement('div', {
        'class': 'picker__body'
      }, [
        this.$createElement('v-fade-transition', {
          props: { mode: 'out-in' }
        }, [
          this.$createElement('div', {
            'class': 'picker--time__clock',
            on: {
              mousedown: this.onMouseDown,
              mouseup: this.onMouseUp,
              mouseleave: () => {
                this.isDragging && this.onMouseUp()
              },
              mousemove: this.onDragMove,
              touchstart: this.onMouseDown,
              touchstop: this.onMouseUp,
              touchmove: this.onDragMove,
              wheel: e => {
                e.preventDefault()

                const diff = e.wheelDelta > 0 ? 1 : -1
                const changing = this.selectingHour ? 'changeHour' : 'changeMinute'

                this[changing](diff)
              }
            },
            key: this.selectingHour ? 'hour' : 'minute',
            ref: 'clock'
          }, children)
        ])
      ])
    },
    genHand (type) {
      return [this.$createElement('div', {
        'class': `picker--time__clock-hand ${type}`,
        style: {
          transform: `rotate(${this.clockHand}deg)`
        }
      })]
    },
    genHours () {
      let hours = this.is24hr ? 24 : 12
      const children = []
      let start = 0

      if (hours === 12) {
        hours++
        start = 1
      }

      for (let i = start; i < hours; i++) {
        children.push(this.$createElement('span', {
          'class': {
            'active': i === this.hour
          },
          style: this.getTransform(i),
          domProps: { innerHTML: `<span>${i}</span>` }
        }))
      }

      return children
    },
    genMinutes () {
      const children = []

      for (let i = 0; i < 60; i = i + 5) {
        let num = i

        if (num < 10) num = `0${num}`
        if (num === 60) num = '00'

        children.push(this.$createElement('span', {
          'class': {
            'active': num.toString() === this.minute.toString()
          },
          style: this.getTransform(i),
          domProps: { innerHTML: `<span>${num}</span>` }
        }))
      }

      return children
    },
    getTransform (i) {
      const { x, y } = this.getPosition(i)

      return { transform: `translate(${x}px, ${y}px)` }
    },
    getPosition (i) {
      return {
        x: Math.round(Math.sin(i * this.degrees) * this.radius * 0.86),
        y: Math.round(-Math.cos(i * this.degrees) * this.radius * 0.86)
      }
    },
    changeHour (time) {
      if (!this.is24hr) {
        this.hour = time < 0 && this.hour === 1
          ? 12 : time > 0 && this.hour === 12
          ? 1 : this.hour + time
      } else {
        this.hour = time < 0 && this.hour === 0
          ? 23 : time > 0 && this.hour === 23
          ? 0 : this.hour + time
      }

      return true
    },
    changeMinute (time) {
      const current = Number(this.minute)

      const minute = time < 0 && current === 0
        ? 59 : time > 0 && current === 59
        ? 0 : current + time

      this.minute = minute < 10 ? `0${minute}` : minute

      return true
    },
    onMouseDown (e) {
      e.preventDefault()

      this.isDragging = true
      this.onDragMove(e)
    },
    onMouseUp () {
      this.isDragging = false
      !this.selectingHour && !this.actions && this.save()
      this.selectingHour = false
    },
    onDragMove (e) {
      if (!this.isDragging && e.type !== 'click') return

      const rect = this.$refs.clock.getBoundingClientRect()
      const center = { x: rect.width / 2, y: 0 - rect.width / 2 }
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
      const coords = {
        y: rect.top - clientY,
        x: clientX - rect.left
      }

      const selecting = this.selectingHour ? 'hour' : 'minute'
      this[selecting] = Math.round(this.angle(center, coords) / this.degreesPerUnit)
    },
    angle (center, p1) {
      var p0 = {
        x: center.x,
        y: center.y + Math.sqrt(
          Math.abs(p1.x - center.x) * Math.abs(p1.x - center.x) +
          Math.abs(p1.y - center.y) * Math.abs(p1.y - center.y))
      }
      return Math.abs((2 * Math.atan2(p1.y - p0.y, p1.x - p0.x)) * 180 / Math.PI);
    }
  }
}
