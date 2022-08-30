<template>
  <v-row
    v-if="related?.length > 0"
    dense
  >
    <v-col
      v-for="(to, i) in related"
      :key="i"
      cols="12"
      xs="6"
      sm="4"
    >
      <related-page :to="to" />
    </v-col>
  </v-row>
</template>

<script setup>
  // Components
  import RelatedPage from '@/components/doc/RelatedPage.vue'

  // Composables
  import { useRoute } from 'vue-router'

  const related = useRoute().meta.related
</script>
