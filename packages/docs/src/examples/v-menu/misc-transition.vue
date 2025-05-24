<template>
  <div class="d-flex justify-space-around flex-wrap ga-1">
    <v-menu transition="scale-transition">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          color="primary"
          v-bind="activatorProps"
        >
          Scale Transition
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :title="item.title"
          :value="i"
        >
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu
      transition="slide-x-transition"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          color="primary"
          v-bind="activatorProps"
        >
          Slide X Transition
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="i"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          color="primary"
          v-bind="activatorProps"
        >
          Slide Y Transition
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="i"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
  const items = [
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me' },
    { title: 'Click Me 2' },
  ]
</script>

<script>
  export default {
    data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }),
  }
</script>
