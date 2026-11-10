<template>
  <div>
    <div class="d-flex">
      <v-checkbox
        v-model="focusable"
        label="Focusable"
      ></v-checkbox>
    </div>

    <v-expansion-panels
      v-model="panel"
      :focusable="focusable"
      multiple
    >
      <v-expansion-panel>
        <v-expansion-panel-title>Panel 1</v-expansion-panel-title>
        <v-expansion-panel-text>
          Some content
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>Panel 2</v-expansion-panel-title>
        <v-expansion-panel-text>
          Some content
        </v-expansion-panel-text>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-title>Panel 3</v-expansion-panel-title>
        <v-expansion-panel-text>
          Some content
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const panel = ref([0, 1])
  const focusable = ref(true)
</script>

<script>
  export default {
    data: () => ({
      panel: [0, 1],
      focusable: true,
    }),
  }
</script>
