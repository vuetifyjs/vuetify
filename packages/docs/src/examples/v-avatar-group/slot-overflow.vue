<template>
  <v-container class="d-flex justify-center">
    <v-avatar-group
      :items="items"
      :limit="3"
    >
      <template v-slot:overflow="{ overflow }">
        <v-avatar color="grey-lighten-1">
          <v-icon icon="mdi-dots-horizontal"></v-icon>

          <v-tooltip activator="parent" location="bottom">
            {{ overflow }} more users
          </v-tooltip>
        </v-avatar>
      </template>
    </v-avatar-group>
  </v-container>
</template>

<script setup>
  const items = [
    { text: 'MG', color: 'primary' },
    { text: 'RF', color: 'secondary' },
    { text: 'CA', color: '#E91E63' },
    { text: 'PE', color: '#9C27B0' },
    { text: 'WA', color: '#00BCD4' },
  ]
</script>

<script>
  export default {
    data: () => ({
      items: [
        { text: 'MG', color: 'primary' },
        { text: 'RF', color: 'secondary' },
        { text: 'CA', color: '#E91E63' },
        { text: 'PE', color: '#9C27B0' },
        { text: 'WA', color: '#00BCD4' },
      ],
    }),
  }
</script>
