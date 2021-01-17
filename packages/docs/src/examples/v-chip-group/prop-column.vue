<template>
  <v-row justify="center">
    <v-col
      cols="12"
      sm="7"
      md="6"
      lg="5"
    >
      <v-sheet
        elevation="10"
        rounded="xl"
      >
        <v-sheet
          class="pa-3 primary text-right"
          dark
          rounded="t-xl"
        >
          <v-btn icon>
            <v-icon>mdi-content-save-cog-outline</v-icon>
          </v-btn>

          <v-btn
            class="ml-2"
            icon
          >
            <v-icon>mdi-check-bold</v-icon>
          </v-btn>
        </v-sheet>

        <div class="pa-4">
          <v-chip-group
            active-class="primary--text"
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
