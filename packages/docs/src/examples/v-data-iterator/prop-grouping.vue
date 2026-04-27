<template>
  <div>
    <div class="d-flex ga-4 mb-4 align-center">
      <v-switch v-model="openAll" label="Open all groups" hide-details></v-switch>
      <v-btn size="small" variant="tonal" @click="opened = []">Close all</v-btn>
    </div>

    <v-data-iterator
      v-model:opened="opened"
      :group-by="[{ key: 'category' }]"
      :group-key="({ value }) => value"
      :items="items"
      :items-per-page="-1"
      :open-all-groups="openAll"
    >
      <template v-slot:default="{ groupedItems, toggleGroup, isGroupOpen }">
        <v-row>
          <template v-for="groupOrItem in groupedItems" :key="groupOrItem.type === 'group' ? groupOrItem.id : groupOrItem.raw.name">
            <v-col v-if="groupOrItem.type === 'group'" cols="12">
              <v-card
                variant="tonal"
                @click="toggleGroup(groupOrItem)"
              >
                <v-card-title class="d-flex align-center">
                  <v-icon
                    :icon="isGroupOpen(groupOrItem) ? 'mdi-chevron-down' : 'mdi-chevron-right'"
                    class="me-2"
                  ></v-icon>
                  {{ groupOrItem.value }}
                  <v-chip class="ms-2" size="small" variant="outlined">
                    {{ groupOrItem.items.length }}
                  </v-chip>
                </v-card-title>
              </v-card>
            </v-col>

            <v-col v-else cols="12" md="4" sm="6">
              <v-card>
                <v-card-title>{{ groupOrItem.raw.name }}</v-card-title>
                <v-card-subtitle>{{ groupOrItem.raw.origin }}</v-card-subtitle>
                <v-card-text>{{ groupOrItem.raw.calories }} cal</v-card-text>
              </v-card>
            </v-col>
          </template>
        </v-row>
      </template>
    </v-data-iterator>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const opened = ref([])
  const openAll = ref(false)

  const items = [
    { name: 'Frozen Yogurt', calories: 159, category: 'Dairy', origin: 'USA' },
    { name: 'Ice cream sandwich', calories: 237, category: 'Dairy', origin: 'USA' },
    { name: 'Cheese', calories: 402, category: 'Dairy', origin: 'France' },
    { name: 'Butter', calories: 717, category: 'Dairy', origin: 'France' },
    { name: 'Eclair', calories: 262, category: 'Pastry', origin: 'France' },
    { name: 'Cupcake', calories: 305, category: 'Pastry', origin: 'USA' },
    { name: 'Croissant', calories: 231, category: 'Pastry', origin: 'France' },
    { name: 'Baklava', calories: 334, category: 'Pastry', origin: 'Turkey' },
    { name: 'Oreo', calories: 160, category: 'Cookie', origin: 'USA' },
    { name: 'Macaron', calories: 404, category: 'Cookie', origin: 'France' },
    { name: 'Biscotti', calories: 410, category: 'Cookie', origin: 'Italy' },
    { name: 'KitKat', calories: 518, category: 'Candy', origin: 'UK' },
    { name: 'Snickers', calories: 488, category: 'Candy', origin: 'USA' },
    { name: 'Haribo', calories: 340, category: 'Candy', origin: 'Germany' },
  ]
</script>

<script>
  export default {
    data: () => ({
      opened: [],
      openAll: false,
      items: [
        { name: 'Frozen Yogurt', calories: 159, category: 'Dairy', origin: 'USA' },
        { name: 'Ice cream sandwich', calories: 237, category: 'Dairy', origin: 'USA' },
        { name: 'Cheese', calories: 402, category: 'Dairy', origin: 'France' },
        { name: 'Butter', calories: 717, category: 'Dairy', origin: 'France' },
        { name: 'Eclair', calories: 262, category: 'Pastry', origin: 'France' },
        { name: 'Cupcake', calories: 305, category: 'Pastry', origin: 'USA' },
        { name: 'Croissant', calories: 231, category: 'Pastry', origin: 'France' },
        { name: 'Baklava', calories: 334, category: 'Pastry', origin: 'Turkey' },
        { name: 'Oreo', calories: 160, category: 'Cookie', origin: 'USA' },
        { name: 'Macaron', calories: 404, category: 'Cookie', origin: 'France' },
        { name: 'Biscotti', calories: 410, category: 'Cookie', origin: 'Italy' },
        { name: 'KitKat', calories: 518, category: 'Candy', origin: 'UK' },
        { name: 'Snickers', calories: 488, category: 'Candy', origin: 'USA' },
        { name: 'Haribo', calories: 340, category: 'Candy', origin: 'Germany' },
      ],
    }),
    methods: {
      groupKey ({ value }) {
        return value
      },
    },
  }
</script>
