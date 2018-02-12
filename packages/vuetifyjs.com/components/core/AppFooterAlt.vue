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
          router-link(:to="genPath(prev)").d-inline-flex.align-center
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
          router-link(:to="genPath(next)").d-inline-flex.align-center
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
  // Utilities
  import { mapState } from 'vuex'
  import { kebab } from '@/util/helpers'
  import appDrawerItems from '@/assets/app-drawer-items'

  export default {
    data: () => ({
      items: appDrawerItems
    }),
    computed: {
      ...mapState('app', {
        footer: state => !state.stateless
      }),
      index () {
        const path = this.$route.path.replace(/\/[^/]*\/(.*)/, '/$1')

        return this.routes.findIndex(route => {
          return path === route.route
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
      genPath (item) {
        // Hacky workaround for link to store
        return (`/${this.$i18n.locale}${item.route}`).replace('/index', '')
      },
      mapRoutes (items, routes = [], group) {
        items.forEach(item => {
          if (item.items) {
            this.mapRoutes(item.items, routes, item.namespace || item.group)
          } else if (item.name) {
            const ref = Object.assign({}, item)

            ref.group = group
            ref.route = `/${group ? group + '/' : ''}${kebab(ref.name)}`

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
