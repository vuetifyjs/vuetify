<template lang="pug">
  views-example(:data="data")
    section(slot-scope="props")
      helpers-section-head(value="Motion.Scrolling.firstHeader")#first
      helpers-section-text(value="Motion.Scrolling.loremIpsum")
      helpers-section-text(value="Motion.Scrolling.loremIpsum")
      helpers-section-text(value="Motion.Scrolling.loremIpsum")

      helpers-section-head(value="Motion.Scrolling.secondHeader")#second
      helpers-section-text(value="Motion.Scrolling.loremIpsum")
      helpers-section-text(value="Motion.Scrolling.loremIpsum")
      helpers-section-text(value="Motion.Scrolling.loremIpsum")

      helpers-section-head(value="Motion.Scrolling.thirdHeader")#third
      helpers-section-text(value="Motion.Scrolling.loremIpsum")
      helpers-section-text(value="Motion.Scrolling.loremIpsum")
      helpers-section-text(value="Motion.Scrolling.loremIpsum")
</template>

<script>
  // Helpers
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState('app', ['components']),
      data () {
        return {
          folder: 'scrolling',
          components: this.components.goto.components,
          examples: this.examples
        }
      },
      examples () {
        const component = this.components['goto']

        if (!component) return []

        return component.examples.map(example => {
          const file = example

          return {
            file,
            desc: `Motion.Scrolling.examples.${file}.desc`,
            header: `Motion.Scrolling.examples.${file}.header`
          }
        })
      }
    }
  }
</script>
