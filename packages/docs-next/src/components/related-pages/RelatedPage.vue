<template>
  <app-sheet v-if="item">
    <v-list-item :to="url">
      <v-list-item-icon>
        <v-icon
          :color="categories[section].color"
          v-text="categories[section].icon"
        />
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title v-text="item.title" />

        <v-list-item-subtitle
          class="text-capitalize"
          v-text="section"
        />
      </v-list-item-content>
    </v-list-item>
  </app-sheet>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'RelatedPage',

    props: { to: String },

    data: () => ({ item: undefined }),

    computed: {
      ...get('app', [
        'categories',
        'nav',
      ]),
      dark: get('user/theme@dark'),
      locale: get('route/params@locale'),
      pages: get('pages/pages'),
      section () {
        return this.to.split('/')[1]
      },
      url () {
        return `/${this.locale}${this.to}`
      },
    },

    watch: {
      nav: {
        immediate: true,
        handler (val) {
          this.findRelatedPage(val)
        },
      },
    },

    methods: {
      findRelatedPage (items) {
        for (const item of items) {
          // If item is found, stop iterating
          if (this.item) break

          // Check children
          if (item.items) {
            this.findRelatedPage(item.items)

            continue
          }

          if (item.to === this.url) {
            this.item = item
          }
        }
      },
    },
  }
</script>
