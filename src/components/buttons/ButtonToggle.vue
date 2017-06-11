<template lang="pug">
  div(
    class="btn-toggle"
    v-bind:class="classes"
  )
    v-btn(
      v-for="(item, index) in items"
      v-bind:key="index"
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

    model: {
      prop: 'inputValue',
      event: 'change'
    },

    props: {
      items: {
        type: Array,
        default: () => []
      },

      multiple: Boolean,

      mandatory: {
        type: Boolean,
        value: false
      },

      inputValue: {
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

    methods: {
      isSelected (item) {
        if (!this.multiple) {
          return this.inputValue === item.value
        }

        return this.inputValue.includes(item.value)
      },

      updateValue (item) {
        if (!this.multiple) {
          if (this.mandatory && this.inputValue === item.value) return
          return this.$emit('change', this.inputValue === item.value ? null : item.value)
        }

        const items = this.inputValue.slice()

        const i = items.indexOf(item.value)
        if (i !== -1) {
          items.length > 1 && !this.mandatory && items.splice(i, 1)
        } else {
          items.push(item.value)
        }

        this.$emit('change', items)
      }
    }
  }
</script>
