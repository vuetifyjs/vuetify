<template>
  <div>
    <div class="d-flex align-center justify-center ga-6">
      <div>
        <div class="text-center text-body-small my-2">Light background</div>
        <v-sheet class="px-12 py-6" color="white">
          <v-morphing-icon
            :color="color"
            :icon="icon"
            size="40"
          ></v-morphing-icon>
        </v-sheet>
      </div>

      <div>
        <div class="text-center text-body-small my-2">Dark background</div>
        <v-sheet class="px-12 py-6" color="grey-darken-4">
          <v-morphing-icon
            :color="color"
            :icon="icon"
            size="40"
            dark
          ></v-morphing-icon>
        </v-sheet>
      </div>
    </div>

    <div class="text-center my-6">
      <v-btn text="Change Icon" @click="index++"></v-btn>
    </div>
  </div>
</template>

<script setup>
  import { shallowRef, toRef } from 'vue'

  const icons = ['mdi-heart', 'mdi-star', 'mdi-account', 'mdi-home', 'mdi-bell']
  const colors = [null, 'primary', 'red', 'purple', '#fc3']
  const index = shallowRef(0)
  const icon = toRef(() => icons[index.value % icons.length])
  const color = toRef(() => colors[index.value % icons.length])
</script>
