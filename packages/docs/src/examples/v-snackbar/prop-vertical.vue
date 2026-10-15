<template>
  <div class="text-center">
    <v-btn
      color="indigo"
      @click="snackbar = true"
    >
      Open Snackbar
    </v-btn>

    <v-snackbar
      v-model="snackbar"
      vertical
    >
      <div class="text-body-large pb-2">This is a snackbar message</div>

      <p>This is a longer paragraph explaining something</p>

      <template v-slot:actions>
        <v-btn
          color="indigo"
          variant="text"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const snackbar = ref(false)
</script>

<script>
  export default {
    data: () => ({
      snackbar: false,
    }),
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14461-112842"
  }
</example-meta>
