<template>
  <v-btn
    :aria-label="t('become-a-sponsor')"
    color="primary"
    variant="outlined"
    :size="size"
    @click="onClick"
  >
    <span
      class="text-capitalize font-weight-regular"
      v-text="t('become-a-sponsor')"
    />
  </v-btn>
</template>

<script lang="ts">
  import { useI18n } from 'vue-i18n'
  // import { useRoute } from 'vue-router'

  export default {
    name: 'SponsorLink',

    props: {
      size: String,
    },

    setup () {
      const { t } = useI18n()
      // const route = useRoute()

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
