<template>
  <v-container fluid>
    <v-checkbox-btn
      v-model="custom"
      label="Loading"
    ></v-checkbox-btn>

    <v-text-field
      v-model="value"
      label="Type characters to change the loader color"
      placeholder="Start typing..."
      loading
    >
      <template v-slot:loader>
        <v-progress-linear
          :active="custom"
          :color="color"
          :model-value="progress"
          height="7"
          indeterminate
        ></v-progress-linear>
      </template>
    </v-text-field>
  </v-container>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const value = ref('')
  const custom = ref(false)
  const progress = computed(() => {
    return Math.min(100, value.value.length * 10)
  })
  const color = computed(() => {
    return ['error', 'warning', 'success'][Math.floor(progress.value / 40)]
  })
</script>

<script>
  export default {
    data: () => ({
      value: '',
      custom: false,
    }),

    computed: {
      progress () {
        return Math.min(100, this.value.length * 10)
      },
      color () {
        return ['error', 'warning', 'success'][Math.floor(this.progress / 40)]
      },
    },
  }
</script>
