<template>
  <div>
    <div v-for="variant in variants" :key="variant.label" class="mb-4">
      <div class="text-caption mb-1">{{ variant.label }}</div>

      <v-progress-linear
        :model-value="value"
        color="primary"
        height="12"
        rounded
        v-bind="variant.props"
      ></v-progress-linear>
    </div>

    <v-btn text="Set random value" @click="value = Math.round(Math.random() * 100)"></v-btn>
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
