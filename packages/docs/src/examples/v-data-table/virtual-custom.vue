<template>
  <v-data-table-virtual
    :headers="headers"
    :items="items"
    item-key="id"
    fixed-header
  >
    <template v-slot:item="{ columns, internalItem, props, itemRef }">
      <tr v-bind="props" :ref="itemRef">
        <td v-for="column in columns" :key="column.key">
          {{ internalItem.raw[column.key] }}
        </td>
      </tr>
    </template>
  </v-data-table-virtual>
</template>

<script setup>
  import { computed } from 'vue'

  const headers = [
    { title: 'ID', value: 'id', sortable: true },
    { title: 'Title', value: 'title', sortable: true },
    { title: 'Name', value: 'name', sortable: true },
    { title: 'Email', value: 'email', sortable: true },
    { title: 'Role', value: 'role', sortable: true },
  ]

  const items = computed(() => [
    { id: 1, title: 'Dr.', name: 'Sarah Johnson', email: 'sarah.johnson@company.com', role: 'Owner' },
    { id: 2, title: 'Mr.', name: 'Michael Chen', email: 'michael.chen@company.com', role: 'Manager' },
    { id: 3, title: 'Ms.', name: 'Emily Rodriguez', email: 'emily.rodriguez@company.com', role: 'Board Member' },
    { id: 4, title: 'Mr.', name: 'David Thompson', email: 'david.thompson@company.com', role: 'Manager' },
    { id: 5, title: 'Mrs.', name: 'Lisa Wang', email: 'lisa.wang@company.com', role: 'Owner' },
    { id: 6, title: 'Mr.', name: 'Robert Garcia', email: 'robert.garcia@company.com', role: 'Board Member' },
    { id: 7, title: 'Ms.', name: 'Jennifer Smith', email: 'jennifer.smith@company.com', role: 'Manager' },
    { id: 8, title: 'Mr.', name: 'Alex Kumar', email: 'alex.kumar@company.com', role: 'Board Member' },
    { id: 9, title: 'Ms.', name: 'Maria Gonzalez', email: 'maria.gonzalez@company.com', role: 'Manager' },
    { id: 10, title: 'Mr.', name: 'James Wilson', email: 'james.wilson@company.com', role: 'Owner' },
    { id: 11, title: 'Ms.', name: 'Rachel Brown', email: 'rachel.brown@company.com', role: 'Manager' },
    { id: 12, title: 'Mr.', name: 'Kevin Lee', email: 'kevin.lee@company.com', role: 'Board Member' },
  ])
</script>

<script>
  export default {
    data () {
      return {
        headers: [
          { title: 'ID', value: 'id', sortable: true },
          { title: 'Title', value: 'title', sortable: true },
          { title: 'Name', value: 'name', sortable: true },
          { title: 'Email', value: 'email', sortable: true },
          { title: 'Role', value: 'role', sortable: true },
        ],
        items: [
          { id: 1, title: 'Dr.', name: 'Sarah Johnson', email: 'sarah.johnson@company.com', role: 'Owner' },
          { id: 2, title: 'Mr.', name: 'Michael Chen', email: 'michael.chen@company.com', role: 'Manager' },
          { id: 3, title: 'Ms.', name: 'Emily Rodriguez', email: 'emily.rodriguez@company.com', role: 'Board Member' },
          { id: 4, title: 'Mr.', name: 'David Thompson', email: 'david.thompson@company.com', role: 'Manager' },
          { id: 5, title: 'Mrs.', name: 'Lisa Wang', email: 'lisa.wang@company.com', role: 'Owner' },
          { id: 6, title: 'Mr.', name: 'Robert Garcia', email: 'robert.garcia@company.com', role: 'Board Member' },
          { id: 7, title: 'Ms.', name: 'Jennifer Smith', email: 'jennifer.smith@company.com', role: 'Manager' },
          { id: 8, title: 'Mr.', name: 'Alex Kumar', email: 'alex.kumar@company.com', role: 'Board Member' },
          { id: 9, title: 'Ms.', name: 'Maria Gonzalez', email: 'maria.gonzalez@company.com', role: 'Manager' },
          { id: 10, title: 'Mr.', name: 'James Wilson', email: 'james.wilson@company.com', role: 'Owner' },
          { id: 11, title: 'Ms.', name: 'Rachel Brown', email: 'rachel.brown@company.com', role: 'Manager' },
          { id: 12, title: 'Mr.', name: 'Kevin Lee', email: 'kevin.lee@company.com', role: 'Board Member' },
        ],
      }
    },
  }
</script>
