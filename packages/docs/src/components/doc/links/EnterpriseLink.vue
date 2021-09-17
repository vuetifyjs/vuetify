<template>
  <app-btn
    :to="{
      name: 'Documentation',
      params: {
        category: 'introduction',
        page: 'enterprise'
      }
    }"
    path="enterprise"
    @click="onClick"
  />
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
