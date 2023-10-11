<template>
  <app-btn
    href="https://vuetifyjs.com/en/introduction/enterprise-support/"
    path="enterprise"
    active
    color="primary"
    @click="onClick"
  >
    <i18n path="get-help" />
  </app-btn>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'EnterpriseLink',

    computed: {
      name: get('route/name'),
    },

    methods: {
      onClick () {
        this.$gtag.event('click', {
          event_category: 'toolbar',
          event_label: 'enterprise',
          value: this.name,
        })
      },
    },
  }
</script>
