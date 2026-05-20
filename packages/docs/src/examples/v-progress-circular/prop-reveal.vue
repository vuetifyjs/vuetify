<template>
  <div>
    <v-container class="d-flex flex-wrap ga-4 px-0 justify-center">
      <v-card
        v-for="(c, i) in cards"
        :key="i"
        elevation="6"
        mode="out-in"
        rounded="pill"
        width="330"
      >
        <div class="d-flex align-center pa-3 justify-space-between">
          <div class="mt-n2">
            <v-card-title v-text="c.title"></v-card-title>
            <v-card-subtitle class="mt-n1" v-text="c.subtitle"></v-card-subtitle>
          </div>
          <v-progress-circular
            :key="`${updateTrigger}_${i}`"
            :model-value="c.value"
            :size="100"
            :width="12"
            bg-color="surface-light"
            class="ma-3"
            color="orange-accent-2"
            reveal
            rounded
          >
            <v-avatar color="surface-light" size="70">{{ c.value }}%</v-avatar>
          </v-progress-circular>
        </div>
      </v-card>
    </v-container>
    <div class="d-flex justify-center">
      <v-btn color="primary" text="Reload" @click="updateTrigger++"></v-btn>
    </div>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const updateTrigger = shallowRef(0)

  const cards = [
    { title: 'CPU Usage', subtitle: '0.63 / 2 units', value: 31.5 },
    { title: 'Memory Usage', subtitle: '13.43 / 16 GB', value: 83.9 },
  ]
</script>

<script>
  export default {
    data () {
      return {
        updateTrigger: 0,
        cards: [
          { title: 'CPU Usage', subtitle: '0.23 / 2 units', value: 11.3 },
          { title: 'Memory Usage', subtitle: '6.43 / 16 GB', value: 40.1 },
          { title: 'Nodes', subtitle: '1 / 1 Ready', value: 100 },
        ],
      }
    },
  }
</script>
