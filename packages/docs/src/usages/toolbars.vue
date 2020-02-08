<template>
  <v-toolbar
    :src="attrs.image ? 'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg' : undefined"
    v-bind="attrs"
    :elevation="attrs.flat ? undefined : attrs.elevation"
    :dark="attrs.image"
  >
    <template v-if="attrs.extended" #extension>
      <v-toolbar-items>
        <v-btn text>Link 1</v-btn>
        <v-btn text>Link 2</v-btn>
        <v-btn text>Link 3</v-btn>
      </v-toolbar-items>
    </template>

    <v-app-bar-nav-icon />

    <v-toolbar-title>Title</v-toolbar-title>

    <v-spacer />

    <template v-if="$vuetify.breakpoint.smAndUp">
      <v-btn icon>
        <v-icon>mdi-export-variant</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-delete-circle</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </template>
  </v-toolbar>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
  }
</script>
