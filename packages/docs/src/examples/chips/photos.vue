<template>
  <v-card
    class="mx-auto"
    color="white"
    max-width="500"
  >
    <v-toolbar
      card
      color="transparent"
    >
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Photo Info</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        @click="$refs.search.focus()"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container
      grid-list-md
      py-0
    >
      <v-layout
        align-center
        justify-start
        wrap
      >
        <v-flex
          v-for="(selection, i) in selections"
          :key="selection.text"
          shrink
        >
          <v-chip
            :disabled="loading"
            close
            @click:close="selected.splice(i, 1)"
          >
            <v-icon
              left
              v-text="selection.icon"
            ></v-icon>
            {{ selection.text }}
          </v-chip>
        </v-flex>

        <v-flex v-if="!allSelected" xs12>
          <v-text-field
            ref="search"
            v-model="search"
            full-width
            hide-details
            label="Search"
            single-line
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>

    <v-divider v-if="!allSelected"></v-divider>

    <v-list>
      <template v-for="(item, i) in categories">
        <v-list-tile
          v-if="!selected.includes(i)"
          :key="i"
          :disabled="loading"
          @click="selected.push(i)"
        >
          <v-list-tile-avatar>
            <v-icon
              :disabled="loading"
              v-text="item.icon"
            ></v-icon>
          </v-list-tile-avatar>
          <v-list-tile-title v-text="item.text"></v-list-tile-title>
        </v-list-tile>
      </template>
    </v-list>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!selected.length"
        :loading="loading"
        color="purple"
        text
        @click="next"
      >Next</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          text: 'Nature',
          icon: 'mdi-nature'
        },
        {
          text: 'Nightlife',
          icon: 'mdi-glass-wine'
        },
        {
          text: 'November',
          icon: 'mdi-calendar-range'
        },
        {
          text: 'Portland',
          icon: 'mdi-map-marker'
        },
        {
          text: 'Biking',
          icon: 'mdi-bike'
        }
      ],
      loading: false,
      search: '',
      selected: []
    }),

    computed: {
      allSelected () {
        return this.selected.length === this.items.length
      },
      categories () {
        const search = this.search.toLowerCase()

        if (!search) return this.items

        return this.items.filter(item => {
          const text = item.text.toLowerCase()

          return text.indexOf(search) > -1
        })
      },
      selections () {
        const selections = []

        for (const selection of this.selected) {
          selections.push(this.items[selection])
        }

        return selections
      }
    },

    watch: {
      selected () {
        this.search = ''
      }
    },

    methods: {
      next () {
        this.loading = true

        setTimeout(() => {
          this.search = ''
          this.selected = []
          this.loading = false
        }, 2000)
      }
    }
  }
</script>
