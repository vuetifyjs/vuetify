<template>
  <v-select
    v-model="search"
    :items="['group 1', 'group 2', 'group 3']"
    label="Pick category"
  ></v-select>

  <v-treeview
    :items="items"
    :search="search"
    item-value="id"
  >
    <template v-slot:no-data>
      <v-btn
        prepend-icon="mdi-backup-restore"
        rounded="lg"
        text="Reset category"
        variant="text"
        border
        open-all
        @click="search = ''"
      ></v-btn>
    </template>
  </v-treeview>
</template>

<script setup>
  import { ref } from 'vue'

  const search = ref('group 3')
  const items = [
    {
      id: 1,
      title: 'group 1',
      children: [
        { id: 11, title: 'Calendar : app' },
      ],
    },
    {
      id: 2,
      title: 'group 2',
      children: [
        { id: 21, title: 'Chrome : app' },
        { id: 22, title: 'Webstorm : app' },
      ],
    },
  ]
</script>

<script>
  export default {
    data: () => ({
      search: 'group 2',
      items: [
        {
          id: 1,
          title: 'group 1',
          children: [
            { id: 11, title: 'Calendar : app' },
          ],
        },
        {
          id: 2,
          title: 'group 2',
          children: [
            { id: 21, title: 'Chrome : app' },
            { id: 22, title: 'Webstorm : app' },
          ],
        },
      ],
    }),
  }
</script>
