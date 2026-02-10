<template>
  <div class="py-6">
    <v-row align="end" class="ga-6" justify="center">
      <v-avatar
        v-for="(img, i) in users"
        :key="i"
        :badge="colors[i]"
        :image="img"
        :size="sizes[i]"
      ></v-avatar>
    </v-row>

    <v-row align="end" class="ga-6 mt-6" justify="center">
      <v-avatar
        v-for="(img, i) in users"
        :key="i"
        :badge="{ color: colors[i], location: 'bottom end', floating: true }"
        :image="img"
        :size="sizes[i]"
        rounded="lg"
      ></v-avatar>
    </v-row>

    <v-row align="end" class="ga-6 mt-6" justify="center">
      <v-avatar
        v-for="(img, i) in users"
        :key="i"
        :badge="{ color: colors[i], location: 'bottom end', floating: true }"
        :image="img"
        :size="sizes[i]"
        rounded="lg"
      >
        <template v-slot:badge>
          <v-icon :icon="icons[i]"></v-icon>
        </template>
      </v-avatar>
    </v-row>
  </div>
</template>

<script setup>
  const sizes = ['x-small', 'small', 'default', 'large', 'x-large']
  const colors = ['primary', 'red', 'success', 'purple', 'warning']
  const icons = ['mdi-star', '$close', '$complete', 'mdi-reply', 'mdi-thumb-up']
  const users = Array.from({ length: 5 })
    .map((_, i) => `https://vuetifyjs.b-cdn.net/docs/images/one/snips/avatars/${2 + i}.jpg`)
</script>
