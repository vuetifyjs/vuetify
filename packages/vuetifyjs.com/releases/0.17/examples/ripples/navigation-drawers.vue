<template>
  <v-card height="30vh" style="overflow: hidden;">
    <v-app id="example-4" standalone>
      <v-navigation-drawer
        permanent
        absolute
        height="30vh"
        style="z-index: 1"
      >
        <v-list>
          <v-list-tile ripple v-for="i in 3" :key="i" @click="">
            <v-list-tile-title>Link {{ i }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    </v-app>
  </v-card>
</template>
