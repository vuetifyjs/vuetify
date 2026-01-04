<template>
  <v-container class="d-flex justify-center">
    <v-avatar-group :items="items" :limit="3"></v-avatar-group>
  </v-container>
</template>

<script setup>
  const items = [
    { text: 'BK', color: 'primary' },
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
        { text: 'BK', color: 'primary' },
        { text: 'RF', color: 'secondary' },
        { text: 'CA', color: '#E91E63' },
        { text: 'PE', color: '#9C27B0' },
        { text: 'WA', color: '#00BCD4' },
      ],
    }),
  }
</script>
