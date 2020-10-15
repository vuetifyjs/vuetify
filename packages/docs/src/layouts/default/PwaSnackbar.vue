<template>
  <v-snackbar
    :value="snackbar"
    bottom
    class="v-snackbar--pwa"
    right
    timeout="-1"
    vertical
  >
    <app-md>{{ $t('new-content-available') }}</app-md>

    <template #action="{ attrs }">
      <app-btn
        class="primary"
        v-bind="attrs"
        @click="update"
      >
        <i18n
          class="white--text"
          path="refresh"
        />
      </app-btn>
    </template>
  </v-snackbar>
</template>

<script>
  // Utilities
  import { wait } from '@/util/helpers'
  import { call, sync } from 'vuex-pathify'

  export default {
    name: 'DefaultPwaSnackbar',

    computed: {
      ...sync('pwa', [
        'snackbar',
        'sw',
      ]),
    },

    watch: {
      async snackbar (val) {
        // Snackbar is closing, unregister with application
        if (!val) {
          this.$vuetify.application.unregister(this._uid, 'snackbar')

          return
        }

        await this.$nextTick()

        const wrapper = this.$el.querySelector('.v-snackbar--pwa > .v-snack__wrapper')

        // Register the snackbar element's height
        this.$vuetify.application.register(
          this._uid,
          'snackbar',
          wrapper.clientHeight
        )
      },
      'sw.update': {
        immediate: true,
        async handler (val) {
          if (!val) return

          await wait(5000)

          this.snackbar = true
        },
      },
    },

    created () {
      // Add snackbar property to application service
      this.$set(this.$vuetify.application, 'snackbar', 0)
      this.$set(this.$vuetify.application.application, 'snackbar', {})
    },

    methods: { update: call('pwa/update') },
  }
</script>

<style lang="sass">
  .v-snack.v-snackbar--pwa
    p
      line-height: normal // v-snackbar__content sets this to 1.25rem 🤔
      margin-bottom: 0 !important
</style>
