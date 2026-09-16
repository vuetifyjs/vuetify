<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <h5 class="mb-2">Multiple selection</h5>

        <v-month-picker
          v-model="selection1"
          multiple
        ></v-month-picker>

        <div class="d-flex ga-2 flex-wrap mt-2" style="max-width: 360px">
          <v-chip v-for="v in selection1" :key="v" :text="v" size="small"></v-chip>
        </div>
      </v-col>

      <v-col cols="auto">
        <h5 class="mb-2">Range selection</h5>

        <v-month-picker
          v-model="selection2"
          multiple="range"
        ></v-month-picker>

        <div class="d-flex ga-2 flex-wrap mt-2" style="max-width: 360px">
          <template v-if="selection2.length">
            <v-chip :text="selection2[0]" size="small"></v-chip>
            <template v-if="selection2.length > 1">
              ~
              <v-chip :text="selection2[1]" size="small"></v-chip>
            </template>
          </template>
          <v-chip v-else size="small" text="[]"></v-chip>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const currentYear = new Date().getFullYear()

  const selection1 = shallowRef([`${currentYear}-02`, `${currentYear}-06`, `${currentYear}-10`])
  const selection2 = shallowRef([`${currentYear}-05`, `${currentYear}-11`])
</script>
