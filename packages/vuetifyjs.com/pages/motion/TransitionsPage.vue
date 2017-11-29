<template lang="pug">
  component-page(:data="data")
    template(slot="bottom")
      section#create-your-own
        section-head(value="Motion.Transitions.createYourOwnHeader")
        section-text(value="Motion.Transitions.createYourOwnText1")
        markup(lang="javascript")
          |import { createSimpleTransition } from '../../node_modules/vuetify/src/util/helpers'
          |&nbsp;
          |const myTransition = createSimpleTransition('my-transition')
          |&nbsp;
          |Vue.component('my-transition', myTransition)
        section-text(value="Motion.Transitions.createYourOwnText2")
        markup(lang="stylus")
          |.fade-transition
          |   &-leave-active
          |     position: absolute
          |&nbsp;
          |   &-enter-active, &-leave, &-leave-to
          |     transition: $primary-transition
          |&nbsp;
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