<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-toolbar
      color="transparent"
      flat
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Photo Info</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        icon="mdi-magnify"
        @click="searchField.focus()"
      >
      </v-btn>
    </v-toolbar>

    <v-container>
      <v-row
        align="center"
        justify="start"
      >
        <v-col
          v-for="(selection, i) in selections"
          :key="selection.text"
          class="py-1 pe-0"
          cols="auto"
        >
          <v-chip
            :disabled="loading"
            closable
            @click:close="selected.splice(i, 1)"
          >
            <v-icon
              :icon="selection.icon"
              start
            ></v-icon>

            {{ selection.text }}
          </v-chip>
        </v-col>

        <v-col
          v-if="!allSelected"
          cols="12"
        >
          <v-text-field
            ref="searchField"
            v-model="search"
            label="Search"
            hide-details
            single-line
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>

    <v-divider v-if="!allSelected"></v-divider>

    <v-list>
      <template v-for="item in categories">
        <v-list-item
          v-if="!selected.includes(item)"
          :key="item.text"
          :disabled="loading"
          @click="selected.push(item)"
        >
          <template v-slot:prepend>
            <v-icon
              :disabled="loading"
              :icon="item.icon"
            ></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </template>
    </v-list>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        :disabled="!selected.length"
        :loading="loading"
        color="purple"
        variant="text"
        @click="next"
      >
        Next
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'

  const items = [
    {
      text: 'Nature',
      icon: 'mdi-nature',
    },
    {
      text: 'Nightlife',
      icon: 'mdi-glass-wine',
    },
    {
      text: 'November',
      icon: 'mdi-calendar-range',
    },
    {
      text: 'Portland',
      icon: 'mdi-map-marker',
    },
    {
      text: 'Biking',
      icon: 'mdi-bike',
    },
  ]
  const searchField = ref()

  const loading = ref(false)
  const search = ref('')
  const selected = ref([])

  const allSelected = computed(() => {
    return selected.value.length === items.length
  })
  const categories = computed(() => {
    const _search = search.value.toLowerCase()
    if (!_search) return items
    return items.filter(item => {
      const text = item.text.toLowerCase()
      return text.indexOf(_search) > -1
    })
  })
  const selections = computed(() => {
    const selections = []
    for (const selection of selected.value) {
      selections.push(selection)
    }
    return selections
  })

  watch(selected, () => {
    search.value = ''
  })

  function next () {
    loading.value = true
    setTimeout(() => {
      search.value = ''
      selected.value = []
      loading.value = false
    }, 2000)
  }
</script>

<script>
  export default {
    data: () => ({
      items: [
        {
          text: 'Nature',
          icon: 'mdi-nature',
        },
        {
          text: 'Nightlife',
          icon: 'mdi-glass-wine',
        },
        {
          text: 'November',
          icon: 'mdi-calendar-range',
        },
        {
          text: 'Portland',
          icon: 'mdi-map-marker',
        },
        {
          text: 'Biking',
          icon: 'mdi-bike',
        },
      ],
      loading: false,
      search: '',
      selected: [],
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
          selections.push(selection)
        }

        return selections
      },
    },

    watch: {
      selected () {
        this.search = ''
      },
    },

    methods: {
      next () {
        this.loading = true

        setTimeout(() => {
          this.search = ''
          this.selected = []
          this.loading = false
        }, 2000)
      },
    },
  }
</script>
