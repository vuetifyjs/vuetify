<template lang="pug">
  div(
    class="form-input"
    v-bind:class="classes"
  )
    label(
      v-bind:for="id"
      v-html="label"
    )
    input(
      type="text"
      v-bind:name="name"
      v-bind:id="id"
      v-bind:placeholder="placeholder"
      @blur="focused = false"
      @input="update"
      @focus="focused = true"
      ref="input"
    )
</template>

<script>
  export default {
    name: 'text-input',
    
    data () {
      return {
        focused: false
      }
    },

    computed: {
      classes () {
        return {
          'form-input--focused': this.focused,
          'form-input--dirty': this.value || this.placeholder || (this.$refs.input && this.$refs.input.value)
        }
      }
    },

    props: {
      label: {
        type: String,
        default: ''
      },

      id: {
        type: String,
        default: ''
      },

      name: {
        type: String,
        default: ''
      },

      placeholder: {
        type: String,
        default: ''
      },

      value: {
        type: [String, Number, Boolean]
      }
    },

    mounted () {
      if (this.value) {
        this.$refs.input.value = this.value
      }
    },

    methods: {
      update () {
        this.$emit('input', this.$refs.input.value)
      }
    }
  }
</script>