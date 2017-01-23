<template lang="pug">
  div(
    class="btn-dropdown"
    v-bind:class="classes"
  )
    v-btn(
      v-bind:class="{ 'btn--active': active }"
      v-menu:test="{ toggle: true }"
    ) {{ inputValue.title }}
      v-icon arrow_drop_down
    v-menu(
      v-bind:items="items" 
      id="test" 
      v-on:input="updateValue"
      v-model="inputValue"
      v-bind:max-height="maxHeight"
      top
      offset-y
    )
</template>

<script>
  export default {
    name: 'button-dropdown',

    data () {
      return {
        active: false,
        inputValue: { title: this.placeholder }
      }
    },

    props: {
      items: {
        type: Array,
        default: () => []
      },

      maxHeight: {
        type: [String, Number],
        default: 200
      },

      overflow: Boolean,

      placeholder: {
        type: String,
        default: 'Select very long'
      },

      segmented: Boolean,

      value: {
        required: false
      }
    },

    computed: {
      classes () {
        return {
          'btn-dropdown--overflow': this.overflow || this.segmented,
          'btn-dropdown--segmented': this.segmented
        }
      },

      customEvents () {
        return [
          ['menu:opened:test', () => this.active = true],
          ['menu:closed:test', () => this.active = false]
        ]
      }
    },

    mounted () {
      this.$vuetify.bus.sub(this.customEvents)
    },

    beforeDestroy () {
      this.$vuetify.bus.unsub(this.customEvents)
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