<template>
  <v-container class="d-flex justify-center ga-12">
    <v-avatar-group :items="items" reverse></v-avatar-group>
    <v-avatar-group reverse>
      <v-avatar v-for="(item, i) in items2.toReversed()" :key="i" v-bind="item"></v-avatar>
    </v-avatar-group>
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
  const items2 = [
    { text: '#1', color: 'primary' },
    { text: '#2', color: 'secondary' },
    { text: '#3', color: '#E91E63' },
    { text: '#4', color: '#00BCD4' },
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
      items2: [
        { text: '#1', color: 'primary' },
        { text: '#2', color: 'secondary' },
        { text: '#3', color: '#E91E63' },
        { text: '#4', color: '#00BCD4' },
      ],
    }),
  }
</script>
