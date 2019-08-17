<template>
  <v-row
    class="py-12"
    justify="space-around"
  >
    <v-btn
      color="primary"
    >
      With ripple (default)
    </v-btn>
    <v-btn
      :ripple="false"
      color="primary"
    >
      Without ripple
    </v-btn>
    <v-btn
      :ripple="{ center: true }"
      color="primary"
    >
      With centered ripple
    </v-btn>
    <v-btn
      :ripple="{ class: 'red--text' }"
      text
    >
      With red ripple
    </v-btn>
  </v-row>
</template>
