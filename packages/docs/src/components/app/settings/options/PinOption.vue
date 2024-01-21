<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: auth.isSubscriber && user.pins ? 'primary' : 'disabled'
      }
    }"
  >
    <settings-switch
      v-model="user.pins"
      :disabled="!auth.isSubscriber"
      :messages="t('dashboard.perks.enable-pins-message')"
    >
      <template #label>
        {{ t('dashboard.perks.enable-pins') }}

        <v-chip
          :text="t('new').toUpperCase()"
          class="ms-2"
          color="success"
          size="x-small"
          variant="outlined"
        />
      </template>
    </settings-switch>
  </v-defaults-provider>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'

  // Stores
  import { useAuthStore, useUserStore } from '@vuetify/one'

  const { t } = useI18n()
  const auth = useAuthStore()
  const user = useUserStore()
</script>
