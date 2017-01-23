<template lang="pug">
  div(
    class="btn-dropdown"
    v-bind:class="classes"
  )
    v-btn(
      v-bind:class="{ 'btn--active': active }"
      v-menu="{ toggle: true, value: id }"
    )
      span {{ inputValue.title }}
      v-icon arrow_drop_down
    text-input
    v-menu(
      v-bind:auto="!overflow && !segmented && !editable"
      v-bind:items="computedItems"
      v-bind:id="id"
      v-bind:left="!overflow && !segmented && !editable"
      v-bind:max-height="maxHeight"
      v-bind:offset-y="overflow || segmented || editable"
      v-on:input="updateValue"
      v-model="inputValue"
      top
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
      editable: Boolean,

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
        default: 'Select'
      },

      segmented: Boolean,

      value: {
        required: false
      }
    },

    computed: {
      classes () {
        return {
          'btn-dropdown--editable': this.editable,
          'btn-dropdown--overflow': this.overflow || this.segmented || this.editable,
          'btn-dropdown--segmented': this.segmented
        }
      },

      computedItems () {
        if (this.index !== -1 &&
          (this.overflow || this.segmented || this.editable)
        ) {
          return this.items.filter((obj, i) => i !== this.index)
        }

        return this.items
      },

      customEvents () {
        return [
          [`menu:opened:${this.id}`, () => this.active = true],
          [`menu:closed:${this.id}`, () => this.active = false]
        ]
      },

      id () {
        return 'btn-dropdown-' + this._uid
      },

      index () {
        return this.items.findIndex(i => i === this.inputValue)
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