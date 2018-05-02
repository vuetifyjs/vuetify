<template>
  <v-layout row wrap>
    <v-flex
      v-for="(bar, i) in bars"
      :key="i"
      xs12
      sm12
      md6
      class="my-3"
    >
      <v-card color="grey lighten-4" flat height="200px">
        <v-toolbar :color="bar.class" :dark="bar.dark">
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>Title</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>favorite</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>more_vert</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data: () => ({
      bars: [
        { 'class': '' },
        { 'class': '', dark: true },
        { 'class': 'primary', dark: true },
        { 'class': 'elevation-0' }
      ]
    })
  }
</script>
