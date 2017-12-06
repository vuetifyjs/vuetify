<template lang="pug">
  example-view(:data="data")
    section
      section-head(value="Components.Grid.breakpointHeader")
      section-text(value="Components.Grid.breakpointText1")
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
      section-text(value="Components.Grid.breakpointText2")
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
      section-text(value="Components.Grid.breakpointText3")
      markup(lang="html")
        |&lt;v-dialog :fullscreen="$vuetify.breakpoint.xsOnly"&gt;
        |&nbsp;&nbsp;&nbsp;&nbsp;...
        |&lt;/v-dialog&gt;
</template>

<script>
  export default {
    computed: {
      components () {
        return this.$t('Components.Grid.components')
      },
      data () {
        return {
          folder: 'grid',
          components: this.components,
          examples: this.examples
        }
      },
      examples () {
        return this.$t('Components.Grid.examples')[0]
      }
    }
  }
</script>
