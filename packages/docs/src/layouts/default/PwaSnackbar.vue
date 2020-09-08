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
        min-width="128"
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
      'sw.update': {
        immediate: true,
        async handler (val) {
          if (!val) return

          await wait(5000)

          this.snackbar = true
        },
      },
    },

    methods: { update: call('pwa/update') },
  }
</script>

<style lang="sass">
  .v-snack.v-snackbar--pwa
    .v-snack__action
      margin-left: auto
      margin-right: auto

    p
      line-height: normal // v-snackbar__content sets this to 1.25rem 🤔
      margin-bottom: 0 !important
</style>
