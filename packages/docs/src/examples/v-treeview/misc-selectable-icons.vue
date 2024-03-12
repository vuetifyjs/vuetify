<template>
  <v-card>
    <v-toolbar
      color="primary"
      flat
    >
      <template v-slot:prepend>
        <v-icon start>mdi-silverware</v-icon>

        <v-toolbar-title>Local hotspots</v-toolbar-title>
      </template>
    </v-toolbar>

    <v-row>
      <v-col>
        <v-card-text>
          <v-treeview
            v-model:selected="tree"
            :items="items"
            :load-children="load"
            expand-icon="mdi-chevron-down"
            indeterminate-icon="mdi-bookmark-minus"
            item-title="name"
            item-value="name"
            off-icon="mdi-bookmark-outline"
            on-icon="mdi-bookmark"
            selected-color="indigo"
            open-on-click
            return-object
            selectable
          ></v-treeview>
        </v-card-text>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col
        cols="12"
        md="6"
      >
        <v-card-text>
          <div
            v-if="tree.length === 0"
            key="title"
            class="text-h6 font-weight-light text-grey pa-4 text-center"
          >
            Select your favorite breweries
          </div>

          <v-scroll-x-transition
            group
            hide-on-leave
          >
            <v-chip
              v-for="(selection, i) in tree"
              :key="i"
              :text="selection"
              class="ma-1"
              color="grey"
              prepend-icon="mdi-beer"
              size="small"
            ></v-chip>
          </v-scroll-x-transition>
        </v-card-text>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        text="Reset"
        variant="text"
        @click="tree = []"
      ></v-btn>

      <v-spacer></v-spacer>

      <v-btn
        append-icon="mdi-content-save"
        color="green-darken-1"
        text="Save"
        variant="flat"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'

  const breweries = ref([])
  const tree = ref([])
  const types = ref([])
  const items = computed(() => {
    const children = types.value.map(type => ({
      id: type,
      name: getName(type),
      children: getChildren(type),
    }))
    return [{
      id: 1,
      name: 'All Breweries',
      children,
    }]
  })
  function load () {
    if (breweries.value.length) return

    return fetch('https://api.openbrewerydb.org/breweries').then(res => res.json()).then(data => (breweries.value = data)).catch(err => console.log(err))
  }
  function getChildren (type) {
    const _breweries = []
    for (const brewery of breweries.value) {
      if (brewery.brewery_type !== type) continue
      _breweries.push({
        ...brewery,
        name: getName(brewery.name),
      })
    }
    return _breweries.sort((a, b) => {
      return a.name > b.name ? 1 : -1
    })
  }
  function getName (name) {
    return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
  }
  watch(breweries, val => {
    types.value = val.reduce((acc, cur) => {
      const type = cur.brewery_type
      if (!acc.includes(type)) acc.push(type)
      return acc
    }, []).sort()
  })
</script>

<script>
  export default {
    data: () => ({
      breweries: [],
      tree: [],
      types: [],
    }),

    computed: {
      items () {
        const children = this.types.map(type => ({
          id: type,
          name: this.getName(type),
          children: this.getChildren(type),
        }))

        return [{
          id: 1,
          name: 'All Breweries',
          children,
        }]
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
      load () {
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
            name: this.getName(brewery.name),
          })
        }

        return breweries.sort((a, b) => {
          return a.name > b.name ? 1 : -1
        })
      },
      getName (name) {
        return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
      },
    },
  }
</script>
