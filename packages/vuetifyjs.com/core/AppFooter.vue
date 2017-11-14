<template lang="pug">
  v-footer(
    color="transparent"
    v-if="footer"
  ).app-footer
    v-layout(row justify-center).ma-0
      v-flex(
        v-if="previous.route"
        v-bind:xs6="!next.route"
      ).pa-0
        v-btn(
          color="primary"
          dark
          :icon="$vuetify.breakpoint.mdAndUp"
          :fab="$vuetify.breakpoint.smAndDown"
          :to="previous.route"
        )
          v-icon chevron_left
        span(v-text="previous.name").subheading.no-wrap.hidden-sm-and-down
      v-flex(
        xs3
        hidden-md-and-up
        layout
        align-center
        justify-center
      ) NAVIGATION
      v-flex(
        v-if="next.route && next.route !== '*'"
        v-bind:xs6="!previous.route"
        v-bind:offset-xs6="!previous.route"
      ).pa-0.text-xs-right
        span(v-text="next.name").subheading.no-wrap.hidden-sm-and-down
        v-btn(
          color="primary"
          dark
          :icon="$vuetify.breakpoint.mdAndUp"
          :fab="$vuetify.breakpoint.smAndDown"
          :to="next.route"
        )
          v-icon chevron_right
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
        footer: state => !state.stateless,
        next: state => state.next,
        previous: state => state.previous
      })
    }
  }
</script>

<style lang="stylus">
  .app-footer
    height: 90px

    &__title
      color: #fff

    &__sub-title
      color: rgba(#fff, .3)
</style>
