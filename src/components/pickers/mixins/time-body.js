export default {
  methods: {
    genBody () {
      const hours = this.format === 'ampm' ? 12 : 24
      const children = [this.genHand(this.selectingHour ? 'hour' : 'minute')]

      this.selectingHour &&
        children.push(this.genHours(hours)) ||
        children.push(this.genMinutes())

      return this.$createElement('v-card-text', {
        'class': 'time-picker__body'
      }, [
        this.$createElement('v-fade-transition', {
          props: { mode: 'out-in' }
        }, [
          this.$createElement('div', {
            'class': 'time-picker__clock',
            on: {
              mousedown: () => (this.isDragging = true),
              mouseup: () => {
                this.isDragging = false
                this.selectingHour = false
              },
              mousemove: this.onDragMove,
              wheel: (e) => {
                e.preventDefault()
                const next = e.wheelDelta > 0

                if (this.selectingHour) {
                  next && this.changeHour(1) || this.changeHour(-1)
                } else {
                  next && this.changeMinute(1) || this.changeMinute(-1)
                }
              }
            },
            key: this.selectingHour ? 'hour' : 'minute',
            ref: 'clock'
          }, children)
        ]),
        this.genActions()
      ])
    },
    genHand (type) {
      return [this.$createElement('div', {
        'class': `time-picker__clock-hand ${type}`,
        style: {
          transform: `rotate(${this[`${type}Hand`]}deg)`
        }
      })]
    },
    genHours (hours) {
      const children = []
      let start = 0

      if (this.format === 'ampm') {
        hours++
        start = 1
      }

      for (let i = start; i < hours; i++) {
        children.push(this.$createElement('span', {
          'class': {
            'active': i === this.hour
          },
          style: this.getTransform(i)
        }, i))
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
          style: this.getTransform(i)
        }, num))
      }

      return children
    },
    getTransform (i) {
      const { x, y } = this.getPosition(i, this.degrees)

      return { transform: `translate(${x}px, ${y}px)` }
    },
    getPosition (i) {
      return {
        x: Math.round(Math.sin(i * this.degrees) * this.radius * 0.86),
        y: Math.round(-Math.cos(i * this.degrees) * this.radius * 0.86)
      }
    },
    changeHour (time) {
      if (this.format === 'ampm') {
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
    onDragMove (e) {
      if (!this.isDragging) return
      const rect = this.$refs.clock.getBoundingClientRect()

      const coords = {
        y: rect.top - e.pageY,
        x: e.pageX - rect.left
      }

      if (this.selectingHour) {
        this.hour = Math.round(this.angle(coords) / this.degreesPerUnit)
      } else {
        this.minute = Math.round(this.angle(coords) / this.degreesPerUnit)
      }
    },
    angle (p1) {
      const center = { x: 140, y: -140 }

      var p0 = {
        x: center.x,
        y: center.y + Math.sqrt(
          Math.abs(p1.x - center.x) *
          Math.abs(p1.x - center.x) +
          Math.abs(p1.y - center.y) *
          Math.abs(p1.y - center.y)
        )
      }
      return (2 * Math.atan2(p1.y - p0.y, p1.x - p0.x)) * -180 / Math.PI
    }
  }
}
