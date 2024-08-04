<template>
  <v-sheet
    class="mx-auto"
    elevation="10"
    max-width="300"
    rounded="xl"
  >
    <v-sheet
      class="pa-3 bg-primary text-right"
      rounded="t-xl"
    >
      <v-btn icon="i-mdi:content-save-cog-outline"></v-btn>

      <v-btn
        class="ms-2"
        icon="i-mdi:check-bold"
      ></v-btn>
    </v-sheet>

    <div class="pa-4">
      <v-chip-group
        selected-class="text-primary"
        column
      >
        <v-chip
          v-for="tag in tags"
          :key="tag"
        >
          {{ tag }}
        </v-chip>
      </v-chip-group>
    </div>
  </v-sheet>
</template>

<script setup>
  const tags = [
    'Work',
    'Home Improvement',
    'Vacation',
    'Food',
    'Drawers',
    'Shopping',
    'Art',
    'Tech',
    'Creative Writing',
  ]
</script>

<script>
  export default {
    data: () => ({
      tags: [
        'Work',
        'Home Improvement',
        'Vacation',
        'Food',
        'Drawers',
        'Shopping',
        'Art',
        'Tech',
        'Creative Writing',
      ],
    }),
  }
</script>
