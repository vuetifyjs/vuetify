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
      const degrees = -(360 / hours * Math.PI / 180)

      for (let i = 1; i <= hours; i++) {
        children.push(this.$createElement('span', {
          'class': {
            'active': i === this.hour
          },
          style: this.genHandStyles(i, degrees),
          on: {
            mousedown: () => (this.hour = i),
            mouseover: () => {
              if (this.isDragging) this.hour = i
            }
          },
          domProps: {
            innerHTML: `<span>${i}</span>`
          }
        }))
      }

      return children
    },
    genMinutes () {
      const children = []
      const degrees = -(360 / 60 * Math.PI / 180)

      for (let i = 1; i <= 60; i++) {
        let text = ''
        let num = i

        if (num < 10) num = `0${num}`
        if (num === 60) num = '00'

        if (i % 5 === 0) {
          text = num
        }

        children.push(this.$createElement('span', {
          'class': {
            'active': num.toString() === this.minute.toString(),
            'empty': !text
          },
          style: this.genHandStyles(i, degrees),
          on: {
            mousedown: () => (this.minute = num),
            mouseover: () => {
              if (this.isDragging) this.minute = num
            }
          },
          domProps: {
            innerHTML: `<span>${text}</span>`
          }
        }))
      }

      return children
    },
    genHandStyles (i, degrees) {
      const { x, y } = this.getPosition(i, degrees, this.radius)

      return {
        transform: `translate(${x}px, ${y}px)`
      }
    },
    getPosition (i, degrees, radius) {
      return {
        x: Math.round(Math.sin(i * degrees) * radius),
        y: Math.round(Math.cos(i * degrees) * radius)
      }
    },
    changeHour (time) {
      this.hour = time < 0 && this.hour === 1
        ? 12
        : time > 0 && this.hour === 12
        ? 1
        : this.hour + time

      return true
    },
    changeMinute (time) {
      const current = Number(this.minute)

      const minute = time < 0 && current === 0
        ? 59
        : time > 0 && current === 59
        ? 0
        : current + time

      this.minute = minute < 10 ? `0${minute}` : minute

      return true
    }
  }
}
