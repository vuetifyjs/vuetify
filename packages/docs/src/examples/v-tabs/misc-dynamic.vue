<template>
  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="red-lighten-2"
    >
      <v-tab
        v-for="n in length"
        :key="n"
        :text="`Item ${n}`"
        :value="n"
      ></v-tab>
    </v-tabs>

    <v-card-text class="text-center">
      <v-btn
        :disabled="!length"
        text="Remove Tab"
        variant="text"
        @click="length--"
      ></v-btn>

      <v-divider
        class="mx-4"
        vertical
      ></v-divider>

      <v-btn
        text="Add Tab"
        variant="text"
        @click="length++"
      ></v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const length = ref(15)
  const tab = ref(null)

  watch(length, val => {
    tab.value = val - 1
  })
</script>

<script>
  export default {
    data: () => ({
      length: 15,
      tab: null,
    }),

    watch: {
      length (val) {
        this.tab = val - 1
      },
    },
  }
</script>
