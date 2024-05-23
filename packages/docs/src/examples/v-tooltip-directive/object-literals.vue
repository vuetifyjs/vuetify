<template>
  <div class="text-center py-10">
    <v-btn text="Tooltip" v-tooltip="tooltip"></v-btn>
  </div>
</template>

<script setup>
  const tooltip = {
    text: 'Tooltip using object literals',
    scrollStrategy: 'block',
  }
</script>

<script>
  export default {
    data: () => ({
      tooltip: {
        text: 'Tooltip',
        scrollStrategy: 'block',
      },
    }),
  }
</script>
