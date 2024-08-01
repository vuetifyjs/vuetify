<template>
  <v-toolbar color="blue-grey-darken-3">
    <v-spacer></v-spacer>

    <v-btn class="text-none" stacked>
      <v-badge color="success" dot>
        <v-icon icon="i-mdi:home-outline"></v-icon>
      </v-badge>
    </v-btn>

    <v-btn class="text-none" stacked>
      <v-icon icon="i-mdi:account-multiple-outline"></v-icon>
    </v-btn>

    <v-btn class="text-none" stacked>
      <v-badge color="error" content="9+">
        <v-icon icon="i-mdi:store-outline"></v-icon>
      </v-badge>
    </v-btn>

    <v-btn class="text-none" stacked>
      <v-badge color="error" content="2">
        <v-icon icon="i-mdi:bell-outline"></v-icon>
      </v-badge>
    </v-btn>

    <v-btn class="text-none" stacked>
      <v-icon icon="i-mdi:menu"></v-icon>
    </v-btn>

    <v-spacer></v-spacer>
  </v-toolbar>
</template>
