<template lang="pug">
  div(
    class="input-group"
    v-bind:class="classes"
  )
    label(
      v-bind:for="id"
      v-html="label"
    )
    input(
      v-bind:disabled="disabled"
      v-bind:id="id"
      v-bind:name="name"
      v-bind:placeholder="placeholder"
      v-bind:type="type"
      v-bind:value="inputValue"
      v-on:blur="focused = false"
      v-on:input="updateValue"
      v-on:focus="focused = true"
      ref="input"
    )
</template>

<script>
  export default {
    name: 'text-input',
    
    data () {
      return {
        focused: false,
        inputValue: ''
      }
    },

    computed: {
      classes () {
        return {
          'input-group--focused': this.focused,
          'input-group--dirty': this.inputValue || this.placeholder || (this.$refs.input && this.$refs.input.value)
        }
      }
    },

    props: {
      disabled: Boolean,

      label: String,

      id: String,

      name: String,

      placeholder: String,

      type: {
        default: 'text'
      },

      value: {
        required: false
      }
    },

    watch: {
      value (value) {
        this.inputValue = value
      }
    },

    mounted () {
      this.inputValue = this.value
    },

    methods: {
      updateValue (e) {
        this.inputValue = e.target.value
        this.$emit('input', this.inputValue)
      }
    }
  }
</script>