<template lang="pug">
  div(
    class="btn-dropdown"
    v-bind:class="classes"
  )
    v-menu(
      v-bind:auto="!overflow && !segmented && !editable"
      v-bind:right="!overflow && !segmented && !editable"
      v-bind:max-height="maxHeight"
      v-bind:offset-y="overflow || segmented || editable"
      bottom
    )
      v-btn(
        v-bind:class="{ 'btn--active': active, 'btn--editable': active && editable }"
        slot="activator"
      )
        span(v-if="inputValue.title" v-text="inputValue.title")
        v-icon(v-if="inputValue.action") {{ inputValue.action }}
        v-icon(class="btn-dropdown__arrow" v-on:click="active = !active") arrow_drop_down
      v-list
        v-list-item(v-for="(item, index) in items")
          v-list-tile(v-bind:class="{ 'list__tile--active': inputValue === item }" v-on:click.native="updateValue(item)")
            v-list-tile-content
              v-list-tile-title {{ item.title }}
</template>

<script>
  export default {
    name: 'button-dropdown',

    data () {
      return {
        active: false,
        inputValue: { title: this.placeholder },
        editableValue: ''
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
        if (this.editable) {
          return this.items
        }

        if (this.index !== -1 &&
          (this.overflow || this.segmented || this.editable)
        ) {
          return this.items.filter((obj, i) => i !== this.index)
        }

        return this.items
      },

      id () {
        return 'btn-dropdown-' + this._uid
      },

      index () {
        return this.items.findIndex(i => i === this.inputValue)
      }
    },

    mounted () {
      this.editableValue = this.inputValue.title
    },

    watch: {
      active () {
        if (this.editable) {
          if (!this.active) {
            setTimeout(() => this.$refs.input.select(), 0)
          } else {
            this.editableValue = this.inputValue.title
          }
        }
      },

      inputValue () {
        this.$emit('input', this.inputValue)
      },

      value () {
        if (typeof this.value === 'string') {
          return (this.inputValue = { title: this.value })
        }

        this.inputValue = this.value
      }
    },

    methods: {
      toggle (active) {
        this.active = active
      },

      updateValue (obj) {
        if (typeof obj === 'string') {
          obj = { title: obj }
        }

        this.inputValue = obj

        this.$emit('input', obj)

        if (this.editable) {
          this.editableValue = obj.title
          this.inputValue = obj
        }
      }
    }
  }
</script>