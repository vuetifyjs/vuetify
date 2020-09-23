<template>
  <app-sheet>
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
  import { rpath } from '@/util/routes'

  export default {
    name: 'RelatedPage',

    props: { to: String },

    data: () => ({ item: undefined }),

    computed: {
      ...get('app', [
        'categories',
        'nav',
      ]),
      section () {
        return this.to.split('/')[1]
      },
      url () {
        return rpath(this.to)
      },
    },

    watch: {
      nav: {
        immediate: true,
        handler: 'findRelatedPage',
      },
    },

    methods: {
      findRelatedPage (items) {
        for (const item of items) {
          // Check children
          if (item.items) {
            this.findRelatedPage(item.items)

            continue
          }

          if (!this.url.startsWith(item.to)) {
            continue
          }

          this.item = item

          break
        }
      },
    },
  }
</script>
