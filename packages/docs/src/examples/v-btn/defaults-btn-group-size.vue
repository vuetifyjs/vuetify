<template>
  <v-container class="d-flex justify-center">
    <div>
      <div class="d-flex ga-4">
        <v-btn
          :size="size"
          :text="`size: ${label}`"
          color="primary"
          variant="tonal"
          @click="cycle"
        ></v-btn>

        <v-btn-toggle :size="size" divided>
          <v-btn icon="$plus"></v-btn>
          <v-btn icon="$minus"></v-btn>
          <v-btn>Text</v-btn>
        </v-btn-toggle>

        <v-btn-group :size="size" divided>
          <v-btn>One</v-btn>
          <v-btn>Two</v-btn>
        </v-btn-group>
      </div>

      <div class="text-caption pa-2 mb-n2">
        Click 👆 to cycle sizes
      </div>
    </div>
  </v-container>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const sizes = [undefined, 'small', 'default', 'large', 'x-large']
  const index = ref(3)
  const size = computed(() => sizes[index.value])
  const label = computed(() => size.value ?? '(auto)')

  function cycle () {
    index.value = (index.value + 1) % sizes.length
  }
</script>
