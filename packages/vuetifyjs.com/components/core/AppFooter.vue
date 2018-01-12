<template lang="pug">
  v-fade-transition(mode="out-in")
    v-footer(
      color="transparent"
      v-if="footer"
      height="90"
      :key="$route.path"
    ).app-footer.justify-center
      v-layout(justify-space-between).ma-0
        v-flex(v-if="prev")
          router-link(:to="prev.href").d-inline-flex.align-center
            v-btn(
              color="primary"
              dark
              :icon="$vuetify.breakpoint.mdAndUp"
              :fab="$vuetify.breakpoint.smAndDown"
            )
              v-icon chevron_left
            span(v-text="prev.title").subheading.no-wrap.hidden-xs-only
        v-flex(
          :mr-5="$vuetify.breakpoint.xsOnly"
          :pr-4="$vuetify.breakpoint.xsOnly"
          v-if="next"
        ).text-xs-right
          router-link(:to="next.href").d-inline-flex.align-center
            span(v-text="next.title").subheading.no-wrap.hidden-xs-only
            v-btn(
              color="primary"
              dark
              :icon="$vuetify.breakpoint.mdAndUp"
              :fab="$vuetify.breakpoint.smAndDown"
            )
              v-icon chevron_right
</template>

<script>
  import { mapState } from 'vuex'
  import appDrawerItems from '@/assets/app-drawer-items'

  export default {
    data: () => ({
      items: appDrawerItems
    }),
    computed: {
      ...mapState({
        footer: state => !state.stateless,
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
      },
      styles () {
        const styles = {}

        if (this.$vuetify.breakpoint.mdAndUp) {
          styles.paddingLeft = `${this.$vuetify.application.left}px`
        }

        return styles
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
    a
      color: inherit
      text-decoration: none

    &__title
      color: #fff

    &__sub-title
      color: rgba(#fff, .3)
</style>
