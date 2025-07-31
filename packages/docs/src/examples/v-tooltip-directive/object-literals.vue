<template>
  <div class="text-center py-10">
    <v-btn text="Click me" v-tooltip="tooltip"></v-btn>
  </div>
</template>

<script setup>
  const tooltip = {
    text: 'Scroll up ↑',
    scrollStrategy: 'close',
    scrim: true,
    persistent: false,
    openOnClick: true,
    openOnHover: false,
  }
</script>

<script>
  export default {
    data: () => ({
      tooltip: {
        text: 'Scroll up ↑',
        scrollStrategy: 'close',
        scrim: true,
        persistent: false,
        openOnClick: true,
        openOnHover: false,
      },
    }),
  }
</script>
