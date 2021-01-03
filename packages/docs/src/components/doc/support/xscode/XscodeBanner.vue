<template>
  <div class="mb-8">
    <img
      src="./xscode-banner-btn.svg"
      alt="Open a chat with an expert"
      class="rounded clickable my-2"
      @click="openChat()"
    >
  </div>
</template>

<script>
  export default {
    name: 'XscodeBanner',

    data: () => ({}),

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
<style>
.clickable {
  cursor: pointer;
}
</style>
