<template>
  <v-menu
    max-height="320"
    max-width="320"
    offset-y
    origin="bottom left"
    right
    top
    transition="scale-transition"
  >
    <template v-slot:activator="{ attrs, on }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
      >
        <v-badge
          color="red"
          dot
          overlap
          left
        >
          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </template>

    <v-list>
      <template v-for="({ created_at, metadata, slug, title }, i) in items">
        <v-list-item
          :key="i"
          :href="metadata.action"
          target="_blank"
          @click="$ga.event('notification', 'click', slug)"
        >
          <v-list-item-content>
            <div
              class="grey--text body-2 mb-2 font-weight-light"
              v-text="created_at"
            />

            <v-list-item-title
              class="mb-2"
              v-text="`${metadata.emoji} ${title}`"
            />

            <base-markdown
              :code="metadata.text"
              class="caption grey--text text--darken-1"
            />
          </v-list-item-content>

        </v-list-item>

        <v-divider
          v-if="i + 1 !== items.length"
          :key="`dv-${i}`"
        />
      </template>
    </v-list>
  </v-menu>
</template>

<script>
  // Utilities
  import bucket from '@/plugins/cosmicjs'
  import { formatDate } from '@/util/date.js'
  import {
    get,
    sync,
  } from 'vuex-pathify'

  export default {
    name: 'AppNotifications',

    data: () => ({
      snack: false,
      items: [],
    }),

    computed: {
      snackbar: sync('snackbar/snackbar'),
      value: get('snackbar/value'),
    },

    watch: {
      value (val) {
        if (val) return

        this.markViewed(this.snackbar.slug)
      },
    },

    async mounted () {
      const items = []
      const { objects } = await bucket.getObjects({
        type: 'notifications',
        props: 'created_at,metadata,slug,title',
        limit: 4,
        sort: '-created_at',
      })

      for (const object of objects) {
        const item = Object.assign({}, object, {
          created_at: formatDate(new Date(object.created_at)),
        })

        if (!this.hasBeenViewed(item) && !this.snack) {
          this.snack = true
          this.snackbar = {
            slug: item.slug,
            ...item.metadata,
          }

          continue
        }

        items.push(item)
      }

      this.items = items
    },

    methods: {
      hasBeenViewed (item) {
        return Boolean(localStorage.getItem(`vuetify-notification-${item.slug}`))
      },
      markViewed (slug) {
        localStorage.setItem(`vuetify-notification-${slug}`, true)
      },
    },
  }
</script>
