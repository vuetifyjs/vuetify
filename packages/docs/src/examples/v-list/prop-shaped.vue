<template>
  <v-card
    class="mx-auto"
    max-width="300"
  >
    <v-list shaped>
      <v-list-subheader>REPORTS</v-list-subheader>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item"
        active-color="primary"
        rounded="shaped"
      >
        <v-list-item-avatar left>
          <v-icon :icon="item.icon"></v-icon>
        </v-list-item-avatar>
        <v-list-item-title v-text="item.text"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      selectedItem: 1,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
    }),
  }
</script>
