<template>
  <v-snackbar
    v-model="pwa.snackbar"
    location="bottom right"
    timeout="-1"
    vertical
  >
    <app-markdown :content="$t('pwa.new-content-available')" />

    <template #actions>
      <v-btn
        class="mx-2 text-none font-weight-regular"
        @click="pwa.ignore"
      >
        <i18n-t
          class="text-white"
          keypath="pwa.ignore"
        />
      </v-btn>
      <app-btn
        variant="flat"
        color="primary"
        @click="pwa.update"
      >
        <i18n-t
          class="text-white"
          keypath="pwa.refresh"
        />
      </app-btn>
    </template>
  </v-snackbar>
</template>

<script setup>
  import { usePwaStore } from '@/store/pwa'

  const pwa = usePwaStore()
</script>
