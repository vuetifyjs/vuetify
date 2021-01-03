<template>
  <v-fade-transition appear>
    <router-view />
  </v-fade-transition>
</template>

<script>
  // Utilities
  import { call, get, sync } from 'vuex-pathify'
  import { genAppMetaInfo } from '@/util/metadata'
  import { wait, waitForReadystate } from '@/util/helpers'

  // Data
  import metadata from '@/data/metadata'

  export default {
    name: 'App',

    metaInfo () {
      const suffix = this.name !== 'Home' ? ' — Vuetify' : ''

      return {
        ...genAppMetaInfo(metadata),
        titleTemplate: chunk => `${chunk}${suffix}`,
      }
    },

    computed: {
      ...get('route', [
        'hash',
        'name',
      ]),
      scrolling: sync('app/scrolling'),
    },

    async mounted () {
      await waitForReadystate()
      await this.init()

      if (!this.hash) return

      await wait(500)

      this.scrolling = true

      try {
        await this.$vuetify.goTo(this.hash)
      } catch (e) {
        console.log(e)
      }

      this.scrolling = false
    },

    methods: { init: call('app/init') },
  }
</script>

<!-- XS:CODE CHAT WIDGET SCRIPT -->
<script>
window.xscode = {
  vendor_id: 'vuetify-site'
};
(()=>{function e(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function r(r){for(var n=1;n<arguments.length;n++){var c=null!=arguments[n]?arguments[n]:{};n%2?e(Object(c),!0).forEach((function(e){t(r,e,c[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(c)):e(Object(c)).forEach((function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(c,e))}))}return r}function t(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}!function(e,t,n,c){if(!e.xscode.ready){var o,i;(c=t.createElement("script")).async=1,c.src="https://d1etjkwi438lx3.cloudfront.net/xscode.js",t.head.appendChild(c);var s=new n((function(e,r){i=r,o=e}));s._resolve=o,s._reject=i,e.xscode=r(r({},e.xscode),{},{ready:s})}}(window,document,Promise)})();
</script>
<!--END XS:CODE CHAT WIDGET SCRIPT-->
