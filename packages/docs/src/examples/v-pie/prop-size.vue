<template>
  <v-container class="d-flex flex-wrap justify-center align-start ga-6" fluid>

    <div>
      <v-sheet class="pa-3" rounded="xl" variant="outlined">
        <v-pie :items="items" hover-scale=".2" size="150"></v-pie>
      </v-sheet>
      <ul class="mt-3 pl-6">
        <li><v-code>size: 150px</v-code></li>
        <li><v-code>20% reserved</v-code></li>
      </ul>
    </div>

    <v-divider class="hidden-sm-and-down" vertical></v-divider>

    <div>
      <v-sheet class="pa-3" rounded="xl" variant="outlined">
        <v-pie :items="items" hover-scale=".1" size="200"></v-pie>
      </v-sheet>
      <ul class="mt-3 pl-6">
        <li><v-code>size: 200px</v-code></li>
        <li><v-code>10% reserved</v-code></li>
      </ul>
    </div>

    <v-divider class="hidden-sm-and-down" vertical></v-divider>

    <div>
      <v-sheet class="pa-3" rounded="xl" variant="outlined">
        <v-pie :items="items" hover-scale="0" size="250"></v-pie>
      </v-sheet>
      <ul class="mt-3 pl-6">
        <li><v-code>size: 250px</v-code></li>
        <li><v-code>no zoom on hover</v-code></li>
      </ul>
    </div>

  </v-container>
</template>

<script setup>
  const items = [
    { key: 1, title: 'Series A', value: 45, color: '#2b6d40' },
    { key: 2, title: 'Series B', value: 30, color: '#4e9963' },
    { key: 3, title: 'Series C', value: 15, color: '#72c789' },
    { key: 4, title: 'Series D', value: 10, color: '#97f7b0' },
  ]
</script>

<script>
  export default {
    data: () => ({
      items: [
        { key: 1, title: 'Series A', value: 45, color: '#2b6d40' },
        { key: 2, title: 'Series B', value: 30, color: '#4e9963' },
        { key: 3, title: 'Series C', value: 15, color: '#72c789' },
        { key: 4, title: 'Series D', value: 10, color: '#97f7b0' },
      ],
    }),
  }
</script>
