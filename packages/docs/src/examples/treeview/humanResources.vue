<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-sheet class="pa-3 primary lighten-2">
      <v-text-field
        v-model="search"
        label="Search Company Directory"
        dark
        flat
        solo-inverted
        hide-details
        clearable
        clear-icon="mdi-close-circle-outline"
      ></v-text-field>
      <v-checkbox
        v-model="caseSensitive"
        dark
        hide-details
        label="Case sensitive search"
      ></v-checkbox>
    </v-sheet>
    <v-card-text>
      <v-treeview
        :items="items"
        :search="search"
        :filter="filter"
        :open.sync="open"
      >
        <template v-slot:prepend="{ item }">
          <v-icon
            v-if="item.children"
            v-text="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
          ></v-icon>
        </template>
      </v-treeview>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          id: 1,
          name: 'Vuetify Human Resources',
          children: [
            {
              id: 2,
              name: 'Core team',
              children: [
                {
                  id: 201,
                  name: 'John'
                },
                {
                  id: 202,
                  name: 'Kael'
                },
                {
                  id: 203,
                  name: 'Nekosaur'
                },
                {
                  id: 204,
                  name: 'Jacek'
                },
                {
                  id: 205,
                  name: 'Andrew'
                }
              ]
            },
            {
              id: 3,
              name: 'Administrators',
              children: [
                {
                  id: 301,
                  name: 'Ranee'
                },
                {
                  id: 302,
                  name: 'Rachel'
                }
              ]
            },
            {
              id: 4,
              name: 'Contributors',
              children: [
                {
                  id: 401,
                  name: 'Phlow'
                },
                {
                  id: 402,
                  name: 'Brandon'
                },
                {
                  id: 403,
                  name: 'Sean'
                }
              ]
            }
          ]
        }
      ],
      open: [1, 2],
      search: null,
      caseSensitive: false
    }),
    computed: {
      filter () {
        return this.caseSensitive
          ? (item, search, textKey) => item[textKey].indexOf(search) > -1
          : undefined
      }
    }
  }
</script>
