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
      v-bind:required="required"
      v-bind:type="type"
      v-bind:value="inputValue"
      v-on:blur="blur"
      v-on:input="updateValue"
      v-on:focus="focus"
      ref="input"
    )
</template>

<script>
  export default {
    name: 'text-input',

    data () {
      return {
        focused: false,
        inputValue: this.value
      }
    },

    computed: {
      classes () {
        return {
          'input-group--focused': this.focused,
          'input-group--dirty': this.value || this.placeholder
        }
      }
    },

    props: {
      disabled: Boolean,

      label: String,

      id: String,

      name: String,

      placeholder: String,

      required: Boolean,

      type: {
        default: 'text'
      },

      value: {
        type: String,
        required: false
      }
    },

    watch: {
      value (value) {
        this.inputValue = value
      },

      inputValue () {
        this.$emit('input', this.inputValue)
      }
    },

    methods: {
      blur () {
        this.focused = false
      },

      focus () {
        this.focused = true
      },

      updateValue (e) {
        this.inputValue = e.target.value
      }
    }
  }
</script>