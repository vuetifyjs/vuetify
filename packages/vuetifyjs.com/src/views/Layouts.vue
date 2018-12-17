<template>
  <component :is="component" />
</template>

<script>
  export default {
    props: {
      page: {
        type: String,
        required: true
      }
    },

    data: () => ({
      component: null
    }),

    created () {
      import(`@/examples/layouts/${this.page}.vue`)
        .then(res => (this.component = res.default))
        .catch(() => {
          this.$router.push({ name: '404' })
          throw new Error(`Unable to find layout for <${this.page}>`)
        })
    }
  }
</script>
