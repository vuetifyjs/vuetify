<template>
  <v-data-table
    class="elevation-1"
    :headers="headers"
    :items="desserts"
    items-per-page="5"
    :item-value="item => `${item.name}-${item.version}`"
    show-select
  ></v-data-table>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            title: 'Operating System',
            align: 'start',
            key: 'name',
          },
          { title: 'Version', align: 'end', key: 'version' },
        ],
        desserts: [
          {
            name: 'Windows',
            version: '3.11',
          },
          {
            name: 'Windows',
            version: '95',
          },
          {
            name: 'Windows',
            version: '98',
          },
          {
            name: 'Windows',
            version: '2000',
          },
          {
            name: 'Windows',
            version: 'XP',
          },
          {
            name: 'Windows',
            version: 'Vista',
          },
          {
            name: 'Windows',
            version: '7',
          },
          {
            name: 'Windows',
            version: '8',
          },
          {
            name: 'Windows',
            version: '10',
          },
          {
            name: 'Windows',
            version: '11',
          },
        ],
      }
    },
  }
</script>
