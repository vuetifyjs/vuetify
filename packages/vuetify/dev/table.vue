<template>
  <v-app>
    <!-- <v-data-table
      :headers="headers"
      :items="items"
      group-by="four"
    ></v-data-table> -->

    <!-- <v-data-table-server
      :headers="headers"
      :items="serverItems"
      :items-per-page="10"
      :item-count="100"
      @update:options="fetchFromServer"
      :loading="loading"
      v-model:sortBy="sortBy"
    ></v-data-table-server>

    <pre>
      {{ sortBy }}
    </pre>

    <v-btn @click="sortBy = [{ key: 'name', order: 'desc' }]">order name desc</v-btn> -->

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
      :item-count="items.length"
      fixed-header
      height="500px"
    ></v-data-table-virtual>
  </v-app>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  const items = Array(100).fill(0).map((_, i) => ({ id: i, name: `Name ${i}`, one: i, two: 'foo', three: 'end', four: Math.random() > 0.5 ? 'zxc' : 'qwe' }))

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
      serverItems: items.slice(0, 10),
      sortBy: [],
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
      fetchFromServer ({ page, itemsPerPage, sortBy }) {
        this.loading = true

        setTimeout(() => {
          const start = (page - 1) * itemsPerPage
          const stop = start + itemsPerPage
          const sorted = sortBy.length ? [...items].sort((a, b) => sortBy[0].order === 'asc' ? a[sortBy[0].key].localeCompare(b[sortBy[0].key]) : b[sortBy[0].key].localeCompare(a[sortBy[0].key])) : items
          this.serverItems = sorted.slice(start, stop)
          this.loading = false
        }, 2000)
      },
    },
  })
</script>
