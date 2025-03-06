<template>
  <v-timeline side="end">
    <v-timeline-item
      v-for="item in items"
      :key="item.id"
      :dot-color="item.color"
      size="small"
    >
      <v-alert
        :color="item.color"
        :icon="item.icon"
        :value="true"
      >
        Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
      </v-alert>
    </v-timeline-item>
  </v-timeline>
</template>

<script setup>
  const items = [
    {
      id: 1,
      color: 'info',
      icon: 'mdi-information',
    },
    {
      id: 2,
      color: 'error',
      icon: 'mdi-alert-circle',
    },
  ]
</script>

<script>
  export default {
    data: () => ({
      items: [
        {
          id: 1,
          color: 'info',
          icon: 'mdi-information',
        },
        {
          id: 2,
          color: 'error',
          icon: 'mdi-alert-circle',
        },
      ],
    }),
  }
</script>
