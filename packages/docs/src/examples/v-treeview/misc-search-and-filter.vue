<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-sheet class="pa-4 bg-primary-lighten-2">
      <v-text-field
        v-model="search"
        clear-icon="mdi-close-circle-outline"
        label="Search Company Directory"
        clearable
        dark
        flat
        hide-details
        solo-inverted
      ></v-text-field>
      <v-checkbox
        v-model="caseSensitive"
        label="Case sensitive search"
        dark
        hide-details
      ></v-checkbox>
    </v-sheet>
    <v-card-text>
      <v-treeview
        v-model:open="open"
        :filter="filter"
        :items="items"
        :search="search"
      >
        <template v-slot:prepend="{ item }">
          <v-icon
            v-if="item.children"
            :icon="`mdi-${item.id === 1 ? 'home-variant' : 'folder-network'}`"
          ></v-icon>
        </template>
      </v-treeview>
    </v-card-text>
  </v-card>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const items = ref([
    {
      id: 1,
      title: 'Vuetify Human Resources',
      children: [
        {
          id: 2,
          title: 'Core team',
          children: [
            {
              id: 201,
              title: 'John',
            },
            {
              id: 202,
              title: 'Kael',
            },
            {
              id: 203,
              title: 'Nekosaur',
            },
            {
              id: 204,
              title: 'Jacek',
            },
            {
              id: 205,
              title: 'Andrew',
            },
          ],
        },
        {
          id: 3,
          title: 'Administrators',
          children: [
            {
              id: 301,
              title: 'Mike',
            },
            {
              id: 302,
              title: 'Hunt',
            },
          ],
        },
        {
          id: 4,
          title: 'Contributors',
          children: [
            {
              id: 401,
              title: 'Phlow',
            },
            {
              id: 402,
              title: 'Brandon',
            },
            {
              id: 403,
              title: 'Sean',
            },
          ],
        },
      ],
    },
  ])
  const open = ref([1, 2])
  const search = ref(null)
  const caseSensitive = ref(false)
  const filter = computed(() => {
    return caseSensitive.value ? (item, search, textKey) => item[textKey].indexOf(search) > -1 : undefined
  })
</script>

<script>
  export default {
    data: () => ({
      items: [
        {
          id: 1,
          title: 'Vuetify Human Resources',
          children: [
            {
              id: 2,
              title: 'Core team',
              children: [
                {
                  id: 201,
                  title: 'John',
                },
                {
                  id: 202,
                  title: 'Kael',
                },
                {
                  id: 203,
                  title: 'Nekosaur',
                },
                {
                  id: 204,
                  title: 'Jacek',
                },
                {
                  id: 205,
                  title: 'Andrew',
                },
              ],
            },
            {
              id: 3,
              title: 'Administrators',
              children: [
                {
                  id: 301,
                  title: 'Mike',
                },
                {
                  id: 302,
                  title: 'Hunt',
                },
              ],
            },
            {
              id: 4,
              title: 'Contributors',
              children: [
                {
                  id: 401,
                  title: 'Phlow',
                },
                {
                  id: 402,
                  title: 'Brandon',
                },
                {
                  id: 403,
                  title: 'Sean',
                },
              ],
            },
          ],
        },
      ],
      open: [1, 2],
      search: null,
      caseSensitive: false,
    }),
    computed: {
      filter () {
        return this.caseSensitive
          ? (item, search, textKey) => item[textKey].indexOf(search) > -1
          : undefined
      },
    },
  }
</script>
