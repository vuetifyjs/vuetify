<template>
  <div class="ma-12 pa-12">
    <v-toolbar>
      <v-tabs
        grow
        dark
        background-color="primary"
      >
        <v-tab>
          <v-badge
            content="6"
            color="pink"
            text
          >
            Item One
          </v-badge>
        </v-tab>

        <v-tab>Item Two</v-tab>
        <v-tab>Item Three</v-tab>
      </v-tabs>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    data: () => ({
      //
    }),
  }
</script>
