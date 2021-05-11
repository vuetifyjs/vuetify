<template>
  <app-btn
    :to="{
      name: 'Documentation',
      params: {
        category: 'about',
        page: 'meet-the-team'
      }
    }"
    path="team"
    @click="onClick"
  />
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'TeamLink',

    computed: {
      name: get('route/name'),
    },

    methods: {
      onClick () {
        this.$gtag.event('click', {
          event_category: 'toolbar',
          event_label: 'team',
          value: this.name,
        })
      },
    },
  }
</script>
