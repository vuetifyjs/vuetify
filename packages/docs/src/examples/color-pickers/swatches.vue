<template>
  <div class="d-flex justify-space-around">
    <v-color-picker show-swatches></v-color-picker>
    <v-color-picker :swatches="swatches" show-swatches></v-color-picker>
    <v-color-picker show-swatches swatches-max-height="300px"></v-color-picker>
  </div>
</template>

<script>
  export default {
    data: () => ({
      swatches: [
        ['#FF0000', '#AA0000', '#550000'],
        ['#FFFF00', '#AAAA00', '#555500'],
        ['#00FF00', '#00AA00', '#005500'],
        ['#00FFFF', '#00AAAA', '#005555'],
        ['#0000FF', '#0000AA', '#000055']
      ]
    })
  }
</script>
