<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-sheet class="pa-4 primary-lighten-2">
      <v-text-field
        v-model="search"
        label="Search Company Directory"
        hide-details
        clearable
      ></v-text-field>
      <v-checkbox
        v-model="caseSensitive"
        hide-details
        label="Case sensitive search"
      ></v-checkbox>
    </v-sheet>
    <v-card-text>
      <v-treeview
        :items="items"
        :search="search"
        :custom-filter="filter"
      ></v-treeview>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          value: 1,
          title: 'Vuetify Human Resources',
          prependIcon: 'mdi-home-variant',
          $children: [
            {
              value: 2,
              title: 'Core team',
              prependIcon: 'mdi-folder-network',
              $children: [
                {
                  value: 201,
                  title: 'John',
                },
                {
                  value: 202,
                  title: 'Kael',
                },
                {
                  value: 203,
                  title: 'Nekosaur',
                },
                {
                  value: 204,
                  title: 'Jacek',
                },
                {
                  value: 205,
                  title: 'Andrew',
                },
              ],
            },
            {
              value: 3,
              title: 'Administrators',
              prependIcon: 'mdi-folder-network',
              $children: [
                {
                  value: 301,
                  title: 'Mike',
                },
                {
                  value: 302,
                  title: 'Hunt',
                },
              ],
            },
            {
              value: 4,
              title: 'Contributors',
              prependIcon: 'mdi-folder-network',
              $children: [
                {
                  value: 401,
                  title: 'Phlow',
                },
                {
                  value: 402,
                  title: 'Brandon',
                },
                {
                  value: 403,
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
          ? (value, query, item) => String(value).indexOf(query)
          : undefined
      },
    },
  }
</script>
