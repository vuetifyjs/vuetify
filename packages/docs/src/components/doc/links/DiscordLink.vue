<template>
  <app-tooltip-btn
    href="https://discord.gg/HJXwxMy"
    icon="$mdiDiscord"
    path="discord"
    rel="noopener"
    target="_blank"
    @click="onClick"
  />
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'DiscordLink',

    computed: {
      name: get('route/name'),
    },

    methods: {
      onClick () {
        this.$gtag.event('click', {
          event_category: 'toolbar',
          event_label: 'discord',
          value: this.name,
        })
      },
    },
  }
</script>
