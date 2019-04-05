<template>
  <div>
    <v-toolbar tabs>
      <v-toolbar-side-icon></v-toolbar-side-icon>

      <v-toolbar-title>Page title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          fixed-tabs
          color="transparent"
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab href="#mobile-tabs-5-1" class="primary--text">
            <v-icon>phone</v-icon>
          </v-tab>

          <v-tab href="#mobile-tabs-5-2" class="primary--text">
            <v-icon>favorite</v-icon>
          </v-tab>

          <v-tab href="#mobile-tabs-5-3" class="primary--text">
            <v-icon>account_box</v-icon>
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tabs" class="white elevation-1">
      <v-tab-item
        v-for="i in 3"
        :key="i"
        :value="'mobile-tabs-5-' + i"
      >
        <v-card>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tabs: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    }
  }
</script>
