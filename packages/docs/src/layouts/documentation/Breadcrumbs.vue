<template>
  <v-breadcrumbs
    v-if="structure !== false"
    :items="breadcrumbs"
    class="px-0 py-5 text-capitalize"
  />
</template>

<script>
  // Utilities
  import {
    get,
    sync,
  } from 'vuex-pathify'

  export default {
    name: 'DocumentationBreadcrumbs',

    data: () => ({ script: null }),

    computed: {
      breadcrumbs: get('documentation/breadcrumbs'),
      structure: sync('documentation/structure'),
    },

    watch: {
      '$route.path': {
        immediate: true,
        handler () {
          if (
            !this.breadcrumbs.length ||
            this.breadcrumbs[0].disabled
          ) return

          this.addMicroData()
        },
      },
    },

    methods: {
      addMicroData () {
        this.$ssrContext
          ? this.addMicroDataServer()
          : this.addMicroDataDesktop()
      },
      addMicroDataDesktop () {
        if (typeof document === 'undefined') return

        const script = document.createElement('script')

        script.type = 'application/ld+json'
        script.innerHTML = JSON.stringify(this.genBreadcrumbList(), 2, null)
        document.body.appendChild(script)

        this.script && document.body.removeChild(this.script)
        this.script = script
      },
      addMicroDataServer () {
        const breadcrumbs = JSON.stringify(this.genBreadcrumbList(), 2, null)

        this.$ssrContext.scripts += `\n<script type="application\\/ld+json">${breadcrumbs}<\\/script>\n`
      },
      genBreadcrumbList () {
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: this.breadcrumbs.map(this.genListItem),
        }
      },
      genListItem (breadcrumb, index) {
        const origin = this.$ssrContext
          ? `https://${this.$ssrContext.hostname}`
          : typeof window !== 'undefined' ? window.location.origin : 'https://vuetifyjs.com'

        return {
          '@type': 'ListItem',
          item: `${origin}${breadcrumb.to}`,
          name: breadcrumb.text,
          position: index + 1,
        }
      },
    },
  }
</script>
