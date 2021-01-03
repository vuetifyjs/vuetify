<template>
  <v-btn
    :aria-label="$t('open-chat-widget')"
    color="primary"
    outlined
    v-bind="$attrs"
    v-on="$listeners"
    @click="openChat()"
  >
    <span
      class="text-capitalize font-weight-regular"
      v-text="$t('chat-with-an-expert')"
    />
  </v-btn>
</template>

<script>
  export default {
    name: 'XscodeLink',
    methods: {
      openChat () {
        const options = {
          position: {
            bottom: '30px',
            right: '30px',
          },
          search: {
            organization_id: 2219,
          },
          view: 'search',
        }
        window.xscode.ready.then(() => {
          window.xscode.widgetOpen(options)
        })
      },
    },
  }
</script>
