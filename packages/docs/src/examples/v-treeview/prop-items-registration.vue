<template>
  <v-sheet class="overflow-y-auto" max-height="300">
    <v-treeview
      :items="items"
      items-registration="props"
      open-on-click
    ></v-treeview>
  </v-sheet>
</template>

<script setup>
  const items = Array.from({ length: 5 })
    .map((_, i) => ({
      id: i,
      title: `Example item #${i} with 200 children`,
      children: Array.from({ length: 200 })
        .map((_, ci) => ({
          id: `${i}-${ci}`,
          title: `Example child item #${i}-${ci}`,
        })),
    }))
</script>

<script>
  export default {
    data: () => ({
      items: Array.from({ length: 100 })
        .map((_, i) => ({
          id: i,
          title: `Example item ${i}`,
          children: Array.from({ length: 100 })
            .map((_, ci) => ({
              id: `${i}-${ci}`,
              title: `Example child item ${ci}`,
            })),
        })),
    }),
  }
</script>
