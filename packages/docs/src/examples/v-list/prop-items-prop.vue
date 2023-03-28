<template>
  <v-card
    class="mx-auto"
    max-width="300"
  >
    <v-list :items="items"></v-list>
  </v-card>
</template>

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
