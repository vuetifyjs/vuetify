<template>
  <div class="text-center">
    <v-chip
      v-if="chip"
      class="ma-2"
      closable
      @click:close="chip = false"
    >
      Closable
    </v-chip>

    <v-btn
      v-if="!chip"
      color="primary"
      @click="chip = true"
    >
      Reset Chip
    </v-btn>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const chip = ref(true)
</script>

<script>
  export default {
    data () {
      return {
        chip: true,
      }
    },
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=2690-8440"
  }
</example-meta>
