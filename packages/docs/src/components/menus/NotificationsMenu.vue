<template>
  <app-menu
    key="notifications-menu"
    v-model="menu"
    :close-on-content-click="false"
    :max-width="maxWidth"
    :open-on-hover="false"
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
            color="#ED561B"
            dot
            left
            overlap
          >
            <v-icon
              class="mx-1"
              v-text="`$mdiBell${unread.length === 0 ? 'Outline' : 'RingOutline'}`"
            />
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
        <v-list three-line>
          <template v-for="(notification, i) in filtered">

            <v-divider
              v-if="i !== 0"
              :key="`divider-${i}`"
              class="my-1"
            />

            <v-list-item
              :key="i"
              :ripple="false"
            >
              <v-list-item-content>
                <div class="d-flex text-wrap text-h6 mb-1 text--primary">
                  <span>{{ notification.metadata.emoji }}</span>

                  <div class="ps-4">
                    {{ notification.title }}
                  </div>
                </div>

                <div class="text-caption text--secondary ps-10">
                  {{ notification.metadata.text }}

                  <app-link :href="notification.metadata.action">
                    {{ notification.metadata.action_text }}
                  </app-link>
                </div>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn
                  :ripple="false"
                  class="ml-3"
                  color="medium-emphasis"
                  text
                  icon
                  min-width="0"
                  @click.stop.prevent="toggle(notification.slug)"
                >
                  <v-icon>{{ marked.icon }}</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </template>
    </v-responsive>
  </app-menu>
</template>

<script>
  // Utilities
  import { differenceInDays, parseISO } from 'date-fns'
  import { formatDate } from '@/util/date.js'
  import { get, sync } from 'vuex-pathify'
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
          const date = new Date(item.created_at)

          return {
            ...item,
            created_at: date.getTime(),
            created_at_formatted: formatDate(date),
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
        return this.$vuetify.breakpoint.mobile ? 420 : 520
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

      const { objects: notifications } = await bucket.objects.find({
        type: 'notifications',
      })
        .props('created_at,metadata,slug,title')
        .status('published')
        .sort('-created_at')
        .limit(5)

      /* eslint-disable-next-line camelcase */
      this.all = (notifications || []).filter(({ created_at }) => {
        return differenceInDays(Date.now(), parseISO(created_at)) < 60
      })

      if (
        this.hasRecentlyViewed ||
        !this.unread.length
      ) return

      await wait(3000)

      /* eslint-disable-next-line camelcase */
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
          ? this.mapped.map(i => i.slug)
          : []
      },
    },
  }
</script>
