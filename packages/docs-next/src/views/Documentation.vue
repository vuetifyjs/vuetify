<template>
  <div>
    <div v-html="content" />
  </div>
</template>

<script>
  export default {
    name: 'DocumentationView',

    data: () => ({
      content: null,
    }),

    mounted () {
      this.init()
    },

    methods: {
      init () {
        import('@/pages/documentation/QuickStart.md')
          .then(page => (this.content = page.default))
      },
    },
  }
</script>
