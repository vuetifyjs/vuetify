<template lang="pug">
  example-view(:data="data")
    section(slot-scope="props")
      section-head(value="Motion.Scrolling.firstHeader")#first
      section-text(value="Motion.Scrolling.loremIpsum")
      section-text(value="Motion.Scrolling.loremIpsum")
      section-text(value="Motion.Scrolling.loremIpsum")

      section-head(value="Motion.Scrolling.secondHeader")#second
      section-text(value="Motion.Scrolling.loremIpsum")
      section-text(value="Motion.Scrolling.loremIpsum")
      section-text(value="Motion.Scrolling.loremIpsum")

      section-head(value="Motion.Scrolling.thirdHeader")#third
      section-text(value="Motion.Scrolling.loremIpsum")
      section-text(value="Motion.Scrolling.loremIpsum")
      section-text(value="Motion.Scrolling.loremIpsum")
</template>

<script>
  export default {
    computed: {
      components () {
        return this.$t('Motion.Scrolling.components')
      },
      data () {
        return {
          folder: 'scrolling',
          components: this.components,
          examples: this.examples
        }
      },
      examples () {
        return this.$t('Motion.Scrolling.examples')[0]
      }
    }
  }
</script>
