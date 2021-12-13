<template>
  <div class="px-1">
    <app-btn
      block
      color="grey-darken-4"
      elevation="0"
      @click="install"
    >
      <span class="text-white">
        {{ t('pwa.install') }}

        <v-icon
          size="20"
          icon="mdi-plus-circle"
        />
      </span>
    </app-btn>
  </div>
</template>

<script>
  import { useI18n } from 'vue-i18n'

  export default {
    name: 'DefaultSettingsPwa',

    setup () {
      const { t } = useI18n()

      function install () {
        // TODO: Install pwa
      }

      return { t, install }
    },
  }
</script>
