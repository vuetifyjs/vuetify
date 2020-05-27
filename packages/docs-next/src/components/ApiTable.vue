<template>
  <v-simple-table>
    <template #default>
      <thead>
        <tr>
          <th
            v-for="(header, hkey) in headers"
            :key="`h-${hkey}`"
            class="text-left"
          >
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, ind) in items"
          :key="`row-${ind}`"
        >
          <td
            v-for="(value, name) in item"
            :key="`${ind}-${name}`"
          >
            {{ value }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
  export default {
    name: 'ApiTable',

    data: () => ({
      headers: [],
      items: [],
    }),

    mounted () {
      const tableText = this.$slots.default[0].text || ''
      const rows = tableText.trim().split('\n')
      if (rows.length) {
        const headerKeys = this.processRow(rows[0])
        const itemRows = rows.slice(2, rows.length)
        this.headers = headerKeys
        this.items = this.genItems(headerKeys, itemRows)
      }
    },

    methods: {
      processRow (row) {
        return row.substr(2, row.length - 4).split(' | ')
      },
      genHeaders (headerKeys) {
        const headers = []
        for (const key in headerKeys) {
          headers.push(headerKeys[key].toLowerCase())
        }
        return headers
      },
      genItems (headerKeys, rows) {
        const items = []
        for (const row in rows) {
          const itemValues = this.processRow(rows[row])
          const item = {}
          for (const key in headerKeys) {
            const header = headerKeys[key]
            item[header] = itemValues[key].trim().toLowerCase()
          }
          items.push(item)
        }
        return items
      },
    },
  }
</script>
