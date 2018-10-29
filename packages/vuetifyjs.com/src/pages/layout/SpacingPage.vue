<template lang="pug">
  views-doc
    template(slot-scope="{ namespace }")
      section#playground
        helpers-section-head(:value="`${namespace}.playgroundHeader`")
        helpers-section-text(:value="`${namespace}.playgroundText1`")
        spacing-playground

      section#how-it-works
        helpers-section-head(value="Generic.Pages.howItWorks")
        helpers-section-text(:value="`${namespace}.howText`")
        helpers-section-text(:value="`${namespace}.propertyText`")
        ul.browser-list.pb-2
          li(
            v-for="item in properties"
            :key="item"
          )
            helpers-markdown(:source="item")
        helpers-section-text(:value="`${namespace}.directionText`")
        ul.browser-list.pb-2
          li(
            v-for="item in directions"
            :key="item"
          )
            helpers-markdown(:source="item")
        helpers-section-text(:value="`${namespace}.sizeText`")
        ul.browser-list
          li(
            v-for="item in sizes"
            :key="item"
          )
            helpers-markdown(:source="item")
</template>

<script>
  export default {
    computed: {
      directions () {
        return this.$t('Layout.Spacing.directions')
      },
      properties () {
        return this.$t('Layout.Spacing.properties')
      },
      sizes () {
        return this.$t('Layout.Spacing.sizes')
      }
    }
  }
</script>
