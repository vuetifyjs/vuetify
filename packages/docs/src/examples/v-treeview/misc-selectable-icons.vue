<template>
  <v-card>
    <v-toolbar color="primary">
      <v-icon start>mdi-silverware</v-icon>
      <v-toolbar-title>Local hotspots</v-toolbar-title>
    </v-toolbar>

    <v-row>
      <v-col>
        <v-card-text>
          <v-treeview
            v-model:selected="selection"
            :items="tree"
            :loading="isLoading"
            selected-color="indigo"
            select-on-click
            show-select
            true-icon="mdi-bookmark"
            false-icon="mdi-bookmark-outline"
            indeterminate-icon="mdi-bookmark-minus"
            @click:open="fetch"
          >
          </v-treeview>
        </v-card-text>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col
        cols="12"
        md="6"
      >
        <v-card-text>
          <div
            v-if="selectedBreweries.length === 0"
            key="title"
            class="text-h6 font-weight-light grey--text pa-4 text-center"
          >
            Select your favorite breweries
          </div>

          <v-scroll-x-transition
            group
            hide-on-leave
          >
            <v-chip
              v-for="(brewery, i) in selectedBreweries"
              :key="i"
              color="grey"
              size="small"
              class="ma-1"
            >
              <v-icon
                start
                size="small"
                icon="mdi-beer"
              ></v-icon>
              {{ brewery.name }}
            </v-chip>
          </v-scroll-x-transition>
        </v-card-text>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        text
        @click="selection = []"
      >
        Reset
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        color="green-darken-1"
        variant="outlined"
      >
        Save
        <v-icon end>
          mdi-content-save
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  function capitalize (str) {
    return `${str.charAt(0).toUpperCase()}${str.slice(1)}`
  }

  export default {
    data: () => ({
      breweries: [],
      isLoading: false,
      selection: [],
      types: [],
    }),

    computed: {
      tree () {
        const children = this.types.map(type => ({
          value: type,
          title: capitalize(type),
          $children: this.breweries
            .filter(brewery => {
              return brewery.brewery_type === type
            })
            .map(brewery => {
              return {
                value: brewery.id,
                title: capitalize(brewery.name),
              }
            })
            .sort((a, b) => {
              return a.title > b.title ? 1 : -1
            }),
        }))

        return [{
          value: 1,
          hideSelect: true,
          title: 'All Breweries',
          $children: children,
        }]
      },
      shouldShowTree () {
        return this.breweries.length > 0 && !this.isLoading
      },
      selectedBreweries () {
        return this.breweries.filter(brewery => this.selection.includes(brewery.id))
      },
    },

    watch: {
      breweries (val) {
        this.types = val.reduce((acc, cur) => {
          const type = cur.brewery_type

          if (!acc.includes(type)) acc.push(type)

          return acc
        }, []).sort()
      },
    },

    methods: {
      fetch () {
        if (this.breweries.length) return

        this.isLoading = true

        return fetch('https://api.openbrewerydb.org/breweries')
          .then(res => res.json())
          .then(data => {
            this.breweries = data
            this.isLoading = false
          })
          .catch(err => console.log(err))
      },
    },
  }
</script>
