<template>
  <div class="d-flex justify-center ga-4 py-10">
    <v-btn v-tooltip>
      From activator
    </v-btn>

    <v-btn v-tooltip="'Custom text'">
      From value
    </v-btn>

    <v-btn v-tooltip="{ text: 'Custom text' }">
      From props
    </v-btn>
  </div>
</template>
