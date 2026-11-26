<template>
  <div>
    <v-progress-linear
      v-model="valueDeterminate"
      color="deep-purple-accent-4"
    ></v-progress-linear>
    <br>
    <v-progress-linear
      v-model="valueDeterminate"
      color="pink"
    ></v-progress-linear>
    <br>
    <v-progress-linear
      v-model="valueDeterminate"
      color="indigo-darken-2"
    ></v-progress-linear>
    <br>
    <v-progress-linear
      v-model="valueDeterminate"
      color="amber"
    ></v-progress-linear>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const valueDeterminate = ref(50)
</script>

<script>
  export default {
    data () {
      return {
        valueDeterminate: 50,
      }
    },
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14461-96250"
  }
</example-meta>
