<template>
  <v-card
    class="mx-auto"
    max-width="300"
  >
    <v-list :items="items"></v-list>
  </v-card>
</template>

<script setup>
  const items = [
    {
      title: 'Item #1',
      value: 1,
      props: {
        prependIcon: 'mdi-home',
      },
    },
    {
      title: 'Item #2',
      value: 2,
      props: {
        appendIcon: 'mdi-close',
      },
    },
    {
      title: 'Item #3',
      value: 3,
      props: {
        color: 'primary',
      },
    },
  ]
</script>

<script>
  export default {
    data: () => ({
      items: [
        {
          title: 'Item #1',
          value: 1,
          props: {
            prependIcon: 'mdi-home',
          },
        },
        {
          title: 'Item #2',
          value: 2,
          props: {
            appendIcon: 'mdi-close',
          },
        },
        {
          title: 'Item #3',
          value: 3,
          props: {
            color: 'primary',
          },
        },
      ],
    }),
  }
</script>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=13845-40911"
  }
</example-meta>
