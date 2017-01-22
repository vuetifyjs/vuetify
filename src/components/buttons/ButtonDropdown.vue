<template lang="pug">
  div(class="btn-dropdown")
    v-btn(menu v-menu:test="") {{ inputValue.title }}
    v-menu(
      v-bind:items="items" 
      id="test" 
      v-on:input="updateValue"
      v-model="inputValue"
      auto
    )
</template>

<script>
  export default {
    data () {
      return {
        inputValue: { title: this.placeholder }
      }
    },

    props: {
      items: {
        type: Array,
        default: () => []
      },

      placeholder: {
        type: String,
        default: 'Select'
      },

      value: {
        required: false
      }
    },

    watch: {
      value () {
        this.inputValue = this.value
      }
    },

    methods: {
      updateValue (obj) {
        this.$emit('input', obj)
      }
    }
  }
</script>