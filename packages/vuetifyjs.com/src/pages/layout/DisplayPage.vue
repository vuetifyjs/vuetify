<template lang="pug">
  views-doc
    template(slot-scope="{ namespace }")
      section#visibility
        helpers-section-head(:value="`${namespace}.visibilityHeader`")
        helpers-section-text(:value="`${namespace}.visibilityText`")
        helpers-section-text(:value="`${namespace}.breakpointText`")
        ul.pb-2
          li(
            v-for="item in breakpoints"
            :key="item"
          )
            helpers-markdown(:source="item")
        helpers-section-text(:value="`${namespace}.conditionText`")
        ul.pb-2
          li(
            v-for="item in conditions"
            :key="item"
          )
            helpers-markdown(:source="item")

      section#overflow
        helpers-section-head(:value="`${namespace}.overflowHeader`")
        helpers-section-text(:value="`${namespace}.overflowText`")
        ul.pb-2
          li(
            v-for="item in overflows"
            :key="item"
          )
            helpers-markdown(:source="item")
      section#display
        helpers-section-head(:value="`${namespace}.displayHeader`")
        helpers-section-text(:value="`${namespace}.displayText`")
        ul.pb-2
          li(
            v-for="item in displays"
            :key="item"
          )
            helpers-markdown(:source="item")

      section#examples
        helpers-section-head(value="Generic.Pages.examples")
        helpers-section-text(:value="`${namespace}.exampleText`")
        helpers-example(
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
      },
      overflows () {
        return this.$t('Layout.Display.overflows')
      }
    }
  }
</script>
