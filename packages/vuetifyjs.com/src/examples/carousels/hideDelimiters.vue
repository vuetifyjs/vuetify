<template>
  <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: '/doc-images/carousel/squirrel.jpg'
          },
          {
            src: '/doc-images/carousel/sky.jpg'
          },
          {
            src: '/doc-images/carousel/bird.jpg'
          },
          {
            src: '/doc-images/carousel/planet.jpg'
          }
        ]
      }
    }
  }
</script>
