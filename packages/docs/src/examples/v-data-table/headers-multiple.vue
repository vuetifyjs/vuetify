<template>
  <v-data-table
    :headers="headers"
    :items="items"
    item-key="name"
    hide-default-footer
  ></v-data-table>
</template>

<script setup>
  const headers = [
    { title: 'Pyramid', value: 'name' },
    { title: 'Location', value: 'location' },
    { title: 'Construction Date', value: 'constructionDate' },
    {
      title: 'Dimensions',
      align: 'center',
      children: [
        { title: 'Height(m)', value: 'height' },
        { title: 'Base(m)', value: 'base' },
        { title: 'Volume(m³)', value: 'volume' },
      ],
    },
  ]

  const items = [
    {
      name: 'Great Pyramid of Giza',
      location: 'Egypt',
      height: '146.6',
      base: '230.4',
      volume: '2583285',
      constructionDate: 'c. 2580–2560 BC',
    },
    {
      name: 'Pyramid of Khafre',
      location: 'Egypt',
      height: '136.4',
      base: '215.3',
      volume: '1477485',
      constructionDate: 'c. 2570 BC',
    },
    {
      name: 'Red Pyramid',
      location: 'Egypt',
      height: '104',
      base: '220',
      volume: '1602895',
      constructionDate: 'c. 2590 BC',
    },
    {
      name: 'Bent Pyramid',
      location: 'Egypt',
      height: '101.1',
      base: '188.6',
      volume: '1200690',
      constructionDate: 'c. 2600 BC',
    },
    {
      name: 'Pyramid of the Sun',
      location: 'Mexico',
      height: '65',
      base: '225',
      volume: '1237097',
      constructionDate: 'c. 200 CE',
    },
  ]
</script>

<script>
  export default {
    data: () => ({
      headers: [
        { title: 'Pyramid', value: 'name' },
        { title: 'Location', value: 'location' },
        { title: 'Construction Date', value: 'constructionDate' },
        {
          title: 'Dimensions',
          align: 'center',
          children: [
            { title: 'Height(m)', value: 'height' },
            { title: 'Base(m)', value: 'base' },
            { title: 'Volume(m³)', value: 'volume' },
          ],
        },
      ],
      items: [
        {
          name: 'Great Pyramid of Giza',
          location: 'Egypt',
          height: '146.6',
          base: '230.4',
          volume: '2583285',
          constructionDate: 'c. 2580–2560 BC',
        },
        {
          name: 'Pyramid of Khafre',
          location: 'Egypt',
          height: '136.4',
          base: '215.3',
          volume: '1477485',
          constructionDate: 'c. 2570 BC',
        },
        {
          name: 'Red Pyramid',
          location: 'Egypt',
          height: '104',
          base: '220',
          volume: '1602895',
          constructionDate: 'c. 2590 BC',
        },
        {
          name: 'Bent Pyramid',
          location: 'Egypt',
          height: '101.1',
          base: '188.6',
          volume: '1200690',
          constructionDate: 'c. 2600 BC',
        },
        {
          name: 'Pyramid of the Sun',
          location: 'Mexico',
          height: '65',
          base: '225',
          volume: '1237097',
          constructionDate: 'c. 200 CE',
        },
      ],
    }),
  }
</script>
