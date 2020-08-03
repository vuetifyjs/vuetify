<template>
  <v-app-bar
    id="default-app-bar"
    :color="dark ? undefined : 'white'"
    app
    class="v-bar--underline"
    flat
    v-bind="{ [`clipped-${rtl ? 'left' : 'right'}`]: true }"
  >
    <v-expand-x-transition>
      <div
        v-if="!search"
        class="transition-swing"
      >
        <v-app-bar-nav-icon
          class="hidden-md-and-up"
          @click="drawer = !drawer"
        />
      </div>
    </v-expand-x-transition>

    <template v-if="$vuetify.breakpoint.mobile">
      <search-toggle />

      <v-spacer />
    </template>

    <default-search v-if="!$vuetify.breakpoint.mobile || search" />

    <template v-if="!search">
      <template v-if="!$vuetify.breakpoint.mobile">
        <v-spacer />

        <guide-link />

        <support-menu />

        <app-bar-divider />

        <store-link />

        <jobs-link />
      </template>

      <settings-toggle />

      <notifications-menu />

      <app-bar-divider v-show="!$vuetify.breakpoint.mobile" />

      <language-menu />
    </template>
  </v-app-bar>
</template>

<script>
  // Components
  import VDivider from 'vuetify/lib/components/VDivider'

  // Utilities
  import { sync } from 'vuex-pathify'

  export default {
    name: 'DefaultBar',

    components: {
      AppBarDivider: {
        functional: true,

        render (h) {
          return h(VDivider, {
            staticClass: 'mx-2 my-auto',
            props: { inset: true, vertical: true },
            style: { maxHeight: '16px' },
          })
        },
      },
      DefaultSearch: () => import(
        /* webpackChunkName: "default-search" */
        '@/layouts/default/Search'
      ),
    },

    computed: {
      ...sync('app', [
        'drawer',
        'search',
      ]),
      ...sync('user', [
        'theme@dark',
        'rtl',
      ]),
      show () {
        return !this.$vuetify.breakpoint.mobile || this.search
      },
    },
  }
</script>

<style lang="sass">
  #default-app-bar
    .v-btn--active.v-btn--app:not(:hover):not(:focus)
      &::before
        opacity: 0
</style>
