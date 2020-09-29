<template>
  <v-snackbar
    :color="snackbar.color"
    :timeout="-1"
    :value="value"
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
        @click="value = false"
      >
        {{ snackbar.action_text }}
      </v-btn>

      <v-btn
        color="white"
        icon
        @click="value = false"
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
  import { differenceInDays } from 'date-fns'
  import { get, sync } from 'vuex-pathify'
  import { localeLookup } from '@/i18n/util'

  export default {
    name: 'DefaultSnackbar',

    computed: {
      ...sync('snackbar', [
        'snackbar',
        'value',
      ]),
      last: sync('user/last@notification'),
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
      snackbar (val) {
        if (!val.slug) return

        this.value = true
      },
      value (val) {
        if (val) return

        this.unotifications.push(this.snackbar.slug)
        this.last = Date.now()
      },
    },
  }
</script>

<style>
  .snack-markdown p {
    margin-bottom: 0 !important;
  }
</style>
