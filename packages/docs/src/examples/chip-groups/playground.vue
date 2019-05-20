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
    </v-card-title>
    <v-card-text>
      <v-layout row wrap justify-space-around>
        <v-switch
          v-model="column"
          label="Column"
        ></v-switch>
        <v-switch
          v-model="mandatory"
          label="Mandatory"
        ></v-switch>
        <v-switch
          v-model="multiple"
          label="Multiple"
        ></v-switch>
      </v-layout>
      <span class="subheading">Filter by Tags</span>
      <v-chip-group
        :multiple="multiple"
        :mandatory="mandatory"
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
      mandatory: false,
      multiple: true,
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
