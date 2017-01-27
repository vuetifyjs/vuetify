<template lang="pug">
  li
    a(
      class="breadcrumbs__item"
      v-bind:class="classes"
      v-bind:href="item.href"
      v-html="item.text"
    )
</template>

<script>
  export default {
    name: 'breadcrumbs-item',

    props: {
      disabled: Boolean,

      item: {
        type: Object,
        required: true
      }
    },

    computed: {
      classes () {
        return {
          'breadcrumbs__item--disabled': this.disabled
        }
      }
    }
  }
</script>