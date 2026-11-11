<template>
  <div>
    <v-alert
      v-model="alert"
      border="start"
      close-label="Close Alert"
      color="deep-purple-accent-4"
      title="Closable Alert"
      variant="tonal"
      closable
    >
      Aenean imperdiet. Quisque id odio. Cras dapibus. Pellentesque ut neque. Cras dapibus.

      Vivamus consectetuer hendrerit lacus. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Curabitur blandit mollis lacus. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo.
    </v-alert>

    <div
      v-if="!alert"
      class="text-center"
    >
      <v-btn @click="alert = true">
        Reset
      </v-btn>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const alert = ref(true)
</script>

<script>
  export default {
    data: () => ({
      alert: true,
    }),
  }
</script>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14445-51853"
}
</example-meta>
