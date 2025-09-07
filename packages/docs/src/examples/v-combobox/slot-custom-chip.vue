<template>
  <v-combobox
    v-model="selected"
    :items="items"
    item-title="name"
    item-value="name"
    chips
    closable-chips
    multiple
  >
    <template #chip="{ props, item }">
      <v-chip v-bind="props" label>
        <template #prepend>
          <div class="me-1">{{ item.raw.symbol }}</div>
        </template>
        <template #close>
          <v-icon icon="$close" size="14" />
        </template>
      </v-chip>
    </template>
  </v-combobox>
</template>

<script setup>
  import { ref } from 'vue'

  const items = [
    { symbol: '🍎', name: 'Apple' },
    { symbol: '🍌', name: 'Banana' },
    { symbol: '🍇', name: 'Grapes' },
    { symbol: '🍉', name: 'Watermelon' },
    { symbol: '🍓', name: 'Strawberry' },
    { symbol: '🥝', name: 'Kiwi' },
  ]
  const selected = ref(['Apple', 'Kiwi', 'Grapes']
    .map(v => items.find(item => item.name === v)))
</script>
