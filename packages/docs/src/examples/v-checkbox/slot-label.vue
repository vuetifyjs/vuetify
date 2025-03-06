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
