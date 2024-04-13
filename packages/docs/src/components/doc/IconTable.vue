<template>
  <AppTable>
    <thead>
      <tr>
        <th>Alias</th>

        <th>Name</th>

        <th class="text-center">Preview</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="icon in icons" :key="icon.name">
        <td>
          <strong>${{ icon.alias }}</strong>
        </td>

        <td>{{ icon.name }}</td>

        <td class="text-center">
          <v-icon color="medium-emphasis">{{ icon.name }}</v-icon>
        </td>
      </tr>
    </tbody>
  </AppTable>
</template>

<script setup>
  // Imports
  import { aliases } from 'vuetify/iconsets/mdi'

  const icons = Object.keys(aliases).map(alias => ({
    alias,
    name: aliases[alias],
  })).sort((a, b) => a.alias.localeCompare(b.alias))
</script>
