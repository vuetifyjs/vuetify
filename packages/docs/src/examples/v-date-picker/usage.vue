<template>
  <usage-example
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <v-date-picker v-model="date" class="mx-auto"></v-date-picker>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-date-picker'
  const model = ref('default')
  const date = []
  const options = []

  const props = computed(() => {
    return {

    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<v-date-picker${propsToString(props.value)}>${slots.value}</v-date-picker>`
  })
</script>
