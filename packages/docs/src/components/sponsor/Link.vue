<template>
  <v-btn
    :aria-label="t('become-a-sponsor')"
    :size="size"
    :to="rpath('/introduction/sponsors-and-backers/')"
    color="primary"
    variant="outlined"
    @click="onClick"
  >
    <span
      class="text-capitalize font-weight-regular"
      v-text="t('become-a-sponsor')"
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
    size: String,
  })

  const { event } = useGtag()
  const { name } = useRoute()
  const { t } = useI18n()

  const onClick = () =>

    function onClick () {
      event('click', {
        event_category: 'toolbar',
        event_label: 'sponsors',
        value: name,
      })
    }
</script>
