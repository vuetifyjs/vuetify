<template>
  <v-app>
    <div class="grid">
      <v-list :items="items" />

      <v-list :items="itemsWithPrependIcon" />

      <v-list :items="itemsWithSomePrependIcon" />

      <v-list :items="items" indentation="bad" />

      <v-list :items="itemsWithPrependIcon" indentation="bad" />

      <v-list :items="itemsWithSomePrependIcon" indentation="bad" />
    </div>
  </v-app>
</template>

<script setup>
  const items = [
    {
      title: 'Root child',
      value: 'Root child',
    },
    {
      title: 'Root group',
      value: 'Root group',
      $children: [
        {
          title: 'First level child',
          value: 'First level child',
        },
        {
          title: 'First level group',
          value: 'First level group',
          iconPlacement: 'start',
          $children: [
            {
              title: 'Second level child',
              value: 'Second level child',
            },
          ],
        },
      ],
    },
  ]

  const itemsWithSomePrependIcon = [
    {
      prependIcon: 'mdi-home',
      title: 'Root child',
      value: 'Root child',
    },
    {
      title: 'Root group',
      value: 'Root group',
      $children: [
        {
          title: 'First level child',
          value: 'First level child',
          prependIcon: 'mdi-home',
        },
        {
          title: 'First level group',
          value: 'First level group',
          prependIcon: 'mdi-home',
          $children: [
            {
              title: 'Second level child',
              value: 'Second level child',
            },
          ],
        },
      ],
    },
  ]

  const itemsWithPrependIcon = [
    {
      prependIcon: 'mdi-home',
      title: 'Root child',
      value: 'Root child',
    },
    {
      title: 'Root group',
      value: 'Root group',
      prependIcon: 'mdi-home',
      $children: [
        {
          title: 'First level child',
          value: 'First level child',
          prependIcon: 'mdi-home',
        },
        {
          title: 'First level group',
          value: 'First level group',
          prependIcon: 'mdi-home',
          $children: [
            {
              title: 'Second level child',
              value: 'Second level child',
              prependIcon: 'mdi-home',
            },
          ],
        },
      ],
    },
  ]
</script>

<style>
  .grid {
    padding: 40px;
    background: lightgrey;
    grid-template-columns: 1fr 1fr 1fr;
    display: grid;
    grid-gap: 40px;
  }
</style>
