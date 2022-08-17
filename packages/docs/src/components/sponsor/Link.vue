<template>
  <v-btn
    :aria-label="t('become-a-sponsor')"
    :size="size"
    :to="rpath('/about/sponsors-and-backers')"
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

<script lang="ts">
  // Composables
  import { useGtag } from 'vue-gtag-next'
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'

  // Utilities
  import { defineComponent } from 'vue'
  import { rpath } from '@/util/routes'

  export default defineComponent({
    name: 'SponsorLink',

    props: {
      size: String,
    },

    setup () {
      const { event } = useGtag()
      const { name } = useRoute()
      const { t } = useI18n()

      const onClick = () => {
        event('click', {
          event_category: 'toolbar',
          event_label: 'sponsors',
          value: name,
        })
      }

      return {
        onClick,
        t,
        rpath,
      }
    },
  })
</script>
