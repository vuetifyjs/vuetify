<template>
  <v-sheet
    :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
    class="px-3 pt-3 pb-12"
  >
    <v-responsive
      :max-width="type.indexOf('table') > -1 ? 900 : 500"
      class="mx-auto"
    >
      <v-responsive
        class="mx-auto mb-12"
        max-width="500"
      >
        <div class="d-flex pa-3 align-center flex-wrap">
          <v-select
            v-model="type"
            :items="types"
            class="mr-12"
            hide-details
            label="Pre-made Types"
            filled
            style="max-width: 250px;"
          ></v-select>

          <div>
            <v-switch
              v-model="boilerplate"
              inset
              hide-details
              label="Boilerplate"
            ></v-switch>

            <v-switch
              v-model="tile"
              inset
              hide-details
              label="Tile"
            ></v-switch>
          </div>
        </div>
      </v-responsive>

      <v-skeleton-loader
        ref="skeleton"
        :boilerplate="boilerplate"
        :type="type"
        :tile="tile"
        class="mx-auto"
      ></v-skeleton-loader>
    </v-responsive>
  </v-sheet>
</template>

<script>
  export default {
    // Vuetify components provide
    // a theme variable that is
    // used to determine dark
    inject: ['theme'],

    data: () => ({
      boilerplate: false,
      tile: false,
      type: 'list-item-avatar-three-line',
      types: [],
    }),

    mounted () {
      this.types = Object.keys(this.$refs.skeleton.rootTypes)
    },
  }
</script>
