<template lang="pug">
  views-example(:data="data")
    section(slot-scope="props")#create-your-own
      helpers-section-head(value="Motion.Transitions.createYourOwnHeader")
      helpers-section-text(value="Motion.Transitions.createYourOwnText1")
      helpers-markup(lang="javascript")
        | import { createSimpleTransition } from 'vuetify/es5/util/helpers'
        | &nbsp;
        | const myTransition = createSimpleTransition('my-transition')
        | &nbsp;
        | Vue.component('my-transition', myTransition)
      helpers-section-text(value="Motion.Transitions.createYourOwnText2")
      helpers-markup(lang="stylus")
        | .fade-transition
        |   &-leave-active
        |     position: absolute
        | &nbsp;
        |   &-enter-active, &-leave, &-leave-to
        |     transition: $primary-transition
        | &nbsp;
        |   &-enter, &-leave-to
        |     opacity: 0
</template>

<script>
  export default {
    computed: {
      components () {
        return this.$t('Motion.Transitions.components')
      },
      data () {
        return {
          folder: 'transitions',
          components: this.components,
          examples: this.examples
        }
      },
      examples () {
        return this.$t('Motion.Transitions.examples')[0]
      }
    }
  }
</script>
