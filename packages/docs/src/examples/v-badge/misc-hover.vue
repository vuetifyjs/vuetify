<template>
  <div class="text-center">
    <v-badge
      :value="hover"
      color="deep-purple accent-4"
      content="9999+"
      left
      transition="slide-x-transition"
    >
      <v-hover v-model="hover">
        <v-icon
          color="grey lighten-1"
          large
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
