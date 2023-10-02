<template>
  <v-btn
    :aria-label="t('see-more-projects')"
    :size="size"
    :to="rpath('/resources/made-with-vuetify/')"
    color="primary"
    variant="outlined"
    @click="onClick"
  >
    <span
      class="text-capitalize font-weight-regular"
      v-text="t('see-more-projects')"
    />
  </v-btn>
</template>

<script setup>
  // Composables
  import { useGtag } from 'vue-gtag-next'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'

  // Utilities
  import { rpath } from '@/util/routes'

  defineProps({
    size: {
      type: String,
      default: 'large',
    },
  })

  const { event } = useGtag()
  const { name } = useRoute()
  const { t } = useI18n()

  function onClick () {
    event('click', {
      event_category: 'button',
      event_label: 'sponsors',
      value: name,
    })
  }
</script>
