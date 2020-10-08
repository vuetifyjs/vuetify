<template>
  <v-row justify="space-around">
    <v-col
      cols="12"
      sm="6"
      md="4"
      lg="3"
    >
      <v-sheet
        elevation="10"
        class="pa-4"
      >
        <v-chip-group
          column
          active-class="primary--text"
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
