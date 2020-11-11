<template>
  <div class="text-center">
    <v-chip
      class="ma-2"
      color="success"
      outlined
    >
      <v-icon left>
        mdi-server-plus
      </v-icon>
      Server Status
    </v-chip>

    <v-chip
      class="ma-2"
      color="primary"
      outlined
      pill
    >
      User Account
      <v-icon right>
        mdi-account-outline
      </v-icon>
    </v-chip>

    <v-chip
      class="ma-2"
      color="deep-purple accent-4"
      outlined
    >
      <v-icon left>
        mdi-wrench
      </v-icon>
      Update Settings
    </v-chip>

    <v-chip
      class="ma-2"
      close
      color="indigo darken-3"
      outlined
    >
      <v-icon left>
        mdi-fire
      </v-icon>
      New Posts Available
    </v-chip>
  </div>
</template>
