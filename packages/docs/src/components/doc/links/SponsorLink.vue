<template>
  <v-btn
    :aria-label="$t('become-a-sponsor')"
    :to="{
      name: 'Documentation',
      params: {
        category: 'about',
        page: 'sponsors-and-backers'
      }
    }"
    color="primary"
    outlined
    v-bind="$attrs"
    v-on="$listeners"
    @click="onClick"
  >
    <span
      class="text-capitalize font-weight-regular"
      v-text="$t('become-a-sponsor')"
    />
  </v-btn>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'SponsorLink',

    computed: {
      name: get('route/name'),
    },

    methods: {
      onClick () {
        this.$gtag.event('click', {
          event_category: 'toolbar',
          event_label: 'sponsors',
          value: this.name,
        })
      },
    },
  }
</script>
