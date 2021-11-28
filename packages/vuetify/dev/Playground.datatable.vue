<template>
  <v-app>
    <v-data-table
      :headers="headers"
      :items="items"
      height="500px"
    />
    <div>foo</div>
    <v-virtual-data-table
      :headers="headers"
      :items="items"
      height="500px"
    />
  </v-app>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  const items = Array(1000).fill(0).map((_, i) => ({ id: i, one: i, two: 'foo', end: 'end' }))

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
            maxWidth: '2fr',
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
        ],
      ],
      // headers: [
      //   {
      //     id: 'end',
      //     name: 'Two rows',
      //     maxWidth: '2fr',
      //   },
      //   {
      //     id: 'one',
      //     name: 'One',
      //   },
      //   {
      //     id: 'two',
      //     name: 'Two',
      //   },
      // ],
      items,
    }),
  })
</script>
