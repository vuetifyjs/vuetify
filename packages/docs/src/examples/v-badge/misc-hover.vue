<template>
  <div class="text-center">
    <v-badge
      :model-value="hover"
      color="deep-purple"
      content="9999+"
      location="top-end"
      transition="slide-x-transition"
    >
      <v-hover v-slot="{ props }" v-model="hover">
        <v-icon
          color="grey-lighten-1"
          size="large"
          v-bind="props"
        >
          mdi-account
        </v-icon>
      </v-hover>
    </v-badge>
  </div>
</template>

<script>
  export default {
    data: () => ({
      hover: false,
    }),
  }
</script>
