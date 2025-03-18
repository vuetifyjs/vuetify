<template>
  <v-select :items="items" item-title="name" label="User">
    <template v-slot:item="{ props: itemProps, item }">
      <v-list-item v-bind="itemProps" :subtitle="item.raw.department"></v-list-item>
    </template>
  </v-select>
</template>

<script setup>
  const items = [
    {
      name: 'John',
      department: 'Marketing',
    },
    {
      name: 'Jane',
      department: 'Engineering',
    },
    {
      name: 'Joe',
      department: 'Sales',
    },
    {
      name: 'Janet',
      department: 'Engineering',
    },
    {
      name: 'Jake',
      department: 'Marketing',
    },
    {
      name: 'Jack',
      department: 'Sales',
    },
  ]
</script>

<script>
  export default {
    data: () => ({
      items: [
        {
          name: 'John',
          department: 'Marketing',
        },
        {
          name: 'Jane',
          department: 'Engineering',
        },
        {
          name: 'Joe',
          department: 'Sales',
        },
        {
          name: 'Janet',
          department: 'Engineering',
        },
        {
          name: 'Jake',
          department: 'Marketing',
        },
        {
          name: 'Jack',
          department: 'Sales',
        },
      ],
    }),
  }
</script>
