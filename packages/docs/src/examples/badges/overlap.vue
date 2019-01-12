<template>
  <div class="text-xs-center">
    <v-badge
      color="purple"
      left
      overlap
    >
      <v-icon
        slot="badge"
        dark
        small
      >
        done
      </v-icon>
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
      <v-icon
        slot="badge"
        dark
        small
      >
        notifications
      </v-icon>
      <v-icon
        large
        color="grey darken-1"
      >
        account_box
      </v-icon>
    </v-badge>
  </div>
</template>
