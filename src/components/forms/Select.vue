<template lang="pug">
  div(v-bind:class="classes")
    label(
      v-bind:for="id"
      v-text="label"
    )
    select(
      id="id"
      name="name"
      v-bind:multiple="multiple"
      v-bind:id="id"
      v-bind:name="name"
      v-on:blur="focused = false"
      v-on:click="focused = true"
      ref="select"
    )
      option(
        value=''
        disabled
        selected
      ) Select...
      option(
        v-bind:value="o.value"
        v-for="o in options"
        v-text="o.text"
        ref="options"
      )
</template>

<script>
  export default {
    name: 'select',
    
    data () {
      return {
        focused: false
      }
    },

    props: {
      id: {
        type: String,
        value: ''
      },

      label: {
        type: String,
        value: ''
      },

      multiple: Boolean,

      name: {
        type: String,
        value: ''
      },

      options: {
        type: Array,
        default: () => []
      },

      value: [String, Number, Array, Boolean]
    },

    computed: {
      classes () {
        return {
          'form-input--dirty': true,
          'form-input--focused': this.focused && !this.multiple
        }
      }
    },

    mounted () {
      if (this.value) {
        this.$refs.select.value = this.value
      }

      const vm = this
      this.$refs.select.onchange = function () {
        if (!vm.multiple) {
          vm.$emit('input', this.value)
        } else {
          vm.$emit('input', vm.$refs.options.filter(i => i.selected).map(i => i.value))
        }
      }
    }
  }
</script>