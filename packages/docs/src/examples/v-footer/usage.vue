<template>
  <v-footer>
    <v-card
      elevation="0"
      rounded="0"
      width="100%"
      class="bg-grey text-center"
    >
      <v-card-text>
        <v-btn
          class="mx-4"
          icon="mdi-home"
          variant="plain"
        ></v-btn>
        <v-btn
          class="mx-4"
          icon="mdi-email"
          variant="plain"
        ></v-btn>
        <v-btn
          class="mx-4"
          icon="mdi-calendar"
          variant="plain"
        ></v-btn>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="text-white">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
