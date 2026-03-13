<template>
  <v-video
    class="mx-auto"
    max-width="450"
    src="https://cdn.jsek.work/cdn/vt-sunflowers.mp4"
    error
  >
    <template v-slot:error-details>
      <div>
        <div>
          <div class="font-weight-bold">Video unavailable</div>
          <div class="text-body-medium">Report problem to our <a href="" @click.stop @mousedown.prevent @pointerdown.stop>support</a></div>
        </div>
      </div>
    </template>
  </v-video>
</template>
