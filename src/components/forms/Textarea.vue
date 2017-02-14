<template lang="pug">
  div(
    class="input-group input-group--textarea"
    v-bind:class="classes"
  )
    label(
      v-bind:for="id"
      v-html="label"
    )
    textarea(
      v-bind:disabled="disabled"
      v-bind:id="id"
      v-bind:name="name"
      v-bind:placeholder="placeholder"
      v-bind:required="required"
      v-bind:value="inputValue"
      v-on:blur="blur"
      v-on:input="updateValue"
      v-on:focus="focus"
      v-bind:class="{ resize: resizable, 'resize-vertical': resizeVertical, 'resize-horizontal': resizeHorizontal }"
      ref="textarea"
    )
</template>

<script>
  export default {
    name: 'textarea',

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
          'input-group--dirty': this.inputValue || this.placeholder || (this.$refs.textarea && this.$refs.textarea.value)
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

      resizable: Boolean,

      resizeVertical: Boolean,

      resizeHorizontal: Boolean,

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
      blur () {
        this.focused = false

        this.$emit('blur')
      },

      focus () {
        this.focused = true

        this.$emit('focus')
      },

      updateValue (e) {
        this.inputValue = e.target.value
        this.$emit('input', this.inputValue)
      }
    }
  }
</script>
