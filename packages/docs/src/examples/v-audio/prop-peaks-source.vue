<template>
  <v-container max-width="560">
    <v-file-input
      v-model="file"
      accept="audio/*"
      label="Audio file"
      prepend-icon="mdi-music-note"
    ></v-file-input>

    <v-audio
      v-if="src"
      :src="src"
      actions="play progress time"
      progress-class="mx-3"
      time-display="elapsed"
    >
      <template v-slot:progress="{ props }">
        <v-audio-waveform v-bind="props" :peaks-source="file"></v-audio-waveform>
      </template>
    </v-audio>
  </v-container>
</template>

<script setup>
  import { shallowRef, watch } from 'vue'

  const file = shallowRef(null)
  const src = shallowRef()

  watch(file, value => {
    if (src.value) URL.revokeObjectURL(src.value)
    src.value = value ? URL.createObjectURL(value) : undefined
  })
</script>

<script>
  export default {
    data: () => ({
      file: null,
      src: undefined,
    }),
    watch: {
      file (value) {
        if (this.src) URL.revokeObjectURL(this.src)
        this.src = value ? URL.createObjectURL(value) : undefined
      },
    },
  }
</script>
