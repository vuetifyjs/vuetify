<template>
  <usage-example
    v-model="model"
    :code="code"
    :options="options"
    :name="name"
  >
    <div>
      <v-breadcrumbs v-bind="props">
        <!-- <v-breadcrumbs-item>Item</v-breadcrumbs-item>

        <v-breadcrumbs-divider></v-breadcrumbs-divider>

        <v-breadcrumbs-item active>Item 2</v-breadcrumbs-item>

        <v-breadcrumbs-divider></v-breadcrumbs-divider>

        <v-breadcrumbs-item disabled>Item 3</v-breadcrumbs-item> -->
      </v-breadcrumbs>
    </div>

    <template v-slot:configuration>
      <v-select v-model="color" label="Background color" :items="['primary', 'success', 'info']" clearable></v-select>
    </template>
  </usage-example>
</template>

<script setup>
  // Utilities
  import { computed, ref } from 'vue'
  import { propsToString } from '@/util/helpers'

  const name = 'v-breadcrumbs'
  const model = ref('default')
  const options = []
  const color = ref()
  const props = computed(() => {
    return {
      'bg-color': color.value || undefined,
      items: ['Foo', 'Bar', 'Fizz'],
    }
  })

  const slots = computed(() => {
    return ``
  })

  const code = computed(() => {
    return `<${name}${propsToString(props.value)}>${slots.value}</${name}>`
  })
</script>
