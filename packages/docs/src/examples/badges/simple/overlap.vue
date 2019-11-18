<template>
  <div class="text-center">
    <v-badge
      color="purple"
      left
      overlap
    >
      <template v-slot:badge>
        <v-icon>mdi-check</v-icon>
      </template>

      <v-icon
        color="grey lighten-1"
        large
      >
        account_circle
      </v-icon>
    </v-badge>

    <v-badge
      overlap
      color="orange"
    >
      <template v-slot:badge>
        <v-icon>mdi-bell</v-icon>
      </template>

      <v-icon
        large
        color="grey darken-1"
      >
        account_box
      </v-icon>
    </v-badge>
  </div>
</template>
