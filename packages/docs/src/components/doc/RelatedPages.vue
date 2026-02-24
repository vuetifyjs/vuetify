<template>
  <v-row
    v-if="related?.length > 0"
    density="comfortable"
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
  const frontmatter = useFrontmatter()
  const related = computed(() => frontmatter.value?.related)
</script>
