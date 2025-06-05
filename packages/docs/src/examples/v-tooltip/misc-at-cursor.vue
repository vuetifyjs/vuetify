<template>
  <div class="d-flex justify-center" @mouseout="cursor = false">
    <v-tooltip v-model="cursor" :open-on-hover="false" target="cursor" open-on-click>
      <template v-slot:activator="{ props }">
        <v-card
          v-bind="props"
          height="300"
          image="https://picsum.photos/600/300"
          width="600"
        ></v-card>
      </template>
      <span>I will appear at cursor</span>
    </v-tooltip>
  </div>
</template>

  <script setup>
  import { ref } from 'vue'

  const cursor = ref(false)

</script>
