<template>
  <v-card
    max-width="400"
    class="mx-auto"
  >
    <v-system-bar></v-system-bar>
    <v-card-title>
      <v-btn
        icon
        class="mr-4"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>

      <span class="subheading">Filter your files</span>

      <v-spacer></v-spacer>

      <v-switch
        v-model="column"
        class="justify-end"
        label="Column"
      ></v-switch>
    </v-card-title>
    <v-card-text>
      <span class="subheading">Filter by Tags</span>
      <v-chip-group
        multiple
        :column="column"
        active-class="primary--text"
      >
        <v-chip v-for="tag in tags" :key="tag">
          {{ tag }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      column: true,
      tags: [
        'Work',
        'Home Improvement',
        'Vacation',
        'Food',
        'Drawers',
        'Shopping',
        'Art',
        'Tech',
        'Creative Writing'
      ]
    })
  }
</script>
