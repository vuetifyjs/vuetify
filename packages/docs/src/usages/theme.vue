<template>
  <div class="ma-12 pa-12">
    <v-card dark>
      <v-toolbar
        color="primary"
        flat
      >
        <v-switch
          v-model="$vuetify.theme.dark"
          inset
          hide-details
          label="Theme Dark"
        />
      </v-toolbar>

      <v-card-text>
        <v-list>
          <v-list-item>
            <v-list-item-title>One</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Two</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Three</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider class="my-8" />

        <v-theme-provider root>
          <v-list>
            <v-list-item>
              <v-list-item-title>One</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Two</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Three</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-theme-provider>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
  export default {
    props: {
      attrs: {
        type: Object,
        default: () => ({}),
      },
    },

    data: vm => ({
      initialDark: vm.$vuetify
        ? vm.$vuetify.theme.dark
        : false,
    }),

    beforeDestroy () {
      if (!this.$vuetify) return

      this.$vuetify.theme.dark = this.initialDark
    },
  }
</script>
