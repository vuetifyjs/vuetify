<template lang="pug">
  li
    a(
      class="breadcrumbs__item"
      v-bind:class="classes"
      v-bind:href="href"
    )
      slot
</template>

<script>
  export default {
    name: 'breadcrumbs-item',

    props: {
      disabled: Boolean,

      href: {
        type: String,
        default: 'javascript:;'
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