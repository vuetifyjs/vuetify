<template>
  <v-container class="d-flex flex-wrap align-center justify-center ga-3">
    <v-btn height="70" prepend-icon="$prev" spaced="start" width="220">
      <span class="text-right">
        <div class="mb-1">Previous</div>
        <small class="text-medium-emphasis">spaced: start</small>
      </span>
    </v-btn>

    <v-btn append-icon="$next" height="70" prepend-icon="$prev" spaced="both" width="220">
      <span>
        <div class="mb-1">Navigate</div>
        <small class="text-medium-emphasis">spaced: both</small>
      </span>
    </v-btn>

    <v-btn append-icon="$next" height="70" spaced="end" width="220">
      <span class="text-left">
        <div class="mb-1">Next</div>
        <small class="text-medium-emphasis">spaced: end</small>
      </span>
    </v-btn>
  </v-container>
</template>
