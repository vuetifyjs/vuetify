<template>
  <div class="d-flex flex-wrap ga-3">
    <v-card
      v-for="n in 8"
      :key="n"
      color="secondary"
      width="200px"
    >
      <v-card-text>
        Gapped
      </v-card-text>
    </v-card>
  </div>
</template>
