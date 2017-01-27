<template lang="pug">
  div(class="input-group")
    input(
      type="radio"
      v-bind:class="classes"
      v-bind:disabled="disabled"
      v-bind:id="id"
      v-bind:name="name"
      v-bind:value="value"
      ref="input"
    )
    label(
      v-bind:for="id"
      v-html="label"
    )
</template>

<script>
  export default {
    name: 'radio',

    props: {
      disabled: Boolean,

      label: {
        type: String,
        default: ''
      },

      gap: Boolean,

      id: {
        type: String,
        default: ''
      },

      name: {
        type: String,
        default: ''
      },

      value: [String, Number, Boolean]
    },

    computed: {
      classes () {
        return {
          'gap': this.gap
        }
      }
    },

    mounted () {
      const vm = this

      this.$refs.input.checked = this.$el.value === this.value

      this.$refs.input.onchange = function () {
        vm.$emit('input', this.value)
      }
    }
  }
</script>