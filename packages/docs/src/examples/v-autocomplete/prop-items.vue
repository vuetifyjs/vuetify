<template>
  <v-container>
    <v-autocomplete :items="items" label="Special items like in VList" chips multiple></v-autocomplete>

    <v-autocomplete :items="items" label="I have custom divider" chips multiple>
      <template v-slot:divider="{ props }">
        <div class="d-flex ga-4 align-center">
          <v-divider></v-divider>
          {{ props.text }}
          <v-divider></v-divider>
        </div>
      </template>
    </v-autocomplete>

    <v-autocomplete :items="items" label="I have custom subheader" chips multiple>
      <template v-slot:subheader="{ props }">
        <v-list-subheader class="font-weight-bold bg-primary">{{ props.title }}</v-list-subheader>
      </template>
    </v-autocomplete>
  </v-container>
</template>

<script setup>
  const items = [
    { type: 'subheader', title: 'Group 1' },
    { title: 'Item 1.1', value: 11 },
    { title: 'Item 1.2', value: 12 },
    { title: 'Item 1.3', value: 13 },
    { title: 'Item 1.4', value: 14 },
    { type: 'divider', text: 'or' },
    { type: 'subheader', title: 'Group 2' },
    { title: 'Item 2.1', value: 21 },
    { title: 'Item 2.2', value: 22 },
    { title: 'Item 2.3', value: 23 },
  ]
</script>

<script>
  export default {
    data: () => ({
      items: [
        { type: 'subheader', title: 'Group 1' },
        { title: 'Item 1.1', value: 11 },
        { title: 'Item 1.2', value: 12 },
        { title: 'Item 1.3', value: 13 },
        { title: 'Item 1.4', value: 14 },
        { type: 'divider', text: 'or' },
        { type: 'subheader', title: 'Group 2' },
        { title: 'Item 2.1', value: 21 },
        { title: 'Item 2.2', value: 22 },
        { title: 'Item 2.3', value: 23 },
      ],
    }),
  }
</script>
