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

  export default {
    name: 'AppNotifications',

    data: () => ({
      items: [],
    }),

    async mounted () {
      const { objects: items } = await bucket.getObjects({
        type: 'notifications',
        props: 'created_at,metadata,slug,title',
        limit: 3,
        sort: '-created_at',
      })

      this.items = items.map(item => {
        return Object.assign({}, item, {
          created_at: formatDate(new Date(item.created_at)),
        })
      })
    },
  }
</script>
