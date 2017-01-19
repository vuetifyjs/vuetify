<template lang="pug">
  div(class="input-group")
    input(
      type="checkbox"
      v-bind:class="classes"
      v-bind:disabled="disabled"
      v-bind:id="id"
      v-bind:name="name"
      v-bind:value="valueV || inputValue"
      v-on:change="updateValue"
      ref="input"
    )
    label(
      v-bind:for="id"
      v-html="label"
    )
</template>

<script>
  export default {
    name: 'checkbox',
    
    data () {
      return {
        inputValue: this.value
      }
    },

    props: {
      disabled: Boolean,

      filled: Boolean,

      gap: Boolean,

      id: {
        type: String,
        default: ''
      },

      indeterminate: Boolean,
      
      label: {
        type: String,
        default: ''
      },

      name: {
        type: String,
        default: ''
      },

      value: {
        required: false
      },

      valueV: {
        required: false
      }
    },

    computed: {
      classes () {
        return {
          'filled': this.filled
        }
      }
    },

    watch: {
      value () {
        this.inputValue = this.value
        this.isChecked()
      }
    },

    mounted () {
      this.$refs.input.indeterminate = this.indeterminate
      this.isChecked()
    },

    methods: {
      isArray () {
        return typeof this.inputValue === 'array'
          || typeof this.inputValue === 'object'
      },
      
      updateValue (e) {
        if (!this.isArray()) {
          return this.$emit('input', e.target.checked)
        }

        let i = this.inputValue.indexOf(this.valueV)

        if (i === -1) {
          this.inputValue.push(this.valueV)
        } else {
          this.inputValue.splice(i, 1)
        }

        this.$emit('input', this.inputValue)
      },

      isChecked () {
        if (!this.isArray()) {
          this.$refs.input.checked = Boolean(this.inputValue)
        }

        let i = this.inputValue.indexOf(this.valueV)

        this.$refs.input.checked = i !== -1
      }
    }
  }
</script>