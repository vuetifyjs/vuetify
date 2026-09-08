<template>
  <div>
    <div class="d-flex flex-wrap justify-center ga-8 mb-6">
      <div v-for="variant in variants" :key="variant.label" class="text-center">
        <v-progress-circular
          :model-value="value"
          :size="80"
          :width="8"
          color="primary"
          v-bind="variant.props"
        >{{ value }}%</v-progress-circular>

        <div class="text-caption mt-2">{{ variant.label }}</div>
      </div>
    </div>

    <div class="text-center">
      <v-btn text="Set random value" @click="value = Math.round(Math.random() * 100)"></v-btn>
    </div>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const value = shallowRef(25)

  const variants = [
    { label: 'default (0.2s)', props: {} },
    { label: ':transition="{ duration: 600 }"', props: { transition: { duration: 600 } } },
    { label: ':transition="{ duration: \'1s\' }"', props: { transition: { duration: '1s' } } },
    { label: ':transition="false"', props: { transition: false } },
  ]
</script>

<script>
  export default {
    data () {
      return {
        value: 25,
        variants: [
          { label: 'default (0.2s)', props: {} },
          { label: ':transition="{ duration: 600 }"', props: { transition: { duration: 600 } } },
          { label: ':transition="{ duration: \'1s\' }"', props: { transition: { duration: '1s' } } },
          { label: ':transition="false"', props: { transition: false } },
        ],
      }
    },
  }
</script>
