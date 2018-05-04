<template lang="pug">
  doc-page(
    section="layout"
    component="grid"
    toc="Layout.Grid.toc"
  )
    section#breakpoint-object
      section-head(value="Layout.Grid.breakpointHeader")
      section-text(value="Layout.Grid.breakpointText1")
      markup(lang="js")
        |export default {
        |    mounted () {
        |      console.log(this.$vuetify.breakpoint)
        |    },
        |    computed: {
        |      imageHeight () {
        |        switch (this.$vuetify.breakpoint.name) {
        |          case 'xs': return '220px'
        |          case 'sm': return '400px'
        |          case 'md': return '500px'
        |          case 'lg': return '600px'
        |          case 'xl': return '800px'
        |        }
        |      }
        |    }
        |}
      section-text(value="Layout.Grid.breakpointText2")
      markup(lang="js")
        |export default {
        |    data: () => ({
        |       isMobile: false
        |    }),
        |    mounted () {
        |      this.onResize()
        |      window.addEventListener('resize', this.onResize, { passive: true })
        |    },
        |    beforeDestroy () {
        |      if (typeof window !== 'undefined') {
        |         window.removeEventListener('resize', this.onResize, { passive: true })
        |      }
        |    },
        |    methods: {
        |      onResize () {
        |         this.isMobile = window.innerWidth < 600
        |      }
        |    }
        |}
      section-text(value="Layout.Grid.breakpointText3")
      markup(lang="html")
        |&lt;v-dialog :fullscreen="$vuetify.breakpoint.xsOnly"&gt;
        |&nbsp;&nbsp;&nbsp;&nbsp;...
        |&lt;/v-dialog&gt;
</template>

<script>
  // Components
  import DocPage from '@/pages/components/DocPage'

  export default {
    components: {
      DocPage
    }
  }
</script>
