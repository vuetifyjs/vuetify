<template lang="pug">
  div(
    class="btn-dropdown"
    v-bind:class="classes"
  )
    v-btn(
      v-bind:class="{ 'btn--active': active, 'btn--editable': active && editable }"
      v-menu="{ toggle: true, value: id }"
    )
      span(v-if="inputValue.title" v-text="inputValue.title")
      v-icon(v-if="inputValue.action") {{ inputValue.action }}
      v-icon(class="btn-dropdown__arrow" v-on:click="$vuetify.bus.pub(`menu:toggle:${id}`)") arrow_drop_down
    input(
      type="text"
      ref="input"
      v-model="editableValue"
      v-on:keypress.enter="updateValue($event.target.value)"
      v-on:click.stop=""
      v-show="editable && active"
    )
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
      this.editableValue = this.inputValue.title
    },

    beforeDestroy () {
      this.$vuetify.bus.unsub(this.customEvents)
    },

    watch: {
      active () {
        if (this.editable) {
          if (this.active) {
            setTimeout(() => this.$refs.input.select(), 0)
          } else {
            this.editableValue = this.inputValue.title
          }
        }
      },

      value () {
        if (typeof this.value === 'string') {
          return this.inputValue = { title: this.value }
        }

        this.inputValue = this.value
      }
    },

    methods: {
      updateValue (obj) {
        if (typeof obj === 'string') {
          obj = { title: obj }
          
          this.$vuetify.bus.pub(`menu:toggle:${this.id}`)
        }

        this.$emit('input', obj)

        if (this.editable) {
          this.editableValue = obj.title
          this.inputValue = obj
        }
      }
    }
  }
</script>