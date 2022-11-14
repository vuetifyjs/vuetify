<template>
  <app-btn
    href="https://next.vuetifyjs.com/en/introduction/enterprise-support/"
    path="enterprise"
    @click="onClick"
  >
    <v-badge inline color="success">
      <template #badge>
        <small>NEW</small>
      </template>

      <span class="me-1">
        <i18n path="enterprise" />
      </span>
    </v-badge>
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
