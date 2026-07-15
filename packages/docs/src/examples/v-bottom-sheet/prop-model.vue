<template>
  <div class="pa-8 text-center">
    <v-btn
      class="ma-auto"
      size="x-large"
      text="Click Me"
      @click="sheet = !sheet"
    ></v-btn>

    <v-bottom-sheet v-model="sheet">
      <v-card class="text-center" height="200">
        <v-card-text>
          <v-btn
            text="Close"
            variant="text"
            @click="sheet = !sheet"
          ></v-btn>

          <br>
          <br>

          <div>
            This is a bottom sheet using the controlled by v-model instead of activator
          </div>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const sheet = shallowRef(false)
</script>

<script>
  export default {
    data: () => ({
      sheet: false,
    }),
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2305-15953&t=tWnPBMI0RfGlNRgq-4"
  }
</example-meta>
