<template>
  <v-toolbar color="blue-grey-darken-3">
    <v-spacer></v-spacer>

    <v-btn class="text-none" stacked>
      <v-badge color="success" dot>
        <v-icon>mdi-home-outline</v-icon>
      </v-badge>
    </v-btn>

    <v-btn class="text-none" stacked>
      <v-icon>mdi-account-multiple-outline</v-icon>
    </v-btn>

    <v-btn class="text-none" stacked>
      <v-badge color="error" content="9+">
        <v-icon>mdi-store-outline</v-icon>
      </v-badge>
    </v-btn>

    <v-btn class="text-none" stacked>
      <v-badge color="error" content="2">
        <v-icon>mdi-bell-outline</v-icon>
      </v-badge>
    </v-btn>

    <v-btn class="text-none" stacked>
      <v-icon>mdi-menu</v-icon>
    </v-btn>

    <v-spacer></v-spacer>
  </v-toolbar>
</template>
