<template>
  <v-system-bar
    v-if="hasPromotion && banner"
    app
    class="d-block px-0"
    dark
    height="60"
  >
    <a
      :href="banner.metadata.link"
      class="d-block"
      rel="noopener"
      target="_blank"
      v-bind="banner.metadata.attributes"
      @click="onClick"
    >
      <v-img
        v-if="src"
        :src="src"
        height="60"
      />
    </a>

    <v-btn
      absolute
      fab
      right
      small
      style="top: 8px;"
      @click="onClose"
    >
      <v-icon class="mr-0">$clear</v-icon>
    </v-btn>
  </v-system-bar>
</template>

<script>
  // Utilities
  import { differenceInHours } from 'date-fns'
  import { get, sync } from 'vuex-pathify'

  export default {
    name: 'DefaultSystemBar',

    computed: {
      banner: get('banners/banner'),
      last: sync('user/last@promotion'),
      name: get('route/name'),
      hasPromotion () {
        const now = Date.now()

        return (
          differenceInHours(now, Number(this.last)) > 1
        )
      },
      src () {
        const { ultrawide, desktop, tablet, mobile } = this.banner?.metadata?.images

        if (this.$vuetify.breakpoint.width > 1480) return ultrawide?.url
        if (this.$vuetify.breakpoint.width > 720) return desktop?.url
        if (this.$vuetify.breakpoint.width > 336) return tablet?.url

        return mobile?.url
      },
    },

    methods: {
      onClick () {
        this.$gtag.event('click', {
          event_category: 'vuetify-banner',
          event_label: this.banner.metadata.label,
          value: this.name.toLowerCase(),
        })
      },
      onClose () {
        this.last = Date.now()
      },
    },
  }
</script>
