<template>
  <div class="d-flex justify-center py-6">
    <div class="h-0">
      <svg height="0" version="1.1" width="0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="pattern-0"
            height="20"
            patternTransform="rotate(145) scale(.2)"
            patternUnits="userSpaceOnUse"
            width="20"
          >
            <path d="M0 10h20zm0 20h20zm0 20h20zm0 20h20z" fill="none" stroke="rgb(var(--v-theme-surface))" stroke-width="3" />
          </pattern>
        </defs>
      </svg>
    </div>

    <div class="d-flex flex-wrap justify-center align-center ga-12">
      <v-pie
        :items="items"
        :palette="palettes[currentPalette]"
        hover-scale="0"
        inner-cut="75"
        hide-slice
        tooltip
      ></v-pie>

      <v-list v-model:selected="currentPalette" class="flex-shrink-0 py-0 bg-transparent" mandatory selectable>
        <v-list-item v-for="(palette, pi) in palettes" :key="pi" :value="pi" border="t b">
          <v-avatar
            v-for="(c, ci) in palette"
            :key="ci"
            :color="c.color || c"
            class="ma-2 elevation-1"
            rounded="lg"
            size="24"
          >
            <svg v-if="c.pattern" height="24" width="24">
              <rect :fill="c.pattern" height="24" width="24" />
            </svg>
          </v-avatar>
        </v-list-item>
      </v-list>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const currentPalette = ref(0)
  const palettes = [
    ['#00876c', '#88af77', '#e3d49c', '#df915c', '#d43d51'],
    ['#004c6d', '#056890', '#0885b4', '#08a4d9', '#00c4ff'],
    ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],
    [{ color: '#1dc690', pattern: 'url(#pattern-0)' }, '#278ab0', '#1c4670', '#7a7aff', '#daba50'],
  ]

  const items = [
    { key: 1, title: 'TypeScript', value: 52.3 },
    { key: 2, title: 'Elm', value: 11.6 },
    { key: 3, title: 'CoffeeScript', value: 6.2 },
    { key: 4, title: 'Civet', value: 3.0 },
    { key: 5, title: 'N/A', value: 26.9 },
  ]
</script>

<script>
  export default {
    data: () => ({
      currentPalette: 0,
      palettes: [
        ['#00876c', '#88af77', '#e3d49c', '#df915c', '#d43d51'],
        ['#004c6d', '#056890', '#0885b4', '#08a4d9', '#00c4ff'],
        ['#003f5c', '#58508d', '#bc5090', '#ff6361', '#ffa600'],
        [{ color: '#1dc690', pattern: 'url(#pattern-0)' }, '#278ab0', '#1c4670', '#7a7aff', '#daba50'],
      ],
      items: [
        { key: 1, title: 'TypeScript', value: 17674 },
        { key: 2, title: 'Elm', value: 3550 },
        { key: 3, title: 'CoffeeScript', value: 1251 },
        { key: 4, title: 'Civet', value: 531 },
        { key: 5, title: 'N/A', value: 9821 },
      ],
    }),
  }
</script>
