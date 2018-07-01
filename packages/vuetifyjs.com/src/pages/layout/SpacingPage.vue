<template lang="pug">
  views-doc
    template(slot-scope="{ namespace }")
      section#how-it-works
        helpers-section-head(value="Generic.Pages.howItWorks")
        helpers-section-text(:value="`${namespace}.howText`")
        helpers-section-text(:value="`${namespace}.propertyText`")
        ul.browser-list.pb-2
          li(
            v-for="item in properties"
            :key="item"
          )
            markdown(:source="item")
        helpers-section-text(:value="`${namespace}.directionText`")
        ul.browser-list.pb-2
          li(
            v-for="item in directions"
            :key="item"
          )
            markdown(:source="item")
        helpers-section-text(:value="`${namespace}.sizeText`")
        ul.browser-list
          li(
            v-for="item in sizes"
            :key="item"
          )
            markdown(:source="item")

      section#examples
        helpers-section-head(value="Generic.Pages.examples")
        helpers-markup(lang="stylus")
          |$spacer := 16px
          |
          |.mt-5
          |   margin-top: ($spacer * 3) !important
          |
          |.py-2
          |   padding-left: ($spacer * .5) !important
          |   padding-right: ($spacer * .5) !important
          |
          |.pa-1
          |   padding: ($spacer * .25) !important
          |
          |.mx-3
          |   margin-right: $spacer !important
          |   margin-left: $spacer !important

      section#horizontal-centering
        helpers-section-head(:value="`${namespace}.horizontalHeader`")
        helpers-example(
          readonly
          file="spacing/horizontal"
          :desc="$t(`${namespace}.horizontalText`)"
        )
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
