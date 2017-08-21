<script>
  import Input from '../../mixins/input'

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
      column: {
        type: Boolean,
        default: true
      },
      inputValue: [String, Number],
      mandatory: {
        type: Boolean,
        default: true
      },
      row: Boolean
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
          'radio-group--column': this.column,
          'radio-group--row': this.row
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
        radio.isActive = this.inputValue === radio.value
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

<style lang="stylus" src="../../stylus/components/_input-groups.styl"></style>
<style lang="stylus" src="../../stylus/components/_selection-controls.styl"></style>

<style lang="stylus" src="../../stylus/components/_radio-group.styl"></style>
