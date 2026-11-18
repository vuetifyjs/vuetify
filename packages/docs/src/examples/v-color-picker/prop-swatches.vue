<template>
  <div class="d-flex justify-space-around">
    <v-color-picker
      class="ma-2"
      swatches-max-height="400px"
      show-swatches
    ></v-color-picker>
    <v-color-picker
      :swatches="swatches"
      class="ma-2"
      show-swatches
    ></v-color-picker>
  </div>
</template>

<script setup>
  const swatches = [
    ['#FF0000', '#AA0000', '#550000'],
    ['#FFFF00', '#AAAA00', '#555500'],
    ['#00FF00', '#00AA00', '#005500'],
    ['#00FFFF', '#00AAAA', '#005555'],
    ['#0000FF', '#0000AA', '#000055'],
  ]
</script>

<script>
  export default {
    data: () => ({
      swatches: [
        ['#FF0000', '#AA0000', '#550000'],
        ['#FFFF00', '#AAAA00', '#555500'],
        ['#00FF00', '#00AA00', '#005500'],
        ['#00FFFF', '#00AAAA', '#005555'],
        ['#0000FF', '#0000AA', '#000055'],
      ],
    }),
  }
</script>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14747-295964"
}
</example-meta>
