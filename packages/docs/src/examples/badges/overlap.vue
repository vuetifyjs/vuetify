<template>
  <div class="text-xs-center">
    <v-badge
      color="purple"
      left
      overlap
    >
      <template v-slot:badge>
        <v-icon
          dark
          small
        >
          done
        </v-icon>
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
        <v-icon
          dark
          small
        >
          notifications
        </v-icon>
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
