<template>
  <app-tooltip-btn
    href="https://github.com/vuetifyjs/vuetify"
    icon="$mdiGithub"
    path="github"
    rel="noopener"
    target="_blank"
    @click="onClick"
  />
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'GithubLink',

    computed: {
      name: get('route/name'),
    },

    methods: {
      onClick () {
        this.$gtag.event('click', {
          event_category: 'toolbar',
          event_label: 'github',
          value: this.name,
        })
      },
    },

  }
</script>
