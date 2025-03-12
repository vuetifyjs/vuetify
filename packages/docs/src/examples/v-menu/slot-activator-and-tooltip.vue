<template>
  <div class="text-center">
    <v-menu>
      <template v-slot:activator="{ props: menu }">
        <v-tooltip location="top">
          <template v-slot:activator="{ props: tooltip }">
            <v-btn
              color="primary"
              v-bind="mergeProps(menu, tooltip)"
            >
              Dropdown w/ Tooltip
            </v-btn>
          </template>
          <span>I'm A Tooltip</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :value="index"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
  import { mergeProps } from 'vue'

  const items = [
    { title: 'Click Me 1' },
    { title: 'Click Me 2' },
    { title: 'Click Me 3' },
    { title: 'Click Me 4' },
  ]
</script>

<script>
  import { mergeProps } from 'vue'

  export default {
    data: () => ({
      items: [
        { title: 'Click Me1' },
        { title: 'Click Me2' },
        { title: 'Click Me3' },
        { title: 'Click Me4' },
      ],
    }),
    methods: {
      mergeProps,
    },
  }
</script>
