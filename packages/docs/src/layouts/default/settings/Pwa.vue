<template>
  <div class="px-1">
    <app-btn
      :text="false"
      block
      color="grey darken-4"
      depressed
      @click="install"
    >
      <span class="white--text">
        {{ $t('install-vuetify') }}

        <v-icon
          right
          size="20"
        >
          $mdiPlusCircle
        </v-icon>
      </span>
    </app-btn>
  </div>
</template>

<script>
  // Utilities
  import { call } from 'vuex-pathify'

  export default {
    name: 'DefaultSettingsPwa',

    data: () => ({ path: 'install-vuetify' }),

    methods: { install: call('pwa/install') },
  }
</script>
