<template>
  <div>
    <v-sheet class="px-6 py-2 border-b mb-3" color="surface">
      <div class="d-flex ga-2 ga-md-12 flex-wrap align-center justify-center">
        <v-chip-group v-model="density" mandatory>
          <v-chip text="default" value="default" filter label></v-chip>
          <v-chip text="comfortable" value="comfortable" filter label></v-chip>
          <v-chip text="compact" value="compact" filter label></v-chip>
        </v-chip-group>

        <v-chip-group v-model="features" multiple>
          <v-chip text="pills" value="pills" filter label></v-chip>
          <v-chip text="floating" value="floating" filter label></v-chip>
          <v-chip text="detached" value="detached" filter label></v-chip>
        </v-chip-group>
      </div>
    </v-sheet>

    <v-audio
      :density="density"
      :detached="features.includes('detached')"
      :floating="features.includes('floating')"
      :peaks="peaks"
      :pills="features.includes('pills')"
      :skip-interval="15"
      class="mx-auto"
      color="primary"
      max-width="520"
      src="https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3"
    ></v-audio>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const density = shallowRef('default')
  const features = shallowRef([])
  const peaks = [
    0.35, 0.57, 0.69, 0.85, 0.61, 0.43, 0.53, 0.36,
    0.02, 0.01, 0.03, 0.01, 0.41, 0.65, 1.00, 0.68,
    0.75, 0.25, 0.38, 0.48, 0.32, 0.02, 0.01, 0.02,
    0.29, 0.48, 0.87, 0.21, 0.33, 0.53, 0.83, 0.98,
  ]
</script>

<script>
  export default {
    data: () => ({
      density: 'default',
      features: [],
      peaks: [
        0.35, 0.57, 0.69, 0.85, 0.61, 0.43, 0.53, 0.36,
        0.02, 0.01, 0.03, 0.01, 0.41, 0.65, 1.00, 0.68,
        0.75, 0.25, 0.38, 0.48, 0.32, 0.02, 0.01, 0.02,
        0.29, 0.48, 0.87, 0.21, 0.33, 0.53, 0.83, 0.98,
      ],
    }),
  }
</script>
