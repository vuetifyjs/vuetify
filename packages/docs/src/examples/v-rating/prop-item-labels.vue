<template>
  <div class="d-flex align-center justify-center flex-column">
    <v-rating
      v-model="rating"
      class="ma-2"
      :item-labels="['sad', '', '', '', 'happy']"
      item-label-position="top"
    ></v-rating>

    <v-rating
      v-model="rating"
      class="ma-2"
      :item-labels="['sad', '', '', '', 'happy']"
      item-label-position="bottom"
    ></v-rating>
  </div>
</template>

<script>
  export default {
    data: () => ({ rating: 4 }),
  }
</script>
