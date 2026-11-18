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

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14325-27025"
}
</example-meta>
