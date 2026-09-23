<template>
  <v-treeview
    :items="items"
    item-value="id"
    open-all
  ></v-treeview>
</template>

<script setup>
  const items = [
    {
      id: 1,
      title: 'Applications :',
      children: [
        { id: 2, title: 'Calendar : app' },
        { id: 3, title: 'Chrome : app' },
        { id: 4, title: 'Webstorm : app' },
      ],
    },
    {
      id: 5,
      title: 'Documents :',
      children: [
        {
          id: 6,
          title: 'vuetify :',
          children: [
            {
              id: 7,
              title: 'src :',
              children: [
                { id: 8, title: 'index : ts' },
                { id: 9, title: 'bootstrap : ts' },
              ],
            },
          ],
        },
      ],
    },
  ]
</script>
