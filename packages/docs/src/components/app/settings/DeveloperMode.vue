<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.dev ? 'error' : 'disabled'
      }
    }"
  >
    <v-switch
      v-model="user.dev"
      :messages="t('developer-mode-message')"
      class="ps-1"
      color="error"
      density="comfortable"
      false-icon="$close"
      true-icon="mdi-check"
      inset
    >
      <template #label>
        <div v-text="t('developer-mode')" />
      </template>
    </v-switch>
  </v-defaults-provider>
</template>

<script setup>
  const { t } = useI18n()
  const user = useUserStore()
</script>
