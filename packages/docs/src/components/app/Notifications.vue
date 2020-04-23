<template>
  <v-menu
    v-model="menu"
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
          :value="unreadMsgs.length > 1"
          color="red"
          overlap
          left
        >
          <template v-slot:badge>
            {{ unreadMsgs.length }}
          </template>

          <v-icon>mdi-bell</v-icon>
        </v-badge>
      </v-btn>
    </template>

    <v-list>
      <template v-for="({ created_at, metadata, slug, title, viewed }, i) in items">
        <v-list-item
          :key="i"
          :href="metadata.action"
          target="_blank"
          @click="onClick(slug)"
        >
          <v-list-item-content>
            <div
              class="grey--text body-2 mb-2 font-weight-light"
              v-text="created_at"
            />

            <v-list-item-title class="mb-2 d-flex align-center">
              <span v-text="`${metadata.emoji} ${title}`" />

              <v-icon
                v-if="!viewed"
                color="primary"
                class="ml-2"
              >
                mdi-new-box
              </v-icon>
            </v-list-item-title>

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
  import { differenceInDays, parseISO } from 'date-fns'
  import { sync } from 'vuex-pathify'

  export default {
    name: 'AppNotifications',

    data: () => ({
      menu: false,
      items: [],
    }),

    computed: {
      snack: sync('snackbar/value'),
      snackbar: sync('snackbar/snackbar'),
      unreadMsgs () {
        return this.items.filter(item => !this.hasBeenViewed(item))
      },
    },

    watch: {
      async menu (val) {
        if (val) return

        // Allow menu value to persist
        await this.$nextTick()

        for (const item of this.items) {
          this.markViewed(item.slug)
        }

        this.updateItems(this.items)
      },
      snack (val) {
        if (val) return

        this.markViewed()
        this.current = null
      },
    },

    async mounted () {
      const { objects } = await bucket.getObjects({
        type: 'notifications',
        props: 'created_at,metadata,slug,title',
        status: 'published',
        limit: 5,
        sort: '-created_at',
      })

      if (objects) this.updateItems(objects)
    },

    methods: {
      getNow () {
        return (new Date()).toISOString()
      },
      hasBeenViewed (item) {
        return Boolean(localStorage.getItem(`vuetify-notification-${item.slug}`))
      },
      markViewed (slug) {
        slug = slug || this.snackbar.slug

        if (!slug) return

        localStorage.setItem(`vuetify-notification-${slug}`, true)
        localStorage.setItem('vuetify-notification-last-time', this.getNow())

        this.updateItems(this.items)
      },
      onClick (slug) {
        this.$ga.event('notification', 'click', slug)
        this.markViewed(slug)
        this.menu = false
      },
      hasRecentlyViewed () {
        const last = localStorage.getItem('vuetify-notification-last-time')

        if (!last) return false

        return differenceInDays(parseISO(this.getNow()), parseISO(last)) < 2
      },
      updateItems (objects) {
        const items = []

        for (const object of objects) {
          const item = Object.assign({}, object, {
            created_at: formatDate(new Date(object.created_at)),
            viewed: this.hasBeenViewed(object),
          })

          if (
            !this.hasRecentlyViewed() &&
            !item.viewed &&
            !this.snack
          ) {
            this.current = item
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
    },
  }
</script>
