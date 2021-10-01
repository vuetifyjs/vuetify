<template>
  <v-btn
    :aria-label="t('become-a-sponsor')"
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

<script>
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'

  export default {
    name: 'SponsorLink',

    setup () {
      const { t } = useI18n()
      const route = useRoute()

      const onClick = () => {
        // TODO: gtag
        // this.$gtag.event('click', {
        //   event_category: 'toolbar',
        //   event_label: 'sponsors',
        //   value: route.name,
        // })

        // :to="{
        //   name: 'Documentation',
        //   params: {
        //     category: 'about',
        //     page: 'sponsors-and-backers'
        //   }
        // }"
      }

      return {
        onClick,
        t,
      }
    },
  }
</script>
