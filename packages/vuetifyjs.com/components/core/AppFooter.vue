<template lang="pug">
  v-footer(
    color="transparent"
    v-if="footer"
  ).app-footer
    v-layout(row justify-center).ma-0
      v-flex(
        v-if="prev"
        v-bind:xs6="!next"
      ).pa-0
        v-btn(
          color="primary"
          dark
          :icon="$vuetify.breakpoint.mdAndUp"
          :fab="$vuetify.breakpoint.smAndDown"
          :to="prev.href"
        )
          v-icon chevron_left
        span(v-text="prev.title").subheading.no-wrap.hidden-sm-and-down
      v-flex(
        xs3
        hidden-md-and-up
        hidden-xs-only
        layout
        align-center
        justify-center
      ) NAVIGATION
      v-flex(
        v-if="next"
        v-bind:xs6="!prev"
        v-bind:offset-xs6="!prev"
        class="nextnav"
      ).pa-0.text-xs-right
        span(v-text="next.title").subheading.no-wrap.hidden-sm-and-down
        v-btn(
          color="primary"
          dark
          :icon="$vuetify.breakpoint.mdAndUp"
          :fab="$vuetify.breakpoint.smAndDown"
          :to="next.href"
        )
          v-icon chevron_right
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState({
        footer: state => !state.stateless,
        items: state => state.appDrawerItems
      }),
      index () {
        return this.routes.findIndex(route => {
          return this.$route.path === route.href
        })
      },
      current () {
        return this.routes[this.index]
      },
      next () {
        return this.routes[this.index + 1] || false
      },
      prev () {
        return this.routes[this.index - 1] || false
      },
      routes () {
        return this.mapRoutes(this.items)
      }
    },

    methods: {
      mapRoutes (items, routes = [], group) {
        items.forEach(item => {
          if (item.items) {
            this.mapRoutes(item.items, routes, item.namespace || item.group)
          } else if (item.href && !item.href.match(/http/)) {
            const ref = Object.assign({}, item)
            if (group) {
              ref.href = `${group}/${ref.href}`
            }
            routes.push(ref)
          }
        })

        return routes
      }
    }
  }
</script>

<style lang="stylus">
  .app-footer
    height: 88px

    .nextnav
      @media all and (max-width: 959px)
        padding-right: 86px !important

    &__title
      color: #fff

    &__sub-title
      color: rgba(#fff, .3)
</style>
