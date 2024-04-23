<template>
  <v-row>
    <v-col
      v-for="(bar, i) in bars"
      :key="i"
      class="my-4"
      cols="12"
      md="6"
      sm="12"
    >
      <v-card
        color="grey-lighten-4"
        height="200px"
        flat
      >
        <v-toolbar
          :color="bar.class"
          :dark="bar.dark"
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
          <v-toolbar-title>Title</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
  const bars = [
    { class: '' },
    { class: '', dark: true },
    { class: 'primary', dark: true },
    { class: 'elevation-0' },
  ]
</script>

<script>
  export default {
    data: () => ({
      bars: [
        { class: '' },
        { class: '', dark: true },
        { class: 'primary', dark: true },
        { class: 'elevation-0' },
      ],
    }),
  }
</script>
