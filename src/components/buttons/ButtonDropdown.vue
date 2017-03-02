<template lang="pug">
  div(
    class="btn-dropdown"
    v-bind:class="classes"
  )
    input(
      v-if="editable" 
      ref="input"
      v-bind:class="{ 'active': isActive }"
      v-bind:placeholder="placeholder"
      v-on:click.stop="isActive = true"
      v-on:keyup.enter="updateValue(editableValue)"
      v-model="editableValue"
    )
    v-menu(
      v-bind:auto="!overflow && !segmented && !editable"
      v-bind:right="!overflow && !segmented && !editable"
      v-bind:max-height="maxHeight"
      v-bind:offset-y="overflow || segmented || editable"
      v-model="isActive"
      bottom
    )
      v-btn(
        v-bind:class="{ 'btn--active': isActive, 'btn--editable': isActive && editable }"
        slot="activator"
        light
      )
        span(
          v-if="inputValue && inputValue.text"
          v-text="inputValue.text"
          class="btn-dropdown__title"
        )
        v-icon(v-if="inputValue && inputValue.action") {{ inputValue.action }}
        v-icon(
          class="btn-dropdown__arrow" 
          v-on:click.native.stop="isActive = !isActive"
        ) arrow_drop_down
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
        inputValue: this.value || { text: this.placeholder },
        editableValue: ''
      }
    },

    props: {
      editable: Boolean,

      options: {
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
          return this.options
        }

        if (this.index !== -1 &&
          (this.overflow || this.segmented || this.editable)
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
      this.editableValue = this.inputValue.text
    },

    watch: {
      isActive () {
        if (this.editable) {
          if (!this.isActive) {
            this.$refs.input.blur()
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
          obj = { title: obj }
        }

        this.inputValue = obj

        this.$emit('input', obj)

        if (this.editable) {
          this.editableValue = obj.text
          this.inputValue = obj
        }

        this.isActive = false
      }
    }
  }
</script>