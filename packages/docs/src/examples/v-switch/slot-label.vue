<template>
  <v-switch v-model="switchMe">
    <template v-slot:label>
      Turn on the progress:
      <v-progress-circular
        :indeterminate="switchMe"
        class="ms-2"
        size="24"
      ></v-progress-circular>
    </template>
  </v-switch>
</template>

<script setup>
  import { ref } from 'vue'

  const switchMe = ref(false)
</script>

<script>
  export default {
    data () {
      return {
        switchMe: false,
      }
    },
  }
</script>
