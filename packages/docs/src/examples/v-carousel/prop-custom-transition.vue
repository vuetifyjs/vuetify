<template>
  <v-container max-width="600">
    <div class="mb-1 mt-6">
      <v-code class="bg-purple-darken-2">default, slower</v-code>
    </div>
    <div class="my-1 reduced-motion-info">
      <v-code class="bg-red">duration change suppressed - prefers-reduced-motion: reduce</v-code>
    </div>
    <v-carousel height="200" transition-duration="600">
      <v-carousel-item v-for="(src, i) in items" :key="i" :src="src" cover></v-carousel-item>
    </v-carousel>

    <div class="mb-1 mt-6">
      <v-code class="bg-purple-darken-2">crossfade</v-code>
    </div>
    <v-carousel height="200" transition-duration="700" crossfade>
      <v-carousel-item v-for="(src, i) in items" :key="i" :src="src" cover></v-carousel-item>
    </v-carousel>

    <div class="mb-1 mt-6">
      <v-code class="bg-purple-darken-2">cross-scale (custom)</v-code>
    </div>
    <div class="my-1 reduced-motion-info">
      <v-code class="bg-red">scale suppressed - prefers-reduced-motion: reduce</v-code>
    </div>
    <v-carousel height="200">
      <v-carousel-item
        v-for="(src, i) in items"
        :key="i"
        :src="src"
        reverse-transition="cross-scale"
        transition="cross-scale"
        cover
      ></v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script setup>
  const items = [
    'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
    'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
    'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
    'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
  ]
</script>

<script>
  export default {
    data () {
      return {
        items: [
          'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        ],
      }
    },
  }
</script>

<style>
  .cross-scale-enter-active,
  .cross-scale-leave-active {
    transition: .5s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition-property: opacity, transform;
  }

  .cross-scale-leave-from,
  .cross-scale-leave-to {
    position: absolute !important;
    top: 0;
    width: 100%;
  }

  .cross-scale-enter-from,
  .cross-scale-leave-to {
    opacity: 0;
    transform: scale(0.9);
  }

  @media (prefers-reduced-motion: reduce) {
    .cross-scale-enter-from,
    .cross-scale-leave-to {
      transform: none;
    }
  }
</style>

<style scoped>
  .reduced-motion-info {
    display: none;
  }
  @media (prefers-reduced-motion: reduce) {
    .reduced-motion-info {
      display: block;
    }
  }
</style>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2220-34681&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>