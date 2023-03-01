<template>
  <usage-example
    v-model="model"
    :code="code"
    :name="name"
    :options="options"
  >
    <div>
      <v-pagination
        v-bind="props"
      ></v-pagination>
    </div>

    <template v-slot:configuration>
      <v-slider v-model="length" label="Length" min="1" max="20"></v-slider>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-pagination'
  const model = ref('default')
  const length = ref(6)
  const options = []

  const props = computed(() => {
    return {
      length: length.value,
    }
  })

  const slots = computed(() => {
    return ''
  })

  const code = computed(() => {
    return `<v-pagination${propsToString(props.value)}>${slots.value}</v-pagination>`
  })
</script>
