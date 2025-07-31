<template>
  <v-card
    class="mx-auto"
    max-width="450"
  >
    <v-toolbar
      color="primary"
      height="88"
      flat
    >
      <template v-slot:prepend>
        <v-btn icon="mdi-arrow-left">
        </v-btn>
      </template>

      <v-text-field
        v-model="search"
        label="Search News"
        prepend-inner-icon="mdi-magnify"
        clearable
        hide-details
        single-line
      ></v-text-field>

      <template v-slot:append>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </template>
    </v-toolbar>

    <div v-if="keywords.length > 0" class="py-3 px-4">
      <v-chip
        v-for="(keyword, i) in keywords"
        :key="i"
        class="me-2"
      >
        {{ keyword }}
      </v-chip>

    </div>

    <v-divider></v-divider>

    <v-list lines="three">
      <v-list-item
        v-for="(item, i) in searching"
        :key="i"
        link
      >
        <template v-slot:prepend>
          <v-avatar
            class="me-4 mt-2"
            rounded="0"
          >
            <v-img :src="item.image" cover></v-img>
          </v-avatar>
        </template>

        <v-list-item-title
          class="text-uppercase font-weight-regular text-caption"
          v-text="item.category"
        ></v-list-item-title>

        <div v-text="item.title"></div>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
  import { computed, ref } from 'vue'

  const items = [
    {
      image: 'https://cdn.vuetifyjs.com/docs/images/chips/globe.png',
      title: 'TBI\u2019s 5 Best: SF Mocktails to Finish Dry January Strong',
      category: 'Travel',
      keyword: 'Drinks',
    },
    {
      image: 'https://cdn.vuetifyjs.com/docs/images/chips/cpu.png',
      title: 'PWAs on iOS 12.2 beta: the good, the bad, and the \u201Cnot sure yet if good\u201D',
      category: 'Technology',
      keyword: 'Phones',
    },
    {
      image: 'https://cdn.vuetifyjs.com/docs/images/chips/rocket.png',
      title: 'How to Get Media Mentions for Your Business',
      category: 'Media',
      keyword: 'Social',
    },
    {
      image: 'https://cdn.vuetifyjs.com/docs/images/chips/bulb.png',
      title: 'The Pitfalls Of Outsourcing Self-Awareness To Artificial Intelligence',
      category: 'Technology',
      keyword: 'Military',
    },
    {
      image: 'https://cdn.vuetifyjs.com/docs/images/chips/raft.png',
      title: 'Degrees of Freedom and Sudoko',
      category: 'Travel',
      keyword: 'Social',
    },
  ]

  const search = ref('')

  const keywords = computed(() => {
    if (!search.value) return []

    const keywords = []

    for (const search of searching.value) {
      keywords.push(search.keyword)
    }

    return keywords
  })
  const searching = computed(() => {
    if (!search.value) return items

    const _search = search.value.toLowerCase()

    return items.filter(item => {
      const text = item.title.toLowerCase()
      return text.indexOf(_search) > -1
    })
  })
</script>

<script>
  export default {
    data: () => ({
      items: [
        {
          image: 'https://cdn.vuetifyjs.com/docs/images/chips/globe.png',
          title: 'TBI’s 5 Best: SF Mocktails to Finish Dry January Strong',
          category: 'Travel',
          keyword: 'Drinks',

        },
        {
          image: 'https://cdn.vuetifyjs.com/docs/images/chips/cpu.png',
          title: 'PWAs on iOS 12.2 beta: the good, the bad, and the “not sure yet if good”',
          category: 'Technology',
          keyword: 'Phones',
        },
        {
          image: 'https://cdn.vuetifyjs.com/docs/images/chips/rocket.png',
          title: 'How to Get Media Mentions for Your Business',
          category: 'Media',
          keyword: 'Social',
        },
        {
          image: 'https://cdn.vuetifyjs.com/docs/images/chips/bulb.png',
          title: 'The Pitfalls Of Outsourcing Self-Awareness To Artificial Intelligence',
          category: 'Technology',
          keyword: 'Military',
        },
        {
          image: 'https://cdn.vuetifyjs.com/docs/images/chips/raft.png',
          title: 'Degrees of Freedom and Sudoko',
          category: 'Travel',
          keyword: 'Social',
        },
      ],
      search: '',
    }),

    computed: {
      keywords () {
        if (!this.search) return []

        const keywords = []

        for (const search of this.searching) {
          keywords.push(search.keyword)
        }

        return keywords
      },
      searching () {
        if (!this.search) return this.items

        const search = this.search.toLowerCase()

        return this.items.filter(item => {
          const text = item.title.toLowerCase()

          return text.indexOf(search) > -1
        })
      },
    },
  }
</script>
