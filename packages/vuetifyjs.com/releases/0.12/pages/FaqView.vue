<template lang="pug">
  div(class="doc")
    section
      section-text
        dt(slot="title") FAQ
        dd(slot="desc") Soon
</template>

<script>
  export default {
    mounted () {
      this.$emit('view', 'FAQ')
    },

    preFetch () {
      return {
        title: 'FAQ',
        meta: {}
      }
    }
  }
</script>