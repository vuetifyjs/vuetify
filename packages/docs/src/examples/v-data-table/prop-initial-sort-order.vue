<template>
  <v-data-table
    :headers="headers"
    :items="items"
  ></v-data-table>
</template>

<script setup>
  const headers = [
    { title: 'Severity', key: 'severity', initialSortOrder: 'desc' },
    { title: 'Issue', key: 'name', initialSortOrder: 'asc' },
  ]

  const items = [
    { severity: 1, name: 'Button alignment' },
    { severity: 3, name: 'Dialog does not close' },
    { severity: 2, name: 'Card image is missing' },
  ]
</script>

<script>
  export default {
    data: () => ({
      headers: [
        { title: 'Severity', key: 'severity', initialSortOrder: 'desc' },
        { title: 'Issue', key: 'name', initialSortOrder: 'asc' },
      ],
      items: [
        { severity: 1, name: 'Button alignment' },
        { severity: 3, name: 'Dialog does not close' },
        { severity: 2, name: 'Card image is missing' },
      ],
    }),
  }
</script>
