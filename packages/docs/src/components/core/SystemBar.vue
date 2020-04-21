<template>
  <v-system-bar
    v-if="!hasClosedBanner"
    id="core-system-bar"
    app
    color="#1B2E83"
    dark
    height="56"
    class="align-center"
    @click="$ga.event('system-bar', 'click', 'vueschool')"
  >
    <v-responsive
      class="mx-auto shrink pr-12"
      max-width="1280"
    >
      <a
        class="d-flex py-3 align-center flex-nowrap"
        href="https://vueschool.io/plans?friend=vuetify&utm_source=Vuetifyjs.com&utm_medium=Link&utm_content=Ad&utm_campaign=Flash%20March"
        rel="sponsored"
        target="_blank"
        style="color: inherit;"
      >
        <v-img
          class="mx-3"
          contain

          src="https://cdn.vuetifyjs.com/images/vuetify-ads/vue-school-2.png"
        />

        <v-divider
          vertical
          class="hidden-xs-only mx-3 mx-md-6"
        />

        <div
          :class="{
            [$vuetify.breakpoint.mdAndDown ? 'subtitle-2' : 'headline']: true
          }"
          class="text-uppercase font-weight-medium white--text text-right text-sm-left"
        >
          <span class="yellow--text font-weight-black">$40&nbsp;</span>
          <span class="hidden-xs-only">OFF VUE SCHOOL'S</span>
          VIDEO COURSES
        </div>

        <v-divider
          class="ml-3 mr-2 ml-md-6 mr-md-5"
          vertical
        />

        <v-img
          :max-width="$vuetify.breakpoint.smAndDown ? 125 : 180"
          class="d-none d-sm-inline-block"
          contain
          src="https://cdn.vuetifyjs.com/images/vuetify-ads/vueschool-group.png"
        />

        <v-btn
          class="mx-5 hidden-md-and-down"
          color="yellow"
          depressed
          light
          rounded
          small
        >
          Master Vue.js
        </v-btn>
      </a>
    </v-responsive>

    <v-btn
      class="core-system-bar__close mr-4"
      icon
      small
      @click.stop="hasClosedBanner = true"
    >
      <v-icon class="mr-0">
        mdi-close
      </v-icon>
    </v-btn>
  </v-system-bar>
</template>

<script>
  export default {
    name: 'CoreSystemBar',

    data: () => ({
      hasClosedBanner: true,
    }),
  }
</script>

<style lang="sass">
  #core-system-bar
    a
      text-decoration: none

    .core-system-bar__close
      position: absolute
      right: 0
</style>
