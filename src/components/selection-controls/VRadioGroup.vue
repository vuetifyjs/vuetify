<script>
  import Input from '~mixins/input'

  export default {
    name: 'v-radio-group',

    mixins: [Input],

    model: {
      prop: 'inputValue',
      event: 'change'
    },

    provide () {
      return {
        isMandatory: () => this.mandatory
      }
    },

    props: {
      inputValue: [String, Number],
      mandatory: Boolean,
      column: Boolean
    },

    data () {
      return {
        internalTabIndex: -1
      }
    },

    watch: {
      inputValue (val) {
        this.getRadios().forEach((radio) => {
          radio.isActive = val === radio.value
        })
      }
    },

    computed: {
      classes () {
        return {
          'radio-group': true,
          'radio-group--column': this.column
        }
      }
    },

    methods: {
      getRadios () {
        return this.$children
          .filter((child) => child.$el.classList.contains('radio'))
      },
      toggle (value) {
        if (this.disabled) {
          return
        }

        value = value === this.inputValue ? null : value

        this.shouldValidate = true
        this.$emit('change', value)
        this.$nextTick(() => this.validate())

        this.getRadios()
          .filter(r => r.value !== value)
          .forEach(r => r.isActive = false)
      },
      radioBlur (e) {
        if (!e.relatedTarget || !e.relatedTarget.classList.contains('radio')) {
          this.shouldValidate = true
          this.$emit('blur', this.inputValue)
        }
      },
    },

    mounted () {
      this.getRadios().forEach((radio) => {
        radio.$el.tabIndex = radio.$el.tabIndex > 0 ? radio.$el.tabIndex : 0
        radio.$on('change', this.toggle)
        radio.$on('blur', this.radioBlur)
        radio.$on('focus', this.radioFocus)
      })
    },

    beforeDestroy () {
      this.getRadios().forEach((radio) => {
        radio.$off('change', this.toggle)
        radio.$off('blur', this.radioBlur)
        radio.$off('focus', this.radioFocus)
      })
    },

    render (h) {
      return this.genInputGroup(this.$slots.default, { on: {} })
    }
  }
</script>

<style lang="stylus">
  .radio-group
    .input-group__details:before, .input-group__details:after
      display: none

    .input-group
      padding: 0

    &--column
      .input-group__input
        flex-direction: column

</style>
