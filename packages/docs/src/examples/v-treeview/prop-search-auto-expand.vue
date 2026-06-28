<template>
  <v-card class="mx-auto" max-width="500">
    <v-sheet class="pa-4" color="surface-variant">
      <v-text-field
        v-model="search"
        label="Search"
        variant="solo"
        clearable
        flat
        hide-details
      ></v-text-field>
    </v-sheet>

    <v-treeview
      :items="items"
      :search="search"
    ></v-treeview>
  </v-card>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const search = shallowRef('')

  const items = [
    {
      title: 'Frontend',
      children: [
        {
          title: 'JavaScript',
          children: [
            { title: 'React' },
            { title: 'Vue' },
            { title: 'Angular' },
          ],
        },
        {
          title: 'CSS',
          children: [
            { title: 'Sass' },
            { title: 'Tailwind' },
          ],
        },
      ],
    },
    {
      title: 'Backend',
      children: [
        {
          title: 'Python',
          children: [
            { title: 'Django' },
            { title: 'FastAPI' },
          ],
        },
        {
          title: 'Node.js',
          children: [
            { title: 'Express' },
            { title: 'NestJS' },
          ],
        },
      ],
    },
  ]
</script>
