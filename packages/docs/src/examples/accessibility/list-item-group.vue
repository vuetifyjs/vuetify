<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-list v-model="model">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :disabled="item.disabled"
        :title="item.text"
        :value="item"
      ></v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const items = [
    {
      text: 'Item 1',
      disabled: false,
    },
    {
      text: 'Item 2',
      disabled: true,
    },
    {
      text: 'Item 3',
      disabled: false,
    },
  ]

  const model = ref(0)
</script>

<script>
  export default {
    data: () => ({
      items: [
        {
          text: 'Item 1',
          disabled: false,
        },
        {
          text: 'Item 2',
          disabled: true,
        },
        {
          text: 'Item 3',
          disabled: false,
        },
      ],
      model: 0,
    }),
  }
</script>
