<template>
  <v-app>
    <v-data-table
      :headers="headers"
      :items="items"
      height="500px"
    >
      <template #item.four>
        <v-btn>hello</v-btn>
      </template>
    </v-data-table>

    <v-data-table
      :headers="simple"
      :items="items"
    ></v-data-table>
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
    <!-- <v-data-table-virtual
      :headers="headers"
      :items="items"
      :items-length="items.length"
      fixed-header
      height="500px"
    >
      <template #item.four>
        <v-btn>hello</v-btn>
      </template>
    </v-data-table-virtual> -->
  </v-app>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  const items = Array(1000).fill(0).map((_, i) => ({ id: i, name: `Name ${i}`, one: i, two: 'foo', three: 'end', four: 'zxc' }))

  export default defineComponent({
    data: () => ({
      simple: [
        {
          title: 'Name',
          id: 'name',
          rowspan: 3,
          fixed: true,
          width: 200,
        },
        {
          title: 'One',
          id: 'one',
          width: 200,
          fixed: true,
        },
        {
          title: 'Two',
          id: 'two',
          width: 200,
        },
        {
          title: 'Three',
          id: 'three',
        },
        {
          title: 'Four',
          id: 'four',
        },
      ],
      headers: [
        [
          {
            title: 'Name',
            id: 'name',
            rowspan: 3,
            fixed: true,
            width: 200,
          },
          {
            title: 'Header',
            colspan: 4,
          },
        ],
        [
          {
            title: 'Section',
            colspan: 2,
          },
          {
            title: 'Section',
            colspan: 2,
          },
        ],
        [
          {
            title: 'One',
            id: 'one',
            width: 200,
          },
          {
            title: 'Two',
            id: 'two',
            width: 200,
          },
          {
            title: 'Three',
            id: 'three',
          },
          {
            title: 'Four',
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
