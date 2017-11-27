<template lang="pug">
  component-page(v-bind:data="$data")
    section
      section-head(value="Layout.Grids.breakpointHeader")
      section-text(value="Layout.Grids.breakpointText1")
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
      section-text(value="Layout.Grids.breakpointText2")
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
      section-text(value="Layout.Grids.breakpointText3")
      markup(lang="html")
        |&lt;v-dialog :fullscreen="$vuetify.breakpoint.xsOnly"&gt;
        |&nbsp;&nbsp;&nbsp;&nbsp;...
        |&lt;/v-dialog&gt;
</template>

<script>
  export default {
    name: 'grid-layout-page',

    data: () => ({
      name: 'grid',
      component: 'v-container',
      components: [
        'v-layout',
        'v-flex'
      ],
      usage: { file: 'grid' },
      examples: [
        { file: 'offset' },
        { file: 'order' },
        { file: 'directionAndAlign' },
        { file: 'rowColumnBreakpoint' },
        { file: 'nestedGrid' },
        { file: 'uniqueLayouts' },
        { file: 'tags' }
      ]
    })
  }
</script>
