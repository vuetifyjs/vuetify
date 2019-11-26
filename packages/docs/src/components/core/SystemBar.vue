<template>
  <v-system-bar
    v-if="!hasClosedBanner"
    id="core-system-bar"
    app
    color="#1D285F"
    dark
    height="76"
    class="align-center"
    @click="$ga.event('system-bar', 'click', 'vueschool')"
  >
    <v-responsive
      class="mx-auto shrink pr-12"
      max-width="1280"
    >
      <a
        class="d-flex py-3"
        href="https://vueschool.io/sales/blackfriday?friend=vuetify&utm_source=Vuetifyjs.com&utm_medium=Link&utm_content=Ad&utm_campaign=Black%20Friday"
        rel="sponsored"
        target="_blank"
        style="color: inherit;"
      >
        <v-img
          width="36"
          contain
          src="https://cdn.vuetifyjs.com/images/vuetify-ads/vueschool-2.svg"
        />

        <v-divider
          vertical
          class="mx-3 mx-md-6"
        />

        <div class="d-md-flex align-center">
          <div
            class="text-uppercase font-weight-medium white--text mb-sm-1 mb-md-0 mb-0"
            :class="{
              [$vuetify.breakpoint.mdAndDown ? 'subtitle-2' : 'headline']: true
            }"
          >
            Black Friday 40% Off at Vue School
          </div>

          <v-divider
            vertical
            class="mx-6 hidden-sm-and-down"
          />

          <div class="d-none align-center d-sm-flex">
            <v-img
              :max-width="$vuetify.breakpoint.smAndDown ? 125 : 180"
              src="https://cdn.vuetifyjs.com/images/vuetify-ads/vueschool-group.png"
              class="d-inline-block"
              contain
            />

            <div
              class="mx-6 d-md-inline-block"
              style="opacity: .7;"
              :class="{
                [
                  $vuetify.breakpoint.smAndDown
                    ? 'font-weight-light caption white--text'
                    : 'subtitle-1'
                ]: true,
              }"
            >
              Level Up with Video Courses
            </div>
          </div>
        </div>
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
      hasClosedBanner: false,
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
