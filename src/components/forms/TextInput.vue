<template lang="pug">
  div(
    class="input-group"
    v-bind:class="classes"
  )
    label(
      v-bind:for="id || name"
      v-html="label"
    )
    div(class="input-group__wrapper")
      v-icon(v-if="prependIcon" class="input-group__prepend-icon") {{ prependIcon }}
      input(
        v-bind:disabled="disabled"
        v-bind:id="id"
        v-bind:name="name"
        v-bind:required="required"
        v-bind:type="type"
        v-bind:value="inputValue"
        v-on:blur="blur"
        v-on:input="updateValue"
        v-on:focus="focus"
        ref="input"
      )
      v-icon(v-if="appendIcon" class="input-group__append-icon") {{ appendIcon }}
    div(
      class="input-group__hint"
      v-text="error"
    )
</template>

<script>
  export default {
    name: 'text-input',

    data () {
      return {
        focused: false,
        inputValue: this.value ? this.value.toString() : null
      }
    },

    computed: {
      classes () {
        return {
          'input-group--focused': this.focused,
          'input-group--dirty': this.inputValue,
          'input-group--disabled': this.disabled,
          'input-group--light': this.light && !this.dark,
          'input-group--dark': this.dark,
          'input-group--single-line': this.singleLine,
          'input-group--error': this.error,
          'input-group--append-icon': this.appendIcon,
          'input-group--prepend-icon': this.prependIcon
        }
      }
    },

    props: {
      appendIcon: String,

      dark: Boolean,

      disabled: Boolean,

      error: String,

      label: String,

      light: {
        type: Boolean,
        default: true
      },

      id: String,

      menu: Boolean,

      name: String,

      placeholder: String,

      prependIcon: String,

      required: Boolean,

      singleLine: Boolean,

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