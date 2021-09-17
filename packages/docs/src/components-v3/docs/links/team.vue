<template>
  <app-btn
    :to="to"
    text="team"
    @click="onClick"
  />
</template>

<script>
  // Utilities
  import { defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'

  export default defineComponent({
    name: 'DocsLinksTeam',

    setup () {
      const { locale } = useI18n()

      // data
      const to = {
        name: `${locale.value}-about-meet-the-team`,
        params: {
          category: 'about',
          page: 'meet-the-team',
        },
      }

      // methods
      const onClick = () => {
        /* need to setup gtag
          this.$gtag.event('click', {
            event_category: 'toolbar',
            event_label: 'team',
            value: this.name,
          })
        */
      }

      return {
        onClick,
        to,
      }
    },

  })
</script>
