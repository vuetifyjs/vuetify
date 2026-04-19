<template>
  <v-data-table
    :group-by="groupBy"
    :headers="headers"
    :items="tools"
    :items-per-page="-1"
    item-value="name"
    hide-default-footer
  >
    <template v-slot:group-summary="{ item, columns }">
      <tr class="font-weight-bold text-red">
        <td v-for="c in columns" :key="c.key" :class="['v-data-table__td', c.align ? `v-data-table-column--align-${c.align}` : '']">
          <span v-if="c.key === 'name'">Totals</span>
          <span v-if="c.key === 'weight'">{{ item.items.reduce((sum, n) => sum + n.raw.weight, 0) }}</span>
          <span v-if="c.key === 'length'">{{ item.items.reduce((sum, n) => sum + n.raw.length, 0) }}</span>
          <span v-if="c.key === 'price'">{{ item.items.reduce((sum, n) => sum + n.raw.price, 0) }}</span>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup>
  const groupBy = [{ key: 'type', order: 'asc' }]

  const headers = [
    { title: 'Tool Name', sortable: false, key: 'name' },
    { title: 'Weight(kg)', key: 'weight', align: 'end' },
    { title: 'Length(cm)', key: 'length', align: 'end' },
    { title: 'Price($)', key: 'price', align: 'end' },
  ]

  const tools = [
    { name: 'Hammer', weight: 0.5, length: 30, price: 10, type: 'hand' },
    { name: 'Screwdriver', weight: 0.2, length: 20, price: 5, type: 'hand' },
    { name: 'Drill', weight: 1.5, length: 25, price: 50, type: 'power' },
    { name: 'Saw', weight: 0.7, length: 50, price: 15, type: 'hand' },
    { name: 'Tape Measure', weight: 0.3, length: 10, price: 8, type: 'measuring' },
    { name: 'Level', weight: 0.4, length: 60, price: 12, type: 'measuring' },
    { name: 'Wrench', weight: 0.6, length: 25, price: 10, type: 'hand' },
    { name: 'Pliers', weight: 0.3, length: 15, price: 7, type: 'hand' },
    { name: 'Sander', weight: 2.0, length: 30, price: 60, type: 'power' },
    { name: 'Multimeter', weight: 0.5, length: 15, price: 30, type: 'measuring' },
  ]
</script>

<script>
  export default {
    data () {
      return {
        groupBy: [{ key: 'type', order: 'asc' }],
        headers: [
          { title: 'Tool Name', sortable: false, key: 'name' },
          { title: 'Weight(kg)', key: 'weight', align: 'end' },
          { title: 'Length(cm)', key: 'length', align: 'end' },
          { title: 'Price($)', key: 'price', align: 'end' },
        ],
        tools: [
          { name: 'Hammer', weight: 0.5, length: 30, price: 10, type: 'hand' },
          { name: 'Screwdriver', weight: 0.2, length: 20, price: 5, type: 'hand' },
          { name: 'Drill', weight: 1.5, length: 25, price: 50, type: 'power' },
          { name: 'Saw', weight: 0.7, length: 50, price: 15, type: 'hand' },
          { name: 'Tape Measure', weight: 0.3, length: 10, price: 8, type: 'measuring' },
          { name: 'Level', weight: 0.4, length: 60, price: 12, type: 'measuring' },
          { name: 'Wrench', weight: 0.6, length: 25, price: 10, type: 'hand' },
          { name: 'Pliers', weight: 0.3, length: 15, price: 7, type: 'hand' },
          { name: 'Sander', weight: 2.0, length: 30, price: 60, type: 'power' },
          { name: 'Multimeter', weight: 0.5, length: 15, price: 30, type: 'measuring' },
        ],
      }
    },
  }
</script>
