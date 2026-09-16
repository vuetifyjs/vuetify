<template>
  <v-sheet
    class="mx-auto"
    elevation="3"
    max-width="800"
  >
    <v-slide-group
      v-model="model"
      class="pa-4"
      next-icon="mdi-plus"
      prev-icon="mdi-minus"
      selected-class="bg-primary"
      show-arrows
    >
      <v-slide-group-item
        v-for="n in 15"
        :key="n"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <v-card
          :class="['ma-4', selectedClass]"
          :style="isSelected ? undefined : `background: oklch(${0.35 + (n - 1) * (0.45 / 14)} 0.14 280)`"
          height="100"
          width="100"
          @click="toggle"
        >
          <div class="d-flex fill-height align-center justify-center">
            <v-scale-transition>
              <v-icon
                v-if="isSelected"
                color="white"
                icon="mdi-close-circle-outline"
                size="48"
              ></v-icon>
            </v-scale-transition>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup>
  import { ref } from 'vue'

  const model = ref(null)
</script>

<script>
  export default {
    data: () => ({
      model: null,
    }),
  }
</script>
