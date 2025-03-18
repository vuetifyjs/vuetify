<template>
  <v-treeview
    v-model="model"
    :items="items"
    :lines="false"
    collapse-icon="mdi-chevron-down"
    density="compact"
    expand-icon="mdi-chevron-right"
    select-strategy="leaf"
    fluid
    selectable
  >
    <template v-slot:title="{ item }">
      <span :class="['text-caption', model.includes(item.value) && 'text-decoration-line-through']">
        {{ item.title }}
      </span>
    </template>
  </v-treeview>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const items = Array.from({ length: 10 }, (_, i) => ({
    value: `${i}`,
    title: `Example item ${i + 1}`,
    children: Array.from({ length: 25 }, (_, j) => ({
      value: `${i}-${j}`,
      title: `Example child item ${j}`,
    })),
  }))

  const model = shallowRef([])
</script>

<script>
  export default {
    data: () => ({
      items: Array.from({ length: 10 }, (_, i) => ({
        value: `${i}`,
        title: `Example item ${i + 1}`,
        children: Array.from({ length: 25 }, (_, j) => ({
          value: `${i}-${j}`,
          title: `Example child item ${j}`,
        })),
      })),
      model: [],
    }),
  }
</script>
