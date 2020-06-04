<template>
  <v-container tag="section">
    <component :is="page" />
  </v-container>
</template>

<script>
  // Utilities
  import { genMetaData } from '@/util/metadata'

  // This should only be extended by other pages
  export default {
    name: 'Page',

    metaInfo () {
      if (!this.attributes) return {}

      const {
        description,
        keywords,
        title,
      } = this.attributes

      return genMetaData(
        title,
        description,
        keywords,
      )
    },

    data: () => ({
      attributes: undefined,
      page: undefined,
    }),

    watch: {
      '$route.params.locale': 'update',
    },

    created () {
      this.update()
    },

    methods: {
      async load () { return {} },
      async update () {
        const { attributes, vue = {} } = await this.load(this.$route)

        this.attributes = attributes
        this.page = vue.component
      },
    },
  }
</script>
