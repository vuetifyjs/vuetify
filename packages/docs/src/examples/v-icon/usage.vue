<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    :name="name"
  >
    <div class="text-center">
      <v-icon v-bind="props"></v-icon>
    </div>

    <template v-slot:configuration>
      <v-select v-model="icon" label="Icon" :items="icons" clearable></v-select>

      <v-select v-model="size" label="Size" :items="sizes" clearable></v-select>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-icon'
  const model = ref('default')
  const icon = ref()
  const size = ref()
  const options = []
  const props = computed(() => {
    return {
      icon: icon.value || 'mdi-vuetify',
      size: ['', 'medium'].includes(size.value) ? undefined : size.value,
    }
  })
  const icons = [
    'mdi-plus',
    'mdi-minus',
    'mdi-access-point',
    'mdi-antenna',
  ]
  const sizes = [
    'x-small',
    'small',
    'medium',
    'large',
    'x-large',
  ]

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
