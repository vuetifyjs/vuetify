<template>
  <div>
    <v-card class="ma-10" subtitle="Subtitle" title="Title"></v-card>
    <v-defaults-provider :defaults="defaults">
      <v-card class="ma-10" subtitle="Subtitle" title="Title"></v-card>
    </v-defaults-provider>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const defaults = ref({
    global: {
      elevation: 3,
    },
    VCard: {
      color: 'secondary',
    },
  })
</script>

<script>
  export default {
    data: () => ({
      defaults: {
        global: {
          elevation: 3,
        },
        VCard: {
          color: 'secondary',
        },
      },
    }),
  }
</script>
