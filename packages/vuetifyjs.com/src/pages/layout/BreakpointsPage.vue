<template lang="pug">
  doc-view
    template(slot-scope="{ namespace }")
      section#breakpoints
        grid

      section#breakpoint-object
        section-head(value="Layout.Breakpoints.breakpointHeader")
        section-text(value="Layout.Breakpoints.breakpointText1")
        markup(lang="js")
          | export default {
          |   mounted () {
          |     console.log(this.$vuetify.breakpoint)
          |   },
          |   computed: {
          |     imageHeight () {
          |       switch (this.$vuetify.breakpoint.name) {
          |         case 'xs': return '220px'
          |         case 'sm': return '400px'
          |         case 'md': return '500px'
          |         case 'lg': return '600px'
          |         case 'xl': return '800px'
          |       }
          |     }
          |   }
          | }
        section-text(value="Layout.Breakpoints.breakpointText2")
        markup(lang="js")
          | export default {
          |   data: () => ({
          |     isMobile: false
          |   }),
          |   mounted () {
          |     this.onResize()
          |     window.addEventListener('resize', this.onResize, { passive: true })
          |   },
          |   beforeDestroy () {
          |     if (typeof window !== 'undefined') {
          |       window.removeEventListener('resize', this.onResize, { passive: true })
          |     }
          |   },
          |   methods: {
          |     onResize () {
          |       this.isMobile = window.innerWidth < 600
          |     }
          |   }
          | }
        section-text(value="Layout.Breakpoints.breakpointText3")
        markup(lang="html")
          | &lt;v-dialog :fullscreen="$vuetify.breakpoint.xsOnly"&gt;
          | &nbsp;&nbsp;&nbsp;&nbsp;...
          | &lt;/v-dialog&gt;
        section-text(value="Layout.Breakpoints.breakpointText4")
        ul.browser-list.pb-2
        markup(lang="ts")
          | {
          |   xs: boolean
          |   xsOnly: boolean
          |   xsAndUp: boolean
          |   sm: boolean
          |   smOnly: boolean
          |   smAndDown: boolean
          |   smAndUp: boolean
          |   md: boolean
          |   mdOnly: boolean
          |   mdAndDown: boolean
          |   mdAndUp: boolean
          |   lg: boolean
          |   lgOnly: boolean
          |   lgAndDown: boolean
          |   lgAndUp: boolean
          |   xl: boolean
          |   xlOnly: boolean
          |   xlAndDown: boolean
          |   name: ('xs' | 'sm' | 'md' | 'lg' | 'xl')
          |   width: number
          |   height: number
          | }
          li <code>xs</code>, <code>xsOnly</code>, <code>xsAndUp</code>
          li <code>sm</code>, <code>smOnly</code>, <code>smAndDown</code>, <code>smAndUp</code>
          li <code>md</code>, <code>mdOnly</code>, <code>mdAndDown</code>, <code>mdAndUp</code>
          li <code>lg</code>, <code>lgOnly</code>, <code>lgAndDown</code>, <code>lgAndUp</code>
          li <code>xl</code>, <code>xlOnly</code>, <code>xlAndDown</code>
          li <code>name</code> (can be one of <code>'xs'</code>, <code>'sm'</code>, <code>'md'</code>, <code>'lg'</code>, <code>'xl'</code>)
          li <code>width</code>, <code>height</code>
</template>
