<template>
  <v-card
    class="mx-auto"
    max-width="300"
    tile
  >
    <v-list dense>
      <v-subheader>REPORTS</v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :base-color="item.baseColor"
          :color="item.color"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      selectedItem: 1,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock', baseColor: 'warning', color: 'secondary' },
        { text: 'Audience', icon: 'mdi-account', baseColor: 'info' },
        { text: 'Conversions', icon: 'mdi-flag', baseColor: '#ab1255', color: '#5C399E' },
        { text: 'Conversions', icon: 'mdi-flag', color: 'primary' },
      ],
    }),
  }
</script>
