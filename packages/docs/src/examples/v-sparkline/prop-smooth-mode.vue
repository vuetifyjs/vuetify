<template>
  <v-container>
    <v-card class="pa-5 mx-auto" max-width="500" rounded="lg">
      <div class="d-flex align-center mb-4">
        <v-switch
          v-model="monotone"
          color="primary"
          label="monotone"
          hide-details
        ></v-switch>

        <v-spacer></v-spacer>

        <v-slider
          v-model="smooth"
          :max="20"
          :min="0"
          class="ml-4"
          density="compact"
          label="smooth"
          step="1"
          style="max-width: 200px"
          hide-details
          thumb-label
        ></v-slider>
      </div>

      <v-sparkline
        :model-value="values"
        :smooth="smooth"
        :smooth-mode="monotone ? 'monotone' : 'default'"
        color="primary"
        height="80"
        line-width="2"
        marker-stroke="rgb(var(--v-theme-surface))"
        padding="8"
        stroke-linecap="round"
        show-markers
      ></v-sparkline>
    </v-card>
  </v-container>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const monotone = shallowRef(true)
  const smooth = shallowRef(16)
  const values = [0, 10, 10, 3, 3, 0.1, 0, 0.1, 10, 5]
</script>
