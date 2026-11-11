<template>
  <v-container fluid>
    <v-radio-group v-model="radios">
      <template v-slot:label>
        <div>Your favourite <strong>search engine</strong></div>
      </template>
      <v-radio value="Google">
        <template v-slot:label>
          <div>Of course it's <strong class="text-success">Google</strong></div>
        </template>
      </v-radio>
      <v-radio value="Duckduckgo">
        <template v-slot:label>
          <div>Definitely <strong class="text-primary">Duckduckgo</strong></div>
        </template>
      </v-radio>
    </v-radio-group>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const radios = ref('Duckduckgo')
</script>

<script>
  export default {
    data () {
      return {
        radios: 'Duckduckgo',
      }
    },
  }
</script>
<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14247-61288"
}
</example-meta>
