<template>
  <v-app>
    <v-data-table :headers="headers" :items="items"></v-data-table>
  </v-app>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    data: () => ({
      headers: [
        [
          {
            name: 'Group',
            colspan: 2,
          },
          {
            id: 'end',
            name: 'Two rows',
            rowspan: 2,
          },
        ],
        [
          {
            id: 'one',
            name: 'One',
          },
          {
            id: 'two',
            name: 'Two',
          },
          {
            id: 'three',
            name: 'Three',
          },
        ],
      ],
      items: [
        {
          one: 'one',
          two: 'two',
          end: 'end',
          three: 'three',
        },
      ],
    }),
  })
</script>
