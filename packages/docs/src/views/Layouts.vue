<template>
  <component
    :is="component"
    v-if="component !== false"
  />
  <not-found v-else />
</template>

<script>
  export default {
    components: {
      NotFound: () => import('@/pages/general/404'),
    },

    props: {
      page: {
        type: String,
        required: true,
      },
    },

    data: () => ({
      component: undefined,
    }),

    created () {
      import(`@/examples/layouts/${this.page}.vue`)
        .then(res => (this.component = res.default))
        .catch(() => {
          this.component = false
          throw new Error(`Unable to find layout for <${this.page}>`)
        })
    },
  }
</script>
