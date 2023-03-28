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
      <v-icon start icon="mdi-label"></v-icon>
      Tags
    </v-chip>

    <v-chip
      class="ma-2"
      color="primary"
      label
    >
      <v-icon start icon="mdi-account-circle-outline"></v-icon>
      John Leider
    </v-chip>

    <v-chip
      class="ma-2"
      closable
      color="cyan"
      label
    >
      <v-icon start icon="mdi-twitter"></v-icon>
      New Tweets
    </v-chip>
  </div>
</template>
