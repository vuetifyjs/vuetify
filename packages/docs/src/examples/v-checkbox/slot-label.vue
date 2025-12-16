<template>
  <v-container fluid>
    <v-checkbox v-model="checkbox">
      <template v-slot:label>
        <div>
          I agree that
          <v-tooltip location="bottom">
            <template v-slot:activator="{ props }">
              <a
                href="https://vuetifyjs.com"
                target="_blank"
                v-bind="props"
                @click.stop
              >
                Vuetify
              </a>
            </template>
            Opens in new window
          </v-tooltip>
          is awesome
        </div>
      </template>
    </v-checkbox>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const checkbox = ref(false)
</script>

<script>
  export default {
    data () {
      return {
        checkbox: false,
      }
    },
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2045-82647&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>