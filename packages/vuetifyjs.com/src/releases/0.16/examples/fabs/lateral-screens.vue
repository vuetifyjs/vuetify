<template>
  <div id="lateral">
    <v-tabs grow v-model="tabs">
      <v-toolbar color="grey lighten-4" light>
        <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title>Page title</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>
      </v-toolbar>
      <v-tabs-bar class="grey lighten-4">
        <v-tabs-item href="#one">Item One</v-tabs-item>
        <v-tabs-item href="#two">Item Two</v-tabs-item>
        <v-tabs-item href="#three">Item Three</v-tabs-item>
        <v-tabs-slider></v-tabs-slider>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content v-for="content in ['one', 'two', 'three']" :key="content" :id="content">
          <v-card height="200px" flat>
          </v-card>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
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
  #lateral {
    height: 400px;
  }

  #lateral .speed-dial,
  #lateral .btn--floating {
    position: absolute;
  }
</style>
