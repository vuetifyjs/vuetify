<template lang="pug">
  doc-view
    template(slot-scope="{ namespace }")
      section#how-it-works
        section-head(value="Generic.Pages.howItWorks")
        section-text(:value="`${namespace}.howText`")
        section-text(:value="`${namespace}.propertyText`")
        ul.browser-list.pb-2
          li(
            v-for="item in properties"
            :key="item"
          )
            markdown(:source="item")
        section-text(:value="`${namespace}.directionText`")
        ul.browser-list.pb-2
          li(
            v-for="item in directions"
            :key="item"
          )
            markdown(:source="item")
        section-text(:value="`${namespace}.sizeText`")
        ul.browser-list
          li(
            v-for="item in sizes"
            :key="item"
          )
            markdown(:source="item")

      section#examples
        section-head(value="Generic.Pages.examples")
        markup(lang="stylus")
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
        section-head(:value="`${namespace}.horizontalHeader`")
        example(
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
