<template>
  <v-select
    :item-props="itemProps"
    :items="items"
    label="User"
  ></v-select>
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

  function itemProps (item) {
    return {
      title: item.name,
      subtitle: item.department,
    }
  }
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

    methods: {
      itemProps (item) {
        return {
          title: item.name,
          subtitle: item.department,
        }
      },
    },
  }
</script>
