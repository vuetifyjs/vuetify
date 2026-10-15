<template>
  <div class="text-center">
    <v-btn
      append-icon="mdi-open-in-new"
      color="deep-purple-accent-4"
      @click="overlay = !overlay"
    >
      Launch Application
    </v-btn>

    <v-overlay
      :model-value="overlay"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        size="64"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const overlay = ref(false)
  watch(overlay, val => {
    val && setTimeout(() => {
      overlay.value = false
    }, 3000)
  })
</script>

<script>
  export default {
    data: () => ({
      overlay: false,
    }),

    watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false
        }, 3000)
      },
    },
  }
</script>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=13963-40351"
}
</example-meta>
