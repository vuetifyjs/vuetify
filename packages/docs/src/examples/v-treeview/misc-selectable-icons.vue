<template>
  <v-card>
    <v-toolbar
      color="surface-light"
      density="compact"
      title="Local hotspots"
      flat
    ></v-toolbar>

    <v-row density="comfortable">
      <v-col class="d-flex align-center" cols="12" sm="6">
        <v-treeview
          v-model:selected="tree"
          :items="items"
          :load-children="load"
          class="flex-1-0"
          false-icon="mdi-bookmark-outline"
          indeterminate-icon="mdi-bookmark-minus"
          item-title="name"
          item-value="id"
          select-strategy="classic"
          true-icon="mdi-bookmark"
          return-object
          selectable
        ></v-treeview>
      </v-col>

      <v-divider :vertical="$vuetify.display.mdAndUp" class="my-md-3"></v-divider>

      <v-col cols="12" sm="6">
        <v-card-text>
          <div
            v-if="tree.length === 0"
            class="text-h6 font-weight-light text-grey pa-4 text-center"
          >
            Select your favorite breweries
          </div>

          <div class="d-flex flex-wrap ga-1">
            <v-scroll-x-transition group hide-on-leave>
              <v-chip
                v-for="selection in tree"
                :key="selection.id"
                :prepend-icon="getIcon()"
                :text="selection.name"
                color="grey"
                size="small"
                border
                closable
                label
                @click:close="onClickClose(selection)"
              ></v-chip>
            </v-scroll-x-transition>
          </div>
        </v-card-text>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <template v-slot:actions>
      <v-btn
        text="Reset"
        @click="tree = []"
      ></v-btn>

      <v-spacer></v-spacer>

      <v-btn
        append-icon="mdi-content-save"
        color="surface-light"
        text="Save"
        variant="flat"
        border
      ></v-btn>
    </template>
  </v-card>
</template>

<script setup>
  import { ref, watch } from 'vue'

  const icons = [
    'mdi-beer',
    'mdi-glass-mug',
    'mdi-liquor',
    'mdi-glass-mug-variant',
  ]

  const breweries = ref([])
  const tree = ref([])
  const types = ref([])
  const items = ref([{
    id: 1,
    name: 'All Breweries',
    children: [],
  }])

  watch(breweries, val => {
    types.value = val.reduce((acc, cur) => {
      const type = cur.brewery_type
      if (!acc.includes(type)) acc.push(type)
      return acc
    }, []).sort()

    const children = types.value.map(type => ({
      id: type,
      name: getName(type),
      children: getChildren(type),
    }))
    const rootObj = items.value[0]
    rootObj.children = children
    items.value = [rootObj]
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

  function getIcon () {
    return icons[Math.floor(Math.random() * icons.length)]
  }

  function getName (name) {
    return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
  }

  function onClickClose (selection) {
    tree.value = tree.value.filter(item => item.id !== selection.id)
  }
</script>
