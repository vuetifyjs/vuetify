<template>
  <v-snackbar
    :value="snackbar"
    :vertical="isInstalling"
    bottom
    class="v-snackbar--pwa"
    color="white"
    light
    right
    timeout="-1"
  >

    <v-list-item
      v-if="isInstalling"
      class="px-0 mb-2"
    >
      <v-list-item-icon class="mr-2 my-0 align-self-center">
        <v-img
          class="mx-auto"
          contain
          height="52"
          src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light.svg"
          width="52"
        />
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>
          <app-md v-if="path">
            {{ $t(path) }}
          </app-md>
        </v-list-item-title>

        <v-list-item-subtitle>
          vuetifyjs.com
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <app-md v-else-if="isUpdating">
      {{ $t(path) }}
    </app-md>

    <template
      v-if="action"
      #action="{ attrs }"
    >
      <app-btn
        :text="false"
        class="primary"
        depressed
        min-width="70"
        v-bind="attrs"
        @click="onClick"
      >
        <i18n
          :path="action"
          class="white--text"
        />
      </app-btn>

      <app-btn
        v-if="isInstalling"
        class="ml-2"
        min-width="70"
        outlined
        path="cancel"
        v-bind="attrs"
        @click="onCancel"
      >
        <i18n
          path="cancel"
          class="primary--text"
        />
      </app-btn>
    </template>
  </v-snackbar>
</template>

<script>
  // Utilities
  import { call, get, sync } from 'vuex-pathify'

  export default {
    name: 'DefaultPwaSnackbar',

    computed: {
      ...get('pwa', [
        'installEvent',
        'updateEvent',
      ]),
      last: sync('user/last@install'),
      snackbar: sync('pwa/snackbar'),
      action () {
        if (this.updateEvent) return 'refresh'
        if (this.installEvent) return 'install'
      },
      isInstalling () {
        return this.action === 'install'
      },
      isUpdating () {
        return this.action === 'refresh'
      },
      path () {
        if (this.updateEvent) return 'new-content-available'
        if (this.installEvent) return 'install-vuetify-app'
      },
    },

    methods: {
      ...call('pwa', [
        'install',
        'update',
      ]),
      onCancel () {
        this.snackbar = false
        this.last = Date.now()
      },
      onClick () {
        if (this.isUpdating) this.update()
        else if (this.isInstalling) this.install()
      },
    },
  }
</script>

<style lang="sass">
  .v-snackbar--pwa

    p
      line-height: normal // v-snackbar__content sets this to 1.25rem 🤔
      margin-bottom: 0 !important
</style>
