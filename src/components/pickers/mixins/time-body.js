export default {
  data () {
    return {
      hasChanged: false
    }
  },
  methods: {
    genBody () {
      const children = [this.genHand(this.selectingHour ? 'hour' : 'minute')]
      const data = {
        'class': 'picker--time__clock',
        on: {
          mousedown: this.onMouseDown,
          mouseup: this.onMouseUp,
          mouseleave: () => {
            this.isDragging && this.onMouseUp()
          },
          touchstart: this.onMouseDown,
          touchend: this.onMouseUp,
          mousemove: this.onDragMove,
          touchmove: this.onDragMove
        },
        key: this.selectingHour ? 'hour' : 'minute',
        ref: 'clock'
      }

      this.selectingHour &&
        children.push(this.genHours()) ||
        children.push(this.genMinutes())

      if (this.scrollable) {
        data.on.wheel = e => {
          e.preventDefault()

          const diff = e.wheelDelta > 0 ? 1 : -1
          const changing = this.selectingHour ? 'changeHour' : 'changeMinute'

          this[changing](diff)
        }
      }

      return this.$createElement('div', {
        'class': 'picker__body'
      }, [
        this.$createElement('transition', {
          props: {
            name: 'fade-transition',
            mode: 'out-in'
          }
        }, [
          this.$createElement('div', data, children)
        ])
      ])
    },
    genHand (type) {
      const scale = this.is24hrAfter12 ? 'scaleY(0.6)' : ''
      return [this.$createElement('div', {
        'class': `picker--time__clock-hand ${type}`,
        style: {
          transform: `rotate(${this.clockHand}deg) ${scale}`
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
            'active': i === this.hour,
            'disabled': !this.isAllowed('hour', i)
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
            'active': num.toString() === this.minute.toString(),
            'disabled': !this.isAllowed('minute', i)
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
      const radiusPercentage = this.selectingHour &&
        this.is24hr &&
        i >= 12 ? 0.5 : 0.8
      const r = this.radius * radiusPercentage
      i = this.selectingHour && this.is24hr ? i % 12 : i
      return {
        x: Math.round(Math.sin(i * this.degrees) * r),
        y: Math.round(-Math.cos(i * this.degrees) * r)
      }
    },
    changeHour (time) {
      let range = this.generateRange('hour', this.hour)

      time < 0 && (range = range.reverse().slice(1))
      this.hour = range.find((h) => {
        return this.allowedHours ? this.isAllowed('hour', h) : true
      })

      return true
    },
    changeMinute (time) {
      const current = Number(this.minute)
      let range = this.generateRange('minute', current)

      time < 0 && (range = range.reverse().slice(1))
      const minute = range.find((m) => {
        return this.allowedMinutes ? this.isAllowed('minute', m) : true
      })

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
      !this.selectingHour && this.autosave && this.save()
      if (this.hasChanged) {
        this.selectingHour = false
        this.hasChanged = false
      }
    },
    onDragMove (e) {
      e.preventDefault()
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
      let value = Math.round(this.angle(center, coords) / this.degreesPerUnit)

      if (this.selectingHour && this.is24hr) {
        const insideClick = this.euclidean(center, coords) / this.radius < 0.65
        value = insideClick ? value + 12 : value

        // Necessary to fix edge case when selecting left part of 0 and 12
        value = this.angle(center, coords) >= 345 ? (value + 12) % 24 : value
      }

      if (this.isAllowed(selecting, value)) {
        this[selecting] = value
        this.hasChanged = true
      }
    },
    euclidean (p0, p1) {
      const dx = Math.abs(p1.x - p0.x)
      const dy = Math.abs(p1.y - p0.y)

      return Math.sqrt(dx * dx + dy * dy)
    },
    angle (center, p1) {
      var p0 = {
        x: center.x,
        y: center.y + Math.sqrt(
          Math.abs(p1.x - center.x) * Math.abs(p1.x - center.x) +
          Math.abs(p1.y - center.y) * Math.abs(p1.y - center.y))
      }

      const value = 2 * Math.atan2(p1.y - p0.y, p1.x - p0.x)
      return Math.abs(value * 180 / Math.PI)
    }
  }
}
