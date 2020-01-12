<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      dark
      scroll-target="#playground-example"
      :src="attrs.image ? 'https://picsum.photos/1920/1080?random' : ''"
      v-bind="attrs"
    >
      <v-app-bar-nav-icon />

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer />

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet
      id="playground-example"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1500px;" />
    </v-sheet>
  </v-card>
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],

    data: () => ({
      alert: true,
    }),
  }
</script>
