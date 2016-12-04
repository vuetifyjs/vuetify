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
      type="text"
      v-bind:name="name"
      v-bind:id="id"
      v-bind:placeholder="placeholder"
      v-bind:value="value"
      v-on:blur="focused = false"
      v-on:input="$emit('input', $event.target.value)"
      v-on:focus="focused = true"
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
          'input-group--focused': this.focused,
          'input-group--dirty': this.value || this.placeholder || (this.$refs.input && this.$refs.input.value)
        }
      }
    },

    props: {
      label: String,

      id: String,

      name: String,

      placeholder: String,

      value: {
        required: false
      }
    }
  }
</script>