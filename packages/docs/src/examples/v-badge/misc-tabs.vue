<template>
  <v-toolbar>
    <v-tabs
      dark
      background-color="primary"
      grow
    >
      <v-tab>
        <v-badge
          color="pink"
          dot
        >
          Item One
        </v-badge>
      </v-tab>

      <v-tab>
        <v-badge
          color="green"
          content="6"
        >
          Item Two
        </v-badge>
      </v-tab>

      <v-tab>
        <v-badge
          color="deep-purple accent-4"
          icon="mdi-vuetify"
        >
          Item Three
        </v-badge>
      </v-tab>
    </v-tabs>
  </v-toolbar>
</template>
