<template>
  <div class="d-flex align-center justify-center flex-column">
    <v-rating
      class="ma-2"
      v-model="rating"
      :item-labels="['sad', '', '', '', 'happy']"
      item-label-position="top"
    />

    <v-rating
      class="ma-2"
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
