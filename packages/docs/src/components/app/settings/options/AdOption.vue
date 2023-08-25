<template>
  <v-defaults-provider
    :defaults="{
      VIcon: {
        color: user.ads && canToggle ? 'primary' : 'disabled'
      }
    }"
  >
    <settings-switch
      v-model="user.ads"
      :readonly="!canToggle"
      :label="t('enable-ads')"
      :messages="t('enable-ads-message')"
      :disabled="!canToggle"
    />

    <v-btn
      v-if="!canToggle"
      :text="t('unlock-with-github')"
      block
      class="mb-3"
      color="#2a2a2a"
      href="https://github.com/sponsors/johnleider"
      prepend-icon="mdi-github"
      rel="noopener"
      size="small"
      target="_blank"
      variant="outlined"
    >
      <template #prepend>
        <v-icon color="#2a2a2a" />
      </template>
    </v-btn>
  </v-defaults-provider>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'

  // Stores
  import { useUserStore } from '@/store/user'
  import { useAuthStore } from '@/store/auth'

  // Utilities
  import { computed } from 'vue'

  const { t } = useI18n()
  const user = useUserStore()
  const auth = useAuthStore()

  const canToggle = computed(() => auth.admin || auth.sponsor?.monthlyPriceInDollars >= 1)
</script>
