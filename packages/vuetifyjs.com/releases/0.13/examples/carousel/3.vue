<template>
  <v-carousel icon="stop">
    <v-carousel-item v-for="(item,i) in items" v-bind:src="item.src" :key="i"></v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            src: '/static/doc-images/carousel/squirrel.jpg'
          },
          {
            src: '/static/doc-images/carousel/sky.jpg'
          },
          {
            src: '/static/doc-images/carousel/bird.jpg'
          },
          {
            src: '/static/doc-images/carousel/planet.jpg'
          }
        ]
      }
    }
  }
</script>
