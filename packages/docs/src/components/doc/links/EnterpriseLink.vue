<template>
  <app-btn
    to="/about/eol"
    active
    class="ml-2 mr-5"
    min-width="0"
    color="primary"
    @click="onClick"
  >
    <v-badge content="NEW" color="success">
      EOL
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
