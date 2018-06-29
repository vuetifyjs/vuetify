<template lang="pug">
  doc-view
    template(slot-scope="{ namespace }")
      section#visibility
        section-head(:value="`${namespace}.visibilityHeader`")
        section-text(:value="`${namespace}.visibilityText`")
        section-text(:value="`${namespace}.breakpointText`")
        ul.browser-list.pb-2
          li(
            v-for="item in breakpoints"
            :key="item"
          )
            markdown(:source="item")
        section-text(:value="`${namespace}.conditionText`")
        ul.browser-list.pb-2
          li(
            v-for="item in conditions"
            :key="item"
          )
            markdown(:source="item")

      section#display
        section-head(:value="`${namespace}.displayHeader`")
        section-text(:value="`${namespace}.displayText`")
        ul.browser-list.pb-2
          li(
            v-for="item in displays"
            :key="item"
          )
            markdown(:source="item")

      section#examples
        section-head(value="Generic.Pages.examples")
        example(
          readonly
          file="display/hiddenElements"
        )
</template>

<script>
  export default {
    computed: {
      breakpoints () {
        return this.$t('Layout.Display.breakpoints')
      },
      conditions () {
        return this.$t('Layout.Display.conditions')
      },
      displays () {
        return this.$t('Layout.Display.displays')
      }
    }
  }
</script>
