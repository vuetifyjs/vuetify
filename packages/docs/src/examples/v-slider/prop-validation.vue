<template>
  <v-card
    color="transparent"
    flat
  >
    <div class="text-subtitle-2">Rules</div>

    <v-card-text class="pt-0">
      <v-slider
        v-model="value"
        :rules="rules"
        label="How many?"
        step="10"
        thumb-label="always"
        ticks
      ></v-slider>
    </v-card-text>

    <div class="text-subtitle-2">Persistent hint</div>

    <v-card-text class="pt-0">
      <v-slider
        v-model="value"
        :rules="rules"
        hint="40 in stock"
        label="How many?"
        step="10"
        thumb-label="always"
        persistent-hint
        ticks
      ></v-slider>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref(30)

  const rules = [
    v => v <= 40 || 'Only 40 in stock',
  ]
</script>

<script>
  export default {
    data () {
      return {
        value: 30,
        rules: [
          v => v <= 40 || 'Only 40 in stock',
        ],
      }
    },
  }
</script>
