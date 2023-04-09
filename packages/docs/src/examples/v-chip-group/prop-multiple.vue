<template>
  <v-row justify="space-around">
    <v-col cols="auto">
      <v-sheet
        elevation="10"
        class="py-4 px-1"
      >
        <v-chip-group
          multiple
          selected-class="text-primary"
        >
          <v-chip
            v-for="tag in tags"
            :key="tag"
          >
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-sheet>
    </v-col>
  </v-row>
</template>

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
