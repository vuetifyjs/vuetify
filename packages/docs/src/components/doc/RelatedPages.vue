<template>
  <v-row
    v-if="related?.length > 0"
    dense
  >
    <v-col
      v-for="(to, i) in related"
      :key="i"
      cols="12"
      sm="4"
      xs="6"
    >
      <DocRelatedPage :to="to" />
    </v-col>
  </v-row>
</template>

<script setup>
  const related = useRoute().meta.related
</script>
