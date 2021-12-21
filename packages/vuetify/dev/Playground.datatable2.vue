<template>
  <v-app>
    <!-- <v-data-table
      :headers="headers"
      :items="items"
      height="500px"
    >
      <template #item.end>
        <v-btn>hello</v-btn>
      </template>
    </v-data-table> -->
    <!-- <div>foo</div>
    <v-virtual-data-table
      :headers="headers"
      :items="items"
      show-loader
      height="500px"
    >
      <template #item.four>
        <v-btn>hello</v-btn>
      </template>
    </v-virtual-data-table> -->
    <div>foo</div>
    <v-data-table-virtual
      :headers="headers"
      :items="items"
      :items-length="items.length"
      fixed-header
      height="500px"
    >
      <template #item.four>
        <v-btn>hello</v-btn>
      </template>
    </v-data-table-virtual>
  </v-app>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  const items = Array(1000).fill(0).map((_, i) => ({ id: i, name: `Name ${i}`, one: i, two: 'foo', three: 'end', four: 'zxc' }))

  export default defineComponent({
    data: () => ({
      headers: [
        [
          {
            name: 'Name',
            id: 'name',
            rowspan: 3,
            fixed: true,
            width: 200,
          },
          {
            name: 'Header',
            colspan: 4,
          },
        ],
        [
          {
            name: 'Section',
            colspan: 2,
          },
          {
            name: 'Section',
            colspan: 2,
          },
        ],
        [
          {
            name: 'One',
            id: 'one',
          },
          {
            name: 'Two',
            id: 'two',
          },
          {
            name: 'Three',
            id: 'three',
          },
          {
            name: 'Four',
            id: 'four',
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
      remoteItems: items.slice(0, 50),
      timeout: null as any,
      loading: false,
    }),
    methods: {
      getItems ({ startIndex, stopIndex }: any) {
        this.loading = true
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          console.log('loading from remote', startIndex, stopIndex)
          this.remoteItems = items.slice(startIndex, stopIndex)
          this.loading = false
        }, 2000)
      },
    },
  })
</script>
