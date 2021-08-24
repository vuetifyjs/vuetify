<template>
  <div class="text-center">
    <v-rating
      v-model="rating"
      :item-labels="['sad', '', '', '', 'happy']"
      item-label-position="top"
    />

    <v-rating
      v-model="rating"
      :item-labels="['sad', '', '', '', 'happy']"
      item-label-position="bottom"
    />
  </div>
</template>

<script>
  export default {
    data: () => ({ rating: 4 }),
  }
</script>
