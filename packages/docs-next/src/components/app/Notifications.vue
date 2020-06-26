<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    content-class="overflow-hidden"
    max-height="380"
    max-width="320"
    offset-y
    origin="top left"
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
          :value="unread.length"
          color="red"
          overlap
          left
        >
          <template v-slot:badge>
            {{ unread.length }}
          </template>

          <v-icon>$mdiBell</v-icon>
        </v-badge>
      </v-btn>
    </template>

    <v-toolbar
      class="pr-5"
      color="primary"
      dark
      flat
      short
    >
      <v-btn
        class="px-2 ml-n1"
        small
        text
        @click="archived = !archived"
      >
        <i18n :path="archived ? 'unread' : 'read'">
          <template #number>
            <strong v-text="archived ? unread.length : read.length" />
          </template>
        </i18n>
      </v-btn>
      <v-spacer />

      <app-tooltip-btn
        v-if="marked"
        :disabled="done"
        :icon="marked.icon"
        :path="`marked-${marked.path}`"
        small
        @click="toggleAll"
      />
    </v-toolbar>

    <v-list
      class="pt-0 overflow-y-scroll"
      max-height="320"
    >
      <v-sheet
        v-if="done"
        class="pa-8 d-flex align-center justify-center subtitle-1"
        width="303"
      >
        <div class="text-center">
          <i18n
            path="done"
            tag="p"
          />

          <v-icon
            color="grey lighten-2"
            size="64"
          >
            $mdiVuetify
          </v-icon>
        </div>
      </v-sheet>

      <template v-else>
        <template v-for="({ created_at, metadata, slug, title, viewed }, i) in filtered">
          <v-list-item
            :key="slug"
            :href="metadata.action"
            :ripple="false"
            target="_blank"
            @click="toggle(slug)"
          >
            <v-list-item-content>
              <div
                class="grey--text text--darken-1 caption font-weight-light caption text-uppercase"
                v-text="created_at"
              />

              <v-list-item-title
                class="text-subtitle-1"
                v-text="`${metadata.emoji} ${title}`"
              />
            </v-list-item-content>

            <v-list-item-action>
              <v-btn
                :ripple="false"
                icon
                @click.stop.prevent="toggle(slug)"
              >
                <v-icon v-text="marked.icon" />
              </v-btn>
            </v-list-item-action>
          </v-list-item>

          <v-divider
            v-if="i + 1 !== filtered.length"
            :key="`dv-${i}`"
          />
        </template>
      </template>
    </v-list>
  </v-menu>
</template>

<script>
  // Utilities
  import bucket from '@/plugins/cosmicjs'
  import { formatDate } from '@/util/date.js'
  import { sync } from 'vuex-pathify'

  export default {
    name: 'Notifications',

    data: () => ({
      archived: false,
      icons: {
        read: '$mdiEmailOpen',
        unread: '$mdiEmailMarkAsUnread',
      },
      items: [],
      menu: false,
    }),

    computed: {
      notifications: sync('user/notifications'),
      snack: sync('snackbar/value'),
      snackbar: sync('snackbar/snackbar'),
      done () {
        return this.filtered.length === 0
      },
      // What is ultimately iterated
      filtered () {
        return this.archived ? this.read : this.unread
      },
      marked () {
        const path = this.archived ? 'unread' : 'read'
        const icon = this.icons[path]

        if (!icon || !path) return null

        return { icon, path }
      },
      // Map items to contain a viewed
      // property and format the date
      mapped () {
        return this.items.map(item => {
          return {
            ...item,
            created_at: formatDate(new Date(item.created_at)),
            viewed: this.notifications.includes(item.slug),
          }
        })
      },
      read () {
        return this.mapped.filter(n => n.viewed)
      },
      unread () {
        return this.mapped.filter(n => !n.viewed)
      },
    },

    async mounted () {
      const { objects: items } = await bucket.getObjects({
        type: 'notifications',
        props: 'created_at,metadata,slug,title',
        status: 'published',
        limit: 10,
        sort: '-created_at',
      })

      this.items = items
    },

    methods: {
      toggle (slug) {
        this.notifications = this.notifications.includes(slug)
          ? this.notifications.filter(n => n !== slug)
          : [...this.notifications, slug]
      },
      toggleAll () {
        this.notifications = !this.archived
          ? this.items.map(i => i.slug)
          : []
      },
    },
  }
</script>
