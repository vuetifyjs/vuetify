<template>
  <v-row align="center" justify="center">
    <v-col cols="auto">
      <v-sheet class="pa-8 d-flex align-center justify-center" color="white" rounded>
        <v-morphing-icon :color="color" :icon="icon" size="40"></v-morphing-icon>
      </v-sheet>

      <div class="text-center text-caption mt-2">Light background</div>
    </v-col>

    <v-col cols="auto">
      <v-sheet class="pa-8 d-flex align-center justify-center" color="grey-darken-4" rounded>
        <v-morphing-icon :color="color" :icon="icon" size="40" dark></v-morphing-icon>
      </v-sheet>

      <div class="text-center text-caption mt-2">Dark background</div>
    </v-col>

    <v-col class="text-center" cols="12">
      <v-btn text="Change Icon" @click="toggle"></v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
  import { computed, shallowRef } from 'vue'

  const icons = ['mdi-heart', 'mdi-star', 'mdi-account', 'mdi-home', 'mdi-bell']
  const colors = [null, 'primary', 'red', 'purple', '#fc3']
  const index = shallowRef(0)
  const icon = computed(() => icons[index.value % icons.length])
  const color = computed(() => colors[index.value % icons.length])

  function toggle () {
    index.value++
  }
</script>
