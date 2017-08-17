<script>
  import ButtonGroup from '../../mixins/button-group'

  export default {
    name: 'v-bottom-nav',

    mixins: [ButtonGroup],

    props: {
      absolute: Boolean,
      index: [Number, String],
      shift: Boolean,
      value: { required: false }
    },

    watch: {
      index () {
        this.update()
      }
    },

    computed: {
      classes () {
        return {
          'bottom-nav': true,
          'bottom-nav--absolute': this.absolute,
          'bottom-nav--shift': this.shift,
          'bottom-nav--active': this.value
        }
      }
    },

    methods: {
      isSelected (i) {
        return this.index == i
      },
      updateValue (i) {
        this.buttons.forEach((b, index) => {
          if (i === index) {
            b.classList.add('btn--active')
          } else {
            b.classList.remove('btn--active')
          }
        })

        this.$emit('update:active', i)
      }
    },

    render (h) {
      return h('div', {
        class: this.classes
      }, this.$slots.default)
    }
  }
</script>

<style lang="stylus" src="../../stylus/components/_bottom-navs.styl"></style>
