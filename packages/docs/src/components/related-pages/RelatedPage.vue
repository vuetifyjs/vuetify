<template>
  <app-sheet min-height="61">
    <v-list-item
      v-if="item"
      :to="item.to"
    >
      <v-list-item-icon>
        <v-icon
          :color="categories[section].color"
          v-text="categories[section].icon"
        />
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title v-text="item.title" />

        <v-list-item-subtitle v-text="subtitle" />
      </v-list-item-content>
    </v-list-item>
  </app-sheet>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'
  import { rpath } from '@/util/routes'
  import upperFirst from 'lodash/upperFirst'

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
      subtitle () {
        return upperFirst(this.section.replace('-', ' '))
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
          // If item has children, check
          if (item.items) {
            this.findRelatedPage(item.items)

            continue
          }

          // Match the current url to the item's to property
          if (
            !this.url.startsWith(item.to) ||
            item.divider ||
            item.heading
          ) {
            continue
          }

          // Set item and break
          this.item = item

          break
        }
      },
    },
  }
</script>
