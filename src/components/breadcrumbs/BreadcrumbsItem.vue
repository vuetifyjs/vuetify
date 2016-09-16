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
    props: {
      disabled: {
        type: Boolean,
        default: false
      },

      item: {
        type: Object,
        default: () => {
          return {
            href: '#!',
            text: ''
          }
        }
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