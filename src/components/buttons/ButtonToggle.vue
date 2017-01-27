<template lang="pug">
  div(
    class="btn-toggle"
    v-bind:class="classes"
  )
    v-btn(
      v-for="(item, index) in items"
      v-on:click.native.stop="updateValue(item)"
      v-bind:data-selected="isSelected(item)"
      v-bind:data-index="index"
      v-bind:data-only-child="isSelected(item) && (!multiple || inputValue.length === 1)"
      flat
    )
      span(v-if="item.text" v-text="item.text")
      v-icon(v-if="item.icon") {{ item.icon }}
</template>

<script>
  export default {
    name: 'button-toggle',

    data () {
      return {
        inputValue: this.value
      }
    },

    props: {
      items: {
        type: Array,
        default: () => []
      },

      multiple: Boolean,

      value: {
        required: false
      }
    },

    computed: {
      classes () {
        return {
          'btn-toggle--selected': this.inputValue && !this.multiple || this.inputValue && this.inputValue.length > 0
        }
      }
    },

    watch: {
      value () {
        this.inputValue = this.value
      }
    },

    methods: {
      isSelected (item) {
        if (!this.multiple) {
          return this.inputValue === item.value
        }

        return this.inputValue.includes(item.value)
      },

      updateValue (item) {
        if (!this.multiple) {
          return this.$emit('input', this.inputValue === item.value ? null : item.value)
        }

        const items = this.inputValue

        const i = items.indexOf(item.value)
        if (i !== -1) {
          items.splice(i, 1)
        } else {
          items.push(item.value)
        }

        this.$emit('input', items)
      }
    }
  }
</script>