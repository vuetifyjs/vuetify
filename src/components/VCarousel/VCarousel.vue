<script>
  import VBtn from '../VBtn'
  import VIcon from '../VIcon'

  import Bootable from '../../mixins/bootable'
  import Themeable from '../../mixins/themeable'

  import Touch from '../../directives/touch'

  export default {
    name: 'v-carousel',

    mixins: [Bootable, Themeable],

    directives: { Touch },

    data () {
      return {
        inputValue: null,
        items: [],
        slideInterval: {},
        reverse: false
      }
    },

    props: {
      value: Number,
      cycle: {
        type: Boolean,
        default: true
      },
      icon: {
        type: String,
        default: 'fiber_manual_record'
      },
      interval: {
        type: Number,
        default: 6000
      },
      leftControlIcon: {
        type: [Boolean, String],
        default: 'chevron_left'
      },
      rightControlIcon: {
        type: [Boolean, String],
        default: 'chevron_right'
      }
    },

    watch: {
      inputValue () {
        // Evaluate items when inputValue changes to account for
        // dynamic changing of children
        this.items = this.$children.filter(i => {
          return i.$el.classList && i.$el.classList.contains('carousel__item')
        })

        this.items.forEach(i => i.open(
            this.items[this.inputValue]._uid,
            this.reverse
          )
        )

        !this.isBooted && this.cycle && this.restartInterval()
        this.isBooted = true

        this.$emit('input', this.inputValue)
      },
      value () {
        this.init()
      },
      cycle (val) {
        val && this.restartInterval() || clearInterval(this.slideInterval)
      }
    },

    mounted () {
      this.init()
    },

    methods: {
      genControls () {
        return this.$createElement('div', {
          staticClass: 'carousel__controls'
        }, this.genItems())
      },
      genIcon (direction, icon, fn) {
        if (!icon) return null

        return this.$createElement('div', {
          staticClass: `carousel__${direction}`
        }, [
          this.$createElement(VBtn, {
            props: {
              icon: true,
              dark: this.dark || !this.light,
              light: this.light
            },
            on: { click: fn }
          }, [this.$createElement(VIcon, icon)])
        ])
      },
      genItems () {
        return this.items.map((item, index) => {
          return this.$createElement(VBtn, {
            class: {
              'carousel__controls__item': true,
              'carousel__controls__item--active': index === this.inputValue
            },
            props: {
              icon: true,
              dark: this.dark || !this.light,
              light: this.light
            },
            key: index,
            on: { click: this.select.bind(this, index) }
          }, [this.$createElement(VIcon, this.icon)])
        })
      },
      restartInterval () {
        clearInterval(this.slideInterval)
        this.$nextTick(this.startInterval)
      },
      init () {
        this.inputValue = this.value || 0
      },
      next () {
        this.reverse = false
        this.inputValue = (this.inputValue + 1) % this.items.length
      },
      prev () {
        this.reverse = true
        this.inputValue = (this.inputValue + this.items.length - 1) % this.items.length
      },
      select (index) {
        this.reverse = index < this.inputValue
        this.inputValue = index
      },
      startInterval () {
        this.slideInterval = setInterval(this.next, this.interval)
      }
    },

    render (h) {
      return h('div', {
        staticClass: 'carousel',
        directives: [{
          name: 'touch',
          value: {
            left: this.next,
            right: this.prev
          }
        }]
      }, [
        this.genIcon('left', this.leftControlIcon, this.prev),
        this.genIcon('right', this.rightControlIcon, this.next),
        this.genControls(),
        this.$slots.default
      ])
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_carousel.styl"></style>
