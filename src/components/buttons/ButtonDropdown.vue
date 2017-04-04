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
      v-model="isActive"
      v-bind:close-on-click="!isActive"
      v-bind:open-on-click="!isActive"
      bottom
    )
      v-text-field(
        ref="input"
        v-bind:type="editable ? 'text' : 'button'"
        v-bind:label="label"
        v-bind:light="light && !dark"
        v-bind:dark="dark"
        v-on:keyup.native.enter="updateValue(editableValue)"
        v-on:focus="isActive = arguments[0]"
        v-model="editableValue"
        slot="activator"
        single-line
        append-icon="arrow_drop_down"
      )
      v-list
        v-list-item(v-for="(option, index) in options")
          v-list-tile(
            v-bind:class="{ 'list__tile--active': inputValue === option }" 
            v-on:click.native="updateValue(option)"
          )
            v-list-tile-action(v-if="option.action")
              v-icon {{ option.action }}
            v-list-tile-content(v-if="option.text")
              v-list-tile-title {{ option.text }}
</template>

<script>
  export default {
    name: 'button-dropdown',

    data () {
      return {
        isActive: false,
        inputValue: this.value,
        editableValue: null
      }
    },

    props: {
      dark: Boolean,
      editable: Boolean,
      light: {
        type: Boolean,
        default: true
      },
      options: {
        type: Array,
        default: () => []
      },
      maxHeight: {
        type: [String, Number],
        default: 200
      },
      overflow: Boolean,
      label: {
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
          'btn-dropdown--segmented': this.segmented,
          'btn-dropdown--light': this.light && !this.dark,
          'btn-dropdown--dark': this.dark
        }
      },

      computedItems () {
        if (this.editable) {
          return this.options
        }

        if (this.index !== -1 &&
          (this.overflow || this.segmented)
        ) {
          return this.options.filter((obj, i) => i !== this.index)
        }

        return this.options
      },

      index () {
        return this.options.findIndex(i => i === this.inputValue)
      }
    },

    mounted () {
      if (this.inputValue) {
        this.editableValue = this.inputValue.text
      } 
    },

    watch: {
      isActive () {
        if (this.editable) {
          if (!this.isActive) {
            this.$refs.input.$el.querySelector('input').blur()
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
        this.isActive = active
      },

      updateValue (obj) {
        if (typeof obj === 'string') {
          obj = { text: obj }
        }

        this.inputValue = obj
        this.editableValue = obj.text || obj.action
        this.isActive = false
      }
    }
  }
</script>