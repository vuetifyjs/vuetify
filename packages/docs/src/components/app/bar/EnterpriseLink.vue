<template>
  <app-btn
    :to="rpath('/introduction/enterprise-support/')"
    color="medium-emphasis"
    variant="text"
    @click="onClick"
  >
    <v-badge inline color="success">
      <template #badge>
        <small>NEW</small>
      </template>

      <span class="me-1">
        {{ t('enterprise') }}
      </span>
    </v-badge>
  </app-btn>
</template>

<script setup>
  // Composables
  import { useGtag } from 'vue-gtag-next'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'

  // Utilities
  import { rpath } from '@/util/routes'

  const { event } = useGtag()
  const { name } = useRoute()
  const { t } = useI18n()

  function onClick () {
    event('click', {
      event_category: 'app-bar',
      event_label: 'enterprise',
      value: name,
    })
  }
</script>
