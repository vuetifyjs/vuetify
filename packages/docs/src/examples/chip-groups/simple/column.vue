<template>
  <v-layout justify-space-around>
    <v-flex xs12 sm6 md4 lg3>
      <v-sheet elevation="10" class="pa-3">
        <v-chip-group
          column
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
