<template>
  <v-card>
    <v-toolbar
      card
      color="grey lighten-3"
    >
      <v-icon>mdi-silverware</v-icon>
      <v-toolbar-title>Local hotspots</v-toolbar-title>
    </v-toolbar>

    <v-layout>
      <v-flex>
        <v-card-text>
          <v-treeview
            v-model="tree"
            :load-children="fetch"
            :items="items"
            activatable
            active-class="grey lighten-4 indigo--text"
            selected-color="indigo"
            open-on-click
            selectable
            expand-icon="mdi-chevron-down"
            on-icon="mdi-bookmark"
            off-icon="mdi-bookmark-outline"
            indeterminate-icon="mdi-bookmark-minus"
          >
          </v-treeview>
        </v-card-text>
      </v-flex>

      <v-divider vertical></v-divider>

      <v-flex
        xs12
        md6
      >
        <v-card-text>
          <div
            v-if="selections.length === 0"
            key="title"
            class="title font-weight-light grey--text pa-3 text-xs-center"
          >
            Select your favorite breweries
          </div>

          <v-scroll-x-transition
            group
            hide-on-leave
          >
            <v-chip
              v-for="(selection, i) in selections"
              :key="i"
              color="grey"
              dark
              small
            >
              <v-icon left small>mdi-beer</v-icon>
              {{ selection.name }}
            </v-chip>
          </v-scroll-x-transition>
        </v-card-text>
      </v-flex>
    </v-layout>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        flat
        @click="tree = []"
      >
        Reset
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        class="white--text"
        color="green darken-1"
        depressed
      >
        Save
        <v-icon right>mdi-content-save</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      breweries: [],
      isLoading: false,
      tree: [],
      types: []
    }),

    computed: {
      items () {
        const children = this.types.map(type => ({
          id: type,
          name: this.getName(type),
          children: this.getChildren(type)
        }))

        return [{
          id: 1,
          name: 'All Breweries',
          children
        }]
      },
      selections () {
        const selections = []

        for (const leaf of this.tree) {
          const brewery = this.breweries.find(brewery => brewery.id === leaf)

          if (!brewery) continue

          selections.push(brewery)
        }

        return selections
      },
      shouldShowTree () {
        return this.breweries.length > 0 && !this.isLoading
      }
    },

    watch: {
      breweries (val) {
        this.types = val.reduce((acc, cur) => {
          const type = cur.brewery_type

          if (!acc.includes(type)) acc.push(type)

          return acc
        }, []).sort()
      }
    },

    methods: {
      fetch () {
        if (this.breweries.length) return

        return fetch('https://api.openbrewerydb.org/breweries')
          .then(res => res.json())
          .then(data => (this.breweries = data))
          .catch(err => console.log(err))
      },
      getChildren (type) {
        const breweries = []

        for (const brewery of this.breweries) {
          if (brewery.brewery_type !== type) continue

          breweries.push({
            ...brewery,
            name: this.getName(brewery.name)
          })
        }

        return breweries.sort((a, b) => {
          return a.name > b.name ? 1 : -1
        })
      },
      getName (name) {
        return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
      }
    }
  }
</script>

<codepen-resources lang="json">
  {
    "css": ["https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css"]
  }
</codepen-resources>
