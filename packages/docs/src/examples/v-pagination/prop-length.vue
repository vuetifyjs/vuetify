<template>
  <div class="text-center">
    <v-container>
      <v-row class="justify-center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              :length="15"
              class="my-4"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
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
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14071-131260"
}
</example-meta>
