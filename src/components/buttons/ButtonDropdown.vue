<template lang="pug">
  div(
    class="btn-dropdown"
    v-bind:class="classes"
  )
    input(
      v-if="editable" 
      ref="input"
      v-bind:class="{ 'active': isActive }"
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
      )
        span(
          v-if="inputValue.title" 
          v-text="inputValue.title"
          class="btn-dropdown__title"
        )
        v-icon(v-if="inputValue.action") {{ inputValue.action }}
        v-icon(
          class="btn-dropdown__arrow" 
          v-on:click.native.stop="isActive = !isActive"
        ) arrow_drop_down
      v-list
        v-list-item(v-for="(item, index) in items")
          v-list-tile(
            v-bind:class="{ 'list__tile--active': inputValue === item }" 
            v-on:click.native="updateValue(item)"
          )
            v-list-tile-action(v-if="item.action")
              v-icon {{ item.action }}
            v-list-tile-content(v-if="item.title")
              v-list-tile-title {{ item.title }}
</template>

<script>
  export default {
    name: 'button-dropdown',

    data () {
      return {
        isActive: false,
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

      index () {
        return this.items.findIndex(i => i === this.inputValue)
      }
    },

    mounted () {
      this.editableValue = this.inputValue.title
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
          this.editableValue = obj.title
          this.inputValue = obj
        }

        this.isActive = false
      }
    }
  }
</script>