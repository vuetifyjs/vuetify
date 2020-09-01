<template>
  <v-snackbar
    :color="snackbar.color"
    :timeout="-1"
    :value="snack"
    top
  >
    <div class="d-flex">
      <span
        v-if="snackbar.emoji"
        class="mr-2"
        v-text="snackbar.emoji"
      />

      <app-md
        class="mb-n4"
        v-text="snackbar.text"
      />
    </div>

    <template v-slot:action="{ attrs }">
      <v-btn
        class="mr-2"
        text
        v-bind="{ ...bind, ...attrs }"
        @click="snack = false"
      >
        {{ snackbar.action_text }}
      </v-btn>

      <v-btn
        color="white"
        icon
        @click="snack = false"
      >
        <v-icon small>
          $close
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
  // Utilities
  import { wait } from '@/util/helpers'
  import { differenceInDays } from 'date-fns'
  import { get, sync } from 'vuex-pathify'
  import { localeLookup } from '@/i18n/util'

  export default {
    name: 'DefaultSnackbar',

    computed: {
      last: sync('user/last'),
      notifications: sync('messages/notifications'),
      snack: sync('snackbar/value'),
      snackbar: sync('snackbar/snackbar'),
      unotifications: sync('user/notifications'),
      initializing: get('app/initializing'),
      locale: get('route/params@locale'),
      bind () {
        const { action: href } = this.snackbar

        return href.startsWith('http')
          ? { href, target: '_blank', rel: 'noopener' }
          : { to: `/${localeLookup(this.locale)}${href}` }
      },
      hasRecentlyViewed () {
        if (!this.last) return false

        return differenceInDays(Date.now(), Number(this.last)) < 1
      },
    },

    watch: {
      initializing: {
        immediate: true,
        async handler (val) {
          if (
            val ||
            this.hasRecentlyViewed
          ) return

          await wait(3000)

          const snackbar = this.notifications.find(notification => {
            return !this.unotifications.includes(notification.slug)
          })

          if (!snackbar) return

          this.snackbar = {
            slug: snackbar.slug,
            ...snackbar.metadata,
          }
        },
      },
      snackbar (val) {
        if (!val.slug) return

        this.snack = true
      },
      snack (val) {
        if (val) return

        this.unotifications.push(this.snackbar.slug)
        this.last = Date.now()
        this.snack = false
      },
    },
  }
</script>

<style>
  .snack-markdown p {
    margin-bottom: 0 !important;
  }
</style>
