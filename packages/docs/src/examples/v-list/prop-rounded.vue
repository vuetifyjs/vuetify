<template>
  <v-card
    class="mx-auto pa-2"
    max-width="300"
  >
    <v-list>
      <v-list-subheader>REPORTS</v-list-subheader>

      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        color="primary"
        rounded="xl"
      >
        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
  const items = [
    { text: 'Real-Time', icon: 'i-mdi:clock' },
    { text: 'Audience', icon: 'i-mdi:account' },
    { text: 'Conversions', icon: 'i-mdi:flag' },
  ]
</script>

<script>
  export default {
    data: () => ({
      items: [
        { text: 'Real-Time', icon: 'i-mdi:clock' },
        { text: 'Audience', icon: 'i-mdi:account' },
        { text: 'Conversions', icon: 'i-mdi:flag' },
      ],
    }),
  }
</script>
