<template lang="pug">
  li
    a(
      class="breadcrumbs__item"
      v-bind:class="classes"
      v-bind:href="href"
      v-bind:target="target"
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
      },

      target: String
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