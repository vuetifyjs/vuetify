<template>
  <v-timeline single-side="after">
    <v-timeline-item
      v-for="item in items"
      :key="item.id"
      :color="item.color"
      size="small"
      fill-dot
    >
      <v-alert
        :value="true"
        :color="item.color"
        :icon="item.icon"
        class="white--text"
      >
        Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
      </v-alert>
    </v-timeline-item>
  </v-timeline>
</template>

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
