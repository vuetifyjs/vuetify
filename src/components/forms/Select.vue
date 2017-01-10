<template lang="pug">
  div(
    class="input-group"
    v-bind:class="classes"
  )
    label(
      v-bind:for="id"
      v-text="label"
    )
    select(
      v-bind:disabled="disabled"
      v-bind:id="id"
      v-bind:name="name"
      v-bind:multiple="multiple"
      v-on:blur="update"
      v-on:click="focused = true"
      v-on:input="update"
      ref="select"
    )
      option(
        value=''
        selected
        v-bind:disabled="defaultDisabled"
        v-text="defaultText"
      )
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
      defaultDisabled: {
        type: Boolean,
        default: true
      },
      
      defaultText: {
        type: String,
        default: 'Select...'
      },

      disabled: Boolean,

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

      value: {
        required: false
      }
    },

    computed: {
      classes () {
        return {
          'input-group--dirty': true
        }
      }
    },

    methods: {
      update () {
        if (!this.multiple) {
          this.$emit('input', this.$refs.select.value)
        } else {
          this.$emit('input', this.$refs.options.filter(i => i.selected).map(i => i.value))
        }
      }
    }
  }
</script>