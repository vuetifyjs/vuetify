<template>
  <v-app>
    <div>
      <v-text-field v-model="search" variant="outlined" label="Search" />
    </div>

    <!-- <v-data-table
      show-select
      :headers="simple"
      :items="items"
      :search="search"
    /> -->

    <!-- <div>
      <v-autocomplete
        :items="people"
        filled
        chips
        closable-chips
        color="blue-grey-lighten-2"
        label="Select"
        item-title="name"
        item-value="name"
        multiple
        :filter-keys="['name']"
      />
    </div> -->

    <!--
    <h1>expanded</h1>
    <v-data-table
      :headers="simple"
      :items="items"
      expand-on-click
    >
      <template v-slot:expanded-row="{ columns }">
        <tr>
          <td :colspan="columns.length">
            This is an expanded row
          </td>
        </tr>
      </template>
    </v-data-table> -->

    <!-- <h1>group</h1>
    <v-data-table
      show-select
      :headers="simple"
      :items="groupItems"
      :group-by="[{ key: 'two', order: 'asc' }, { key: 'three', order: 'asc' }]"
      :items-per-page="-1"
    ></v-data-table> -->

    <!-- <h1>server</h1>
    <v-data-table-server
      show-select
      :headers="simple"
      :items="remoteItems"
      :items-length="1000"
      :loading="loading"
      @update:options="getItems"
    ></v-data-table-server> -->

    <h1>virtual</h1>
    <v-data-table-virtual
      :headers="simple"
      :items="serverItems"
      :search="search"
      fixed-header
      height="500px"
    >
      <template #item.four>
        <v-btn>hello</v-btn>
      </template>
    </v-data-table-virtual>

    <!-- <h1>simple</h1>
    <v-table>
      <thead>
        <tr>
          <th>One</th>
          <th>Two</th>
          <th>Three</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>foo</td>
          <td>bar</td>
          <td>fizz</td>
        </tr>
      </tbody>
    </v-table> -->

  </v-app>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  const serverItems = Array(1000).fill(0).map((_, i) => ({ id: i, name: `Name ${i}`, one: i, two: Math.random() > 0.5 ? 'foo' : 'bar', three: Math.random() > 0.5 ? 'hello' : 'world', four: 'zxc' }))

  const items = Array(20).fill(0).map((_, i) => ({ id: i, name: `Name ${i}`, one: i, two: Math.random() > 0.5 ? 'foo' : 'bar', three: Math.random() > 0.5 ? 'hello' : 'world', four: 'zxc' }))

  const groupItems = [
    { id: 1, name: 'Name 1', two: 'foo', three: 'hello' },
    { id: 2, name: 'Name 2', two: 'foo', three: 'world' },
    { id: 3, name: 'Name 3', two: 'foo', three: 'hello' },
    { id: 4, name: 'Name 4', two: 'bar', three: 'world' },
    { id: 5, name: 'Name 5', two: 'bar', three: 'world' },
    { id: 6, name: 'Name 6', two: 'bar', three: 'hello' },
  ]

  const srcs = {
    1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
  }

  export default defineComponent({
    data: () => ({
      people: [
        { name: 'Sandra Adams', group: 'Group 1', avatar: srcs[1] },
        { name: 'Ali Connors', group: 'Group 1', avatar: srcs[2] },
        { name: 'Trevor Hansen', group: 'Group 1', avatar: srcs[3] },
        { name: 'Tucker Smith', group: 'Group 1', avatar: srcs[2] },
        { name: 'Britta Holt', group: 'Group 2', avatar: srcs[4] },
        { name: 'Jane Smith ', group: 'Group 2', avatar: srcs[5] },
        { name: 'John Smith', group: 'Group 2', avatar: srcs[1] },
        { name: 'Sandra Williams', group: 'Group 2', avatar: srcs[3] },
      ],
      groupItems,
      serverItems,
      simple: [
        {
          title: 'Name',
          id: 'name',
        },
        {
          title: 'Two',
          id: 'two',
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
      search: '',
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
      remoteItems: serverItems.slice(0, 10),
      timeout: null as any,
      loading: false,
    }),
    methods: {
      getItems ({ startIndex, stopIndex }: any) {
        this.loading = true
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          console.log('loading from remote', startIndex, stopIndex)
          this.remoteItems = serverItems.slice(startIndex, stopIndex)
          this.loading = false
        }, 1000)
      },
    },
  })
</script>
