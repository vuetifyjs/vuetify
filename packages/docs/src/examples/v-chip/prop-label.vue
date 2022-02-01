<template>
  <div class="text-center">
    <v-chip
      class="ma-2"
      label
    >
      Label
    </v-chip>

    <v-chip
      class="ma-2"
      color="pink"
      label
      text-color="white"
    >
      <v-icon left icon="mdi-label"></v-icon>
      Tags
    </v-chip>

    <v-chip
      class="ma-2"
      color="primary"
      label
    >
      <v-icon left icon="mdi-account-circle-outline"></v-icon>
      John Leider
    </v-chip>

    <v-chip
      class="ma-2"
      close
      color="cyan"
      label
      text-color="white"
    >
      <v-icon left icon="mdi-twitter"></v-icon>
      New Tweets
    </v-chip>
  </div>
</template>
