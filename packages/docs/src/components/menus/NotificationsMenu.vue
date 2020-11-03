<template>
  <app-menu
    key="notifications-menu"
    v-model="menu"
    :close-on-content-click="false"
    :max-width="maxWidth"
    bottom
    content-class="overflow-hidden"
    left
  >
    <template #activator="{ attrs, on }">
      <app-tooltip-btn
        path="notifications"
        v-bind="attrs"
        v-on="on"
      >
        <template #icon>
          <v-badge
            :value="unread.length"
            color="red"
            left
            overlap
          >
            <template #badge>
              {{ unread.length }}
            </template>

            <v-icon v-text="`$mdiBell${unread.length === 0 ? 'Outline' : ''}`" />
          </v-badge>
        </template>
      </app-tooltip-btn>
    </template>

    <v-toolbar
      :width="maxWidth"
      class="pr-5"
      flat
      short
    >
      <v-btn
        :disabled="archived ? unread.length < 1 : read.length < 1"
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

    <v-divider />

    <v-responsive
      class="overflow-y-scroll"
      max-height="320"
    >
      <div
        v-if="done"
        class="py-8 text-center text-subtitle-1"
      >
        <i18n
          path="done"
          tag="p"
        />

        <v-icon
          color="grey lighten-2"
          size="96"
        >
          $mdiVuetify
        </v-icon>
      </div>

      <template v-else>
        <v-list-item
          v-for="({ created_at, metadata, slug, title }) in filtered"
          :key="slug"
          :ripple="false"
          @click="select(slug)"
        >
          <v-list-item-content>
            <div
              class="grey--text text--darken-1 text-caption font-weight-light text-uppercase"
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
      </template>
    </v-responsive>
  </app-menu>
</template>

<script>
  // Utilities
  import { formatDate } from '@/util/date.js'
  import { get, sync } from 'vuex-pathify'
  import { subDays } from 'date-fns'
  import { wait } from '@/util/helpers'
  import bucket from '@/plugins/cosmicjs'

  export default {
    name: 'NotificationsMenu',

    inject: ['theme'],

    data: () => ({
      all: [],
      archived: false,
      icons: {
        read: '$mdiEmailOpen',
        unread: '$mdiEmailMarkAsUnread',
      },
      menu: false,
    }),

    computed: {
      snackbar: sync('snackbar/snackbar'),
      unotifications: sync('user/notifications'),
      hasRecentlyViewed: get('user/hasRecentlyViewed'),
      done () {
        return this.filtered.length === 0
      },
      // What is ultimately iterated
      filtered () {
        return this.archived ? this.read : this.unread
      },
      // Map items to contain a viewed
      // property and format the date
      mapped () {
        return this.all.map(item => {
          return {
            ...item,
            created_at: formatDate(new Date(item.created_at)),
            viewed: this.unotifications.includes(item.slug),
          }
        })
      },
      marked () {
        const path = this.archived ? 'unread' : 'read'
        const icon = this.icons[path]

        if (!icon || !path) return null

        return { icon, path }
      },
      maxWidth () {
        return this.$vuetify.breakpoint.mobile ? 296 : 320
      },
      read () {
        return this.mapped.filter(n => n.viewed)
      },
      unread () {
        return this.mapped.filter(n => !n.viewed)
      },
    },

    async mounted () {
      if (!bucket.available) return

      const { objects: notifications } = await bucket.getObjects({
        type: 'notifications',
        props: 'created_at,metadata,slug,title',
        status: 'published',
        limit: 10,
        sort: '-created_at',
        query: {
          created_at: {
            $gt: subDays(Date.now(), 60).toISOString().slice(0, 10),
          },
        },
      })

      this.all = notifications || []

      if (
        this.hasRecentlyViewed ||
        !this.unread.length
      ) return

      await wait(3000)

      const { slug, metadata } = this.unread[0]

      this.snackbar = {
        slug,
        ...metadata,
      }
    },

    methods: {
      select (slug) {
        const { metadata } = this.all.find(notification => {
          return notification.slug === slug
        }) || {}

        this.snackbar = {
          slug,
          ...metadata,
        }

        this.menu = false
      },
      toggle (slug) {
        this.unotifications = this.unotifications.includes(slug)
          ? this.unotifications.filter(n => n !== slug)
          : [...this.unotifications, slug]
      },
      toggleAll () {
        this.unotifications = !this.archived
          ? this.notifications.map(i => i.slug)
          : []
      },
    },
  }
</script>
