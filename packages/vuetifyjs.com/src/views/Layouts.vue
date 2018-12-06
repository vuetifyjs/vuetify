<template>
  <component :is="component" />
</template>

<script>
  export default {
    components: {
      NotFoundPage: () => import('@/pages/general/404Page.vue')
    },

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
        .catch(err => {
          console.warn(err)
          this.component = 'NotFoundPage'
        })
    }
  }
</script>
