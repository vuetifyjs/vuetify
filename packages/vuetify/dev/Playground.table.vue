<template>
  <v-app>
    <!-- <v-data-table
      :headers="headers"
      :items="items"
      show-select
      height="500px"
    >
      <template #item.four>
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

    <v-data-table-virtual
      :headers="headers"
      :items="items"
      :items-length="items.length"
      fixed-header
      show-select
      height="500px"
    ></v-data-table-virtual>
  </v-app>
</template>

<script lang="ts">
  import { defineComponent, computed, ref, onMounted } from 'vue'

  const items = Array(100).fill(0).map((_, i) => ({ id: i, name: `Name ${i}`, one: i, two: 'foo', three: 'end', four: 'zxc' }))

  export default defineComponent({
    // data: () => ({
    //   headers: [
    //     [
    //       {
    //         title: 'Name',
    //         value: 'name',
    //         rowspan: 3,
    //         fixed: true,
    //         width: 200,
    //       },
    //       {
    //         title: 'Header',
    //         colspan: 4,
    //       },
    //     ],
    //     [
    //       {
    //         title: 'Section',
    //         colspan: 2,
    //       },
    //       {
    //         title: 'Section',
    //         colspan: 2,
    //       },
    //     ],
    //     [
    //       {
    //         title: 'One',
    //         value: 'one',
    //       },
    //       {
    //         title: 'Two',
    //         value: 'two',
    //       },
    //       {
    //         title: 'Three',
    //         value: 'three',
    //       },
    //       {
    //         title: 'Four',
    //         value: 'four',
    //       },
    //     ],
    //   ],
    //   // headers: [
    //   //   {
    //   //     id: 'end',
    //   //     name: 'Two rows',
    //   //     maxWidth: '2fr',
    //   //   },
    //   //   {
    //   //     id: 'one',
    //   //     name: 'One',
    //   //   },
    //   //   {
    //   //     id: 'two',
    //   //     name: 'Two',
    //   //   },
    //   // ],
    //   items,
    //   remoteItems: items.slice(0, 50),
    //   timeout: null as any,
    //   loading: false,
    // }),
    // methods: {
    //   getItems ({ startIndex, stopIndex }: any) {
    //     this.loading = true
    //     clearTimeout(this.timeout)
    //     this.timeout = setTimeout(() => {
    //       console.log('loading from remote', startIndex, stopIndex)
    //       this.remoteItems = items.slice(startIndex, stopIndex)
    //       this.loading = false
    //     }, 2000)
    //   },
    // },
    setup () {
      return {
        items,
        headers: [
          [
            {
              title: 'Name',
              value: 'name',
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
              value: 'one',
            },
            {
              title: 'Two',
              value: 'two',
            },
            {
              title: 'Three',
              value: 'three',
            },
            {
              title: 'Four',
              value: 'four',
            },
          ],
        ],
      }
    },
  })
</script>

<style scoped>
.wrapper {
  overflow-y: scroll;
  height: 500px;
}

.tbl {
  width: 100%;
  border-collapse: collapse;
}

.rw {
  background: lightgrey;
}
</style>
