<template>
  <v-layout row justify-space-around>
    <v-flex xs12 sm6 md4>
      <v-sheet elevation="10" class="py-3 px-1">
        <v-chip-group
          multiple
          active-class="primary--text"
        >
          <v-chip v-for="tag in tags" :key="tag">
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-sheet>
    </v-flex>
  </v-layout>
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
