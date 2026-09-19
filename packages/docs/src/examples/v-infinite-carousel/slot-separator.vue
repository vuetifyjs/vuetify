<template>
  <v-infinite-carousel
    class="keyword-strip"
    gap="3rem"
    tabindex="-1"
    draggable
    mask
  >
    <template v-slot:separator>
      <span class="separator">//</span>
    </template>

    <span v-for="phrase in phrases" :key="phrase" class="keyword">{{ phrase }}</span>
  </v-infinite-carousel>
</template>

<script setup>
  const phrases = [
    '80+ Components',
    'Accessible',
    'Themes & Blueprints',
    'Tree-Shakeable',
    'Internationalization',
    'Open Source',
  ]
</script>

<style scoped>
.keyword-strip {
  font-size: 1.75rem;
  font-weight: 900;
  user-select: none;
}

.keyword {
  font-style: italic;
  text-transform: uppercase;
  transition: opacity .3s;
  opacity: .5;
  padding-block: 1rem;
}

.keyword:hover {
  opacity: 1;
}

.separator {
  letter-spacing: .2em;
  opacity: .5;
  margin-top: -4px;
  display: block;
}
</style>
