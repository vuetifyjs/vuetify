<template>
  <div id="lateral">
    <v-toolbar dark tabs flat color="indigo">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Page title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-tabs
        align-with-title
        v-model="tabs"
        slot="extension"
        color="transparent"
      >
        <v-tab href="#one">Item One</v-tab>
        <v-tab href="#two">Item Two</v-tab>
        <v-tab href="#three">Item Three</v-tab>
        <v-tabs-slider color="pink"></v-tabs-slider>
      </v-tabs>
    </v-toolbar>
    <v-tabs-items v-model="tabs">
      <v-tab-item v-for="content in ['one', 'two', 'three']" :key="content" :id="content">
        <v-card height="200px" flat>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-fab-transition>
      <v-btn
        :color="activeFab.color"
        :key="activeFab.icon"
        dark
        fab
        fixed
        bottom
        left
        v-model="fab"
      >
        <v-icon>{{ activeFab.icon }}</v-icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
  export default {
    data: () => ({
      fab: false,
      hidden: false,
      tabs: null
    }),

    computed: {
      activeFab () {
        switch (this.tabs) {
          case 'one': return { 'color': 'indigo', icon: 'share' }
          case 'two': return { 'color': 'red', icon: 'edit' }
          case 'three': return { 'color': 'green', icon: 'keyboard_arrow_up' }
          default: return {}
        }
      }
    }
  }
</script>

<style>
  /* This is for documentation purposes and will not be needed in your application */
  #lateral .speed-dial,
  #lateral .btn--floating {
    position: absolute;
  }
  #lateral .btn--floating {
    margin: 0 0 16px 16px;
  }
</style>
