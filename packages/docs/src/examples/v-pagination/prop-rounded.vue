<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="4"
      rounded="circle"
    ></v-pagination>

    <v-pagination
      v-model="page"
      :length="4"
      rounded="0"
    ></v-pagination>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const page = ref(1)
</script>

<script>
  export default {
    data () {
      return {
        page: 1,
      }
    },
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=1906-101481&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>