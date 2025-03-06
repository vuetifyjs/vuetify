<template>
  <v-sheet class="py-4 px-1">
    <v-chip-group
      selected-class="text-primary"
      mandatory
    >
      <v-chip
        v-for="tag in tags"
        :key="tag"
        :text="tag"
      ></v-chip>
    </v-chip-group>
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
