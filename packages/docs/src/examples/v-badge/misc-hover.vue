<template>
  <div class="text-center">
    <v-badge
      :model-value="hover"
      color="deep-purple"
      content="9999+"
      location="top-left"
      transition="slide-x-transition"
    >
      <v-hover v-model="hover">
        <v-icon
          color="grey-lighten-1"
          size="large"
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
