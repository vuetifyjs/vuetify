<template>
  <v-container max-width="600">
    <v-breadcrumbs
      ref="breadcrumbsRef"
      :collapse-from="collapseFrom"
      :items="items"
      :total-visible="limit"
    ></v-breadcrumbs>

    <v-breadcrumbs
      :collapse-from="collapseFrom"
      :items="items"
      :total-visible="limit"
      collapse-in-menu
    ></v-breadcrumbs>

    <div class="border-t pa-6">
      <v-slider v-model="count" label="Items count:" max="10" step="1" thumb-label="always"></v-slider>
      <v-slider v-model="limit" label="Collapse when exceeding:" max="10" step="1" thumb-label="always"></v-slider>
      <v-slider v-model="collapseFrom" label="Collapse from:" max="10" step="1" thumb-label="always"></v-slider>
      <v-btn @click="breadcrumbsRef.collapse()">Re-Collapse</v-btn>
    </div>
  </v-container>
</template>

<script setup>
  import { shallowRef, toRef } from 'vue'

  const breadcrumbsRef = useTemplateRef('breadcrumbsRef')
  const collapseFrom = shallowRef(0)
  const count = shallowRef(6)
  const limit = shallowRef(3)

  const items = toRef(() => [
    {
      title: 'Dashboard',
      disabled: false,
      href: 'breadcrumbs_dashboard',
    },
    ...Array.from({ length: count.value - 1 }, (_, i) => i + 1)
      .map(i => ({
        title: `Link ${i}`,
        disabled: i === count.value - 1,
        href: `breadcrumbs_link_${i}`,
      })),
  ])
</script>

<script>
  export default {
    data: () => ({
      count: 6,
      limit: 3,
    }),
    computed: {
      items () {
        return [
          {
            title: 'Dashboard',
            disabled: false,
            href: 'breadcrumbs_dashboard',
          },
          ...Array.from({ length: count.value - 1 }, (_, i) => ({
            title: `Link ${i}`,
            disabled: i === count.value - 2,
            href: `breadcrumbs_link_${i}`,
          })),
        ]
      },
    },
  }
</script>
