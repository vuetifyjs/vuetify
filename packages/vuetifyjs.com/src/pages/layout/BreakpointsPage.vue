<template lang="pug">
  views-doc
    template(slot-scope="{ namespace }")
      section#breakpoints
        misc-grid

      section#breakpoint-object
        helpers-section-head(value="Layout.Breakpoints.breakpointHeader")
        helpers-section-text(value="Layout.Breakpoints.breakpointText1")
        helpers-markup(lang="js")
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
        helpers-section-text(value="Layout.Breakpoints.breakpointText2")
        helpers-markup(lang="js")
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
        helpers-section-text(value="Layout.Breakpoints.breakpointText3")
        helpers-markup(lang="html")
          | &lt;v-dialog :fullscreen="$vuetify.breakpoint.xsOnly"&gt;
          | &nbsp;&nbsp;&nbsp;&nbsp;...
          | &lt;/v-dialog&gt;
        helpers-section-text(value="Layout.Breakpoints.breakpointText4")
        ul.browser-list.pb-2
        helpers-markup(lang="ts")
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
