<template>
  <v-toolbar
    color="orange accent-1"
    prominent
  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title class="title mr-4">Cryptocurrency</v-toolbar-title>
    <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      chips
      clearable
      hide-details
      hide-selected
      item-text="name"
      item-value="symbol"
      label="Search for a coin..."
      solo
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            Search for your favorite
            <strong>Cryptocurrency</strong>
          </v-list-item-title>
        </v-list-item>
      </template>
      <template v-slot:selection="{ item, selected }">
        <v-chip
          :selected="selected"
          color="blue-grey"
          class="white--text"
        >
          <v-icon left>mdi-coin</v-icon>
          <span v-text="item.name"></span>
        </v-chip>
      </template>
      <template v-slot:item="{ item }">
        <v-list-item-avatar
          color="indigo"
          class="headline font-weight-light white--text"
        >
          {{ item.name.charAt(0) }}
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
          <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>mdi-coin</v-icon>
        </v-list-item-action>
      </template>
    </v-autocomplete>
    <template v-slot:extension>
      <v-tabs
        :hide-slider="!model"
        color="transparent"
        slider-color="blue-grey"
      >
        <v-tab :disabled="!model">News</v-tab>
        <v-tab :disabled="!model">Trading</v-tab>
        <v-tab :disabled="!model">Blog</v-tab>
      </v-tabs>
    </template>
  </v-toolbar>
</template>

<script>
  export default {
    data: () => ({
      isLoading: false,
      items: [],
      model: null,
      search: null,
    }),

    watch: {
      search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return

        this.isLoading = true

        // Lazily load input items
        fetch('https://api.coinmarketcap.com/v2/listings/')
          .then(res => res.json())
          .then(res => {
            this.items = res.data
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },
    },
  }
</script>
