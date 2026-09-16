<template>
  <div>
    <div class="d-flex align-center ga-4 mb-2">
      <v-chip-group
        v-model="strategy"
        color="primary"
        mandatory
      >
        <v-chip
          v-for="option in strategies"
          :key="option"
          :text="option"
          :value="option"
          size="small"
        ></v-chip>
      </v-chip-group>

      <v-spacer></v-spacer>

      <v-select
        v-model="color"
        :items="colors"
        class="flex-0-0"
        density="compact"
        label="Color"
        style="min-width: 140px;"
        variant="outlined"
        hide-details
      ></v-select>
    </div>

    <v-treeview
      v-model:activated="activated"
      :active-strategy="strategy"
      :color="color"
      :items="items"
      item-value="id"
      activatable
      open-all
    ></v-treeview>
  </div>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const strategies = ['leaf', 'single-leaf', 'independent', 'single-independent']
  const strategy = shallowRef('leaf')
  const activated = shallowRef([])

  const colors = ['primary', 'success', 'warning']
  const color = shallowRef('primary')

  const items = [
    {
      id: 1,
      title: 'Documents',
      children: [
        { id: 2, title: 'Resume' },
        { id: 3, title: 'Cover letter' },
        {
          id: 4,
          title: 'Invoices',
          children: [
            { id: 5, title: 'January' },
            { id: 6, title: 'February' },
          ],
        },
      ],
    },
  ]
</script>
