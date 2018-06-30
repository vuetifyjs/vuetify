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
          let file = example

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
